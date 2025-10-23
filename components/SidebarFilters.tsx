'use client';

import { useState } from 'react';

interface SidebarFiltersProps {
  onFiltersChange: (filters: any) => void;
  initialFilters?: any;
}

export default function SidebarFilters({ onFiltersChange, initialFilters = {} }: SidebarFiltersProps) {
  const [filters, setFilters] = useState({
    minPrice: initialFilters.minPrice || '',
    maxPrice: initialFilters.maxPrice || '',
    minSpeed: initialFilters.minSpeed || '',
    connectionType: initialFilters.connectionType || 'all',
    contract: initialFilters.contract || 'all',
    dataType: initialFilters.dataType || 'all',
    speedRange: initialFilters.speedRange || '',
    packageType: initialFilters.packageType || [],
    specialOffers: initialFilters.specialOffers || [],
    ...initialFilters
  });

  const [expandedSections, setExpandedSections] = useState({
    specialOffers: true,
    package: true,
    downloadSpeeds: true,
    connectionType: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleArrayFilterChange = (key: string, value: string, checked: boolean) => {
    const currentArray = filters[key] || [];
    const newArray = checked 
      ? [...currentArray, value]
      : currentArray.filter((item: string) => item !== value);
    
    const newFilters = { ...filters, [key]: newArray };
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
      dataType: 'all',
      speedRange: '',
      packageType: [],
      specialOffers: []
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const FilterSection = ({ title, isExpanded, onToggle, children }: {
    title: string;
    isExpanded: boolean;
    onToggle: () => void;
    children: React.ReactNode;
  }) => (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <svg 
          className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isExpanded && (
        <div className="pb-4 px-4">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-4">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Filter by</h2>
          <button 
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            Clear all
          </button>
        </div>
      </div>

      {/* Special offers */}
      <FilterSection
        title="Special offers"
        isExpanded={expandedSections.specialOffers}
        onToggle={() => toggleSection('specialOffers')}
      >
        <div className="space-y-3">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.specialOffers?.includes('exclusives')}
              onChange={(e) => handleArrayFilterChange('specialOffers', 'exclusives', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Exclusives (1)</span>
          </label>
        </div>
      </FilterSection>

      {/* Package */}
      <FilterSection
        title="Package"
        isExpanded={expandedSections.package}
        onToggle={() => toggleSection('package')}
      >
        <div className="space-y-3">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.packageType?.includes('broadband')}
              onChange={(e) => handleArrayFilterChange('packageType', 'broadband', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Broadband (26)</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.packageType?.includes('broadband-tv')}
              onChange={(e) => handleArrayFilterChange('packageType', 'broadband-tv', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Broadband + TV (16)</span>
          </label>
        </div>
      </FilterSection>

      {/* Download speeds */}
      <FilterSection
        title="Download speeds"
        isExpanded={expandedSections.downloadSpeeds}
        onToggle={() => toggleSection('downloadSpeeds')}
      >
        <div className="space-y-3">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="speedRange"
              value="10+"
              checked={filters.speedRange === '10+'}
              onChange={(e) => handleFilterChange('speedRange', e.target.value)}
              className="text-blue-600 focus:ring-blue-500"
            />
            <div className="flex-1">
              <span className="text-sm text-gray-900">10 Mbps + (42)</span>
              <div className="text-xs text-gray-500">From ৳21.25</div>
            </div>
          </label>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="speedRange"
              value="30+"
              checked={filters.speedRange === '30+'}
              onChange={(e) => handleFilterChange('speedRange', e.target.value)}
              className="text-blue-600 focus:ring-blue-500"
            />
            <div className="flex-1">
              <span className="text-sm text-gray-900">30 Mbps + (42)</span>
              <div className="text-xs text-gray-500">From ৳21.25</div>
            </div>
          </label>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="speedRange"
              value="100+"
              checked={filters.speedRange === '100+'}
              onChange={(e) => handleFilterChange('speedRange', e.target.value)}
              className="text-blue-600 focus:ring-blue-500"
            />
            <div className="flex-1">
              <span className="text-sm text-gray-900">100 Mbps + (16)</span>
              <div className="text-xs text-gray-500">From ৳21.99</div>
            </div>
          </label>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="speedRange"
              value="300+"
              checked={filters.speedRange === '300+'}
              onChange={(e) => handleFilterChange('speedRange', e.target.value)}
              className="text-blue-600 focus:ring-blue-500"
            />
            <div className="flex-1">
              <span className="text-sm text-gray-900">300 Mbps + (11)</span>
              <div className="text-xs text-gray-500">From ৳25.99</div>
            </div>
          </label>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="speedRange"
              value="900+"
              checked={filters.speedRange === '900+'}
              onChange={(e) => handleFilterChange('speedRange', e.target.value)}
              className="text-blue-600 focus:ring-blue-500"
            />
            <div className="flex-1">
              <span className="text-sm text-gray-900">900 Mbps + (3)</span>
              <div className="text-xs text-gray-500">From ৳30.99</div>
            </div>
          </label>
        </div>
      </FilterSection>

      {/* Connection type */}
      <FilterSection
        title="Connection type"
        isExpanded={expandedSections.connectionType}
        onToggle={() => toggleSection('connectionType')}
      >
        <div className="space-y-3">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="connectionType"
              value="all"
              checked={filters.connectionType === 'all'}
              onChange={(e) => handleFilterChange('connectionType', e.target.value)}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">All Types</span>
          </label>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="connectionType"
              value="fibre"
              checked={filters.connectionType === 'fibre'}
              onChange={(e) => handleFilterChange('connectionType', e.target.value)}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Fibre</span>
          </label>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="connectionType"
              value="fixed wireless"
              checked={filters.connectionType === 'fixed wireless'}
              onChange={(e) => handleFilterChange('connectionType', e.target.value)}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Fixed Wireless</span>
          </label>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="connectionType"
              value="cable"
              checked={filters.connectionType === 'cable'}
              onChange={(e) => handleFilterChange('connectionType', e.target.value)}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Cable</span>
          </label>
        </div>
      </FilterSection>
    </div>
  );
}