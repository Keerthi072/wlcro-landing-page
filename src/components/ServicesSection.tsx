import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import {
  StaggerReveal,
  RevealItem,
} from '@/components/motion/MotionSystem';

/* ── Bento Video Component with Scroll Trigger & Single Play ─────── */
function BentoVideo({
  src,
  poster,
  loop = false,
  className = '',
  containerClassName = 'w-full flex items-end justify-center',
}: {
  src: string;
  poster?: string;
  loop?: boolean;
  className?: string;
  containerClassName?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playVideo = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {});
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (loop) {
              playVideo();
            } else if (!hasTriggeredRef.current) {
              hasTriggeredRef.current = true;
              video.currentTime = 0;
              playVideo();
            }
          } else {
            if (loop) {
              video.pause();
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [src, loop]);

  return (
    <div ref={containerRef} className={containerClassName}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        playsInline
        preload="auto"
        loop={loop}
        className={className}
        onEnded={(e) => {
          if (!loop) {
            const v = e.currentTarget;
            v.pause();
          }
        }}
      />
    </div>
  );
}

/* ── Main 3rd Section: Bento Feature Showcase ────────────────────── */
function ServicesSection() {
  return (
    <section className="bg-[#0d0d0d] px-4 md:px-6 py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-[84rem] mx-auto">

        {/* ── Section Header ─────────────────────────────────────── */}
        <StaggerReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 lg:mb-16">
          <RevealItem>
            {/* Pill Badge: ✓ Meet Wlcro */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/[0.04] text-xs font-medium text-white/80 mb-5 shadow-sm">
              <Check className="w-3.5 h-3.5 text-[#8CF0CE]" strokeWidth={2.5} />
              <span>Meet Wlcro</span>
            </div>

            {/* Title */}
            <h2
              className="text-white text-4xl sm:text-5xl lg:text-[3.5rem] font-medium leading-[1.08] tracking-tight"
              style={{ letterSpacing: '-0.035em' }}
            >
              Build around the
              <br />
              way you actually
              <br />
              live
            </h2>
          </RevealItem>

          {/* Right Description */}
          <RevealItem delay={0.15}>
            <div className="max-w-md lg:pb-2">
              <p className="text-white/60 text-base md:text-lg leading-relaxed font-light">
                An intelligent cross-border money platform that brings your US and
                Indian finances together — automated, advised, and built around the
                way you live.
              </p>
            </div>
          </RevealItem>
        </StaggerReveal>

        {/* ── 2x2 Asymmetric Bento Grid (Strictly Aligned) ───────── */}
        <StaggerReveal stagger={0.12} className="grid grid-cols-12 gap-6 items-stretch">

          {/* ════════════════════════════════════════════════════════
             Card 1 (Top-Left): Automate (6 cols, 520px height)
             ════════════════════════════════════════════════════════ */}
          <RevealItem className="col-span-12 lg:col-span-6 flex flex-col h-full">
            <div className="relative rounded-[2rem] border border-[#414942] overflow-hidden flex flex-col justify-between h-full min-h-[460px] sm:min-h-[500px] lg:h-[520px] shadow-[0_16px_40px_rgba(0,0,0,0.5)] group transition-all duration-300 hover:border-[#525d54] bg-[#0b1710]">
              {/* Subtle radial glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#8CF0CE]/5 rounded-full blur-3xl pointer-events-none" />

              {/* Header Text */}
              <div className="relative z-10 p-7 md:p-9 pb-2">
                <h3
                  className="text-2xl sm:text-3xl font-medium leading-snug tracking-tight text-white/90"
                  style={{ letterSpacing: '-0.025em' }}
                >
                  <span className="text-[#8CF0CE] font-semibold">Automate</span>{' '}
                  and moves your money
                  <br />
                  at scheduled time bases
                </h3>
              </div>

              {/* Phone Mockup Video (Sized & shrunk to fit completely without top clipping) */}
              <div className="relative z-10 mt-auto w-full flex items-end justify-center overflow-hidden">
                <BentoVideo
                  src="/models/Automate.mp4"
                  poster="/models/Automate-poster.png"
                  loop={false}
                  className="w-full max-w-[420px] sm:max-w-[460px] h-auto max-h-[350px] object-contain object-bottom"
                />
              </div>
            </div>
          </RevealItem>

          {/* ════════════════════════════════════════════════════════
             Card 2 (Top-Right): Track (6 cols, 520px height)
             ════════════════════════════════════════════════════════ */}
          <RevealItem className="col-span-12 lg:col-span-6 flex flex-col h-full">
            <div className="relative rounded-[2rem] border border-[#414942] overflow-hidden flex flex-col justify-between h-full min-h-[460px] sm:min-h-[500px] lg:h-[520px] shadow-[0_16px_40px_rgba(0,0,0,0.5)] group transition-all duration-300 hover:border-[#525d54] bg-black">
              {/* Subtle radial glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#8CF0CE]/5 rounded-full blur-3xl pointer-events-none" />

              {/* Header Text */}
              <div className="relative z-10 p-7 md:p-9 pb-2">
                <h3
                  className="text-2xl sm:text-3xl font-medium leading-snug tracking-tight text-white/90"
                  style={{ letterSpacing: '-0.025em' }}
                >
                  <span className="text-[#8CF0CE] font-semibold">Track</span>{' '}
                  every account at one live
                  <br />
                  picture of where you stand
                </h3>
              </div>

              {/* Circular Gauge Graphic Video (Centered in remaining space) */}
              <div className="relative z-10 flex-1 flex items-center justify-center p-4 pb-8 my-auto">
                <BentoVideo
                  src="/models/Track.mp4"
                  poster="/models/Track-poster.png"
                  loop={true}
                  containerClassName="w-full flex items-center justify-center"
                  className="w-full max-w-[320px] sm:max-w-[360px] h-auto object-contain"
                />
              </div>
            </div>
          </RevealItem>

          {/* ════════════════════════════════════════════════════════
             Card 3 (Bottom-Left): Grow (7 cols, 520px height)
             ════════════════════════════════════════════════════════ */}
          <RevealItem className="col-span-12 lg:col-span-7 flex flex-col h-full">
            <div className="relative rounded-[2rem] border border-[#414942] overflow-hidden flex flex-col justify-between h-full min-h-[460px] sm:min-h-[500px] lg:h-[520px] shadow-[0_16px_40px_rgba(0,0,0,0.5)] group transition-all duration-300 hover:border-[#525d54] bg-black">
              {/* Subtle radial glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#8CF0CE]/5 rounded-full blur-3xl pointer-events-none" />

              {/* Header Text */}
              <div className="relative z-10 p-7 md:p-9 pb-0">
                <h3
                  className="text-2xl sm:text-3xl font-medium leading-snug tracking-tight text-white/90"
                  style={{ letterSpacing: '-0.025em' }}
                >
                  <span className="text-[#8CF0CE] font-semibold">Grow</span>{' '}
                  with compounding on
                  <br />
                  autopilot
                </h3>
              </div>

              {/* Compounding Chart Video (Flush bottom, aligned with Card 4) */}
              <div className="relative z-10 w-full mt-auto flex items-end justify-center overflow-hidden">
                <BentoVideo
                  src="/models/Grow.mp4"
                  poster="/models/Grow-poster.png"
                  loop={false}
                  className="w-full h-auto max-h-[360px] object-contain object-bottom"
                />
              </div>
            </div>
          </RevealItem>

          {/* ════════════════════════════════════════════════════════
             Card 4 (Bottom-Right): Advice (5 cols, 520px height)
             ════════════════════════════════════════════════════════ */}
          <RevealItem className="col-span-12 lg:col-span-5 flex flex-col h-full">
            <div className="relative rounded-[2rem] border border-[#414942] overflow-hidden flex flex-col justify-between h-full min-h-[460px] sm:min-h-[500px] lg:h-[520px] shadow-[0_16px_40px_rgba(0,0,0,0.5)] group transition-all duration-300 hover:border-[#525d54] bg-[#0b1710]">
              {/* Subtle radial glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#8CF0CE]/5 rounded-full blur-3xl pointer-events-none" />

              {/* Header Text */}
              <div className="relative z-10 p-7 md:p-9 pb-2">
                <h3
                  className="text-2xl sm:text-3xl font-medium leading-snug tracking-tight text-white/90"
                  style={{ letterSpacing: '-0.025em' }}
                >
                  <span className="text-[#8CF0CE] font-semibold">Advice</span>{' '}
                  from wealth
                  <br />
                  managers of your choice
                </h3>
              </div>

              {/* Advisors Grid Video (Flush bottom, aligned with Card 3) */}
              <div className="relative z-10 mt-auto w-full flex items-end justify-center overflow-hidden">
                <BentoVideo
                  src="/models/Advice.mp4"
                  poster="/models/Advice-poster.png"
                  loop={false}
                  className="w-full h-auto max-h-[370px] object-cover object-top"
                />
              </div>
            </div>
          </RevealItem>

        </StaggerReveal>

      </div>
    </section>
  );
}

export default ServicesSection;
