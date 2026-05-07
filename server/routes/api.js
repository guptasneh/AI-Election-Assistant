import express from 'express';
import { db } from '../db.js';
import { aiService } from '../ai.js';

const router = express.Router();

// Get all products / search
router.get('/products', (req, res) => {
  let products = db.getProducts();
  const { search, category } = req.query;
  
  if (category && category !== 'All') {
    products = products.filter(p => p.category === category);
  }
  
  if (search) {
    const term = search.toLowerCase();
    products = products.filter(p => 
      p.title.toLowerCase().includes(term) || 
      p.description.toLowerCase().includes(term) ||
      p.tags.some(t => t.toLowerCase().includes(term))
    );
  }
  
  res.json(products);
});

// Get single product
router.get('/products/:id', (req, res) => {
  const product = db.getProductById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  
  const similar = aiService.getSimilarProducts(req.params.id);
  res.json({ ...product, similarProducts: similar });
});

// Track interaction
router.post('/interact', (req, res) => {
  const { type, productId, userId = 'default-user' } = req.body;
  if (!['views', 'cart', 'purchases'].includes(type)) {
    return res.status(400).json({ error: 'Invalid interaction type' });
  }
  
  const userState = db.logInteraction(userId, type, productId);
  res.json({ success: true, state: userState });
});

// Get AI Recommendations
router.get('/recommendations', (req, res) => {
  const { userId = 'default-user' } = req.query;
  const recs = aiService.getPersonalizedRecommendations(userId);
  res.json(recs);
});

// Voice Chatbot Endpoint
router.post('/chat', async (req, res) => {
  const { message, userId = 'default-user' } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required' });
  
  try {
    const reply = await aiService.chat(message, userId);
    res.json({ reply });
  } catch (err) {
    console.error('Chat endpoint error:', err);
    res.status(500).json({ error: 'Failed to process chat' });
  }
});

export default router;
