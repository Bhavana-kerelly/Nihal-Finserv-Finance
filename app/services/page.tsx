"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion, useScroll, useTransform, PanInfo, easeInOut } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ---------------- Data ---------------- */
const services = [
  {
    title: "Business Loan",
    description: "Flexible funding for startups, growth, and working capital.",
  },
  {
    title: "Mortgage Loans",
    description: "Leverage property value with seamless mortgage solutions.",
  },
  {
    title: "Working Capital (OD/CC)",
    description: "Liquidity support for smooth operations.",
  },
];

/* ---------------- Variants ---------------- */
const slideVariants = {
  initial: (dir = 1) => ({
    opacity: 0,
    x: dir > 0 ? 40 : -40,
    scale: 0.99,
  }),
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easeInOut,
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
  exit: (dir = 1) => ({
    opacity: 0,
    x: dir > 0 ? -40 : 40,
    scale: 0.99,
    transition: { duration: 0.45, ease: easeInOut },
  }),
};

const textVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

/* ---------------- Cloud Component ---------------- */
function Cloud({ xStart = "-20%", xEnd = "120%", top = "15%", scale = 1, blur = "blur-2xl", speed = 40, opacity = 0.25 }) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -60 * speed * 0.01]);

  return (
    <motion.div
      className={`absolute rounded-full bg-white ${blur}`}
      style={{
        top,
        y,
        opacity,
        width: `${280 * scale}px`,
        height: `${120 * scale}px`,
        filter: "drop-shadow(0 20px 60px rgba(255,255,255,0.05))",
      }}
      animate={{
        x: [xStart, xEnd],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

export default function ServicesSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % services.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + services.length) % services.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(nextSlide, 5000);
    return () => clearInterval(id);
  }, [nextSlide, paused]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 80;
    if (info.offset.x < -threshold) nextSlide();
    else if (info.offset.x > threshold) prevSlide();
  };

  const bgColors = ["#4f46e5", "#9333ea", "#2563eb"]; // Indigo, Purple, Blue

  return (
    <>
      <Navbar />

      <section className="relative w-full overflow-hidden text-white py-20">
        {/* ======= Premium Sky Background ======= */}
        <div className="absolute inset-0 -z-20">
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-black"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "300% 300%" }}
          />
          <motion.div
            className="absolute -top-32 left-1/3 h-[600px] w-[600px] rounded-full blur-3xl bg-gradient-to-tr from-pink-500/25 via-purple-400/20 to-blue-500/25"
            animate={{
              scale: [1, 1.1, 1],
              x: [0, 60, -60, 0],
              y: [0, -30, 20, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 bg-[url('/stars.png')] bg-cover opacity-30 animate-[moveStars_80s_linear_infinite]" />
          <Cloud top="18%" scale={1.2} speed={55} opacity={0.22} />
          <Cloud top="30%" scale={0.9} speed={40} opacity={0.18} blur="blur-xl" />
          <Cloud top="45%" scale={1.4} speed={65} opacity={0.16} />
          <Cloud top="62%" scale={1.0} speed={50} opacity={0.2} blur="blur-lg" />
        </div>

        {/* ======= Heading ======= */}
        <div className="max-w-5xl mx-auto px-6 text-center mb-8 relative z-10">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-indigo-300 to-blue-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Services
          </motion.h2>
          <p className="text-gray-200">Explore tailored loan solutions for every financial need.</p>
        </div>

        {/* ======= Slider ======= */}
        <div
          className="relative w-full max-w-6xl mx-auto flex items-center justify-center z-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="w-full h-[400px] relative overflow-hidden rounded-2xl shadow-lg backdrop-blur-md">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                className="absolute inset-0 flex items-center justify-center rounded-2xl"
                style={{ backgroundColor: bgColors[current] }}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={direction}
                drag="x"
                dragElastic={0.08}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
              >
                <div className="flex flex-col items-center text-center p-6">
                  <motion.h3
                    className="text-3xl font-bold mb-2"
                    variants={textVariants}
                    initial="hidden"
                    animate="show"
                  >
                    {services[current].title}
                  </motion.h3>

                  <motion.p
                    className="text-lg text-gray-200 mb-4 max-w-xl"
                    variants={textVariants}
                    initial="hidden"
                    animate="show"
                  >
                    {services[current].description}
                  </motion.p>

                  <motion.button
                    variants={textVariants}
                    initial="hidden"
                    animate="show"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-2 rounded-full font-semibold text-white shadow-md hover:shadow-lg transition"
                  >
                    Learn More
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrows */}
          <motion.button
            onClick={prevSlide}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-700/50 p-3 rounded-full backdrop-blur-sm"
          >
            ◀
          </motion.button>
          <motion.button
            onClick={nextSlide}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-700/50 p-3 rounded-full backdrop-blur-sm"
          >
            ▶
          </motion.button>
        </div>

        {/* Stars animation keyframes */}
        <style jsx global>{`
          @keyframes moveStars {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: -10000px 5000px;
            }
          }
          .animate-[moveStars_80s_linear_infinite] {
            animation: moveStars 80s linear infinite;
          }
        `}</style>
      </section>
      <Footer />
    </>
  );
}
