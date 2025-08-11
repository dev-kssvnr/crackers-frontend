import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Product, PaginatedResponse } from '@/types';
import { config } from '@/config/environment';

const API_BASE_URL = config.api.baseUrl;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export class ApiService {
  private static async request<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await apiClient.get(endpoint, config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message;
        throw new Error(`HTTP error! status: ${error.response?.status} - ${message}`);
      }
      console.error('API request failed:', error);
      throw error;
    }
  }

  static async getProducts(page: number = 1, limit: number = 12): Promise<PaginatedResponse<Product>> {
    // If API is disabled, return empty data
    if (!config.features.useApi) {
      return {
        items: [],
        pagination: {
          page: 1,
          limit: 0,
          total: 0,
          totalPages: 0,
          hasNext: false,
          hasPrev: false,
        },
      };
    }

    try {
      const response = await this.request<ApiResponse<PaginatedResponse<Product>>>(`/api/public/products?page=${page}&limit=${limit}`);
      
      // Check if response has the expected structure
      if (response && response.data && response.data.items) {
        return response.data;
      } else {
        // Try to handle different response formats
        if (response && 'items' in response && 'pagination' in response) {
          // Direct response without wrapper
          return response as unknown as PaginatedResponse<Product>;
        }
        throw new Error('Invalid API response structure');
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
      // Return empty data if API fails
      return {
        items: [],
        pagination: {
          page: 1,
          limit: 0,
          total: 0,
          totalPages: 0,
          hasNext: false,
          hasPrev: false,
        },
      };
    }
  }

  static async getProductById(id: string): Promise<Product | null> {
    try {
      const response = await this.request<ApiResponse<Product>>(`/api/public/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch product:', error);
      return null;
    }
  }
} 