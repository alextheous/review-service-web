'use client';

import { useMemo, useState } from 'react';
import plans from '../lib/data/plans.json';

interface SidebarFiltersProps {
  onFiltersChange: (filters: any) => void;
  initialFilters?: any;
}

function countBySpeedRanges() {
  const ranges = {
    '10+': (d:number)=> d >= 10,
    '30+': (d:number)=> d >= 30,
    '100+': (d:number)=> d >= 100,
    '300+': (d:number)=> d >= 300,
    '900+': (d:number)=> d >= 900,
  } as const;
  const counts: Record<string, number> = {};
  const speeds = (plans as any[]).map(p=>p.speed_down as number);
  Object.entries(ranges).forEach(([k, fn])=>{
    counts[k] = speeds.filter(s=>fn(s)).length;
  });
  return counts as Record<keyof typeof ranges, number>;
}

function countByPackage() {
  // For demo purposes we treat every plan as Broadband; add some TV-tagged dummies below
  const all = plans as any[];
  const broadband = all.length;
  const broadbandTv = all.filter(p=>p.perks?.some((x:string)=>/tv|iptv/i.test(x))).length;
  return { broadband, broadbandTv };
}

export default function SidebarFilters({ onFiltersChange, initialFilters = {} }: SidebarFiltersProps) {
  const [filters, setFilters] = useState({
    connectionType: initialFilters.connectionType || 'all',
    speedRange: initialFilters.speedRange || '',
    packageType: initialFilters.packageType || [],
    specialOffers: initialFilters.specialOffers || [],
    ...initialFilters
  });

  const speedCounts = useMemo(() => countBySpeedRanges(), []);
  const pkgCounts = useMemo(() => countByPackage(), []);

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
    handleFilterChange(key, newArray);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-4">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">Filter by</h2>
        <button onClick={()=>{setFilters({connectionType:'all', speedRange:'', packageType:[], specialOffers:[]}); onFiltersChange({});}} className="text-sm text-blue-600">Clear all</button>
      </div>

      <div className="border-b p-4">
        <h3 className="font-semibold mb-3">Package</h3>
        <label className="flex items-center gap-2 mb-2">
          <input type="checkbox" checked={filters.packageType?.includes('broadband')} onChange={(e)=>handleArrayFilterChange('packageType','broadband', e.target.checked)} className="rounded border-gray-300" />
          <span className="text-sm text-gray-700">Broadband ({pkgCounts.broadband})</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={filters.packageType?.includes('broadband-tv')} onChange={(e)=>handleArrayFilterChange('packageType','broadband-tv', e.target.checked)} className="rounded border-gray-300" />
          <span className="text-sm text-gray-700">Broadband + TV ({pkgCounts.broadbandTv})</span>
        </label>
      </div>

      <div className="border-b p-4">
        <h3 className="font-semibold mb-3">Download speeds</h3>
        {(['10+','30+','100+','300+','900+'] as const).map(key=> (
          <label key={key} className="flex items-center gap-2 mb-3 cursor-pointer">
            <input type="radio" name="speedRange" value={key} checked={filters.speedRange===key} onChange={(e)=>handleFilterChange('speedRange', e.target.value)} className="text-blue-600" />
            <div className="flex-1">
              <span className="text-sm text-gray-900">{key.replace('+',' Mbps +')} ({speedCounts[key]})</span>
              <div className="text-xs text-gray-500">From ৳{key==='10+'||key==='30+'? '21.25': key==='100+'? '21.99': key==='300+'? '25.99': '30.99'}</div>
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
