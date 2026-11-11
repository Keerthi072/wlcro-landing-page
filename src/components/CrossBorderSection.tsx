import { StaggerReveal, RevealItem } from '@/components/motion/MotionSystem';

/* ── Overlapping Rounded Squares Brand Icon ─────────────────────── */
function OverlappingSquaresIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bottom-left outlined square */}
      <rect
        x="3"
        y="12"
        width="22"
        height="22"
        rx="6"
        stroke="#78C09B"
        strokeWidth="2.75"
      />
      {/* Top-right solid rounded square */}
      <rect
        x="13"
        y="3"
        width="22"
        height="22"
        rx="6"
        fill="#78C09B"
      />
    </svg>
  );
}

/* ── CrossBorderSection: "Welcome to the future of cross-border money" ── */
function CrossBorderSection() {
  return (
    <section className="relative bg-[#0d0d0d] px-4 md:px-6 py-20 md:py-28 overflow-hidden flex items-center justify-center">
      {/* ── User Uploaded Background Image ──────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/models/cross-border-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* ── Top and Bottom Soft Vignette Blend to page ──────────── */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0d0d0d] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0d0d0d] to-transparent pointer-events-none" />

      {/* ── Content Container ─────────────────────────────────────── */}
      <div className="relative z-10 max-w-[84rem] w-full mx-auto">
        <StaggerReveal stagger={0.12} className="max-w-4xl">
          {/* Overlapping Squares Icon */}
          <RevealItem>
            <div className="mb-6 md:mb-8">
              <OverlappingSquaresIcon className="w-10 h-10 md:w-11 md:h-11 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" />
            </div>
          </RevealItem>

          {/* Headline */}
          <RevealItem delay={0.06}>
            <h2
              className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-medium leading-[1.08] tracking-tight mb-6 md:mb-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]"
              style={{ letterSpacing: '-0.035em' }}
            >
              Welcome to the future of
              <br />
              cross-border money.
            </h2>
          </RevealItem>

          {/* Description Paragraph */}
          <RevealItem delay={0.12}>
            <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-normal drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
              Why are we here? Because two tax systems were never built to talk to
              each other. Wlcro connects your US and Indian finances into a single
              automated plan — so you save more, avoid the PFIC and FBAR surprises,
              and stop reconciling two spreadsheets by hand.
            </p>
          </RevealItem>
        </StaggerReveal>
      </div>
    </section>
  );
}

export default CrossBorderSection;
