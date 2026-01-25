'use client';

import Image from 'next/image';

export function Footer() {
  return (
    <footer className="w-full py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-24">
        {/* Name Section with SVG on top */}
        <div className="relative flex items-center justify-center cursor-heart group">
          {/* SVG positioned absolutely on top */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2">
            <Image
              src="/SVGs/signature.svg"
              alt=""
              width={500}
              height={200}
              className="w-72 md:w-100 h-auto"
            />
          </div>
          {/* Thomas Kelly text in PPValve font */}
          <p className="text-text-secondary font-[family-name:var(--font-ppvalve)] text-4xl md:text-6xl lg:text-8xl">
            Thomas Kelly
          </p>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-text-secondary font-[family-name:var(--font-ppvalve)] text-xl md:text-2xl">
            Reach out
          </p>
          <div className="flex items-center gap-6">
            {/* LinkedIn Icon */}
            <a
              href="https://www.linkedin.com/in/thomas-kelly-designer"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-70 flex items-center justify-center w-12 h-12 rounded-full bg-accent-tertiary"
              aria-label="LinkedIn"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                style={{ fill: '#222222' }}
              >
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  fill="#222222"
                />
              </svg>
            </a>

            {/* Email Icon */}
            <a
              href="mailto:thomaskelly281@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-70 flex items-center justify-center w-12 h-12 rounded-full bg-accent-tertiary"
              aria-label="Email"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                style={{ fill: '#222222' }}
              >
                <path
                  d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                  fill="#222222"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
