'use client';

import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { TimePeriod, ProductCategory } from '@/types';

interface ProductFiltersProps {
  selectedCategories: ProductCategory[];
  onCategoryChange: (category: ProductCategory) => void;
  onClearFilters: () => void;
}

export default function ProductFilters({
  selectedCategories,
  onCategoryChange,
  onClearFilters,
}: ProductFiltersProps) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const categories: ProductCategory[] = [
    'Rockets',
    'Ground Spinners',
    'Fountains',
    'Crackers',
    'Sparklers',
    'Roman Candles',
    'Wheels',
    'Bombs',
    'Chakras',
    'Flower Pots',
    'Smoke Bombs',
    'Other',
  ];

  const hasActiveFilters = selectedCategories.length > 0;

  return (
    <>
      {/* Mobile filter button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Filter size={20} />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="bg-primary-600 text-white text-xs rounded-full px-2 py-1">
              {selectedCategories.length}
            </span>
          )}
        </button>
      </div>

      {/* Desktop filters */}
      <div className="hidden lg:block bg-white rounded-lg shadow-md p-6 sticky top-32">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Filter className="mr-2" size={20} />
            Filters
          </h3>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Clear All
            </button>
          )}
        </div>



        {/* Category Filter */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => onCategoryChange(category)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile filters modal */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-4 space-y-6">


              {/* Category Filter */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => onCategoryChange(category)}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex space-x-3 pt-4 border-t">
                <button
                  onClick={onClearFilters}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 