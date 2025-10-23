'use client';

import { useState } from 'react';
import { formatPrice, formatSpeed, getConnectionTypeLabel } from '../lib/utils';

export interface ComparePlanItem {
  id: number;
  name: string;
  provider: string;
  speed_down: number;
  speed_up: number;
  data: string;
  connection_type: string;
  price: number;
}

interface CompareTrayProps {
  items: ComparePlanItem[];
  onRemove: (id: number) => void;
  onClear: () => void;
}

export default function CompareTray({ items, onRemove, onClear }: CompareTrayProps) {
  const [open, setOpen] = useState(true);
  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t shadow-lg z-50 transition-transform ${open ? 'translate-y-0' : 'translate-y-[85%]'} `}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="font-semibold">Compare ({items.length})</div>
          <div className="flex items-center gap-3">
            <button onClick={() => setOpen(!open)} className="text-sm text-gray-600 hover:text-gray-800">{open ? 'Minimize' : 'Expand'}</button>
            <button onClick={onClear} className="text-sm text-gray-600 hover:text-gray-800">Clear all</button>
          </div>
        </div>
        {items.length === 0 ? (
          <div className="text-sm text-gray-600">Select plans to compare and they'll appear here.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-gray-500">
                <tr>
                  <th className="text-left p-2">Plan</th>
                  <th className="text-left p-2">Provider</th>
                  <th className="text-left p-2">Speed</th>
                  <th className="text-left p-2">Data</th>
                  <th className="text-left p-2">Connection</th>
                  <th className="text-left p-2">Price</th>
                  <th className="p-2"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="p-2 font-medium">{p.name}</td>
                    <td className="p-2">{p.provider}</td>
                    <td className="p-2">{formatSpeed(p.speed_down)}/{formatSpeed(p.speed_up)} Mbps</td>
                    <td className="p-2">{p.data}</td>
                    <td className="p-2">{getConnectionTypeLabel(p.connection_type)}</td>
                    <td className="p-2">{formatPrice(p.price)}/mo</td>
                    <td className="p-2 text-right">
                      <button className="text-xs text-red-600 hover:underline" onClick={() => onRemove(p.id)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
