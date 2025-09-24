'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AssistantCaseStudy() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace '28122001' with your desired password
    if (password === '28122001') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const handleBack = () => {
    router.push('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-gray-50 rounded-lg p-8 shadow-lg">
            <div className="flex items-center justify-center mb-6">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                className="w-12 h-12 text-gray-600"
                fill="currentColor"
              >
                <path d="M12,17C10.89,17 10,16.1 10,15C10,13.89 10.89,13 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10C4,8.89 4.89,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" />
              </svg>
            </div>
            
            <h1 className="text-2xl font-medium text-black text-center mb-2">
              Protected Case Study
            </h1>
            <p className="text-gray-600 text-center mb-8">
              This case study is password protected. Please enter the password to continue.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                  required
                />
              </div>
              
              {error && (
                <p className="text-red-600 text-sm text-center">{error}</p>
              )}
              
              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
              >
                Access Case Study
              </button>
            </form>

            <button
              onClick={handleBack}
              className="w-full mt-4 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              ← Back to Portfolio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={handleBack}
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-8 flex items-center gap-2"
          >
            <span>←</span>
            Back to Portfolio
          </button>
          
          <h1 className="text-4xl md:text-5xl font-medium text-black mb-4">
            Brand Assistant
          </h1>
          <p className="text-xl text-gray-600">
            Case Study Coming Soon
          </p>
        </div>

        {/* Content Placeholder */}
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-medium text-black mb-4">
              This case study is currently under development
            </h2>
            <p className="text-gray-600 mb-8">
              Detailed information about the Brand Assistant project will be available here soon. 
              This will include the project overview, challenges, solutions, and outcomes.
            </p>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium text-black mb-2">What to expect:</h3>
              <ul className="text-gray-600 space-y-2 text-left">
                <li>• Project overview and objectives</li>
                <li>• Chat experience design and development</li>
                <li>• AI integration and natural language processing</li>
                <li>• User experience and interface design</li>
                <li>• Results and impact on customer engagement</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
