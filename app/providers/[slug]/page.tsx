'use client';

import providers from '../../../lib/data/providers.json';
import plans from '../../../lib/data/plans.json';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { formatPrice, formatSpeed, formatRating, getConnectionTypeLabel, getContractLabel } from '../../../lib/utils';

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}>★</span>
      ))}
      <span className="ml-2 text-sm text-gray-600">{formatRating(rating)}</span>
    </div>
  );
}

export default function ProviderDetailPage({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug);
  const provider = (providers as any[]).find(p => p.name.toLowerCase().replace(/\s+/g, '-') === slug);
  if (!provider) return notFound();

  const providerPlans = (plans as any[]).filter(p => p.provider === provider.name);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start">
            <div className="w-14 h-14 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
              <span className="text-xl font-bold text-gray-600">{provider.name.charAt(0)}</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{provider.name}</h1>
              <div className="flex items-center space-x-4 mt-1">
                <Stars rating={provider.rating} />
                <span className="text-sm text-gray-500">Coverage: {provider.coverage}</span>
                <span className="text-sm text-gray-500">Established: {provider.established}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Plans from</div>
            <div className="text-2xl font-bold text-green-600">{formatPrice(provider.min_price)}<span className="text-sm text-gray-500 font-normal">/mo</span></div>
          </div>
        </div>

        <p className="text-gray-700 mt-4">{provider.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {provider.connection_types.map((t: string, i: number) => (
            <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded capitalize">{t}</span>
          ))}
          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Support: {provider.customer_service}</span>
        </div>
      </div>

      {/* Plans Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Plans by {provider.name}</h2>
        <Link href="/compare" className="text-blue-600 hover:text-blue-800 text-sm">Compare all plans →</Link>
      </div>

      {providerPlans.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <div className="text-6xl mb-3">📭</div>
          <p className="text-gray-700">No plans available for this provider yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providerPlans.map((plan: any) => (
            <div key={plan.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{plan.name}</h3>
                  <div className="text-sm text-gray-600">{getConnectionTypeLabel(plan.connection_type)} • {getContractLabel(plan.contract)}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{formatPrice(plan.price)}</div>
                  <div className="text-sm text-gray-500">per month</div>
                </div>
              </div>

              <div className="space-y-2 text-sm mb-3">
                <div className="flex justify-between"><span className="text-gray-600">Speed</span><span className="font-medium">{formatSpeed(plan.speed_down)} down / {formatSpeed(plan.speed_up)} up</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Data</span><span className="font-medium">{plan.data}</span></div>
                {plan.setup_fee > 0 && <div className="flex justify-between"><span className="text-gray-600">Setup fee</span><span className="font-medium text-orange-600">{formatPrice(plan.setup_fee)}</span></div>}
              </div>

              {plan.perks?.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {plan.perks.map((perk: string, i: number) => (
                    <span key={i} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{perk}</span>
                  ))}
                </div>
              )}

              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">View details</button>
            </div>
          ))}
        </div>
      )}

      {/* Related links */}
      <div className="mt-10 bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Explore more</h3>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/providers" className="text-blue-600 hover:text-blue-800">All providers</Link>
          <Link href="/deals" className="text-blue-600 hover:text-blue-800">Latest deals</Link>
          <Link href="/browse-reviews" className="text-blue-600 hover:text-blue-800">Browse reviews</Link>
        </div>
      </div>
    </div>
  );
}
