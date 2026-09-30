import { motion } from 'framer-motion';
import { openContactModal } from '@/components/ContactModal';
import {
  StaggerReveal,
  RevealItem,
  EASE_OUT_EXPO,
} from '@/components/motion/MotionSystem';

const footerColumns = [
  {
    title: 'About us',
    links: ['Our company'],
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms of Use'],
  },
  {
    title: 'Product',
    links: ['Autopilot', 'Advisors', 'Finmap'],
  },
  {
    title: 'Social',
    links: ['Instagram', 'LinkedIn'],
  },
  {
    title: 'Support',
    links: ['Contact us', 'Help Center'],
  },
];

function FooterSection() {
  return (
    <footer className="w-full bg-transparent overflow-hidden">
      <div className="max-w-[88rem] mx-auto px-6 md:px-12 lg:px-16">

        {/* ── Link columns with staggered entrance ───────────────────────── */}
        <StaggerReveal
          stagger={0.08}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-8 gap-y-10 pt-20 pb-16 md:pt-24 md:pb-20"
        >
          {footerColumns.map((col) => (
            <RevealItem key={col.title}>
              <p className="text-white text-sm font-semibold mb-4">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href={link === 'Contact us' ? '#contact' : '#'}
                      onClick={(e) => {
                        if (link === 'Contact us') {
                          e.preventDefault();
                          openContactModal();
                        }
                      }}
                      className="text-white/60 text-sm font-medium hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </StaggerReveal>

        {/* ── Giant wordmark (right-aligned with smooth entrance) ──── */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.05, ease: EASE_OUT_EXPO }}
          className="pb-10 md:pb-14 text-right"
        >
          <h2
            className="text-white text-[clamp(4rem,15vw,12rem)] font-semibold leading-[0.85] tracking-tighter select-none text-right"
          >
            Wlcro
          </h2>
        </motion.div>

        {/* ── Divider ─────────────────────────────────────────── */}
        <div className="w-full h-px bg-white/10" />

        {/* ── Bottom bar ──────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-6 md:py-8">
          <div className="text-white/45 text-xs md:text-[13px] leading-relaxed max-w-2xl">
            <p>© {new Date().getFullYear()} Wlcro Technologies Inc. All Rights Reserved.</p>
            <p className="mt-1">
              By using this website, you accept our{' '}
              <a href="#" className="underline hover:text-white transition-colors duration-200">Terms of Use</a>
              {' '}and{' '}
              <a href="#" className="underline hover:text-white transition-colors duration-200">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
