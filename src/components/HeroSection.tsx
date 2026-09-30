import { lazy, Suspense, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollTiltHero, EASE_OUT_EXPO } from '@/components/motion/MotionSystem';

const Spline = lazy(() => import('@splinetool/react-spline'));

function HeroSection() {
  useEffect(() => {
    const removeSplineBadge = () => {
      const badgeLinks = document.querySelectorAll('a[href*="spline.design"], #spline-watermark');
      badgeLinks.forEach((badge) => {
        const parent = badge.parentElement;
        if (parent && parent !== document.body && parent.children.length === 1) {
          parent.remove();
        } else {
          badge.remove();
        }
      });
    };

    removeSplineBadge();
    const interval = setInterval(removeSplineBadge, 400);
    const timeout = setTimeout(() => clearInterval(interval), 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const handleSplineLoad = (splineApp: any) => {
    try {
      const pipeline = splineApp?._renderer?.pipeline;
      if (pipeline) {
        if (typeof pipeline.setWatermark === 'function') {
          pipeline.setWatermark(null);
          pipeline.setWatermark = () => {};
        }
        if (pipeline.logoOverlayPass) {
          pipeline.logoOverlayPass.enabled = false;
          pipeline.logoOverlayPass.render = () => {};
          if (pipeline.logoOverlayPass.texture) {
            pipeline.logoOverlayPass.texture = null;
          }
        }
        if (pipeline.uiOverlayPass) {
          pipeline.uiOverlayPass.enabled = false;
        }
      }
      splineApp?.requestRender?.();
      if (typeof splineApp?._requestRenderAutoMode === 'function') {
        splineApp._requestRenderAutoMode();
      }
    } catch (err) {
      console.warn('Could not disable watermark:', err);
    }
  };

  return (
    <ScrollTiltHero className="h-screen">
      {({ sceneStyle, contentStyle }) => (
        <section className="relative w-full h-full overflow-hidden">
          {/* Spline 3D Scene with scroll-driven scaling & 3D tilt */}
          <motion.div
            style={sceneStyle}
            className="absolute inset-0 z-0"
          >
            <Suspense
              fallback={
                <div className="w-full h-full bg-[#0d0d0d] flex items-center justify-center">
                  <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
              }
            >
              <Spline
                scene="https://prod.spline.design/uPWuoyQWbOWBFSsj/scene.splinecode"
                onLoad={handleSplineLoad}
                style={{ width: '100%', height: '100%' }}
              />
            </Suspense>
          </motion.div>

          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/30" />

          {/* Hero content overlay with parallax depth & staggered entrance */}
          <motion.div
            style={contentStyle}
            className="relative z-10 flex flex-col items-center justify-end h-full px-6 pb-16 md:pb-20 pointer-events-none"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.14,
                    delayChildren: 0.2,
                  },
                },
              }}
              className="flex flex-col items-center text-center"
            >
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.96 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 1, ease: EASE_OUT_EXPO },
                  },
                }}
                className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-medium leading-tight text-center mb-5"
                style={{ letterSpacing: '-0.03em' }}
              >
                Your Wealth Connected
              </motion.h1>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
                  },
                }}
                className="text-white text-sm md:text-base font-semibold text-center mb-3"
              >
                An intelligent cross-border wealth plan.
              </motion.p>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
                  },
                }}
                className="text-white/50 text-xs md:text-sm text-center max-w-md leading-relaxed mb-8"
              >
                Built to automate your US and Indian finances, simplify every decision, and
                keep your money working in sync.
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.9 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
                  },
                }}
              >
                <button className="pointer-events-auto bg-white text-black text-sm md:text-base font-medium px-10 py-3 rounded-full hover:bg-white/85 transition-colors duration-200 shadow-xl">
                  Join us
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
      )}
    </ScrollTiltHero>
  );
}

export default HeroSection;
