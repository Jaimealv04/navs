import { useState, useEffect } from 'react';
import { CatalogService } from '../services';
import type { Category, MenuItem, ApiError } from '../types';

// Hook para obtener todas las categorías
export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await CatalogService.getAllCategories();
      setCategories(data);
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.message.toString());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    isLoading,
    error,
    refetch: fetchCategories,
  };
};

// Hook para obtener una categoría por slug
export const useCategoryBySlug = (slug: string | undefined) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setCategory(null);
      setIsLoading(false);
      return;
    }

    const fetchCategory = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await CatalogService.getCategoryBySlug(slug);
        setCategory(data);
      } catch (error) {
        const apiError = error as ApiError;
        setError(apiError.message.toString());
        setCategory(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [slug]);

  return {
    category,
    isLoading,
    error,
  };
};

// Hook para búsqueda de items
export const useItemSearch = () => {
  const [results, setResults] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchItems = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await CatalogService.searchItems(query);
      setResults(data);
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.message.toString());
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setResults([]);
    setError(null);
  };

  return {
    results,
    isLoading,
    error,
    searchItems,
    clearResults,
  };
};

// Hook para obtener estadísticas del catálogo
export const useCatalogStats = () => {
  const [stats, setStats] = useState({
    totalCategories: 0,
    totalSubcategories: 0,
    totalItems: 0,
    totalSubsections: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await CatalogService.getCatalogStats();
        setStats(data);
      } catch (error) {
        const apiError = error as ApiError;
        setError(apiError.message.toString());
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return {
    stats,
    isLoading,
    error,
  };
};

// Hook para obtener todos los items de forma plana
export const useAllItems = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await CatalogService.getAllItems();
        setItems(data);
      } catch (error) {
        const apiError = error as ApiError;
        setError(apiError.message.toString());
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllItems();
  }, []);

  return {
    items,
    isLoading,
    error,
  };
};