import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useShopStore } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { ShoppingCart, Heart, Star, Sparkles, Package, ShieldCheck, Truck } from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { addToCart, toggleWishlist, wishlist, trackInteraction } = useShopStore();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
        // Track view
        await trackInteraction('views', id);
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, trackInteraction]);

  if (loading) return <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div></div>;
  if (!product) return <div className="text-center py-20">Product not found</div>;

  const isWishlisted = wishlist.some(item => item.id === product.id);

  return (
    <div className="animate-in fade-in duration-500 space-y-16">
      {/* Product Top */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative rounded-3xl overflow-hidden glass-card p-4 aspect-square">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover rounded-2xl" />
        </div>
        
        <div className="flex flex-col justify-center">
          <div className="text-emerald-400 font-medium mb-2">{product.category}</div>
          <h1 className="text-4xl font-heading font-bold mb-4">{product.title}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
              <span className="font-medium">{product.rating}</span>
            </div>
            <span className="text-gray-400 text-sm">124 Reviews</span>
          </div>
          
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            {product.description}
          </p>
          
          <div className="text-4xl font-bold text-white mb-8">${product.price.toFixed(2)}</div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => addToCart(product)}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button 
              onClick={() => toggleWishlist(product)}
              className={`p-4 rounded-xl glass-panel transition-colors ${isWishlisted ? 'text-pink-500 bg-pink-500/10' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
            >
              <Heart className="w-6 h-6" fill={isWishlisted ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col items-center text-center gap-2">
              <Truck className="w-6 h-6 text-emerald-400" />
              <span className="text-xs text-gray-400">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <span className="text-xs text-gray-400">1 Year Warranty</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Package className="w-6 h-6 text-emerald-400" />
              <span className="text-xs text-gray-400">30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {product.similarProducts && product.similarProducts.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-heading font-bold">Similar Products (AI Matched)</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.similarProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
