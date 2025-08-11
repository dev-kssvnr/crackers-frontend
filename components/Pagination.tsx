import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  onPageChange: (page: number) => void;
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  hasNext, 
  hasPrev, 
  onPageChange 
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrev}
        className={`p-2 rounded-lg border ${
          hasPrev
            ? 'text-gray-600 hover:bg-gray-50 border-gray-300'
            : 'text-gray-300 border-gray-200 cursor-not-allowed'
        }`}
      >
        <ChevronLeft size={20} />
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={typeof page !== 'number'}
          className={`px-3 py-2 rounded-lg border text-sm font-medium ${
            page === currentPage
              ? 'bg-primary-600 text-white border-primary-600'
              : typeof page === 'number'
              ? 'text-gray-600 hover:bg-gray-50 border-gray-300'
              : 'text-gray-400 border-gray-200 cursor-not-allowed'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className={`p-2 rounded-lg border ${
          hasNext
            ? 'text-gray-600 hover:bg-gray-50 border-gray-300'
            : 'text-gray-300 border-gray-200 cursor-not-allowed'
        }`}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
} 