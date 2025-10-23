'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Filters from '../../components/Filters';
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

  return (
    <div className="container mx-auto px-4 py-8 pb-28">
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
              <div className="grid grid-cols-1 gap-6 mb-8">
                {currentPlans.map((plan) => {
                  const extras = getCardExtras(plan.provider);
                  const checked = compareIds.includes(plan.id);
                  return (
                    <div key={plan.id}>
                      <PlanCard
                        plan={plan}
                        badge={extras.badge}
                        score={extras.score}
                        monthlyNote={extras.monthlyNote}
                        compareChecked={checked}
                        onCompareToggle={() => toggleCompare(plan.id)}
                      />
                      <div className="mt-2 text-right">
                        <button
                          onClick={() => toggleCompare(plan.id)}
                          className="text-sm text-sky-700 underline hover:text-sky-900"
                        >
                          {compareIds.includes(plan.id) ? 'Remove from comparison' : 'Add to comparison'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
              {compareIds.length >= 2 && (
                <div className="mb-4 flex justify-center">
                  <button
                    className="px-6 py-2 bg-amber-500 text-white rounded-md shadow hover:bg-amber-600"
                    onClick={() => router.push('/compare/full')}
                  >
                    See Full Side-by-Side Comparison
                  </button>
                </div>
              )}
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

          <CompareTray
            items={compareItems}
            onRemove={(id) => setCompareIds(prev => prev.filter(x => x !== id))}
            onClear={() => setCompareIds([])}
          />
        </>
      )}
    </div>
  );
}
