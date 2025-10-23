'use client';

import { useMemo, useState } from 'react';

type Review = {
  id: number;
  title: string;
  rating: number; // 1-5
  author: string;
  date: string; // ISO
  content: string;
  provider?: string;
  tags?: string[];
};

const allReviews: Review[] = [
  {
    id: 101,
    title: 'Excellent Customer Service',
    rating: 5,
    author: 'Alex Johnson',
    date: '2025-10-20',
    content:
      'I had an issue with my order and the customer service team resolved it quickly and professionally. Highly recommended!',
    provider: 'FastNet NZ',
    tags: ['service', 'support'],
  },
  {
    id: 102,
    title: 'Great Product Quality',
    rating: 4,
    author: 'Maria Garcia',
    date: '2025-10-18',
    content:
      'The product exceeded my expectations. Good value for money and arrived on time.',
    provider: 'ConnectPro',
    tags: ['quality', 'value'],
  },
  {
    id: 103,
    title: 'Fast Delivery',
    rating: 5,
    author: 'David Wilson',
    date: '2025-10-15',
    content:
      'Ordered on Monday, received on Wednesday. Packaging was excellent and product was exactly as described.',
    provider: 'SpeedyNet',
    tags: ['delivery', 'speed'],
  },
  {
    id: 104,
    title: 'Average Experience',
    rating: 3,
    author: 'Sofia Lee',
    date: '2025-10-12',
    content:
      'The internet speed was okay but had a couple of outages during peak hours.',
    provider: 'QuickLink',
    tags: ['speed', 'reliability'],
  },
  {
    id: 105,
    title: 'Not worth the price',
    rating: 2,
    author: 'Liam Patel',
    date: '2025-10-10',
    content:
      'Too expensive for what you get. Switching to a different provider next month.',
    provider: 'EcoNet',
    tags: ['price'],
  },
];

const ratings = [5, 4, 3, 2, 1];

function Star({ filled }: { filled: boolean }) {
  return <span className={filled ? 'text-yellow-400' : 'text-gray-300'}>★</span>;
}

export default function ReviewsBrowsePage() {
  const [query, setQuery] = useState('');
  const [selectedRating, setSelectedRating] = useState<number | 'all'>('all');
  const [provider, setProvider] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'rating-high' | 'rating-low'>('newest');

  const providers = useMemo(() => {
    const set = new Set(allReviews.map((r) => r.provider).filter(Boolean) as string[]);
    return ['all', ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    let result = [...allReviews];

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.content.toLowerCase().includes(q) ||
          r.author.toLowerCase().includes(q) ||
          (r.provider || '').toLowerCase().includes(q) ||
          (r.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedRating !== 'all') {
      result = result.filter((r) => r.rating === selectedRating);
    }

    if (provider !== 'all') {
      result = result.filter((r) => r.provider === provider);
    }

    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => +new Date(b.date) - +new Date(a.date));
        break;
      case 'oldest':
        result.sort((a, b) => +new Date(a.date) - +new Date(b.date));
        break;
      case 'rating-high':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'rating-low':
        result.sort((a, b) => a.rating - b.rating);
        break;
    }

    return result;
  }, [query, selectedRating, provider, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Browse Reviews</h1>
        <p className="text-gray-600">Search and filter real user reviews by rating, provider, and keywords</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reviews (title, content, tags, author)"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All ratings</option>
            {ratings.map((r) => (
              <option key={r} value={r}>
                {r} stars
              </option>
            ))}
          </select>

          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize"
          >
            {providers.map((p) => (
              <option key={p} value={p} className="capitalize">
                {p}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="rating-high">Highest rating</option>
            <option value="rating-low">Lowest rating</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🧐</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No reviews found</h3>
          <p className="text-gray-600">Try clearing filters or using different keywords.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((review) => (
            <div key={review.id} className="review-card">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{review.title}</h3>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} filled={i < review.rating} />
                  ))}
                </div>
              </div>
              <div className="text-blue-600 text-sm mb-2">{review.provider}</div>
              <p className="text-gray-700 mb-3">{review.content}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>By {review.author}</span>
                <span>{new Date(review.date).toLocaleDateString()}</span>
              </div>
              {review.tags && review.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {review.tags.map((t) => (
                    <span key={t} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
