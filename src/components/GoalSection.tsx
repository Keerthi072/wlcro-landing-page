import { motion } from 'framer-motion';
import {
  StaggerReveal,
  RevealItem,
  ScrollScale3D,
} from '@/components/motion/MotionSystem';

function GoalSection() {
  return (
    <section className="bg-[#0d0d0d] px-6 py-24 overflow-hidden" style={{ background: 'none' }}>
      {/* ── Container matching 4th section (SecuritySection) shape, border-radius, and size ── */}
      <div className="relative w-full max-w-[88rem] mx-auto rounded-[2rem] overflow-hidden p-8 md:p-16">
        {/* ── Text + CTA with fluid staggered entrance ──────────────────────── */}
        <StaggerReveal className="flex flex-col items-center text-center">
          {/* Title font size matching 5th section (CrossBorderSection) */}
          <RevealItem>
            <h2
              className="text-white text-6xl md:text-8xl lg:text-[7.25rem] font-medium leading-[0.98] max-w-5xl mb-8 md:mb-10 text-center mx-auto"
              style={{ letterSpacing: '-0.04em' }}
            >
              Set the goal.
              <br />
              Wlcro moves the money.
            </h2>
          </RevealItem>

          {/* Tagline description matching hierarchy */}
          <RevealItem delay={0.12}>
            <p className="text-white/70 text-xl md:text-2xl lg:text-[1.75rem] leading-[1.45] max-w-3xl mb-10 md:mb-12 text-center mx-auto">
              Automate saving, investing, and planning across your US and Indian
              accounts, with a wealth manager one tap away.
            </p>
          </RevealItem>

          <RevealItem delay={0.24}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="border border-white/20 text-white text-sm md:text-base font-medium px-8 py-3 rounded-full hover:bg-white hover:text-black transition-colors duration-200 shadow-xl"
            >
              Get started
            </motion.button>
          </RevealItem>
        </StaggerReveal>

        {/* ── 3D Spinning Gold Coin with spatial depth & 152px space ───────────── */}
        <div
          className="relative w-full flex items-center justify-center mt-[152px]"
          style={{ height: '50vh', minHeight: '360px' }}
        >
          <ScrollScale3D
            scaleRange={[0.88, 1.06]}
            rotateRange={[-3, 3]}
            className="w-full h-full flex items-center justify-center"
          >
            <model-viewer
              src="/models/Golden coin.glb"
              auto-rotate
              auto-rotate-delay="0"
              rotation-per-second="30deg"
              camera-orbit="0deg 75deg 105%"
              field-of-view="30deg"
              camera-controls="false"
              disable-zoom
              interaction-prompt="none"
              shadow-intensity="0"
              exposure="1.0"
              environment-image="neutral"
              aria-label="Spinning golden coin — Wlcro"
              style={{
                width: '100%',
                height: '100%',
                background: 'transparent',
              }}
            />
          </ScrollScale3D>
        </div>
      </div>
    </section>
  );
}

export default GoalSection;
