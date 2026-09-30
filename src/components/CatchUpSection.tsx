import { motion } from 'framer-motion';
import { openContactModal } from '@/components/ContactModal';
import {
  PerspectiveCard,
  StaggerReveal,
  RevealItem,
} from '@/components/motion/MotionSystem';

function CatchUpSection() {
  return (
    <section className="bg-[#0d0d0d] px-4 md:px-6 py-24 md:py-32">
      {/* ── Perspective Card Container with spatial depth ── */}
      <PerspectiveCard
        tiltAngle={6}
        className="relative w-full max-w-[88rem] mx-auto rounded-[2rem] overflow-hidden px-6 py-20 md:py-28 shadow-[0_1px_2px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center text-center"
        style={{ isolation: 'isolate' }}
      >
        {/* ── Mesh gradient background inside container ─────────────── */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            zIndex: 0,
            background: `
              radial-gradient(circle at 85% 15%, #8CF0CE 0%, transparent 55%),
              radial-gradient(circle at 40% 55%, #6BC4C9 0%, transparent 60%),
              radial-gradient(circle at 10% 80%, #4A8FC0 0%, transparent 55%),
              linear-gradient(315deg, #7FEBC4 0%, #5DA9C7 100%)
            `,
          }}
        />

        {/* ── Staggered inner content ──────────────────────────────── */}
        <StaggerReveal
          stagger={0.14}
          className="relative max-w-3xl mx-auto flex flex-col items-center"
          style={{ zIndex: 10 }}
        >
          <RevealItem>
            <h2
              className="text-black text-4xl md:text-6xl lg:text-7xl font-medium leading-none mb-6"
              style={{ letterSpacing: '-0.04em' }}
            >
              Catch Up
            </h2>
          </RevealItem>

          <RevealItem delay={0.1}>
            <p
              className="text-black/80 text-xl md:text-3xl lg:text-4xl font-normal leading-snug max-w-2xl mb-10"
              style={{ letterSpacing: '-0.01em' }}
            >
              Behind on a goal you need to hit soon? Start from a plan a wealth
              manager already built, or get one made around your exact numbers.
            </p>
          </RevealItem>

          <RevealItem delay={0.2}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              onClick={openContactModal}
              className="inline-flex items-center justify-center bg-transparent border border-black/30 text-black text-base font-medium px-7 py-3 rounded-full hover:bg-black hover:text-white hover:border-black transition-colors duration-200 cursor-pointer shadow-sm"
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
