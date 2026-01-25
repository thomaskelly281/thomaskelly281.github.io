'use client';

export default function AgenticStudioPage() {
  return (
    <main className="bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <img
              src="/SVGs/star.svg"
              alt="Star icon"
              width={56}
              height={56}
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-ppvalve)] font-medium text-text-secondary">
              Agentic Studio
            </h1>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg md:text-xl font-[family-name:var(--font-sfpro)] text-text-secondary opacity-70 mb-8">
              AI agents case study
            </p>
            
            <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden mb-12">
              <img
                src="/thumbs/agenticthumb.webp"
                alt="Agentic Studio"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Case study content will go here */}
            <div className="space-y-6 text-text-secondary">
              <p className="text-base md:text-lg font-[family-name:var(--font-sfpro)]">
                Case study content coming soon...
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
