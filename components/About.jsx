"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const timelineItems = [
  {
    id: 1,
    title: "Trusted Consultancy",
    content:
      "Nihal Finserv offers expert financial consultancy tailored to your unique needs.",
  },
  {
    id: 2,
    title: "Customized Loan Solutions",
    content:
      "Providing transparent and hassle-free loans for businesses, professionals, and individuals.",
  },
  {
    id: 3,
    title: "RBI Authorized Partner",
    content:
      "Authorised channel partner with banks and NBFCs as per RBI guidelines, ensuring safety and trust.",
    isRBI: true,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: { opacity: 0, y: 20, transition: { duration: 0.35 } },
};

const card = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AboutUs() {
  const router = useRouter();
  const ref = useRef(null);


  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.08]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key="about-us"
        ref={ref}
        className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-gray-50"
        initial="hidden"
        animate="show"
        exit="exit"
        variants={container}
      >
        {/* Premium background gradient blob */}
        <motion.div
          style={{ opacity: glowOpacity, scale: glowScale }}
          aria-hidden
          className="pointer-events-none absolute -top-56 left-1/2 -translate-x-1/2 h-[900px] w-[900px] rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 blur-3xl"
        />

        {/* Soft noise overlay */}
        <div className="absolute inset-0 -z-10 opacity-[0.06] mix-blend-multiply [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <motion.div className="max-w-6xl w-full" variants={card}>
          {/* Header */}
          <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-[linear-gradient(90deg,#4f46e5,45%,#a855f7,55%,#4f46e5)] bg-[length:200%_100%] animate-[shimmer_6s_linear_infinite] font-serif"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            About Nihal Finserv
          </motion.h2>

          <motion.p
            className="mt-4 text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Premium-grade financial solutions with trust, compliance & transparency.
          </motion.p>
        </div>

          {/* Cards (no center line anymore) */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={container}
          >
            {timelineItems.map(({ id, title, content, isRBI }) => (
              <motion.div
                key={id}
                variants={card}
                whileHover={{
                  y: -6,
                  boxShadow:
                    "0 20px 30px -15px rgba(79,70,229,0.25), 0 8px 10px -6px rgba(0,0,0,0.08)",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="relative group"
              >
                {/* Floating number badge */}
                <motion.div
                  className="absolute -top-6 left-6 z-10 w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-xl ring-2 ring-white/70"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.45 }}
                >
                  {id}
                </motion.div>

                {/* Glassy card */}
                <div className="h-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-white/60 p-6">
                  <h3 className="text-xl font-serif mb-3">{title}</h3>
                  <p className="text-gray-700 mb-4">{content}</p>

                  {isRBI && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45 }}
                      className="bg-yellow-300/80 border-l-4 border-yellow-500 text-yellow-900 px-4 py-2 rounded-md font-semibold uppercase text-[10px] tracking-wide font-serif"
                    >
                      AUTHORISED CHANNEL PARTNER WITH BANKS AND NBFC’S, AS PER RBI GUIDELINES
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div className="mt-16 text-center" variants={card}>
            <motion.button
              onClick={() => router.push("/about")}
              className="relative inline-flex items-center justify-center overflow-hidden rounded-full px-14 py-4 font-semibold text-white shadow-lg focus:outline-none"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-[gradientShift_6s_ease_infinite]" />
              <span className="absolute inset-0 blur-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-40" />
              <span className="relative z-10 font-serif">Learn More About Us</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Keyframes */}
        <style jsx global>{`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-[gradientShift_6s_ease_infinite] {
            background-size: 200% 200%;
            animation: gradientShift 6s ease infinite;
          }

          @keyframes shimmer {
            0% { background-position: 0% 50%; }
            100% { background-position: -200% 50%; }
          }
          .animate-[shimmer_6s_linear_infinite] {
            background-size: 200% 100%;
            animation: shimmer 6s linear infinite;
          }
        `}</style>
      </motion.section>
    </AnimatePresence>
  );
}
