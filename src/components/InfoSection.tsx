import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { StaggerReveal, RevealItem, EASE_OUT_EXPO } from '@/components/motion/MotionSystem';

function InfoSection() {
  return (
    <section className="bg-[#0d0d0d] px-6 py-24">
      <div className="max-w-[88rem] mx-auto">
        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start">
          <RevealItem>
            <h2
              className="text-white text-4xl md:text-5xl font-medium leading-tight mb-8"
              style={{ letterSpacing: '-0.03em' }}
            >
              Meet Wlcro
            </h2>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 bg-white text-black text-base font-medium pl-8 pr-2 py-2 rounded-full hover:bg-white/85 transition-colors duration-200"
            >
              Discover it
              <span className="bg-black rounded-full p-2 hover:bg-black/80 transition-colors duration-200">
                <ArrowRight className="w-5 h-5 text-white" />
              </span>
            </motion.button>
          </RevealItem>

          <RevealItem delay={0.15}>
            <p
              className="text-white/70 text-2xl md:text-3xl leading-relaxed font-light"
              style={{ letterSpacing: '-0.015em' }}
            >
              An intelligent cross-border money platform that brings your US and Indian
              finances together — automated, advised, and built around the way you live.
            </p>
          </RevealItem>
        </StaggerReveal>
      </div>
    </section>
  );
}

export default InfoSection;
