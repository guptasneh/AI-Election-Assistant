import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductCard } from '../components/ProductCard';
import { useShopStore } from '../context/ShopContext';
import { Sparkles, TrendingUp } from 'lucide-react';

export const Home = () => {
  const [trending, setTrending] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const { userId } = useShopStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, recsRes] = await Promise.all([
          axios.get('/api/products'),
          axios.get(`/api/recommendations?userId=${userId}`)
        ]);
        
        // Mock trending by sorting rating
        const sorted = [...productsRes.data].sort((a, b) => b.rating - a.rating).slice(0, 4);
        setTrending(sorted);
        setRecommendations(recsRes.data);
      } catch (err) {
        console.error("Failed to load products", err);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <div className="space-y-16 animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden glass-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-8 justify-between bg-gradient-to-br from-emerald-900/20 to-blue-900/20 border-emerald-500/20">
        <div className="max-w-xl z-10">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
            Discover What You <br/><span className="text-gradient">Truly Desire</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Experience next-generation shopping powered by AI. Personalized recommendations tailored exclusively to your unique taste.
          </p>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-medium transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
            Shop Now
          </button>
        </div>
        <div className="relative w-64 h-64 md:w-96 md:h-96">
          <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full"></div>
          {trending[0] && (
            <img 
              src={trending[0].image} 
              alt="Featured" 
              className="relative z-10 w-full h-full object-cover rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
            />
          )}
        </div>
      </section>

      {/* AI Recommendations */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-emerald-500/20 rounded-lg">
            <Sparkles className="w-6 h-6 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-heading font-bold">Recommended For You</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Trending */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <TrendingUp className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-2xl font-heading font-bold">Trending Now</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};
