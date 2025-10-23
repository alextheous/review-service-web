export default function ReviewsPage() {
  const reviews = [
    {
      id: 1,
      title: "Excellent Customer Service",
      rating: 5,
      author: "Alex Johnson",
      date: "2025-10-20",
      content: "I had an issue with my order and the customer service team resolved it quickly and professionally. Highly recommended!"
    },
    {
      id: 2,
      title: "Great Product Quality",
      rating: 4,
      author: "Maria Garcia",
      date: "2025-10-18",
      content: "The product exceeded my expectations. Good value for money and arrived on time."
    },
    {
      id: 3,
      title: "Fast Delivery",
      rating: 5,
      author: "David Wilson",
      date: "2025-10-15",
      content: "Ordered on Monday, received on Wednesday. Packaging was excellent and product was exactly as described."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">All Reviews</h1>
      
      <div className="mb-6">
        <input 
          type="text" 
          placeholder="Search reviews..." 
          className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold text-gray-800">{review.title}</h3>
              <div className="flex items-center">
                <div className="star-rating mr-2">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
                <span className="text-gray-600">({review.rating}/5)</span>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{review.content}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>By {review.author}</span>
              <span>{review.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
