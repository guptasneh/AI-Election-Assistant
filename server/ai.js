import { db } from './db.js';
import axios from 'axios';

const HF_API_KEY = "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";

// Simple mock for cosine similarity using tag overlap instead of real vector math
function calculateTagSimilarity(productA, productB) {
  const tagsA = new Set([...productA.tags, productA.category.toLowerCase()]);
  const tagsB = new Set([...productB.tags, productB.category.toLowerCase()]);
  const intersection = new Set([...tagsA].filter(x => tagsB.has(x)));
  const union = new Set([...tagsA, ...tagsB]);
  return intersection.size / union.size;
}

export const aiService = {
  // Mock embedding similarity based on tags and category
  getSimilarProducts: (productId, limit = 4) => {
    const products = db.getProducts();
    const targetProduct = products.find(p => p.id === productId);
    if (!targetProduct) return [];

    const scored = products
      .filter(p => p.id !== productId)
      .map(p => ({
        ...p,
        similarityScore: calculateTagSimilarity(targetProduct, p)
      }))
      .sort((a, b) => b.similarityScore - a.similarityScore);

    return scored.slice(0, limit);
  },

  // Content-Based Filtering for user
  getPersonalizedRecommendations: (userId = 'default-user', limit = 4) => {
    const user = db.getUserInteractions(userId);
    const products = db.getProducts();
    
    // Cold start: Trending products (highest rating)
    if (!user.views.length && !user.cart.length) {
      return [...products].sort((a, b) => b.rating - a.rating).slice(0, limit);
    }

    // Get the most recently interacted items
    const recentItemIds = [...new Set([...user.cart, ...user.views])].slice(0, 3);
    const recentItems = recentItemIds.map(id => db.getProductById(id)).filter(Boolean);

    // Score all products against recent items
    const scored = products
      .filter(p => !recentItemIds.includes(p.id)) // Don't recommend what they just viewed/carted
      .map(p => {
        // Max similarity across recent items
        const maxSim = Math.max(...recentItems.map(ri => calculateTagSimilarity(ri, p)));
        return { ...p, similarityScore: maxSim };
      })
      .sort((a, b) => b.similarityScore - a.similarityScore);

    // If similarity is 0 (no tag overlap), fallback to trending
    if (scored.length > 0 && scored[0].similarityScore > 0) {
      return scored.slice(0, limit);
    } else {
      return [...products].filter(p => !recentItemIds.includes(p.id)).sort((a, b) => b.rating - a.rating).slice(0, limit);
    }
  },

  // Hugging Face API Chatbot logic
  chat: async (message, userId = 'default-user') => {
    const products = db.getProducts();
    
    try {
      const catalogInfo = products.map(p => 
        `- Title: ${p.title}, Price: $${p.price.toFixed(2)}, Category: ${p.category}`
      ).join('\n');

      const systemPrompt = `You are an AI Shopping Assistant for AI.Store. You only recommend and answer questions about the following available products:\n${catalogInfo}\nIf a user asks about anything not on this list, politely decline and offer products from the catalog. Keep answers short, friendly, and do not use markdown symbols since it will be spoken out loud.`;

      const prompt = `<|system|>\n${systemPrompt}</s>\n<|user|>\n${message}</s>\n<|assistant|>\n`;

      const response = await axios.post(
        'https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta',
        {
          inputs: prompt,
          parameters: {
            max_new_tokens: 150,
            temperature: 0.3,
            return_full_text: false
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${HF_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      let reply = response.data[0].generated_text.trim();
      return reply;
      
    } catch (error) {
      console.error("Hugging Face API error:", error.message);
      
      // Local NLP Fallback Logic
      const lowerMessage = message.toLowerCase();
      
      const nonShoppingKeywords = ['weather', 'capital', 'president', 'movie', 'song', 'recipe', 'how to code', 'joke'];
      if (nonShoppingKeywords.some(kw => lowerMessage.includes(kw))) {
        return "(Fallback) I specialize exclusively in helping you find the perfect products from our catalog. How can I help you shop today?";
      }

      if (/^(hi|hello|hey|greetings|howdy)\b/.test(lowerMessage)) {
        return "(Fallback) Hello! I'm your AI Shopping Assistant. Are you looking for anything specific today?";
      }

      let matchedProducts = [...products];
      let priceFilterApplied = false;
      let maxPrice = null;

      const priceMatch = lowerMessage.match(/(?:under|below|less than|cheaper than)\s*\$?(\d+)/i) || lowerMessage.match(/(\d+)\s*\$/);
      if (priceMatch) {
        maxPrice = parseInt(priceMatch[1], 10);
        matchedProducts = matchedProducts.filter(p => p.price <= maxPrice);
        priceFilterApplied = true;
      }

      const keywords = ['electronics', 'apparel', 'smart home', 'furniture', 'accessories', 'shoe', 'monitor', 'headphone', 'audio', 'music', 'chair', 'bottle'];
      const foundKeywords = keywords.filter(kw => lowerMessage.includes(kw));
      
      if (foundKeywords.length > 0) {
        matchedProducts = matchedProducts.filter(p => {
          const pText = (p.title + ' ' + p.category + ' ' + p.tags.join(' ')).toLowerCase();
          return foundKeywords.some(kw => pText.includes(kw));
        });
      }

      if (priceFilterApplied || foundKeywords.length > 0) {
        if (matchedProducts.length > 0) {
          matchedProducts.sort((a, b) => b.rating - a.rating);
          const topMatch = matchedProducts[0];
          return `(Fallback) I highly recommend the ${topMatch.title} for $${topMatch.price.toFixed(2)}!`;
        } else {
          return `(Fallback) I'm sorry, I couldn't find any products matching those requirements.`;
        }
      }

      if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('what should i buy')) {
        const recs = aiService.getPersonalizedRecommendations(userId, 1);
        if (recs.length > 0) {
          return `(Fallback) Based on what's popular, I suggest checking out the ${recs[0].title} for $${recs[0].price.toFixed(2)}!`;
        }
      }

      return "(Fallback) I can help you find specific items. Try asking me something like 'Show me electronics under $200'.";
    }
  }
};
