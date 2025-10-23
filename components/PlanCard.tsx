import { formatPrice, formatSpeed, formatData, getConnectionTypeLabel, formatRating, getContractLabel } from '../lib/utils';

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

interface PlanCardProps {
  plan: Plan;
}

export default function PlanCard({ plan }: PlanCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{plan.name}</h3>
          <p className="text-blue-600 font-medium">{plan.provider}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">{formatPrice(plan.price)}</div>
          <div className="text-sm text-gray-500">per month</div>
        </div>
      </div>

      {/* Key Details */}
      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Speed:</span>
          <span className="font-medium">{formatSpeed(plan.speed_down)} down / {formatSpeed(plan.speed_up)} up</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Data:</span>
          <span className="font-medium">{formatData(plan.data)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Connection:</span>
          <span className="font-medium">{getConnectionTypeLabel(plan.connection_type)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Contract:</span>
          <span className="font-medium">{getContractLabel(plan.contract)}</span>
        </div>
        {plan.setup_fee > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">Setup Fee:</span>
            <span className="font-medium text-orange-600">{formatPrice(plan.setup_fee)}</span>
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center mb-4">
        <div className="flex text-yellow-400 mr-2">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < Math.floor(plan.rating) ? 'text-yellow-400' : 'text-gray-300'}>
              ★
            </span>
          ))}
        </div>
        <span className="text-sm text-gray-600">{formatRating(plan.rating)} rating</span>
      </div>

      {/* Perks */}
      {plan.perks.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {plan.perks.map((perk, index) => (
              <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                {perk}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Availability */}
      <div className="text-sm text-gray-500 mb-4">
        Available in: {plan.availability}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
          View Details
        </button>
        <button className="w-full border border-blue-600 text-blue-600 py-2 px-4 rounded hover:bg-blue-50 transition-colors">
          Compare Plan
        </button>
      </div>
    </div>
  );
}