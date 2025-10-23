import { formatPrice, formatSpeed, getConnectionTypeLabel, getContractLabel } from '../lib/utils';
import { useState } from 'react';

interface Plan {
  id: number;
  provider: string;
  name: string;
  price: number;
  speed_down: number;
  speed_up: number;
  data: string;
  connection_type: string;
  contract: string;
  setup_fee: number;
  modem_included: boolean;
  perks: string[];
  rating: number;
  availability: string;
}

export interface PlanCardProps {
  plan: Plan;
  badge?: { label: string; color: 'green' | 'purple' | 'yellow' };
  score?: number;
  monthlyNote?: string;
  compareChecked?: boolean;
  onCompareToggle?: () => void;
}

const badgeColorMap = {
  green: 'bg-green-100 text-green-800',
  purple: 'bg-purple-100 text-purple-800',
  yellow: 'bg-yellow-100 text-yellow-800',
};

export default function PlanCard({ plan, badge, score = 95, monthlyNote, compareChecked = false, onCompareToggle }: PlanCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-yellow-300 shadow-sm overflow-hidden bg-white">
      {badge && <div className="h-1 w-full bg-yellow-300" />}

      <div className="p-4 md:p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {badge && (
              <span className={`text-xs px-2 py-1 rounded ${badgeColorMap[badge.color]}`}>{badge.label}</span>
            )}
            <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">{score}</span>
            <h3 className="text-lg md:text-xl font-semibold text-sky-700">
              {plan.name}
            </h3>
            <span className="text-sm text-gray-500 hidden md:inline">/ {getContractLabel(plan.contract)}</span>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1 text-sm text-gray-700 cursor-pointer select-none">
              <input type="checkbox" checked={compareChecked} onChange={onCompareToggle} className="accent-sky-600" />
              Compare
            </label>
            <button
              onClick={() => setOpen(!open)}
              className="text-sky-700 border border-sky-600 px-3 py-1.5 rounded hover:bg-sky-50 text-sm font-medium"
            >
              {open ? 'Hide info' : 'More info'}
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-4 md:items-center">
          <div className="md:col-span-2 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-sm font-semibold text-gray-600">{plan.provider[0]}</span>
            </div>
            <div className="text-gray-800 font-medium">{plan.provider}</div>
          </div>

          <div className="md:col-span-3">
            <div className="text-gray-500 text-sm">Speed ({getConnectionTypeLabel(plan.connection_type)})</div>
            <div className="text-lg font-semibold">{formatSpeed(plan.speed_down)}/{formatSpeed(plan.speed_up)} <span className="text-sm font-normal text-gray-500">Mbps</span></div>
          </div>

          <div className="md:col-span-2">
            <div className="text-gray-500 text-sm">Data</div>
            <div className="text-lg font-semibold">{plan.data}</div>
          </div>

          <div className="md:col-span-2">
            <div className="text-gray-500 text-sm">Included features</div>
            <div className="text-sm">
              {plan.modem_included ? 'Router included' : 'BYO Router'}
            </div>
            {plan.setup_fee > 0 && (
              <div className="text-xs text-gray-500">Connection fee {formatPrice(plan.setup_fee)}</div>
            )}
          </div>

          <div className="md:col-span-1 hidden md:block">
            <div className="text-gray-500 text-sm">Available</div>
            <div className="text-sm">Static IP</div>
          </div>

          <div className="md:col-span-2 flex md:block items-center justify-between gap-3">
            <div>
              <div className="text-xs text-gray-500">from</div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">{formatPrice(plan.price)}<span className="text-sm text-gray-600 font-normal">/mo</span></div>
              {monthlyNote && (
                <div className="text-xs text-gray-500 mt-1">{monthlyNote}</div>
              )}
            </div>
            <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-5 py-2 rounded-md flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Request a callback
            </button>
          </div>
        </div>

        {/* Expandable details */}
        {open && (
          <div className="mt-4 border-t pt-4 text-sm text-gray-700 space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">Contract options</div>
                <ul className="list-disc list-inside">
                  <li>{getContractLabel(plan.contract)}</li>
                  {plan.setup_fee > 0 && <li>Connection fee {formatPrice(plan.setup_fee)}</li>}
                  <li>Termination fee: none listed</li>
                </ul>
              </div>
              <div>
                <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">Included</div>
                <ul className="list-disc list-inside">
                  <li>{plan.modem_included ? 'Rental router included' : 'BYO Router allowed'}</li>
                  {plan.perks?.map((p, i) => (<li key={i}>{p}</li>))}
                </ul>
              </div>
              <div>
                <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">Availability</div>
                <ul className="list-disc list-inside">
                  <li>Areas: {plan.availability}</li>
                  <li>Static IP: optional</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}