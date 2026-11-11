import { useEffect, useRef } from 'react';
import {
  StaggerReveal,
  RevealItem,
} from '@/components/motion/MotionSystem';

function AIAssistantSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative w-full py-20 md:py-28 px-4 md:px-6 overflow-hidden bg-[#0d0d0d]"
      style={{
        backgroundImage: 'url(/models/ai-assistant-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Subtle top and bottom gradient fades to blend seamlessly */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 md:h-32 bg-gradient-to-b from-[#0d0d0d] to-transparent z-[1]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 md:h-32 bg-gradient-to-t from-[#0d0d0d] to-transparent z-[1]" />

      {/* Subtle specular glow in center to mirror the reference lighting */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_48%_45%,rgba(255,255,255,0.06),transparent_70%)] z-[1]" />

      <div className="relative z-10 max-w-[84rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading and Subtitle */}
          <div className="lg:col-span-7 flex flex-col items-start justify-center text-left">
            <StaggerReveal stagger={0.12} className="max-w-xl">
              <RevealItem>
                <h2
                  className="text-white text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-medium leading-[1.08] mb-6 md:mb-8"
                  style={{ letterSpacing: '-0.035em' }}
                >
                  Ask, and Wlcro makes
                  <br />
                  it happen.
                </h2>
              </RevealItem>

              <RevealItem delay={0.08}>
                <p className="text-white/70 text-base sm:text-lg md:text-[18px] leading-relaxed max-w-lg font-normal">
                  Your AI assistant is on call &mdash; ask a question, get a plan,
                  or get handed to a real cross-border advisor the moment it&apos;s
                  complex.
                </p>
              </RevealItem>
            </StaggerReveal>
          </div>

          {/* Right Column: Animated Wlcro Mobile Mockup */}
          <div
            ref={containerRef}
            className="lg:col-span-5 flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px] lg:max-w-[420px] drop-shadow-[0_24px_60px_rgba(0,0,0,0.65)]">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster="/models/Wlcro-mobile-mockup-poster.png"
                className="w-full h-auto object-contain block"
              >
                <source src="/models/Wlcro-mobile-mockup.webm" type="video/webm" />
                <source src="/models/Wlcro mobile mockup.webm" type="video/webm" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AIAssistantSection;
