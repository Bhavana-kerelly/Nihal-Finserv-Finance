"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import { useRef, useCallback } from "react";

export default function Content() {
  const ref = useRef(null);

  // scroll progress, reveal
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const sectionY = useTransform(scrollYProgress, [0, 0.15], [32, 0]);
  // const sectionSkew = useTransform(scrollYProgress, [0, 1], [0, -4]); // <- causes visual misalignment

  // cursor light beam
  const spotX = useMotionValue(-9999);
  const spotY = useMotionValue(-9999);
  const beamRotate = useMotionValue(0);
  const smoothX = useSpring(spotX, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(spotY, { stiffness: 120, damping: 20 });

  const onMove = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spotX.set(x);
      spotY.set(y);
      beamRotate.set(((x / rect.width) - 0.5) * 12);
    },
    [spotX, spotY, beamRotate]
  );

  const onLeave = useCallback(() => {
    spotX.set(-9999);
    spotY.set(-9999);
  }, [spotX, spotY]);

  // top progress bar
  const barScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.section
      ref={ref}
      className="relative min-h-[80vh] w-full overflow-hidden py-32 md:py-40 px-0" // FIX: full width + min height
      style={{
        opacity: sectionOpacity,
        y: sectionY,
        // skewY: sectionSkew, // FIX: comment out to avoid misalignment
      }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {/* progress bar */}
      <motion.div
        className="pointer-events-none absolute left-0 top-0 h-0.5 w-full origin-left bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-600 z-50"
        style={{ scaleX: barScaleX }}
      />

      {/* ========= BACKGROUND LAYERS (unchanged look, just ensure full cover) ========= */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-30"
        animate={{ rotate: [0, 2, -2, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(60% 80% at 10% 10%, rgba(56,189,248,0.20) 0%, rgba(56,189,248,0) 100%), radial-gradient(70% 70% at 90% 0%, rgba(147,51,234,0.18) 0%, rgba(147,51,234,0) 100%), radial-gradient(60% 80% at 50% 100%, rgba(236,72,153,0.16) 0%, rgba(236,72,153,0) 100%), linear-gradient(120deg, #ffffff 0%, #f8fafc 100%)",
        }}
      />

      <div
        aria-hidden
        className="absolute inset-0 -z-20 opacity-[0.04] [background-image:linear-gradient(120deg,#000_1px,transparent_1px)] [background-size:16px_16px]"
      />

      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.06] [background-image:radial-gradient(circle_at_center,rgba(0,0,0,0.6)_1px,transparent_1.5px)] [background-size:18px_18px]"
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[-15%] -z-10 h-[32rem] w-[32rem] rounded-full"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "conic-gradient(from 0deg, rgba(59,130,246,0.15), rgba(236,72,153,0.15), rgba(147,51,234,0.15), rgba(59,130,246,0.15))",
          filter: "blur(80px)",
        }}
      />

      {/* Cursor beam */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-[420px] w-[180px] -translate-x-1/2 -translate-y-1/2 rotate-12 rounded-full blur-3xl"
        style={{
          x: smoothX,
          y: smoothY,
          rotate: beamRotate,
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.20), rgba(255,255,255,0) 70%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* ========= CONTENT ========= */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8"> {/* FIX: center & pad */}
        <div className="space-y-4">
          <Parallax translateY={[-35, 25]} opacity={[0.3, 1]} scale={[0.95, 1]}>
            <motion.h2
              className="text-5xl md:text-7xl font-extrabold tracking-tight
                         bg-clip-text text-transparent
                         bg-[linear-gradient(90deg,#0ea5e9,45%,#6366f1,55%,#ec4899)]
                         bg-[length:200%_100%] animate-[heroShimmer_7s_linear_infinite]"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              Nihal Finserv
            </motion.h2>
          </Parallax>

          <Parallax translateY={[20, -20]} rotate={[0, -1]}>
            <motion.p
              className="text-2xl md:text-3xl font-serif text-slate-900/90"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Where Ambition Meets Intelligent Finance
            </motion.p>
          </Parallax>
        </div>

        <motion.p
          className="mt-6 text-base md:text-lg  text-gray-600 leading-relaxed max-w-3xl font-serif"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          We empower businesses, professionals, and individuals with transparent,
          high-performance financial solutions.{" "}
          <span className="relative inline-block text-indigo-700 font-serif">
            Let’s grow with confidence
            <motion.span
              className="absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-indigo-600 to-pink-600"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
              style={{ transformOrigin: "left center" }}
            />
          </span>
          .
        </motion.p>
      </div>

      {/* Keyframes */}
      <style jsx global>{`
        @keyframes heroShimmer {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: -200% 50%;
          }
        }
      `}</style>
    </motion.section>
  );
}

