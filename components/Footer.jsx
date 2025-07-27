"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function FooterWithEmojis() {
  return (
    <motion.footer
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="relative  bg-[#081b36] text-gray-200 py-12 px-6 overflow-hidden"
    >
      {/* Animated Gradient Background Blob */}
      <motion.div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-indigo-600 opacity-30 blur-[150px]"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
        {/* Brand Section */}
        <motion.div variants={fadeUp} custom={0}>
          <h2 className="text-2xl font-serif  mb-4 text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-pink-300">
            🏦 Nihal Finserv
          </h2>
          <p className="text-sm leading-relaxed text-gray-300">
            Your trusted partner in financial consultancy and loan services.
            Empowering growth through transparent and reliable solutions.
          </p>
        </motion.div>

        {/* Contact Section */}
        <motion.div variants={fadeUp} custom={0.2}>
          <h3 className="text-lg font-serif mb-3 text-white">📞 Contact</h3>
          <p className="text-sm hover:text-indigo-300 transition">9951606993</p>
          <p className="text-sm hover:text-indigo-300 transition">8978606993</p>
          <p className="text-sm mt-2 hover:text-indigo-300 transition">
            ✉️ nihalfinserv@gmail.com
          </p>
          <p className="text-sm hover:text-indigo-300 transition">
            ✉️ althaf2286@gmail.com
          </p>
        </motion.div>

        {/* Address Section */}
        <motion.div variants={fadeUp} custom={0.4}>
          <h3 className="text-lg font-serif mb-3 text-white">📍 Address</h3>
          <p className="text-sm leading-relaxed text-gray-300 hover:text-indigo-300 transition font-serif">
            E-63, 1st Floor,
            <br />
            Above Shiva Homeo Care,
            <br />
            Madhuranagar, Hyderabad - 500038
          </p>
        </motion.div>

        {/* Hours + Website */}
        <motion.div variants={fadeUp} custom={0.6}>
          <h3 className="text-lg  font-serif mb-3 text-white">
            ⏰ Hours & 🌐 Website
          </h3>
          <p className="text-sm font-serif">Mon - Sat: 09:00 AM - 06:00 PM</p>
          <a
            href="http://www.nihalfinserv.com"
            target="_blank"
            className="text-indigo-300 underline mt-2 block text-sm hover:text-pink-300 transition font-serif"
          >
            www.nihalfinserv.com
          </a>
        </motion.div>
      </div>

      {/* Divider & Bottom Note */}
      <motion.div
        variants={fadeUp}
        custom={0.8}
        className="border-t border-indigo-800 mt-10 pt-4 text-center text-xs text-gray-400 relative z-10 font-serif"
      >
        © {new Date().getFullYear()} Nihal Finserv. All rights reserved.
      </motion.div>
    </motion.footer>
  );
}

