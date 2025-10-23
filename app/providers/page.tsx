'use client';

import { useState } from 'react';
import ProviderCard from '../../components/ProviderCard';
import { formatRating } from '../../lib/utils';

// Import mock data
import providersData from '../../lib/data/providers.json';

export default function ProvidersPage() {
  const [providers] = useState(providersData);
  const [sortBy, setSortBy] = useState('rating');
  const [filterBy, setFilterBy] = useState('all');

  // Sort providers
  const sortProviders = (providers: any[], sortBy: string) => {
    switch (sortBy) {
      case 'rating':
        return [...providers].sort((a, b) => b.rating - a.rating);
      case 'price':
        return [...providers].sort((a, b) => a.min_price - b.min_price);
      case 'name':
        return [...providers].sort((a, b) => a.name.localeCompare(b.name));
      case 'plans':
        return [...providers].sort((a, b) => b.total_plans - a.total_plans);
      default:
        return providers;
    }
  };

  // Filter providers
  const filterProviders = (providers: any[], filterBy: string) => {
    if (filterBy === 'all') return providers;
    return providers.filter(provider => 
      provider.connection_types.includes(filterBy)
    );
  };

  const filteredProviders = filterProviders(providers, filterBy);
  const sortedProviders = sortProviders(filteredProviders, sortBy);
  const averageRating = providers.reduce((sum, p) => sum + p.rating, 0) / providers.length;
  const totalPlans = providers.reduce((sum, p) => sum + p.total_plans, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Broadband Providers</h1>
        <p className="text-gray-600 mb-6">Compare internet service providers and find the right one for you</p>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{providers.length}</div>
            <div className="text-gray-600">Providers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{totalPlans}</div>
            <div className="text-gray-600">Total Plans</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{formatRating(averageRating)}</div>
            <div className="text-gray-600">Avg Rating</div>
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">Filter by connection:</span>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="fibre">Fibre</option>
              <option value="fixed wireless">Fixed Wireless</option>
              <option value="satellite">Satellite</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="rating">Highest Rated</option>
              <option value="price">Lowest Price</option>
              <option value="name">Name A-Z</option>
              <option value="plans">Most Plans</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {sortedProviders.length} provider{sortedProviders.length !== 1 ? 's' : ''}
          {filterBy !== 'all' && ` with ${filterBy.replace('_', ' ')} connections`}
        </p>
      </div>

      {/* Providers Grid */}
      {sortedProviders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No providers found</h3>
          <p className="text-gray-600 mb-4">Try selecting a different connection type.</p>
          <button 
            onClick={() => setFilterBy('all')}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Show All Providers
          </button>
        </div>
      )}

      {/* Newsletter Signup */}
      <div className="mt-12">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
          <p className="mb-6">Get notified when new providers and better deals become available</p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 p-3 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded font-medium hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}