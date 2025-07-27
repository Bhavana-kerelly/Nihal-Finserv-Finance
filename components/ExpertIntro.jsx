"use client";

import { motion } from "framer-motion";

export default function ExpertIntro() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient & floating lights */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 via-orange-100 to-yellow-50" />
      <motion.div
        className="absolute -top-20 left-1/3 h-48 w-48 rounded-full bg-yellow-300/40 blur-3xl"
        animate={{
          x: [0, 20, -20, 0],
          y: [0, -15, 15, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 h-40 w-40 rounded-full bg-orange-300/30 blur-2xl"
        animate={{
          x: [0, -20, 20, 0],
          y: [0, 20, -20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative text-center py-6 px-4">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-yellow-900 bg-clip-text 
                     text-transparent bg-gradient-to-r from-yellow-700 via-orange-600 to-yellow-800
                     animate-[shimmer_5s_linear_infinite]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Meet our expert{" "}
          <span className="font-extrabold">ALTHAF</span>, Managing Director
        </motion.h2>
      </div>

      {/* Keyframes */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: -200% 50%;
          }
        }
      `}</style>
    </section>
  );
}
