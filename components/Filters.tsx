'use client';

import { useState } from 'react';

interface FiltersProps {
  onFiltersChange: (filters: any) => void;
  initialFilters?: any;
}

export default function Filters({ onFiltersChange, initialFilters = {} }: FiltersProps) {
  const [filters, setFilters] = useState({
    minPrice: initialFilters.minPrice || '',
    maxPrice: initialFilters.maxPrice || '',
    minSpeed: initialFilters.minSpeed || '',
    connectionType: initialFilters.connectionType || 'all',
    contract: initialFilters.contract || 'all',
    dataType: initialFilters.dataType || 'all',
    ...initialFilters
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      minPrice: '',
      maxPrice: '',
      minSpeed: '',
      connectionType: 'all',
      contract: 'all',
      dataType: 'all'
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Filter Plans</h3>
        <button 
          onClick={clearFilters}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          Clear All
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min $"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Max $"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Speed */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Min Speed (Mbps)</label>
          <input
            type="number"
            placeholder="e.g. 100"
            value={filters.minSpeed}
            onChange={(e) => handleFilterChange('minSpeed', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Connection Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Connection Type</label>
          <select
            value={filters.connectionType}
            onChange={(e) => handleFilterChange('connectionType', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="fibre">Fibre</option>
            <option value="fixed wireless">Fixed Wireless</option>
            <option value="satellite">Satellite</option>
            <option value="adsl">ADSL</option>
          </select>
        </div>

        {/* Contract */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contract</label>
          <select
            value={filters.contract}
            onChange={(e) => handleFilterChange('contract', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Contracts</option>
            <option value="open term">No Contract</option>
            <option value="12 months">12 Months</option>
            <option value="24 months">24 Months</option>
          </select>
        </div>

        {/* Data */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
          <select
            value={filters.dataType}
            onChange={(e) => handleFilterChange('dataType', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Data Plans</option>
            <option value="unlimited">Unlimited</option>
            <option value="capped">Capped</option>
          </select>
        </div>
      </div>
    </div>
  );
}