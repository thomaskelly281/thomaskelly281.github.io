import Topbar from '../components/Topbar';
import SplashSection from '../components/SplashSection';
import LocationSection from '../components/LocationSection';
import AXPSection from '../components/AXPSection';
import BlokSection from '@/components/BlokSection';
import AssistantSection from '@/components/AssistantSection';
import TestimonialSection from '@/components/TestimonialSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto min-h-screen w-4/5 sm:w-11/12 md:w-5/6 lg:w-4/5 xl:w-3/4 px-4 sm:px-6 lg:px-8 flex flex-col overflow-x-hidden">
        {/* Responsive container - red background to test responsiveness */}
        <div className="w-full flex justify-center pt-4">
          <Topbar />
        </div>
        
        {/* Animated Splash Section */}
        <div className="flex items-center" style={{ height: 'calc(85vh - 100px)' }}>
          <SplashSection />
        </div>
        
        {/* Location Section */}
        <div className="flex items-center" style={{ height: 'calc(85vh - 100px)' }}>
          <LocationSection />
        </div>

        {/* AXP Section */}
        <div className="flex items-center mt-64 mb-32">
          <AXPSection />
        </div>

          {/* Blok Section */}
          <div className="flex items-center mt-64 mb-32">
            <BlokSection />
          </div>

          {/* Assistant Section */}
          <div className="flex items-center mt-64 mb-32">
            <AssistantSection />
          </div>

          {/* Testimonial Section */}
          <div className="flex items-center mt-64 mb-32">
            <TestimonialSection />
          </div>
        
      </main>
    </div>
  );
}