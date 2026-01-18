// src/scripts/seedProducts.ts
import { addProduct } from '../services/productService';
import { Product } from '../types';

// Продукти за добавяне (взети от CategoryPage.tsx)
const productsToAdd: Omit<Product, 'id'>[] = [
  // Смартфони
  {
    name: 'Samsung Galaxy S23',
    price: 1359,
    originalPrice: 1599,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    description: 'Най-новият флагман на Samsung с подобрена камера',
    category: 'smartphones',
    inStock: true,
    discount: 15,
    features: ['5G', '128GB', 'Android', '120Hz display']
  },
  {
    name: 'iPhone 14 Pro',
    price: 2299,
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGlwaG9uZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    description: 'Мощен iPhone с Dynamic Island и камера 48MP',
    category: 'smartphones',
    inStock: true,
    features: ['iOS', '256GB', '5G', 'A16 Bionic']
  },
  {
    name: 'Google Pixel 7',
    price: 1039,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    description: 'Отличен Android телефон с чиста версия на системата',
    category: 'smartphones',
    inStock: true,
    discount: 20,
    features: ['Android', '128GB', '5G', 'Google Tensor']
  },
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
  // Аксесоари
  {
    name: 'Sony WH-1000XM4',
    price: 459,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    description: 'Безжични слушалки с шумоподавяне',
    category: 'accessories',
    inStock: true,
    features: ['Безжични', 'Шумоподавяне', '30ч батерия', 'Bluetooth']
  },
  {
    name: 'Apple Watch Series 8',
    price: 599,
    originalPrice: 799,
    image: 'https://images.unsplash.com/photo-1434493652605-87d25f6e7e5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0Y2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    description: 'Умен часовник с функции за здраве и фитнес',
    category: 'accessories',
    inStock: true,
    discount: 25,
    features: ['GPS', 'Следене на сън', 'Сърдечен ритъм', 'iOS']
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