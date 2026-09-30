import { motion } from 'framer-motion';
import { EASE_OUT_EXPO } from '@/components/motion/MotionSystem';

const services = ['Automate', 'Track', 'Advice', 'Grow'];

function ServicesSection() {
  return (
    <section className="bg-[#0d0d0d] px-6 py-24 md:py-32 min-h-screen flex items-center justify-center">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.16,
              delayChildren: 0.1,
            },
          },
        }}
        className="max-w-[1000px] w-full mx-auto text-center flex flex-col items-center justify-center gap-10 md:gap-14 lg:gap-16"
      >
        {services.map((word) => (
          <motion.span
            key={word}
            variants={{
              hidden: { opacity: 0, y: 50, scale: 0.94 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  duration: 0.95,
                  ease: EASE_OUT_EXPO,
                },
              },
            }}
            className="text-white text-6xl md:text-8xl lg:text-[112px] font-medium leading-[1.05] block select-none hover:text-white/80 transition-colors"
            style={{ letterSpacing: '-0.03em' }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}

export default ServicesSection;
