import { lazy, Suspense, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollTiltHero, EASE_OUT_EXPO } from '@/components/motion/MotionSystem';
import { Check, TrendingUp, Shield, RefreshCw } from 'lucide-react';

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
    <ScrollTiltHero className="min-h-screen relative">
      {({ sceneStyle, contentStyle }) => (
        <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden">

          {/* ── Dark puzzle pattern background matching uploaded asset ─────── */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none select-none"
            style={{
              backgroundImage: "url('/models/hero-puzzle-bg.png')",
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
            }}
          />

          {/* ── Spline 3D Scene (3D asset at top) ────────────────── */}
          <motion.div
            style={sceneStyle}
            className="absolute inset-0 z-[2] pointer-events-none"
          >
            <Suspense
              fallback={
                <div className="w-full h-full bg-transparent flex items-center justify-center">
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

          {/* ── Subtle bottom vignette to blend seamlessly into next section ── */}
          <div className="absolute bottom-0 left-0 right-0 h-40 z-[3] pointer-events-none bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/70 to-transparent" />

          {/* ── Hero Main Content Overlay ────────────────────────── */}
          <motion.div
            style={contentStyle}
            className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 pt-32 pb-12 pointer-events-none"
          >
            {/* Center Content Group (Badge + Title + Subtitle + CTA) */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.12,
                    delayChildren: 0.15,
                  },
                },
              }}
              className="flex flex-col items-center text-center max-w-4xl mx-auto"
            >
              {/* Badge Pill: "✓ One cross-border wealth plan." */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
                  },
                }}
                className="mb-4"
              >
                <div className="pointer-events-auto inline-flex items-center gap-2 bg-black/75 backdrop-blur-md border border-white/20 text-white/95 text-xs md:text-sm font-medium px-4 py-1.5 rounded-full shadow-lg">
                  <Check className="w-3.5 h-3.5 text-white/80" strokeWidth={2.5} />
                  <span>One cross-border wealth plan.</span>
                </div>
              </motion.div>

              {/* Headline: "Your Wealth Connected" */}
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 35, scale: 0.96 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.95, ease: EASE_OUT_EXPO },
                  },
                }}
                className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-medium leading-[1.05] tracking-tight text-center mb-5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
                style={{ letterSpacing: '-0.035em' }}
              >
                Your Wealth Connected
              </motion.h1>

              {/* Subtitle Description */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.85, ease: EASE_OUT_EXPO },
                  },
                }}
                className="text-white/85 text-sm sm:text-base md:text-[17px] text-center max-w-xl leading-relaxed mb-7 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]"
              >
                Built to automate your US and Indian finances, simplify every decision,
                and keep your money working in sync.
              </motion.p>

              {/* CTA Button */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 18, scale: 0.92 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
                  },
                }}
              >
                <button className="pointer-events-auto bg-[#8CF0CE] hover:bg-[#7fe1be] text-black text-sm md:text-base font-medium px-8 py-2.5 rounded-full shadow-xl shadow-[#8CF0CE]/20 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]">
                  Join us
                </button>
              </motion.div>
            </motion.div>

            {/* ── 3 Floating UI Cards Matching Reference ───────────── */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.16,
                    delayChildren: 0.7,
                  },
                },
              }}
              className="w-full max-w-[88rem] mx-auto mt-12 md:mt-16 pointer-events-auto"
            >
              {/* Desktop layout: Left, Center, Right spatial placement */}
              <div className="relative w-full hidden md:block min-h-[220px]">

                {/* Left Card: Goal Progress */}
                <div className="absolute left-4 lg:left-8 top-0 w-[270px] lg:w-[290px]">
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 40, x: -25 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        x: 0,
                        transition: { duration: 0.9, ease: EASE_OUT_EXPO },
                      },
                    }}
                    className="bg-[#131715]/95 backdrop-blur-xl rounded-2xl p-5 border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                  >
                    <div className="flex items-start justify-between mb-1.5">
                      <div>
                        <p className="text-white/50 text-[10px] font-semibold tracking-wider uppercase mb-1">
                          Goal Progress
                        </p>
                        <p className="text-white text-3xl font-medium tracking-tight tabular-nums">
                          185%
                        </p>
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-[#1c2820] flex items-center justify-center text-[#8CF0CE] shadow-sm">
                        <TrendingUp className="w-5 h-5 text-[#8CF0CE]" />
                      </div>
                    </div>
                    <p className="text-[#8CF0CE] text-xs font-normal mb-3">
                      On track of goals
                    </p>
                    <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden relative">
                      <div className="h-full w-[72%] bg-gradient-to-r from-[#5ea578] to-[#8CF0CE] rounded-full" />
                      <div className="absolute left-[70%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-sm" />
                    </div>
                  </motion.div>
                </div>

                {/* Right Card: PFIC Check */}
                <div className="absolute right-4 lg:right-8 top-0 w-[280px] lg:w-[310px]">
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 40, x: 25 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        x: 0,
                        transition: { duration: 0.9, ease: EASE_OUT_EXPO },
                      },
                    }}
                    className="bg-[#131715]/95 backdrop-blur-xl rounded-2xl p-5 border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#1c2820] flex items-center justify-center text-[#8CF0CE] shrink-0 shadow-sm">
                        <Shield className="w-5 h-5 text-[#8CF0CE]" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold mb-1">
                          PFIC check . Clear
                        </p>
                        <p className="text-white/55 text-xs leading-relaxed">
                          Foreign holdings flagged before they become a filing surprise
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Bottom Center Card: Auto-save running - TRULY HORIZONTALLY & CENTRALLY ANCHORED */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-1 w-[290px] lg:w-[330px]">
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 35 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.9, ease: EASE_OUT_EXPO },
                      },
                    }}
                    className="bg-[#131715]/95 backdrop-blur-xl rounded-2xl px-5 py-3.5 border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex items-center gap-3.5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#1c2820] flex items-center justify-center text-[#8CF0CE] shrink-0 shadow-sm">
                      <RefreshCw className="w-5 h-5 text-[#8CF0CE]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold leading-tight">
                        Auto-save running
                      </p>
                      <p className="text-white/50 text-xs mt-0.5">
                        $1,200 moved this month
                      </p>
                    </div>
                    <span className="shrink-0 bg-[#16291e] border border-[#8CF0CE]/30 text-[#8CF0CE] text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-sm">
                      Live
                    </span>
                  </motion.div>
                </div>

              </div>

              {/* Mobile layout: clean stacked responsive cards */}
              <div className="flex flex-col gap-3.5 md:hidden w-full max-w-sm mx-auto">
                {/* Goal Progress */}
                <div className="bg-[#131715]/95 backdrop-blur-xl rounded-2xl p-4 border border-white/[0.08] shadow-xl">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="text-white/50 text-[10px] font-semibold tracking-wider uppercase">
                        Goal Progress
                      </p>
                      <p className="text-white text-2xl font-medium tracking-tight tabular-nums">
                        185%
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-[#1c2820] flex items-center justify-center text-[#8CF0CE]">
                      <TrendingUp className="w-4 h-4 text-[#8CF0CE]" />
                    </div>
                  </div>
                  <p className="text-[#8CF0CE] text-xs font-normal mb-2">
                    On track of goals
                  </p>
                  <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                    <div className="h-full w-[72%] bg-gradient-to-r from-[#5ea578] to-[#8CF0CE] rounded-full" />
                  </div>
                </div>

                {/* PFIC Check */}
                <div className="bg-[#131715]/95 backdrop-blur-xl rounded-2xl p-4 border border-white/[0.08] shadow-xl flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1c2820] flex items-center justify-center text-[#8CF0CE] shrink-0">
                    <Shield className="w-4 h-4 text-[#8CF0CE]" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold mb-0.5">
                      PFIC check . Clear
                    </p>
                    <p className="text-white/55 text-xs leading-relaxed">
                      Foreign holdings flagged before they become a filing surprise
                    </p>
                  </div>
                </div>

                {/* Auto-save */}
                <div className="bg-[#131715]/95 backdrop-blur-xl rounded-2xl px-4 py-3 border border-white/[0.08] shadow-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1c2820] flex items-center justify-center text-[#8CF0CE] shrink-0">
                    <RefreshCw className="w-4 h-4 text-[#8CF0CE]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold leading-tight">
                      Auto-save running
                    </p>
                    <p className="text-white/50 text-xs">
                      $1,200 moved this month
                    </p>
                  </div>
                  <span className="shrink-0 bg-[#16291e] border border-[#8CF0CE]/30 text-[#8CF0CE] text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md">
                    Live
                  </span>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </section>
      )}
    </ScrollTiltHero>
  );
}

export default HeroSection;
