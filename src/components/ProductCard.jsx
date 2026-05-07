import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShopStore } from '../context/ShopContext';

export const ProductCard = ({ product }) => {
  const { toggleWishlist, addToCart, wishlist } = useShopStore();
  
  const isWishlisted = wishlist.some(item => item.id === product.id);

  return (
    <div className="glass-card group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-emerald-500/50">
      <Link to={`/product/${product.id}`} className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
          <button 
            onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
            className={`p-2 rounded-full backdrop-blur-md transition-colors ${isWishlisted ? 'bg-pink-500/20 text-pink-500' : 'bg-black/50 text-white hover:bg-emerald-500'}`}
          >
            <Heart className="w-4 h-4" fill={isWishlisted ? "currentColor" : "none"} />
          </button>
        </div>
        {product.similarityScore !== undefined && product.similarityScore > 0 && (
          <div className="absolute top-2 left-2 bg-emerald-500/80 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
            AI Match
          </div>
        )}
      </Link>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="text-xs text-emerald-400 mb-1">{product.category}</div>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-heading font-medium text-lg leading-tight mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-3 h-3 text-yellow-400" fill="currentColor" />
          <span className="text-xs text-gray-400">{product.rating}</span>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-bold text-xl">${product.price.toFixed(2)}</span>
          <button 
            onClick={() => addToCart(product)}
            className="p-2 bg-white/5 rounded-full hover:bg-emerald-500 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
