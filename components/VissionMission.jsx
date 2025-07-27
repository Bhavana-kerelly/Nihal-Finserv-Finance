
"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCallback } from "react";



export default function VisionMission() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 100, damping: 10 });
  const rotateY = useSpring(x, { stiffness: 100, damping: 10 });

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    x.set(offsetX / 25);
    y.set(-offsetY / 25);
  }, [x, y]);

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
    exit: { opacity: 0, y: -50, scale: 0.95, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative bg-gray-50 py-20 px-4 overflow-hidden">
      {/* Background Aurora */}
      <motion.div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-[140px] opacity-30"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto relative z-10 font-serif">
        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-serif text-gray-900 text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-900 via-purple-700 to-pink-600 animate-[shimmer_6s_linear_infinite]"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Our Vision & Mission
        </motion.h2>

        {/* Cards */}
        <div className="flex flex-col md:flex-row md:space-x-12 space-y-12 md:space-y-0">
          {/* Vision Card */}
          <motion.div
            className="flex-1 relative group"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div className="relative bg-white rounded-2xl shadow-lg p-10 text-center overflow-hidden group">
              {/* Glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 blur-xl transition duration-500"
              />
              <div className="flex justify-center mb-6 relative z-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-blue-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-blue-900 mb-4 relative z-10">Vision</h3>
              <p className="text-gray-700 text-lg leading-relaxed relative z-10 font-serif">
                To become a leading financial solutions provider that fosters long-term financial growth, trust, and empowerment for individuals and enterprises
              </p>
            </motion.div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            className="flex-1 relative group"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div className="relative bg-white rounded-2xl shadow-lg p-10 text-center overflow-hidden group">
              {/* Glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 blur-xl transition duration-500"
              />
              <div className="flex justify-center mb-6 relative z-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-blue-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-3-3v6m4.5 6h-9A2.5 2.5 0 016 18.5v-13A2.5 2.5 0 018.5 3h7A2.5 2.5 0 0118 5.5v13a2.5 2.5 0 01-2.5 2.5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-blue-900 mb-4 relative z-10 font-serif">Mission</h3>
              <p className="text-gray-700 text-lg leading-relaxed relative z-10 font-serif">
                To deliver efficient, ethical, and innovative lending solutions by offering personalized financial services that help our clients grow with
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Keyframes */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: -200% 50%; }
        }
      `}</style>
    </section>
  );
}

