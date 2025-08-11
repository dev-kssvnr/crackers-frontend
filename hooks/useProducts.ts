import { useState, useEffect } from 'react';
import { Product, PaginatedResponse } from '@/types';
import { ApiService } from '@/services/api';

export interface UseProductsReturn {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  loading: boolean;
  error: string | null;
  refetch: (page?: number) => Promise<void>;
  loadPage: (page: number) => Promise<void>;
}

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      const data: PaginatedResponse<Product> = await ApiService.getProducts(page, 12);
      setProducts(data.items);
      setPagination(data.pagination);
    } catch (err) {
      console.error('Error in useProducts hook:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const loadPage = async (page: number) => {
    await fetchProducts(page);
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  return {
    products,
    pagination,
    loading,
    error,
    refetch: fetchProducts,
    loadPage,
  };
} 