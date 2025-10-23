export function formatPriceBDT(amount: number): string {
  if (isNaN(amount)) return '৳0';
  const formatter = new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT', currencyDisplay: 'narrowSymbol', maximumFractionDigits: 0 });
  // Force narrow symbol (৳) and remove space if present
  return formatter.format(Math.round(amount)).replace('BDT', '৳').replace(/\s?৳\s?/, '৳');
}
