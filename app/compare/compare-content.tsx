'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Filters from '../../components/Filters';
import PlanCard from '../../components/PlanCard';
import Pagination from '../../components/Pagination';
import { filterPlans, sortPlans } from '../../lib/utils';
import plansData from '../../lib/data/plans.json';

export default function CompareContent() {
  const searchParams = useSearchParams();
  const [allPlans] = useState(plansData);
  const [filteredPlans, setFilteredPlans] = useState(plansData);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('price-low');
  const [address, setAddress] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  
  const plansPerPage = 6;
  const totalPages = Math.ceil(filteredPlans.length / plansPerPage);
  const startIndex = (currentPage - 1) * plansPerPage;
  const currentPlans = filteredPlans.slice(startIndex, startIndex + plansPerPage);

  const handleAddressSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      setHasSearched(true);
    }
  };

  const handleFiltersChange = (filters: any) => {
    const filtered = filterPlans(allPlans, filters);
    const sorted = sortPlans(filtered, sortBy);
    setFilteredPlans(sorted);
    setCurrentPage(1);
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    const sorted = sortPlans(filteredPlans, newSortBy);
    setFilteredPlans(sorted);
  };

  useEffect(() => {
    const addressParam = searchParams.get('address');
    if (addressParam) {
      setAddress(addressParam);
      setHasSearched(true);
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Compare Broadband Plans</h1>
        <p className="text-gray-600 mb-6">Find the perfect internet plan for your needs</p>
        
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleAddressSearch} className="flex gap-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address to see available plans"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search Plans
            </button>
          </form>
        </div>
      </div>

      {hasSearched && (
        <>
          <Filters onFiltersChange={handleFiltersChange} />
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {filteredPlans.length} plans available{address && ` for ${address}`}
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="speed-high">Speed: Fastest First</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {filteredPlans.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentPlans.map((plan) => (
                  <PlanCard key={plan.id} plan={plan} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No plans found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters to see more results.</p>
              <button 
                onClick={() => handleFiltersChange({})}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </>
      )}

      {!hasSearched && (
        <div className="text-center py-16">
          <div className="text-8xl mb-6">🏠</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ready to Find Your Perfect Plan?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Enter your address above to see all available broadband plans in your area.
            We'll show you speeds, prices, and help you find the best deal.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold mb-2">Compare Speeds</h3>
              <p className="text-gray-600 text-sm">From basic browsing to 4K streaming</p>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600 text-sm">Exclusive deals and savings</p>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl mb-3">🎆</div>
              <h3 className="font-semibold mb-2">No Contracts</h3>
              <p className="text-gray-600 text-sm">Flexible terms available</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
