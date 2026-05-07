import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { ProductCard } from '../components/ProductCard';
import { useShopStore } from '../context/ShopContext';
import { Search as SearchIcon, Filter } from 'lucide-react';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const c = searchParams.get('c') || 'All';
  
  const { setSearchQuery } = useShopStore();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Electronics', 'Apparel', 'Smart Home', 'Furniture', 'Accessories'];

  useEffect(() => {
    setSearchQuery(q); // Sync navbar
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/products?search=${encodeURIComponent(q)}&category=${encodeURIComponent(c)}`);
        setProducts(res.data);
      } catch (err) {
        console.error("Search failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [q, c, setSearchQuery]);

  const handleCategoryChange = (cat) => {
    setSearchParams(prev => {
      prev.set('c', cat);
      return prev;
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start animate-in fade-in duration-500">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 shrink-0 glass-panel p-6 rounded-2xl sticky top-24">
        <div className="flex items-center gap-2 mb-6 text-white font-heading font-semibold text-lg">
          <Filter className="w-5 h-5" />
          Filters
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm text-gray-400 mb-3 uppercase tracking-wider">Category</h3>
            <div className="space-y-2">
              {categories.map(cat => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-4 h-4 rounded border transition-colors flex items-center justify-center
                    ${c === cat ? 'bg-emerald-500 border-emerald-500' : 'border-gray-500 group-hover:border-emerald-400'}`}>
                    {c === cat && <div className="w-2 h-2 bg-black rounded-sm"></div>}
                  </div>
                  <span className={`text-sm ${c === cat ? 'text-white' : 'text-gray-300'}`}>{cat}</span>
                  <input 
                    type="radio" 
                    className="hidden" 
                    checked={c === cat} 
                    onChange={() => handleCategoryChange(cat)} 
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Results */}
      <div className="flex-1 min-w-0">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-heading font-bold">
            {q ? `Results for "${q}"` : 'All Products'}
          </h1>
          <span className="text-gray-400 text-sm">{products.length} Items</span>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div></div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass-card">
            <SearchIcon className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-heading text-gray-300 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};
