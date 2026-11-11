import { motion } from 'framer-motion';
import {
  PerspectiveCard,
  StaggerReveal,
  RevealItem,
  ScrollScale3D,
} from '@/components/motion/MotionSystem';

function ReadOnlyIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 12s3.5-6.5 10-6.5 10 6.5 10 6.5-1.5 2.8-3.8 4.7" />
      <circle cx="12" cy="12" r="3" />
      <rect x="14" y="14" width="7" height="6.5" rx="1.5" strokeWidth="1.8" />
      <path d="M16 14v-2a1.5 1.5 0 0 1 3 0v2" strokeWidth="1.8" />
    </svg>
  );
}

function BankLockIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      <circle cx="12" cy="16" r="1.2" fill="currentColor" />
    </svg>
  );
}

function FileFlagIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="13" y2="17" />
    </svg>
  );
}

function ShieldQuarterIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 2.5v19" strokeWidth="1.5" />
      <path d="M4.5 11.5h15" strokeWidth="1.5" />
      <path d="M12 2.5L19.5 5.2v6.3H12V2.5z" fill="currentColor" stroke="none" />
      <path d="M4.5 11.5c0 5.2 6.2 8.7 7.5 9.7V11.5H4.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

const securityFeatures = [
  {
    icon: ReadOnlyIcon,
    text: 'Every account connection is read-only and encrypted end-to-end. Wlcro can orchestrate never transact.',
  },
  {
    icon: BankLockIcon,
    text: 'Encrypted end-to-end with bank grade key management.',
  },
  {
    icon: FileFlagIcon,
    text: 'Foreign holdings are flagged for PFIC exposure before they become a filing surprise.',
  },
  {
    icon: ShieldQuarterIcon,
    text: 'Financial orchestration platform - not a bank, broker, or lender.',
  },
];

function SecuritySection() {
  return (
    <section className="bg-[#0d0d0d] px-4 md:px-6 py-20 md:py-28">
      <PerspectiveCard
        tiltAngle={4}
        className="relative w-full max-w-[84rem] mx-auto rounded-[2rem] md:rounded-[2.5rem] bg-[#DFE4DD] overflow-hidden p-8 sm:p-12 md:p-14 lg:p-16 shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Left Column: Heading & 4 Feature Items */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <StaggerReveal stagger={0.08}>
              <RevealItem>
                <p className="text-[#356B4A] text-sm md:text-base font-medium mb-3 tracking-normal">
                  Built-in Protection
                </p>
              </RevealItem>

              <RevealItem>
                <h2
                  className="text-[#181D19] text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-medium leading-[1.1] mb-8 md:mb-10"
                  style={{ letterSpacing: '-0.035em' }}
                >
                  Your money&apos;s safe
                  <br />
                  space
                </h2>
              </RevealItem>

              <RevealItem>
                <ul className="space-y-4 md:space-y-5 max-w-xl">
                  {securityFeatures.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <li key={idx} className="flex items-start gap-3.5 md:gap-4">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#D1E8D5] flex items-center justify-center shrink-0 mt-0.5">
                          <IconComponent className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#181D19]" />
                        </div>
                        <p className="text-[#3B443D] text-xs sm:text-sm md:text-[15px] leading-relaxed pt-0.5">
                          {item.text}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </RevealItem>
            </StaggerReveal>
          </div>

          {/* Right Column: Centered Wlcro Gold Coin */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-center py-4 sm:py-6">
            <ScrollScale3D scaleRange={[0.95, 1.05]} rotateRange={[-3, 3]}>
              <motion.img
                src="/models/Wlcro_Gold_Coin.webp"
                alt="Wlcro wealth coin"
                className="w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-[320px] lg:h-[320px] xl:w-[350px] xl:h-[350px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)]"
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </ScrollScale3D>
          </div>
        </div>
      </PerspectiveCard>
    </section>
  );
}

export default SecuritySection;
