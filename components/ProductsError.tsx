import { RefreshCw } from 'lucide-react';

interface ProductsErrorProps {
  error: string;
  onRetry: () => void;
}

export default function ProductsError({ error, onRetry }: ProductsErrorProps) {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">🎆</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Unable to load products</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {error || 'There was an error loading the products. Please try again.'}
      </p>
      <button
        onClick={onRetry}
        className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
      >
        <RefreshCw size={18} />
        <span>Try Again</span>
      </button>
    </div>
  );
} 