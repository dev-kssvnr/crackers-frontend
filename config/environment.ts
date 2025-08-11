export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    timeout: 10000, // 10 seconds
    retryAttempts: 3,
  },
  features: {
    useApi: process.env.NEXT_PUBLIC_USE_API !== 'false', // Default to true
    enableFallback: process.env.NEXT_PUBLIC_ENABLE_FALLBACK !== 'false', // Default to true
  },
}; 