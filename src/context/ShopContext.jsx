import { create } from 'zustand';
import axios from 'axios';

export const useShopStore = create((set, get) => ({
  cart: [],
  wishlist: [],
  userId: 'default-user',
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  addToCart: async (product) => {
    set((state) => ({ cart: [...state.cart, product] }));
    await get().trackInteraction('cart', product.id);
  },
  
  removeFromCart: (productId) => {
    set((state) => ({ cart: state.cart.filter(item => item.id !== productId) }));
  },
  
  toggleWishlist: (product) => {
    set((state) => {
      const exists = state.wishlist.some(item => item.id === product.id);
      if (exists) {
        return { wishlist: state.wishlist.filter(item => item.id !== product.id) };
      } else {
        return { wishlist: [...state.wishlist, product] };
      }
    });
  },

  trackInteraction: async (type, productId) => {
    try {
      await axios.post('/api/interact', {
        type,
        productId,
        userId: get().userId
      });
    } catch (error) {
      console.error('Failed to track interaction:', error);
    }
  }
}));
