// src/contexts/SearchContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../types";

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Product[];
  performSearch: (products: Product[], query: string) => void;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const normalize = (v?: string) => (v ?? "").toLowerCase().trim();

  const performSearch = (products: Product[], query: string) => {
    const q = normalize(query);

    if (!q) {
      setSearchResults([]);
      return;
    }

    const results = products.filter((product) => {
      const name = normalize(product.name);
      const description = normalize(product.description);
      const category = normalize(product.category);
      const features = (product.features ?? []).join(" ").toLowerCase();

      return (
        name.includes(q) ||
        description.includes(q) ||
        category.includes(q) ||
        features.includes(q)
      );
    });

    setSearchResults(results);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        performSearch,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
