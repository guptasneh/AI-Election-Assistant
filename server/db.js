import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load initial products
const productsPath = path.join(__dirname, 'data', 'products.json');
let products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// User Interaction State (In-memory DB)
// Structure: { [userId]: { views: ['p1', 'p2'], cart: [], purchases: [] } }
const userInteractions = {
  'default-user': {
    views: [],
    cart: [],
    purchases: []
  }
};

export const db = {
  getProducts: () => products,
  getProductById: (id) => products.find(p => p.id === id),
  
  getUserInteractions: (userId = 'default-user') => {
    if (!userInteractions[userId]) {
      userInteractions[userId] = { views: [], cart: [], purchases: [] };
    }
    return userInteractions[userId];
  },

  logInteraction: (userId = 'default-user', type, productId) => {
    const user = db.getUserInteractions(userId);
    if (!user[type]) user[type] = [];
    
    // Add to front, keep last 20
    user[type] = [productId, ...user[type].filter(id => id !== productId)].slice(0, 20);
    return user;
  }
};
