import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import InfoSection from '@/components/InfoSection';
import ServicesSection from '@/components/ServicesSection';
import SecuritySection from '@/components/SecuritySection';
import CrossBorderSection from '@/components/CrossBorderSection';
import AIAssistantSection from '@/components/AIAssistantSection';
import SummitSection from '@/components/SummitSection';
import CatchUpSection from '@/components/CatchUpSection';
import GoalSection from '@/components/GoalSection';
import FooterSection from '@/components/FooterSection';
import ContactModal from '@/components/ContactModal';

function App() {
  return (
    <div className="flex flex-col bg-[#0d0d0d]">
      <div className="relative">
        <Navbar />
        <HeroSection />
      </div>
      <InfoSection />
      <ServicesSection />
      <SecuritySection />
      <CrossBorderSection />
      <AIAssistantSection />
      <CatchUpSection />
      <SummitSection />
      <GoalSection />
      <FooterSection />
      <ContactModal />
    </div>
  );
}

export default App;
