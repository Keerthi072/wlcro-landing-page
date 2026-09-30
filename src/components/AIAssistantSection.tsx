import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  PerspectiveCard,
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
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay policy fallback
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-black px-6 py-24 md:py-32 overflow-hidden">
      <div className="max-w-[88rem] mx-auto flex flex-col items-center text-center">
        <StaggerReveal className="flex flex-col items-center text-center mb-14 md:mb-16">
          <RevealItem>
            <h2
              className="text-white text-4xl md:text-6xl font-medium leading-tight mb-6 max-w-3xl"
              style={{ letterSpacing: '-0.04em' }}
            >
              Ask, and Wlcro makes it happen.
            </h2>
          </RevealItem>
          <RevealItem delay={0.1}>
            <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl mb-8">
              Your AI assistant is on call — ask a question, get a plan, or get handed to a real
              cross-border advisor the moment it&apos;s complex.
            </p>
          </RevealItem>
          <RevealItem delay={0.2}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center bg-white text-black text-base font-medium px-7 py-2.5 rounded-full hover:bg-gray-200 transition-colors duration-200 shadow-xl"
            >
              Learn more
            </motion.button>
          </RevealItem>
        </StaggerReveal>

        {/* 3D Perspective Tilt Card for Video Mockup (matches Melius video mechanics) */}
        <PerspectiveCard
          tiltAngle={10}
          viewportMargin="-80px"
          className="relative w-full max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.8)] border border-white/10 bg-neutral-900/50"
        >
          <div ref={containerRef}>
            <video
              ref={videoRef}
              src="/models/Ai-demo-video.mp4"
              loop
              muted
              playsInline
              className="w-full h-auto max-h-[750px] object-cover mx-auto rounded-3xl"
            />
          </div>
        </PerspectiveCard>
      </div>
    </section>
  );
}

export default AIAssistantSection;
