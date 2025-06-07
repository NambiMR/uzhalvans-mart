import veg from "../assets/images/veg.webp";
import fruit from "../assets/images/fruits.jpg";
import grains from "../assets/images/grains.jpeg";
import dairy from "../assets/images/dairy.jpeg";
import organic from "../assets/images/organic.jpg";
import spices from "../assets/images/spices.jpeg";
import herbs from "../assets/images/herbs.jpeg";
import pulses from "../assets/images/pulses.jpeg";
import flowers from "../assets/images/flowers.jpeg";
import seeds from "../assets/images/seeds.jpeg";

import f1 from "../assets/images/farmers/f1.jpg"
import f2 from "../assets/images/farmers/f2.jpg"
import f3 from "../assets/images/farmers/f3.jpg"
import f4 from "../assets/images/farmers/f4.jpg"
import f5 from "../assets/images/farmers/f5.jpg"
import f6 from "../assets/images/farmers/f6.jpg"
import f7 from "../assets/images/farmers/f7.jpg"
import f8 from "../assets/images/farmers/f8.jpg"
import f9 from "../assets/images/farmers/f9.jpg"
import f10 from "../assets/images/farmers/f10.jpg"
import f11 from "../assets/images/farmers/f11.jpg"

export const products = [
  {
    id: 1,
    name: "Organic Tomatoes",
    price: 2.99,
    oldPrice: 3.49,
    farmer: "Raju Farms",
    farmerId: "f1", 
    farmerAvatar: f1,
    stock: 50,       
    category: "vegetables",
    description: "Grown naturally without pesticides, these tomatoes are juicy and full of flavor.",
    images: [
      veg,
      fruit
    ],
    rating: 4.5,
    reviewCount: 42,
    specs: {
      weight: "1kg",
      origin: "Tamil Nadu"
    }
  },
  {
    id: 2,
    name: "Fresh Apples",
    price: 1.99,
    oldPrice: 2.29,
    farmer: "Dev Orchards",
    farmerId: "f2", 
    farmerAvatar: f2,
    stock: 50,
    category: "fruits",
    description: "Crisp and sweet apples handpicked from local orchards.",
    images: [
      grains,
      dairy
    ],
    rating: 4.2,
    reviewCount: 30,
    specs: {
      weight: "1kg",
      origin: "Himachal Pradesh"
    }
  },
  {
    id: 3,
    name: "Whole Wheat",
    price: 1.49,
    oldPrice: 1.79,
    farmer: "Anand Grains",
    farmerId: "f3", 
    farmerAvatar: f3,
    stock: 50,
    category: "grains",
    description: "Nutritious whole wheat grains milled fresh for your daily baking.",
    images: [
      organic,
      spices
    ],
    rating: 4.1,
    reviewCount: 25,
    specs: {
      weight: "1kg",
      origin: "Punjab"
    }
  },
  {
    id: 4,
    name: "Cow Milk",
    price: 0.99,
    oldPrice: 1.09,
    farmer: "Green Dairy",
    farmerAvatar: f4,
    category: "dairy",
    description: "Fresh, pasteurized cow milk delivered daily.",
    images: [
      herbs,
      spices
    ],
    rating: 4.7,
    reviewCount: 58,
    specs: {
      weight: "1 litre",
      origin: "Kerala"
    }
  },
  {
    id: 5,
    name: "Organic Basket",
    price: 5.99,
    oldPrice: 6.99,
    farmer: "Nature's Gift",
    farmerAvatar: f5,
    category: "organic",
    description: "A curated basket of the season’s best organic produce.",
    images: [
      flowers,
      seeds
    ],
    rating: 4.8,
    reviewCount: 64,
    specs: {
      weight: "varies",
      origin: "Assorted"
    }
  },
  {
    id: 6,
    name: "Turmeric Powder",
    price: 3.49,
    oldPrice: 3.99,
    farmer: "Spice Route",
    farmerAvatar: f6,
    category: "spices",
    description: "Bright, aromatic turmeric powder sourced from premium roots.",
    images: [
      fruit,
      veg
    ],
    rating: 4.6,
    reviewCount: 38,
    specs: {
      weight: "100g",
      origin: "Erode"
    }
  },
  {
    id: 7,
    name: "Basil Leaves",
    price: 1.25,
    oldPrice: 1.49,
    farmer: "Herbal Farms",
    farmerAvatar: f7,
    category: "herbs",
    description: "Fresh basil leaves perfect for cooking and garnishing.",
    images: [
      dairy,
      spices
    ],
    rating: 4.3,
    reviewCount: 20,
    specs: {
      weight: "bunch",
      origin: "Karnataka"
    }
  },
  {
    id: 8,
    name: "Green Lentils",
    price: 2.25,
    oldPrice: 2.49,
    farmer: "Pulse Agro",
    farmerAvatar: f8,
    category: "pulses",
    description: "High-protein green lentils, ideal for soups and stews.",
    images: [
      seeds,
      flowers
    ],
    rating: 4.4,
    reviewCount: 27,
    specs: {
      weight: "1kg",
      origin: "Maharashtra"
    }
  },
  {
    id: 9,
    name: "Marigold Flowers",
    price: 0.75,
    oldPrice: 0.99,
    farmer: "Flora Fields",
    farmerAvatar: f9,
    category: "flowers",
    description: "Vibrant marigold bouquets for decoration and ceremonies.",
    images: [
      pulses,
      fruit
    ],
    rating: 4.0,
    reviewCount: 15,
    specs: {
      weight: "bunch",
      origin: "Tamil Nadu"
    }
  },
  {
    id: 10,
    name: "Sunflower Seeds",
    price: 1.89,
    oldPrice: 2.19,
    farmer: "SeedCo",
    farmerAvatar: f10,
    category: "seeds",
    description: "Crunchy sunflower seeds, great for snacking and baking.",
    images: [
      veg,
    spices
    ],
    rating: 4.5,
    reviewCount: 34,
    specs: {
      weight: "250g",
      origin: "Rajasthan"
    }
  },
  {
    id: 11,
    name: " Bananas",
    price: 2.99,
    oldPrice: 3.29,
    farmer: "Dev Orchards",
    farmerAvatar: f11,
    category: "fruits",
    description: "Crisp and sweet apples handpicked from local orchards.",
    images: [
      pulses,
      flowers
    ],
    rating: 4.5,
    reviewCount: 35,
    specs: {
      weight: "1kg",
      origin: "Himachal Pradesh"
    }
  },
  
];


// Add these new functions to your existing products.js
export const getTrendingProducts = () => {
  return [...products]
    .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
    .slice(0, 10);
};

export const getSeasonalPicks = () => {
  const currentMonth = new Date().getMonth();
  // Example seasonal mapping - adjust based on your products
  const seasonalCategories = {
    0: ['citrus', 'leafy-greens'], // January
    1: ['root-vegetables', 'winter-squash'],
    // ... add all months
    5: ['berries', 'stone-fruits'], // June
    // ... continue for all months
    11: ['citrus', 'winter-greens'] // December
  };
  
  return products.filter(product => 
    seasonalCategories[currentMonth]?.includes(product.category)
  );
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

export const getSpecialOffers = () => {
  return products.filter(product => product.oldPrice)
    .sort((a, b) => {
      const discountA = (a.oldPrice - a.price) / a.oldPrice;
      const discountB = (b.oldPrice - b.price) / b.oldPrice;
      return discountB - discountA;
    });
};