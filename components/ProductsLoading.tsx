import { motion } from 'framer-motion';

export default function ProductsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          {/* Skeleton for product image */}
          <div className="h-48 bg-gray-200 animate-pulse"></div>
          
          {/* Skeleton for product info */}
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
            
            {/* Price skeleton */}
            <div className="flex items-center space-x-2">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
            </div>
            
            {/* Quantity selector skeleton */}
            <div className="flex items-center justify-between">
              <div className="h-8 bg-gray-200 rounded animate-pulse w-24"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 