'use client';

import { useState } from 'react';

export default function SubmitReviewPage() {
  const [formData, setFormData] = useState({
    title: '',
    rating: 5,
    content: '',
    author: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Review submitted:', formData);
    alert('Thank you for your review! It has been submitted successfully.');
    setFormData({ title: '', rating: 5, content: '', author: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Submit a Review</h1>
      
      <div className="bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Review Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a title for your review"
            />
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={5}>★★★★★ (5 stars)</option>
              <option value={4}>★★★★☆ (4 stars)</option>
              <option value={3}>★★★☆☆ (3 stars)</option>
              <option value={2}>★★☆☆☆ (2 stars)</option>
              <option value={1}>★☆☆☆☆ (1 star)</option>
            </select>
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Your Review
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Share your experience..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
