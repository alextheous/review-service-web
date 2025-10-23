export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Review Service
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Share your experiences and help others make informed decisions
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Browse Reviews
          </button>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
            Write a Review
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <div className="text-4xl mb-4">⭐</div>
          <h3 className="text-xl font-semibold mb-2">Quality Reviews</h3>
          <p className="text-gray-600">Read authentic reviews from real users</p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">Easy Search</h3>
          <p className="text-gray-600">Find exactly what you're looking for</p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-xl font-semibold mb-2">Share Your Story</h3>
          <p className="text-gray-600">Help others with your experiences</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Recent Reviews</h2>
        <div className="space-y-4">
          <div className="review-card">
            <div className="flex items-center mb-2">
              <div className="star-rating mr-2">★★★★★</div>
              <span className="font-semibold">Amazing Product!</span>
            </div>
            <p className="text-gray-700">This is exactly what I was looking for. Great quality and fast shipping.</p>
            <p className="text-gray-500 text-sm mt-2">- John D.</p>
          </div>
          <div className="review-card">
            <div className="flex items-center mb-2">
              <div className="star-rating mr-2">★★★★☆</div>
              <span className="font-semibold">Good Service</span>
            </div>
            <p className="text-gray-700">Very helpful customer service, though delivery took a bit longer than expected.</p>
            <p className="text-gray-500 text-sm mt-2">- Sarah M.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
