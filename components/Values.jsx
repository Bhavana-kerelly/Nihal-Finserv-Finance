"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useCallback } from "react";

export default function ValuesSection() {
  const values = [
    {
      title: "Integrity",
      description: "We uphold honesty and transparency in every transaction.",
      gradientColor: "from-green-400 to-emerald-500",
    },
    {
      title: "Customer-Centricity",
      description: "Your goals guide our services.",
      gradientColor: "from-blue-400 to-indigo-500",
    },
    {
      title: "Excellence",
      description: "We strive for high standards in our financial services.",
      gradientColor: "from-yellow-400 to-amber-500",
    },
    {
      title: "Reliability",
      description: "A partner you can trust at every financial milestone.",
      gradientColor: "from-indigo-500 to-purple-600",
    },
    {
      title: "Innovation",
      description: "We adapt smart financial solutions for modern challenges.",
      gradientColor: "from-pink-500 to-rose-500",
    },
  ];

  const ref = useRef(null);

  // section scroll progress
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const sectionY = useTransform(scrollYProgress, [0, 0.15], [24, 0]);
  const barScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // mouse spotlight
  const spotX = useMotionValue(-9999);
  const spotY = useMotionValue(-9999);
  const smoothX = useSpring(spotX, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(spotY, { stiffness: 120, damping: 20 });

  const onMove = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      spotX.set(e.clientX - rect.left);
      spotY.set(e.clientY - rect.top);
    },
    [spotX, spotY]
  );

  const onLeave = useCallback(() => {
    spotX.set(-9999);
    spotY.set(-9999);
  }, [spotX, spotY]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const item = {
    hidden: { opacity: 0, y: 26, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="relative bg-gray-50 py-24 px-6 overflow-hidden"
      style={{ opacity: sectionOpacity, y: sectionY }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      {/* section progress bar */}
      <motion.div
        className="pointer-events-none absolute left-0 top-0 h-0.5 w-full origin-left bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-50"
        style={{ scaleX: barScaleX }}
      />

      {/* noise + aurora */}
      <div className="pointer-events-none absolute inset-0 -z-20 opacity-[0.05] mix-blend-multiply [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <motion.div
        className="pointer-events-none absolute right-[-15%] top-[-20%] h-[750px] w-[750px] blur-3xl -z-30"
        animate={{ rotate: [0, 25, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.25), transparent 60%), radial-gradient(circle at 80% 70%, rgba(236,72,153,0.25), transparent 55%)",
        }}
      />

      {/* mouse spotlight */}
      <motion.div
        className="pointer-events-none absolute h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),rgba(255,255,255,0)_70%)] mix-blend-overlay z-40"
        style={{ x: smoothX, y: smoothY }}
      />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:space-x-16">
        {/* Left side */}
        <motion.div
          variants={item}
          className="md:w-1/3 mb-12 md:mb-0 flex flex-col justify-center items-center text-center"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-[linear-gradient(90deg,#1e3a8a,45%,#6366f1,55%,#1e3a8a)] bg-[length:200%_100%] animate-[shimmer_6s_linear_infinite]"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Core Values
          </motion.h2>
          <motion.p
            className="mt-6 text-gray-700 leading-relaxed max-w-xs"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            These principles guide us in delivering excellence and trust in all
            financial services.
          </motion.p>
        </motion.div>

        {/* Right side */}
        <motion.div className="md:w-2/3 space-y-8">
          {values.map(({ title, description, gradientColor }, idx) => (
          <ValueCard
              key={idx}
              idx={idx}
              title={title}
              description={description}
              gradientColor={gradientColor}
            />
          ))}
        </motion.div>
      </div>

      {/* keyframes */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: -200% 50%;
          }
        }
        @keyframes spin-slow {
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 16s linear infinite;
        }
      `}</style>
    </motion.section>
  );
}

/* ---------- Sub component: ValueCard (JSX) ---------- */
function ValueCard({ idx, title, description, gradientColor }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rX = useSpring(y, { stiffness: 120, damping: 14 });
  const rY = useSpring(x, { stiffness: 120, damping: 14 });

  const onMove = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const offsetX = e.clientX - rect.left - rect.width / 2;
      const offsetY = e.clientY - rect.top - rect.height / 2;
      x.set(offsetX / 30);
      y.set(-offsetY / 30);
    },
    [x, y]
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      className="relative group will-change-transform"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.06 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rX, rotateY: rY, transformStyle: "preserve-3d" }}
    >
      {/* Animated gradient border ring */}
      <div className="relative rounded-2xl p-[2px] overflow-hidden">
        <div
          className="absolute inset-0 rounded-2xl opacity-60 animate-spin-slow"
          style={{
            background:
              "conic-gradient(from 0deg, #6366f1, #a855f7, #ec4899, #6366f1)",
          }}
        />
        <div className="relative rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg p-6">
          {/* Floating index badge */}
          <span className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-indigo-600 text-white text-sm font-serif flex items-center justify-center shadow-lg ring-2 ring-white/70">
            {idx + 1}
          </span>

          {/* Title with draw underline */}
          <h3 className="text-xl font-serif text-gray-900 mb-2 relative inline-block">
            {title}
            <motion.span
              className={`absolute left-0 -bottom-1 h-[3px] bg-gradient-to-r ${gradientColor}`}
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            />
          </h3>

          <p className="text-gray-700">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

      