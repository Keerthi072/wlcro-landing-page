import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  Variants,
  HTMLMotionProps,
} from 'framer-motion';

/* ── Motion Curves (mimicking Melius / Apple acceleration & deceleration) ── */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;

/* ══════════════════════════════════════════════════════════════════════════
   1. Stagger Container & Items (Fluid Entrance System)
   ══════════════════════════════════════════════════════════════════════════ */
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom = {}) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.stagger ?? 0.12,
      delayChildren: custom.delay ?? 0.1,
    },
  }),
};

export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 35, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.85,
      ease: EASE_OUT_EXPO,
    },
  },
};

export const fadeInScaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: EASE_OUT_EXPO,
    },
  },
};

interface RevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  stagger?: number;
  className?: string;
  viewportMargin?: string;
}

export function StaggerReveal({
  children,
  delay = 0.1,
  stagger = 0.12,
  className = '',
  viewportMargin = '-80px',
  ...props
}: RevealProps) {
  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: viewportMargin }}
      custom={{ delay, stagger }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = '',
  ...props
}: HTMLMotionProps<'div'> & { children: React.ReactNode }) {
  return (
    <motion.div variants={fadeInUpVariants} className={className} {...props}>
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   2. Perspective Card (Spatial Depth & Scroll Acceleration Entrance)
   ══════════════════════════════════════════════════════════════════════════ */
interface PerspectiveCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  tiltAngle?: number;
  className?: string;
  delay?: number;
  viewportMargin?: string;
}

export function PerspectiveCard({
  children,
  tiltAngle = 10,
  className = '',
  delay = 0,
  viewportMargin = '-100px',
  ...props
}: PerspectiveCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 60,
        scale: 0.94,
        rotateX: tiltAngle,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
      }}
      viewport={{ once: true, margin: viewportMargin }}
      transition={{
        duration: 1.05,
        delay,
        ease: EASE_OUT_EXPO,
      }}
      style={{
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   3. ScrollTiltHero (Subtle Spatial Zoom & 3D Tilt for Hero Assets)
   ══════════════════════════════════════════════════════════════════════════ */
interface ScrollTiltHeroProps {
  children: (props: {
    sceneStyle: React.CSSProperties;
    contentStyle: React.CSSProperties;
  }) => React.ReactNode;
  className?: string;
}

export function ScrollTiltHero({ children, className = '' }: ScrollTiltHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth scroll spring physics (eliminates wheel scroll jitter)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.8,
    restDelta: 0.001,
  });

  // 3D Tilt & Scale for main 3D scene (spatial depth recession)
  const sceneScale = useTransform(smoothProgress, [0, 1], [1, 0.88]);
  const sceneRotateX = useTransform(smoothProgress, [0, 1], [0, 12]);
  const sceneY = useTransform(smoothProgress, [0, 1], [0, 120]);
  const sceneOpacity = useTransform(smoothProgress, [0, 0.85, 1], [1, 0.8, 0.3]);

  // Foreground text parallax separation
  const contentY = useTransform(smoothProgress, [0, 1], [0, -100]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.65], [1, 0]);
  const contentScale = useTransform(smoothProgress, [0, 1], [1, 0.94]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ perspective: 1400 }}
    >
      {children({
        sceneStyle: {
          scale: sceneScale as unknown as number,
          rotateX: sceneRotateX as unknown as number,
          y: sceneY as unknown as number,
          opacity: sceneOpacity as unknown as number,
          transformOrigin: 'center center',
          transformStyle: 'preserve-3d',
        },
        contentStyle: {
          y: contentY as unknown as number,
          opacity: contentOpacity as unknown as number,
          scale: contentScale as unknown as number,
          transformOrigin: 'center bottom',
        },
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   4. ScrollScale3D (Continuous Scroll-linked Zoom & Floating Elevation)
   ══════════════════════════════════════════════════════════════════════════ */
export function ScrollScale3D({
  children,
  className = '',
  scaleRange = [0.88, 1.05],
  rotateRange = [-6, 6],
}: {
  children: React.ReactNode;
  className?: string;
  scaleRange?: [number, number];
  rotateRange?: [number, number];
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const scale = useTransform(smooth, [0, 0.5, 1], [scaleRange[0], 1, scaleRange[1]]);
  const rotate = useTransform(smooth, [0, 1], [rotateRange[0], rotateRange[1]]);
  const y = useTransform(smooth, [0, 1], [50, -50]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        rotateZ: rotate,
        y,
        transformPerspective: 1000,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
