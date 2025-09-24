'use client';

import { useState, useRef, useEffect } from 'react';

export default function Topbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full max-w-xl bg-gray-50 rounded-lg relative" ref={menuRef}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Name */}
          <div className="flex-shrink-0">
            <h1 className="text-lg font-medium text-gray-900 font-sans">
              Thomas Kelly
            </h1>
          </div>
          
          {/* Right side - Menu/Close icon */}
          <div className="flex-shrink-0">
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-md text-black hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="relative w-6 h-6">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  className={`w-6 h-6 absolute inset-0 transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                  }`}
                  fill="currentColor"
                >
                  <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
                </svg>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  className={`w-6 h-6 absolute inset-0 transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
                  }`}
                  fill="currentColor"
                >
                  <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      <div className={`absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out transform ${
        isMenuOpen 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
      }`}>
        <div className="py-4 px-2 sm:px-3 lg:px-4 space-y-6">
          {/* Work Section */}
          <div>
            <h2 className="text-md text-gray-600 font-medium uppercase tracking-wider mb-3 px-2 sm:px-3 lg:px-4">
              Work
            </h2>
            <ul className="space-y-1">
              <li>
                <a href="#labs" className="block text-lg text-black font-medium hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200 px-2 sm:px-3 lg:px-4 py-2">
                  Labs
                </a>
              </li>
              <li>
                <a href="#blok" className="block text-lg text-black font-medium hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200 px-2 sm:px-3 lg:px-4 py-2">
                  Blok
                </a>
              </li>
              <li>
                <a href="#assistant" className="block text-lg text-black font-medium hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200 px-2 sm:px-3 lg:px-4 py-2">
                  Assistant
                </a>
              </li>
            </ul>
          </div>

          {/* Separator */}
          <div className="border-t border-gray-200"></div>

          {/* More Section */}
          <div>
            <h2 className="text-md text-gray-600 font-medium uppercase tracking-wider mb-3 px-2 sm:px-3 lg:px-4">
              More
            </h2>
            <ul className="space-y-1">
              <li>
                <a href="#testimonials" className="block text-lg text-black font-medium hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200 px-2 sm:px-3 lg:px-4 py-2">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#footer" className="block text-lg text-black font-medium hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200 px-2 sm:px-3 lg:px-4 py-2">
                  Contact
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
