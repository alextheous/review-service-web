'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import plansData from '../../../lib/data/plans.json';
import { formatPrice, formatSpeed, getConnectionTypeLabel, getContractLabel } from '../../../lib/utils';

function getCompareIds(): number[] {
  try {
    if (typeof window !== 'undefined') {
      const v = localStorage.getItem('comparePlans');
      if (v) return JSON.parse(v);
    }
  } catch {}
  return [];
}

export default function FullComparePage() {
  const [ids, setIds] = useState<number[]>([]);

  useEffect(() => {
    setIds(getCompareIds());
  }, []);

  const items = useMemo(() => (plansData as any[]).filter(p => ids.includes(p.id)), [ids]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard');
    } catch {}
  };

  if (items.length < 2) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-2">Compare Plans</h1>
        <p className="text-gray-600 mb-6">Select two or more plans on the compare page to view a full matrix.</p>
        <Link href="/compare" className="px-5 py-2 bg-sky-600 text-white rounded">Go to Compare</Link>
      </div>
    );
  }

  const headers = items.map(p => (
    <th key={p.id} className="p-3 text-left align-top">
      <div className="font-semibold text-sky-700">{p.name}</div>
      <div className="text-sm text-gray-600">{p.provider}</div>
    </th>
  ));

  const row = (label: string, get: (p: any) => React.ReactNode) => (
    <tr>
      <th className="p-3 text-left text-gray-600 font-medium w-48 align-top">{label}</th>
      {items.map(p => (
        <td key={`${label}-${p.id}`} className="p-3 align-top">{get(p)}</td>
      ))}
    </tr>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Side-by-Side Comparison</h1>
        <div className="flex items-center gap-3">
          <button onClick={() => window.print()} className="px-4 py-2 border rounded">Print</button>
          <button onClick={copyLink} className="px-4 py-2 border rounded">Copy Link</button>
          <Link href="/compare" className="px-4 py-2 bg-sky-600 text-white rounded">Back to Compare</Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded bg-white">
          <thead>
            <tr>
              <th className="p-3 text-left w-48"></th>
              {headers}
            </tr>
          </thead>
          <tbody className="divide-y">
            {row('Price', p => <div className="font-semibold">{formatPrice(p.price)}/mo</div>)}
            {row('Contract', p => getContractLabel(p.contract))}
            {row('Speed', p => <div>{formatSpeed(p.speed_down)} / {formatSpeed(p.speed_up)} Mbps</div>)}
            {row('Data', p => p.data)}
            {row('Connection', p => getConnectionTypeLabel(p.connection_type))}
            {row('Setup fee', p => p.setup_fee > 0 ? formatPrice(p.setup_fee) : 'None')}
            {row('Router', p => (p.modem_included ? 'Included' : 'BYO'))}
            {row('Perks', p => (
              <ul className="list-disc list-inside text-sm text-gray-700">
                {(p.perks || []).map((x: string, i: number) => <li key={i}>{x}</li>)}
              </ul>
            ))}
            {row('Availability', p => p.availability)}
            {row('Static IP', p => 'Optional')}
          </tbody>
        </table>
      </div>
    </div>
  );
}
