import { motion } from 'framer-motion';
import { openContactModal } from '@/components/ContactModal';
import {
  StaggerReveal,
  RevealItem,
} from '@/components/motion/MotionSystem';

function GoalSection() {
  return (
    <section className="bg-[#0d0d0d] px-4 md:px-6 py-20 md:py-28 overflow-hidden">
      {/* ── Container card with puzzle background matching uploaded reference ── */}
      <div
        className="relative w-full max-w-[84rem] mx-auto rounded-[2rem] md:rounded-[2.5rem] overflow-hidden px-6 py-16 sm:py-20 md:py-24 lg:py-28 flex flex-col items-center justify-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        style={{
          backgroundImage: 'url(/models/hero-bg-pattern.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* ── Text + CTA with fluid staggered entrance ──────────────────────── */}
        <StaggerReveal className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Title */}
          <RevealItem>
            <h2
              className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-medium leading-[1.12] mb-4 sm:mb-5 text-center mx-auto"
              style={{ letterSpacing: '-0.035em' }}
            >
              Set the goal. Wlcro
              <br />
              moves the money.
            </h2>
          </RevealItem>

          {/* Tagline description */}
          <RevealItem delay={0.08}>
            <p className="text-[#181D19] text-xs sm:text-sm md:text-[15px] font-normal leading-relaxed max-w-lg mb-6 sm:mb-8 text-center mx-auto">
              Automate saving, investing, and planning across your US and Indian
              <br className="hidden sm:inline" />{' '}
              accounts, with a wealth manager one tap away.
            </p>
          </RevealItem>

          {/* Mint Green Pill Action Button */}
          <RevealItem delay={0.16}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={openContactModal}
              className="inline-flex items-center justify-center bg-[#A6E6B9] hover:bg-[#91e0a6] text-[#111A13] text-xs sm:text-sm font-medium px-6 py-2.5 rounded-[10px] shadow-sm transition-colors duration-200 cursor-pointer"
            >
              Get started
            </motion.button>
          </RevealItem>
        </StaggerReveal>
      </div>
    </section>
  );
}

export default GoalSection;
