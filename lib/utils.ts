export function formatPrice(price: number): string {
  return `$${price}`;
}

export function formatSpeed(speed: number): string {
  if (speed >= 1000) {
    return `${speed / 1000}Gbps`;
  }
  return `${speed}Mbps`;
}

export function formatData(data: string): string {
  return data === 'Unlimited' ? 'Unlimited' : data;
}

export function getConnectionTypeLabel(type: string): string {
  const labels: { [key: string]: string } = {
    'fibre': 'Fibre',
    'fixed wireless': 'Fixed Wireless',
    'satellite': 'Satellite',
    'adsl': 'ADSL',
    'vdsl': 'VDSL'
  };
  return labels[type] || type;
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function getContractLabel(contract: string): string {
  const labels: { [key: string]: string } = {
    'open term': 'No Contract',
    '12 months': '12 Month Contract',
    '24 months': '24 Month Contract'
  };
  return labels[contract] || contract;
}

export function sortPlans(plans: any[], sortBy: string): any[] {
  switch (sortBy) {
    case 'price-low':
      return [...plans].sort((a, b) => a.price - b.price);
    case 'price-high':
      return [...plans].sort((a, b) => b.price - a.price);
    case 'speed-high':
      return [...plans].sort((a, b) => b.speed_down - a.speed_down);
    case 'rating':
      return [...plans].sort((a, b) => b.rating - a.rating);
    default:
      return plans;
  }
}

export function filterPlans(plans: any[], filters: any): any[] {
  return plans.filter(plan => {
    // Price range filter
    if (filters.minPrice && plan.price < filters.minPrice) return false;
    if (filters.maxPrice && plan.price > filters.maxPrice) return false;
    
    // Speed filter
    if (filters.minSpeed && plan.speed_down < filters.minSpeed) return false;
    
    // Connection type filter
    if (filters.connectionType && filters.connectionType !== 'all' && plan.connection_type !== filters.connectionType) return false;
    
    // Contract filter
    if (filters.contract && filters.contract !== 'all' && plan.contract !== filters.contract) return false;
    
    // Data filter
    if (filters.dataType && filters.dataType !== 'all') {
      if (filters.dataType === 'unlimited' && plan.data !== 'Unlimited') return false;
      if (filters.dataType === 'capped' && plan.data === 'Unlimited') return false;
    }
    
    return true;
  });
}