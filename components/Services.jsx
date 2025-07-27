"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const services = [
  {
    title: "Business Loan",
    description: "Flexible funding for startups, growth, and working capital.",
    image: "/services/business.jpg",
  },
  {
    title: "Mortgage Loans",
    description: "Leverage property value with seamless mortgage solutions.",
    image: "/services/mortgage.jpg",
  },
  {
    title: "Working Capital (OD/CC)",
    description: "Liquidity support for smooth operations.",
    image: "/services/working-capital.jpg",
  },
];

const slideVariants = {
  initial: { opacity: 0, x: 40, scale: 0.99 },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    x: -40,
    scale: 0.99,
    transition: { duration: 0.45, ease: [0.4, 0, 1, 1] },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function ServicesSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1); // <-- removed TS generic

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % services.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + services.length) % services.length);
  }, []);

  // autoplay (pause on hover)
  useEffect(() => {
    if (paused) return;
    const id = setInterval(nextSlide, 5000);
    return () => clearInterval(id);
  }, [nextSlide, paused]);

  // swipe drag constraints
  const handleDragEnd = (_, info) => {
    const threshold = 80;
    if (info.offset.x < -threshold) nextSlide();
    else if (info.offset.x > threshold) prevSlide();
  };

  return (
    <section className="w-full relative overflow-hidden bg-gray-900 text-white py-20">
      <div className="max-w-5xl mx-auto px-6 text-center mb-8">
        <h2 className="text-4xl font-serif mb-4">Our Services</h2>
        <p className="text-gray-300">
          Explore tailored loan solutions for every financial need.
        </p>
      </div>

      <div
        className="relative w-full max-w-6xl mx-auto flex items-center justify-center"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Slider */}
        <div className="w-full h-[400px] relative overflow-hidden rounded-2xl shadow-lg">
          <AnimatePresence mode="wait" custom={direction}>
          {/* key depends on current so each slide animates in/out */}
            <motion.div
              key={current}
              className="absolute inset-0"
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
              {/* Ken Burns animated image wrapper */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  scale: [1.1, 1.15, 1.1],
                  x: [0, direction * 10, 0],
                  y: [0, -10, 0],
                }}
                transition={{ duration: 10, ease: "linear", repeat: Infinity }}
              >
                <Image
                  src={services[current].image}
                  alt={services[current].title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl opacity-80"
                  priority
                />
              </motion.div>

              {/* Overlay content */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-6">
                <motion.h3
                  className="text-3xl font-serif mb-2"
                  variants={textVariants}
                  initial="hidden"
                  animate="show"
                >
                  {services[current].title}
                </motion.h3>

                <motion.p
                  className="text-lg text-gray-200 mb-4 max-w-xl text-center"
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
                  className="bg-indigo-500 hover:bg-indigo-600 px-6 py-2 rounded-full font-serif text-white transition"
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
          whileHover={{ scale: 1.05, backgroundColor: "rgba(55,65,81,0.75)" }}
          whileTap={{ scale: 0.95 }}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-700 bg-opacity-50 p-3 rounded-full backdrop-blur-sm"
        >
          ◀
        </motion.button>

        <motion.button
          onClick={nextSlide}
          whileHover={{ scale: 1.05, backgroundColor: "rgba(55,65,81,0.75)" }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-700 bg-opacity-50 p-3 rounded-full backdrop-blur-sm"
        >
          ▶
        </motion.button>
      </div>
    </section>
  );
}
