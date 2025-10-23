'use client';

import { useEffect, useMemo, useState } from 'react';
import plansData from '../lib/data/plans.json';

interface SidebarFiltersProps {
  onFiltersChange: (filters: any) => void;
  initialFilters?: any;
}

type FiltersState = {
  connectionType: string;
  speedRange: string;
  packageType: string[];
  specialOffers: string[];
};

const SPEED_BUCKETS = [
  { key: '10+', label: '10 Mbps +', min: 10 },
  { key: '30+', label: '30 Mbps +', min: 30 },
  { key: '100+', label: '100 Mbps +', min: 100 },
  { key: '300+', label: '300 Mbps +', min: 300 },
  { key: '900+', label: '900 Mbps +', min: 900 }
] as const;

function applyBaseFilters(plans: any[], filters: FiltersState) {
  return plans.filter(p => {
    const byConn = filters.connectionType === 'all' || p.connection_type === filters.connectionType;
    const byPkg = !filters.packageType?.length || filters.packageType.some((pkg: string) => {
      if (pkg === 'broadband') return true; // all internet plans
      if (pkg === 'broadband-tv') return p.perks?.some((x: string) => /tv|iptv/i.test(x));
      return true;
    });
    return byConn && byPkg;
  });
}

export default function SidebarFilters({ onFiltersChange, initialFilters = {} }: SidebarFiltersProps) {
  const [filters, setFilters] = useState<FiltersState>({
    connectionType: initialFilters.connectionType || 'all',
    speedRange: initialFilters.speedRange || '',
    packageType: initialFilters.packageType || [],
    specialOffers: initialFilters.specialOffers || [],
  });

  const baseFiltered = useMemo(() => applyBaseFilters(plansData as any[], filters), [filters.connectionType, filters.packageType]);

  const speedCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    SPEED_BUCKETS.forEach(b => {
      counts[b.key] = baseFiltered.filter(p => p.speed_down >= b.min).length;
    });
    return counts;
  }, [baseFiltered]);

  const packageCounts = useMemo(() => {
    const all = baseFiltered.length; // after connection type filter
    const tv = baseFiltered.filter(p => p.perks?.some((x: string) => /tv|iptv/i.test(x))).length;
    return { broadband: all, broadbandTv: tv };
  }, [baseFiltered]);

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const handleFilterChange = (key: keyof FiltersState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleArrayFilterChange = (key: keyof FiltersState, value: string, checked: boolean) => {
    setFilters(prev => {
      const current = (prev[key] as string[]) || [];
      const next = checked ? Array.from(new Set([...current, value])) : current.filter(v => v !== value);
      return { ...prev, [key]: next };
    });
  };

  const clearAll = () => {
    setFilters({ connectionType: 'all', speedRange: '', packageType: [], specialOffers: [] });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-4">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">Filter by</h2>
        <button onClick={clearAll} className="text-sm text-blue-600">Clear all</button>
      </div>

      <div className="border-b p-4">
        <h3 className="font-semibold mb-3">Package</h3>
        <label className="flex items-center gap-2 mb-2">
          <input type="checkbox" checked={filters.packageType.includes('broadband')} onChange={(e)=>handleArrayFilterChange('packageType','broadband', e.target.checked)} className="rounded border-gray-300" />
          <span className="text-sm text-gray-700">Broadband ({packageCounts.broadband})</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={filters.packageType.includes('broadband-tv')} onChange={(e)=>handleArrayFilterChange('packageType','broadband-tv', e.target.checked)} className="rounded border-gray-300" />
          <span className="text-sm text-gray-700">Broadband + TV ({packageCounts.broadbandTv})</span>
        </label>
      </div>

      <div className="border-b p-4">
        <h3 className="font-semibold mb-3">Download speeds</h3>
        {SPEED_BUCKETS.map(b => (
          <label key={b.key} className="flex items-center gap-2 mb-3 cursor-pointer">
            <input type="radio" name="speedRange" value={b.key} checked={filters.speedRange===b.key} onChange={(e)=>handleFilterChange('speedRange', e.target.value)} className="text-blue-600" />
            <div className="flex-1">
              <span className="text-sm text-gray-900">{b.label} ({speedCounts[b.key] ?? 0})</span>
              <div className="text-xs text-gray-500">From ৳{b.min===10||b.min===30? '21.25': b.min===100? '21.99': b.min===300? '25.99': '30.99'}</div>
            </div>
          </label>
        ))}
      </div>

      <div className="p-4">
        <h3 className="font-semibold mb-3">Connection type</h3>
        {['all','fibre','fixed wireless','cable'].map(type=> (
          <label key={type} className="flex items-center gap-2 mb-2">
            <input type="radio" name="connectionType" value={type} checked={filters.connectionType===type} onChange={(e)=>handleFilterChange('connectionType', e.target.value)} className="text-blue-600" />
            <span className="text-sm text-gray-700">{type[0].toUpperCase()+type.slice(1)}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
