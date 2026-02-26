// src/scripts/seedProducts.ts
import { addProduct } from '../services/productService';
import { Product } from '../types';

// Продукти за добавяне (взети от CategoryPage.tsx)
const productsToAdd: Omit<Product, 'id'>[] = [

  // Лаптопи
  {
    name: 'MacBook Pro 14"',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    description: 'Мощен лаптоп за професионалисти с чип M2 Pro',
    category: 'laptops',
    inStock: true,
    features: ['macOS', '16GB RAM', '512GB SSD', 'M2 Pro']
  },
  {
    name: 'Dell XPS 13',
    price: 1979,
    originalPrice: 2199,
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    description: 'Лек и мощен ултрабук с безкрайно дисплей',
    category: 'laptops',
    inStock: true,
    discount: 10,
    features: ['Windows 11', '16GB RAM', '512GB SSD', 'Intel i7']
  },

  // Гейминг
  {
    name: 'PlayStation 5',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGxheXN0YXRpb24lMjA1fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    description: 'Най-новата конзола от Sony с 4K гейминг',
    category: 'gaming',
    inStock: true,
    features: ['4K Gaming', 'SSD', 'Ray Tracing', 'Backwards Compatible']
  },
  {
    name: 'Xbox Series X',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1621259182978-fbf832e8e0bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eGJveHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    description: 'Мощна конзола за 4K гейминг и Game Pass',
    category: 'gaming',
    inStock: false,
    features: ['4K Gaming', '1TB SSD', 'Game Pass', 'Quick Resume']
  }
];

export const seedProducts = async () => {
  console.log('🚀 Започвам добавяне на продукти във Firestore...');
  
  let addedCount = 0;
  for (const product of productsToAdd) {
    try {
      const productId = await addProduct(product);
      if (productId) {
        console.log(`✅ Добавен продукт: ${product.name}`);
        addedCount++;
      } else {
        console.log(`❌ Грешка при добавяне на: ${product.name}`);
      }
    } catch (error) {
      console.log(`❌ Грешка при добавяне на: ${product.name}`, error);
    }
  }
  
  console.log(`🎉 Добавянето приключи! Успешно добавени ${addedCount} от ${productsToAdd.length} продукта.`);
};