// src/hooks/useFilteredSortedProducts.js
import { useMemo } from 'react';

export const useFilteredSortedProducts = (products, categoryFilter, sortOption) => {
  return useMemo(() => {
    let updated = [...products];

    if (categoryFilter) {
      updated = updated.filter(p => p.category === categoryFilter);
    }

    switch (sortOption) {
      case 'priceLowHigh':
        updated.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighLow':
        updated.sort((a, b) => b.price - a.price);
        break;
      case 'nameAZ':
        updated.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameZA':
        updated.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'ratingHighLow':
        updated.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return updated;
  }, [products, categoryFilter, sortOption]);
};
