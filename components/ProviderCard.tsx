import { formatPrice, formatSpeed, formatRating } from '../lib/utils';

interface Provider {
  id: number;
  name: string;
  logo: string;
  rating: number;
  total_plans: number;
  min_price: number;
  max_speed: number;
  coverage: string;
  connection_types: string[];
  established: number;
  customer_service: string;
  description: string;
}

interface ProviderCardProps {
  provider: Provider;
}

export default function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
            {/* Placeholder for logo */}
            <span className="text-lg font-bold text-gray-600">
              {provider.name.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{provider.name}</h3>
            <div className="flex items-center">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(provider.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-600">{formatRating(provider.rating)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4">{provider.description}</p>

      {/* Key Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-sm text-gray-500">Plans Available</div>
          <div className="font-semibold">{provider.total_plans}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">From</div>
          <div className="font-semibold text-green-600">{formatPrice(provider.min_price)}/month</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Max Speed</div>
          <div className="font-semibold">{formatSpeed(provider.max_speed)}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Coverage</div>
          <div className="font-semibold">{provider.coverage}</div>
        </div>
      </div>

      {/* Connection Types */}
      <div className="mb-4">
        <div className="text-sm text-gray-500 mb-2">Connection Types</div>
        <div className="flex flex-wrap gap-1">
          {provider.connection_types.map((type, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded capitalize">
              {type.replace('_', ' ')}
            </span>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className="text-xs text-gray-500 mb-4">
        <div>Established: {provider.established}</div>
        <div>Support: {provider.customer_service}</div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
          View Plans
        </button>
        <button className="w-full border border-blue-600 text-blue-600 py-2 px-4 rounded hover:bg-blue-50 transition-colors">
          Read Reviews
        </button>
      </div>
    </div>
  );
}