'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import SidebarFilters from '../../components/SidebarFilters';
import PlanCard from '../../components/PlanCard';
import Pagination from '../../components/Pagination';
import CompareTray, { ComparePlanItem } from '../../components/CompareTray';
import { filterPlans, sortPlans } from '../../lib/utils';
import plansData from '../../lib/data/plans.json';

function getInitialCompare(): number[] {
  try {
    if (typeof window !== 'undefined') {
      const val = localStorage.getItem('comparePlans');
      if (val) return JSON.parse(val);
    }
  } catch {}
  return [];
}

export default function CompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [allPlans] = useState(plansData);
  const [filteredPlans, setFilteredPlans] = useState(plansData);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('price-low');
  const [address, setAddress] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [compareIds, setCompareIds] = useState<number[]>(getInitialCompare());
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Persist compareIds to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('comparePlans', JSON.stringify(compareIds));
    }
  }, [compareIds]);

  const plansPerPage = 6;
  const totalPages = Math.ceil(filteredPlans.length / plansPerPage);
  const startIndex = (currentPage - 1) * plansPerPage;
  const currentPlans = filteredPlans.slice(startIndex, startIndex + plansPerPage);

  const toggleCompare = (id: number) => {
    setCompareIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const compareItems: ComparePlanItem[] = useMemo(() => {
    return (allPlans as any[])
      .filter(p => compareIds.includes(p.id))
      .map(p => ({
        id: p.id,
        name: p.name,
        provider: p.provider,
        speed_down: p.speed_down,
        speed_up: p.speed_up,
        data: p.data,
        connection_type: p.connection_type,
        price: p.price,
      }));
  }, [allPlans, compareIds]);

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

  const getCardExtras = (provider: string) => {
    if (provider === 'Link3') {
      return { badge: { label: 'No Contract', color: 'green' as const }, score: 100, monthlyNote: '' };
    }
    if (provider === 'Amber IT') {
      return { badge: { label: 'New Customers', color: 'purple' as const }, score: 96, monthlyNote: 'first 12 months then ৳1,699' };
    }
    if (provider === 'BDCOM') {
      return { badge: { label: 'Deal', color: 'yellow' as const }, score: 95, monthlyNote: 'first 12 months then ৳950' };
    }
    return { badge: undefined, score: 95, monthlyNote: '' };
  };

  const handleFullCompare = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('comparePlans', JSON.stringify(compareIds));
      }
    } catch {}
    // Prefer client navigation; fall back to hard navigation to be bulletproof
    try {
      router.push('/compare/full');
    } catch {
      if (typeof window !== 'undefined') {
        window.location.href = '/compare/full';
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
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
        </div>
      </div>

      {hasSearched && (
        <div className="container mx-auto px-4 py-8">
          {/* Mobile Filters Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="w-full bg-white border border-gray-300 rounded-lg p-3 flex items-center justify-between"
            >
              <span className="font-medium text-gray-900">Filters</span>
              <svg 
                className={`w-5 h-5 transition-transform ${isMobileFiltersOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Two Column Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar Filters - Left Column */}
            <div className={`lg:col-span-3 ${isMobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
              <SidebarFilters onFiltersChange={handleFiltersChange} />
            </div>

            {/* Main Content - Right Column */}
            <div className="lg:col-span-9">
              {/* Results Header */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {filteredPlans.length} plans available{address && ` for ${address}`}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Showing {startIndex + 1}-{Math.min(startIndex + plansPerPage, filteredPlans.length)} of {filteredPlans.length} results
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 text-sm">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => handleSortChange(e.target.value)}
                      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="speed-high">Speed: Fastest First</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Plans Grid */}
              {filteredPlans.length > 0 ? (
                <>
                  <div className="space-y-6 mb-8">
                    {currentPlans.map((plan) => {
                      const extras = getCardExtras(plan.provider);
                      const checked = compareIds.includes(plan.id);
                      return (
                        <div key={plan.id} className="bg-white rounded-lg shadow-sm">
                          <PlanCard
                            plan={plan}
                            badge={extras.badge}
                            score={extras.score}
                            monthlyNote={extras.monthlyNote}
                            compareChecked={checked}
                            onCompareToggle={() => toggleCompare(plan.id)}
                          />
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Pagination */}
                  <div className="flex justify-center mb-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                  
                  {/* Full Comparison CTA with robust navigation */}
                  {compareIds.length >= 2 && (
                    <div className="flex justify-center mb-8">
                      <Link href="/compare/full" className="hidden" prefetch>
                        {/* hidden link for prefetch/SSR correctness */}
                      </Link>
                      <button
                        className="px-6 py-3 bg-amber-500 text-white rounded-md shadow hover:bg-amber-600 transition-colors font-medium"
                        onClick={handleFullCompare}
                      >
                        See Full Side-by-Side Comparison ({compareIds.length} plans)
                      </button>
                    </div>
                  )}
                </>
              ) : (
                /* No Results */
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No plans found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your filters to see more results.</p>
                  <button 
                    onClick={() => handleFiltersChange({})}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Compare Tray */}
          <CompareTray
            items={compareItems}
            onRemove={(id) => setCompareIds(prev => prev.filter(x => x !== id))}
            onClear={() => setCompareIds([])}
          />
        </div>
      )}
    </div>
  );
}
