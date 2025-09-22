'use client';

import { useRouter } from 'next/navigation';

export default function BlokCaseStudy() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/');
  };

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
            Blok Design System
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
              Detailed information about the Blok Design System project will be available here soon. 
              This will include the project overview, challenges, solutions, and outcomes.
            </p>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium text-black mb-2">What to expect:</h3>
              <ul className="text-gray-600 space-y-2 text-left">
                <li>• Project overview and objectives</li>
                <li>• Design system architecture</li>
                <li>• AI-friendly component development</li>
                <li>• Implementation and adoption</li>
                <li>• Results and impact on development workflow</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
