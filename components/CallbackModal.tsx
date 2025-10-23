import { useState } from 'react';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  providerName?: string;
}

export default function CallbackModal({ isOpen, onClose, providerName }: CallbackModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    postcode: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Auto close after success
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', postcode: '' });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="p-6">
            {!isSubmitted ? (
              <>
                {/* Header */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-cyan-600 mb-2">
                    Request a callback
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Enter your contact details and one of our friendly staff will get back to you.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-500"
                    />
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-500"
                    />
                  </div>
                  
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-500"
                    />
                  </div>
                  
                  <div>
                    <input
                      type="text"
                      name="postcode"
                      placeholder="Postcode or suburb"
                      value={formData.postcode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-500"
                    />
                  </div>

                  {/* Privacy notice */}
                  <div className="flex items-start gap-2 mt-4 mb-6">
                    <svg className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs text-gray-600">
                      By submitting your details you agree to Compare Broadband's{' '}
                      <a href="/privacy-policy" className="text-cyan-600 hover:underline">
                        Privacy Policy
                      </a>
                      {' '}and{' '}
                      <a href="/terms-conditions" className="text-cyan-600 hover:underline">
                        Terms and Conditions
                      </a>
                      .
                    </p>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-300 text-white font-semibold py-3 px-6 rounded-md transition-colors"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </div>
                    ) : (
                      'Submit'
                    )}
                  </button>
                </form>
              </>
            ) : (
              /* Success message */
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Request Submitted!</h3>
                <p className="text-gray-600">
                  Thank you! One of our friendly staff will get back to you soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}