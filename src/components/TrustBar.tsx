import { motion } from 'framer-motion';
import { Lock, Folder, Landmark } from 'lucide-react';
import { StaggerReveal, RevealItem } from '@/components/motion/MotionSystem';

/* ── Custom Read-only Eye with Padlock icon ────────────────────── */
function ReadOnlyEyeIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-7.938 5.652" />
      <circle cx="12" cy="12" r="3" />
      <rect x="15" y="14" width="6" height="5" rx="1" />
      <path d="M16.5 14v-1.5a1.5 1.5 0 0 1 3 0V14" />
    </svg>
  );
}

const trustItems = [
  {
    icon: ReadOnlyEyeIcon,
    text: 'Read-only account connections',
  },
  {
    icon: Lock,
    text: '256-bit encrypted end-to-end',
  },
  {
    icon: Folder,
    text: 'PFIC & FBAR flagging',
  },
  {
    icon: Landmark,
    text: 'Wlcro never holds your funds',
  },
];

function TrustBar() {
  return (
    <section className="bg-[#0d0d0d] px-6 py-8 md:py-12 w-full flex items-center justify-center">
      <div className="max-w-6xl mx-auto w-full flex items-center justify-center">
        <StaggerReveal
          stagger={0.08}
          className="flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-10 md:gap-x-12 lg:gap-x-16 gap-y-4 text-center"
        >
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <RevealItem key={index}>
                <div className="flex items-center justify-center gap-2.5 sm:gap-3 text-white/60 hover:text-white/90 transition-colors duration-200 group cursor-default">
                  <span className="text-[#77AB86] group-hover:text-[#8CF0CE] transition-colors duration-200 shrink-0 flex items-center justify-center">
                    <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                  </span>
                  <span className="text-xs sm:text-[13px] md:text-sm font-normal tracking-wide whitespace-nowrap">
                    {item.text}
                  </span>
                </div>
              </RevealItem>
            );
          })}
        </StaggerReveal>
      </div>
    </section>
  );
}

export default TrustBar;
