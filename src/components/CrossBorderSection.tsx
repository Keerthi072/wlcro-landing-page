import { useRef, useEffect, useCallback } from 'react';
import OrbitIcon from '@/components/OrbitIcon';
import LiquidCanvas from '@/components/LiquidCanvas';

/* ── Shared text content (rendered twice: dim + bright) ─────────── */
function SectionContent({ dim = false }: { dim?: boolean }) {
  return (
    <div className="max-w-5xl">
      <OrbitIcon
        className={`w-16 h-16 md:w-20 md:h-20 mb-8 md:mb-10 transition-colors duration-700 ${
          dim ? 'text-white/[0.12]' : 'text-white'
        }`}
      />
      <h2
        className={`text-6xl md:text-8xl lg:text-[7.25rem] font-medium leading-[0.98] mb-10 max-w-5xl ${
          dim ? 'text-white/[0.12]' : 'text-white'
        }`}
        style={{ letterSpacing: '-0.04em' }}
      >
        Welcome to the future of
        <br />
        cross-border money.
      </h2>
      <p
        className={`text-xl md:text-2xl lg:text-[1.75rem] leading-[1.45] max-w-3xl mb-12 ${
          dim ? 'text-white/[0.08]' : 'text-white/70'
        }`}
      >
        Why are we here? Because two tax systems were never built to talk to each other.
        Wlcro connects your US and Indian finances into a single automated plan — so you save
        more, avoid the PFIC and FBAR surprises, and stop reconciling two spreadsheets by hand.
      </p>
      <p
        className={`text-sm md:text-base leading-relaxed max-w-3xl ${
          dim ? 'text-white/[0.06]' : 'text-white/40'
        }`}
        style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
      >
        Wlcro is a financial orchestration platform. It is not a bank, broker, or lender, and
        does not hold customer funds.
      </p>
    </div>
  );
}

/* ── Main Section ───────────────────────────────────────────────── */
function CrossBorderSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const brightRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  // Raw mouse position (immediate) & smoothed position (lerped)
  const rawPos = useRef({ x: -9999, y: -9999 });
  const smoothPos = useRef({ x: -9999, y: -9999 });
  const isActive = useRef(false);

  /* ── Lerp animation loop ──────────────────────────────────────── */
  const tick = useCallback(() => {
    const lerpFactor = 0.12;
    const sp = smoothPos.current;
    const rp = rawPos.current;

    sp.x += (rp.x - sp.x) * lerpFactor;
    sp.y += (rp.y - sp.y) * lerpFactor;

    const xPx = `${sp.x}px`;
    const yPx = `${sp.y}px`;

    // Update the mask position on the bright layer
    if (brightRef.current) {
      brightRef.current.style.setProperty('--spot-x', xPx);
      brightRef.current.style.setProperty('--spot-y', yPx);
    }

    // Update the cursor glow position
    if (glowRef.current) {
      glowRef.current.style.left = xPx;
      glowRef.current.style.top = yPx;
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    rafRef.current = requestAnimationFrame(tick);

    /* ── Pointer tracking (mouse + touch) ───────────────────────── */
    const updatePosition = (clientX: number, clientY: number) => {
      const rect = section.getBoundingClientRect();
      rawPos.current.x = clientX - rect.left;
      rawPos.current.y = clientY - rect.top;

      // First entry — snap instantly so there's no lag
      if (!isActive.current) {
        smoothPos.current.x = rawPos.current.x;
        smoothPos.current.y = rawPos.current.y;
        isActive.current = true;
      }
    };

    const onMouseMove = (e: MouseEvent) => updatePosition(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onMouseLeave = () => {
      isActive.current = false;
      rawPos.current.x = -9999;
      rawPos.current.y = -9999;
    };

    section.addEventListener('mousemove', onMouseMove);
    section.addEventListener('touchmove', onTouchMove, { passive: true });
    section.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      section.removeEventListener('mousemove', onMouseMove);
      section.removeEventListener('touchmove', onTouchMove);
      section.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [tick]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0d0d0d] px-6 py-28 md:py-36 overflow-hidden cursor-none"
    >
      {/* Liquid distortion background */}
      <div className="absolute inset-0 z-0 opacity-70">
        <LiquidCanvas className="w-full h-full" />
      </div>

      {/* ── Dim layer (barely visible, always shown) ────────────── */}
      <div className="relative z-10 max-w-[88rem] mx-auto select-none">
        <SectionContent dim />
      </div>

      {/* ── Bright layer (spotlight-masked, follows cursor) ──────── */}
      <div
        ref={brightRef}
        className="absolute inset-0 z-20 px-6 py-28 md:py-36 pointer-events-none select-none"
        style={{
          '--spot-x': '-9999px',
          '--spot-y': '-9999px',
          WebkitMaskImage:
            'radial-gradient(circle 420px at var(--spot-x) var(--spot-y), rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0) 100%)',
          maskImage:
            'radial-gradient(circle 420px at var(--spot-x) var(--spot-y), rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0) 100%)',
        } as React.CSSProperties}
      >
        <div className="max-w-[88rem] mx-auto">
          <SectionContent />
        </div>
      </div>

      {/* ── Custom cursor glow dot & ambient illumination halo ────── */}
      <div
        ref={glowRef}
        className="absolute z-30 pointer-events-none hidden md:block"
        style={{
          left: '-9999px',
          top: '-9999px',
          width: '450px',
          height: '450px',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.03) 60%, rgba(255,255,255,0) 75%)',
          filter: 'blur(20px)',
          mixBlendMode: 'screen',
        }}
      />
    </section>
  );
}

export default CrossBorderSection;
