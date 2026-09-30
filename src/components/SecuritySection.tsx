import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  PerspectiveCard,
  StaggerReveal,
  RevealItem,
  ScrollScale3D,
} from '@/components/motion/MotionSystem';

function SecuritySection() {
  return (
    <section className="bg-[#0d0d0d] px-4 md:px-6 py-24">
      <PerspectiveCard
        tiltAngle={7}
        className="relative w-full max-w-[88rem] mx-auto rounded-[2rem] bg-[#F7F7F7] overflow-hidden p-8 md:p-16 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <StaggerReveal stagger={0.1}>
            <RevealItem>
              <p className="text-black/55 text-sm mb-2 font-medium">Built-in Protection</p>
            </RevealItem>
            <RevealItem>
              <h2
                className="text-black text-4xl md:text-5xl font-medium leading-tight mb-6"
                style={{ letterSpacing: '-0.03em' }}
              >
                Your money&apos;s
                <br />
                safe space
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="text-black/70 text-base md:text-lg leading-relaxed max-w-md mb-8">
                Every account connection is read-only and encrypted end-to-end. Wlcro can orchestrate
                your money, but it can never hold it. Foreign holdings are flagged for PFIC exposure
                before they become a filing surprise.
              </p>
            </RevealItem>
            <RevealItem>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 bg-black text-white text-base font-medium pl-7 pr-2 py-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
              >
                Learn more
                <span className="bg-white rounded-full p-2 hover:bg-gray-100 transition-colors duration-200">
                  <ArrowRight className="w-5 h-5 text-black" />
                </span>
              </motion.button>
            </RevealItem>
          </StaggerReveal>

          <div className="relative flex items-center justify-center min-h-[280px] md:min-h-[360px]">
            <ScrollScale3D scaleRange={[0.92, 1.04]} rotateRange={[-4, 4]}>
              <motion.img
                src="/models/Wlcro_Gold_Coin.webp"
                alt="Wlcro wealth coin"
                className="w-64 h-64 md:w-80 md:h-80 lg:w-[26rem] lg:h-[26rem] object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.2)]"
              />
            </ScrollScale3D>
          </div>
        </div>
      </PerspectiveCard>
    </section>
  );
}

export default SecuritySection;
