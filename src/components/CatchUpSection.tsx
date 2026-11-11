import { motion } from 'framer-motion';
import { openContactModal } from '@/components/ContactModal';
import {
  PerspectiveCard,
  StaggerReveal,
  RevealItem,
} from '@/components/motion/MotionSystem';

function CatchUpSection() {
  return (
    <section className="bg-[#0d0d0d] px-4 md:px-6 py-20 md:py-28">
      {/* ── Perspective Card Container with spatial depth ── */}
      <PerspectiveCard
        tiltAngle={5}
        className="relative w-full max-w-[84rem] mx-auto rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center text-center px-6 py-16 sm:py-20 md:py-24"
        style={{ isolation: 'isolate' }}
      >
        {/* ── Background image matching uploaded Image 2 ─────────────── */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{
            zIndex: 0,
            backgroundImage: 'url(/models/catch-up-bg.png)',
          }}
        />

        {/* ── Staggered inner content matching uploaded UI ──────────── */}
        <StaggerReveal
          stagger={0.12}
          className="relative max-w-2xl mx-auto flex flex-col items-center justify-center text-center"
          style={{ zIndex: 10 }}
        >
          <RevealItem>
            <h2
              className="text-[#181D19] text-3xl sm:text-4xl md:text-5xl font-medium leading-tight mb-3 md:mb-4"
              style={{ letterSpacing: '-0.035em' }}
            >
              Catch Up
            </h2>
          </RevealItem>

          <RevealItem delay={0.08}>
            <p
              className="text-[#414942] text-sm sm:text-base md:text-[17px] font-normal leading-relaxed max-w-xl mx-auto mb-6 md:mb-8"
              style={{ letterSpacing: '-0.01em' }}
            >
              Behind on a goal you need to hit soon?
              <br className="hidden sm:inline" />{' '}
              Start from a plan a wealth manager already built, or get one made around your exact numbers.
            </p>
          </RevealItem>

          <RevealItem delay={0.16}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={openContactModal}
              className="inline-flex items-center justify-center bg-[#384B3D] hover:bg-[#2B3B2F] text-[#E1ECE3] text-xs sm:text-sm font-medium px-6 py-2.5 rounded-[10px] shadow-sm transition-colors duration-200 cursor-pointer"
            >
              Book a free consultation
            </motion.button>
          </RevealItem>
        </StaggerReveal>
      </PerspectiveCard>
    </section>
  );
}

export default CatchUpSection;
