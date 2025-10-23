'use client';

import Newsletter from '../../components/Newsletter';

export default function DealsPage() {
  const deals = [
    {
      id: 1,
      title: 'Unlimited Fibre from $59/mo',
      provider: 'FastNet NZ',
      description: 'Save with our best-ever price on Unlimited Fibre 300. Limited time offer.',
      badge: 'Limited Time',
      price: 59,
      perks: ['Free modem', 'No setup fee', '12 month contract']
    },
    {
      id: 2,
      title: 'Hyperfibre 900 Offer',
      provider: 'ConnectPro',
      description: 'High performance for power users. BYO Router discount available.',
      badge: 'Premium',
      price: 79,
      perks: ['BYO router discount', 'Static IP included']
    },
    {
      id: 3,
      title: 'Rural Satellite Unlimited',
      provider: 'Rural Connect',
      description: 'Reliable connectivity where fibre isn6#8217;t available. Weather resistant equipment.',
      badge: 'Rural',
      price: 69,
      perks: ['Rural coverage', 'Installation support']
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Latest Broadband Deals</h1>
        <p className="text-gray-600">Hand-picked offers to help you save on your internet plan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {deals.map(deal => (
          <div key={deal.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{deal.badge}</span>
              <div className="text-2xl font-bold text-green-600">${deal.price}<span className="text-sm text-gray-500 font-normal">/mo</span></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{deal.title}</h3>
            <div className="text-blue-600 mb-2">{deal.provider}</div>
            <p className="text-gray-600 text-sm mb-4">{deal.description}</p>
            <div className="flex flex-wrap gap-1 mb-4">
              {deal.perks.map((perk, i) => (
                <span key={i} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{perk}</span>
              ))}
            </div>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
              View Deal
            </button>
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto">
        <Newsletter />
      </div>
    </div>
  );
}
