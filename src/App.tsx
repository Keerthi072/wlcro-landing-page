import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import InfoSection from '@/components/InfoSection';
import ServicesSection from '@/components/ServicesSection';
import SecuritySection from '@/components/SecuritySection';
import CrossBorderSection from '@/components/CrossBorderSection';
import AIAssistantSection from '@/components/AIAssistantSection';
import SummitSection from '@/components/SummitSection';

function App() {
  return (
    <div className="flex flex-col bg-[#0d0d0d]">
      <div className="h-screen flex flex-col overflow-hidden">
        <Navbar />
        <HeroSection />
      </div>
      <InfoSection />
      <ServicesSection />
      <SecuritySection />
      <CrossBorderSection />
      <AIAssistantSection />
      <SummitSection />
    </div>
  );
}

export default App;
