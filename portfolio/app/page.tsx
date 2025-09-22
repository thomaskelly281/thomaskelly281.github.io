import Topbar from '../components/Topbar';
import SplashSection from '../components/SplashSection';
import LocationSection from '../components/LocationSection';
// import AXPSection from '../components/AXPSection';
import LabsSection from '../components/LabsSection';
import BlokSection from '@/components/BlokSection';
import AssistantSection from '@/components/AssistantSection';
import TestimonialSection from '@/components/TestimonialSection';
// import AboutSection from '@/components/AboutSection';
import FooterSection from '@/components/FooterSection';

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
        <div id="location" className="flex items-center" style={{ height: 'calc(85vh - 100px)' }}>
          <LocationSection />
        </div>

        {/* Labs Section */}
        <div id="labs" className="flex items-center mt-64 mb-32">
          <LabsSection />
        </div>

        {/* AXP Section - Commented out */}
        {/* <div id="axp" className="flex items-center mt-64 mb-32">
          <AXPSection />
        </div> */}

          {/* Blok Section */}
          <div id="blok" className="flex items-center mt-64 mb-32">
            <BlokSection />
          </div>

          {/* Assistant Section */}
          <div id="assistant" className="flex items-center mt-64 mb-32">
            <AssistantSection />
          </div>

          {/* Testimonial Section */}
          <div id="testimonials" className="flex items-center mt-64 mb-32 md:mb-24 sm:mb-20">
            <TestimonialSection />
          </div>

          {/* About Section */}
          {/* <div className="flex items-center mt-64 mb-32">
            <AboutSection />
          </div> */}

          {/* Footer Section */}
          <div id="footer" className="flex items-center mt-64 mb-32">
            <FooterSection />
          </div>
        
      </main>
    </div>
  );
}