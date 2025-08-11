# API Integration Guide

## Overview

The Bala Sankar Crackers website now integrates with a backend API to fetch products dynamically. The integration includes fallback mechanisms and error handling for a robust user experience.

## API Endpoints

### Base URL
- **Development**: `http://localhost:3000`
- **Production**: Configure via `NEXT_PUBLIC_API_URL` environment variable

### Endpoints

#### GET `/api/public/products`
Fetches all available products with pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 12)

**Response Format:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "number",
        "name": "string",
        "tamil_name": "string",
        "product_code": "string",
        "category": "string",
        "brand": "string|null",
        "unit": "string|null",
        "sales_rate": "string",
        "current_stock": "number",
        "gst_rate": "string",
        "discount": "string",
        "description": "string",
        "original_price": "string",
        "price": "string",
        "status": "string",
        "image": "string|null"
      }
    ],
    "pagination": {
      "page": "number",
      "limit": "number",
      "total": "number",
      "totalPages": "number",
      "hasNext": "boolean",
      "hasPrev": "boolean"
    }
  }
}
```

## Environment Configuration

### Environment Variables

Create a `.env.local` file in the project root:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_USE_API=true
NEXT_PUBLIC_ENABLE_FALLBACK=true
```

### Configuration Options

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:3000` | Base URL for the API |
| `NEXT_PUBLIC_USE_API` | `true` | Enable/disable API calls |
| `NEXT_PUBLIC_ENABLE_FALLBACK` | `true` | Enable fallback data when API fails |

## Features

### 1. Dynamic Product Loading
- Products are fetched from the API on page load
- Loading states with skeleton components
- Error handling with retry functionality

### 2. Stock Management
- Real-time stock tracking using `current_stock` field
- Out-of-stock products are automatically disabled
- Stock information displayed on product cards

### 3. Error Handling
- Network error detection
- User-friendly error messages
- Retry functionality for failed requests

### 4. Loading States
- Skeleton loading components
- Smooth transitions
- Responsive design

## File Structure

```
├── services/
│   └── api.ts                 # API service layer
├── hooks/
│   └── useProducts.ts         # Custom hook for products
├── components/
│   ├── ProductsLoading.tsx    # Loading skeleton
│   └── ProductsError.tsx      # Error component

└── config/
    └── environment.ts         # Environment configuration
```

## Usage

### Basic Usage

The API integration is automatically used in the main page:

```typescript
import { useProducts } from '@/hooks/useProducts';

function HomePage() {
  const { products, loading, error, refetch } = useProducts();
  
  // Use products, loading, and error states
}
```

### Manual API Calls

```typescript
import { ApiService } from '@/services/api';

// Fetch all products
const products = await ApiService.getProducts();

// Fetch single product
const product = await ApiService.getProductById('product-id');
```

## Development

### Running with API

1. Start your backend server on `http://localhost:3000`
2. Ensure the API endpoint `/api/public/products` is available
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```

### Running without API

1. Set environment variable:
   ```bash
   NEXT_PUBLIC_USE_API=false
   ```
2. The app will show empty product list when API is unavailable

### Testing API Integration

1. **API Available**: Products load from API with stock information
2. **API Unavailable**: Empty product list is shown
3. **Network Error**: Error component with retry button

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your backend allows requests from the frontend domain
2. **API Not Found**: Check that the API endpoint is correct and running
3. **Fallback Not Working**: Verify `NEXT_PUBLIC_ENABLE_FALLBACK=true`

### Debug Mode

Enable debug logging by adding to your browser console:
```javascript
localStorage.setItem('debug', 'api:*');
```

## Production Deployment

### Environment Setup

1. Set production API URL:
   ```env
   NEXT_PUBLIC_API_URL=https://your-api-domain.com
   ```

2. Configure fallback behavior:
   ```env
   NEXT_PUBLIC_ENABLE_FALLBACK=true
   ```

### Build Optimization

The API integration is optimized for production:
- Lazy loading of API calls
- Error boundaries for graceful failures
- Minimal bundle size impact

## API Response Format

The API should return products in the following format:

```typescript
interface Product {
  id: number;
  name: string;
  tamil_name: string;
  product_code: string;
  category: string;
  brand: string | null;
  unit: string | null;
  sales_rate: string;
  current_stock: number;
  gst_rate: string;
  discount: string;
  description: string;
  original_price: string;
  price: string;
  status: string;
  image: string | null;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface PaginatedResponse<T> {
  items: T[];
  pagination: PaginationInfo;
}

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
```

## Stock Management

The integration includes comprehensive stock management:
- Real-time stock tracking using `current_stock` field
- Automatic disabling of out-of-stock products
- Stock information displayed on product cards
- Quantity limits based on available stock 