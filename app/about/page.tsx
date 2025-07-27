"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence, Variants } from "framer-motion";

/* ------------ Constants ------------ */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ------------ Variants ------------ */
const pageVariants: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
  exit: { opacity: 0, y: -24, transition: { duration: 0.35, ease: EASE } },
};

// Factory to avoid TS error with function-resolver Variants
const makeFadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: EASE },
  },
});

export default function AboutUs() {
  const [showIntro, setShowIntro] = React.useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setShowIntro(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Navbar />

      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />

        {/* Floating gradient blobs */}
        <motion.div
          className="absolute w-[400px] h-[400px] bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl"
          animate={{ x: [0, 50, -50, 0], y: [0, 30, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "10%", left: "5%" }}
        />
        <motion.div
          className="absolute w-[350px] h-[350px] bg-gradient-to-r from-pink-300/20 to-yellow-300/20 rounded-full blur-3xl"
          animate={{ x: [0, -60, 40, 0], y: [0, -40, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          style={{ bottom: "10%", right: "10%" }}
        />

        {/* Animated lines/waves */}
        <div className="absolute inset-0">
          <div className="absolute w-full h-32 bottom-0 bg-gradient-to-t from-white" />
          <motion.div
          className="absolute bottom-0 w-[200%] h-[300px] bg-gradient-to-r from-blue-200/20 to-purple-200/20"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>

      {/* Intro Splash */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { duration: 0.5 } }}
              className="text-center"
            >
              <motion.span
                initial={{ rotate: -10, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1, transition: { delay: 0.1 } }}
                className="text-4xl"
              >
                ✅
              </motion.span>
              <div className="mt-4 text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Nihal Finserv
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      {!showIntro && (
        <motion.main
          key="about"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative"
        >
          <section className="max-w-4xl mx-auto p-6 space-y-10 text-gray-900">
            {/* Title */}
            <motion.h1
              className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
              variants={makeFadeUp(0)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              ✅ About Us – Nihal Finserv
            </motion.h1>

            <motion.p
              className="text-xl italic mb-10 text-slate-600"
              variants={makeFadeUp(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              Where Financial Confidence Begins
            </motion.p>

            {/* Section 1: Our Story */}
            <motion.div
              variants={makeFadeUp(0.16)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <h2 className="text-2xl font-semibold mb-3">Our Story</h2>
              <p className="mb-4">
                Every financial goal begins with a decision — to grow, to
                invest, to dream big. At Nihal Finserv, we exist to make that
                decision easier.
              </p>
              <p className="mb-4">
                Founded in Hyderabad, our journey started with a simple belief:{" "}
                <strong>finance should be simple, transparent, and personal.</strong>{" "}
                What began as a small consultancy has grown into a trusted
                financial partner for hundreds of professionals, entrepreneurs,
                and families.
              </p>

              <p>Over the years, we’ve empowered:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Businesses to expand</li>
                <li>Doctors to establish clinics</li>
                <li>Individuals to unlock their dreams</li>
              </ul>

              <p className="mt-4">
                All through tailored, hassle-free loan solutions designed to
                help our clients move forward with confidence.
              </p>
            </motion.div>

            {/* Section 2: Who We Help */}
            <motion.div
              variants={makeFadeUp(0.24)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <h2 className="text-2xl font-semibold mb-3">Who We Help</h2>
              <ul className="space-y-4">
                <li className="rounded-xl bg-white/70 backdrop-blur-sm p-4 shadow-sm hover:shadow-md transition">
                  <span role="img" aria-label="target" className="mr-2">
                    🎯
                  </span>
                  <strong>Entrepreneurs & Startups</strong>: Flexible working
                  capital and business loans with quick disbursal.
                </li>
                <li className="rounded-xl bg-white/70 backdrop-blur-sm p-4 shadow-sm hover:shadow-md transition">
                  <span role="img" aria-label="hospital" className="mr-2">
                    🏥
                  </span>
                  <strong>Healthcare Professionals</strong>: Loan options crafted
                  for doctors, clinics, and medical establishments.
                </li>
                <li className="rounded-xl bg-white/70 backdrop-blur-sm p-4 shadow-sm hover:shadow-md transition">
                  <span role="img" aria-label="home" className="mr-2">
                    🏡
                  </span>
                  <strong>Homeowners & Buyers</strong>: From home loans to
                  mortgage-backed funding, we help make your home ownership
                  journey smooth.
                </li>
                <li className="rounded-xl bg-white/70 backdrop-blur-sm p-4 shadow-sm hover:shadow-md transition">
                  <span role="img" aria-label="tools" className="mr-2">
                    🛠️
                  </span>
                  <strong>Contractors & Industries</strong>: Finance for
                  machinery and equipment to drive your operations forward.
                </li>
              </ul>
            </motion.div>

            {/* Section 3: Why Clients Trust Us */}
            <motion.div
              variants={makeFadeUp(0.32)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <h2 className="text-2xl font-semibold mb-3">
                Why Clients Trust Us
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <span>✅</span>
                  <span>
                    <strong>Quick Turnaround</strong>: Loan approvals and
                    disbursements — faster than traditional banks.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✅</span>
                  <span>
                    <strong>Tailored Loan Options</strong>: No one-size-fits-all.
                    Every loan is designed around your specific needs.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✅</span>
                  <span>
                    <strong>Trusted Partnerships</strong>: We work closely with
                    leading banks and NBFCs to secure the best terms.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✅</span>
                  <span>
                    <strong>End-to-End Support</strong>: From consultation to
                    closure — we stand with you throughout the loan journey.
                  </span>
                </li>
              </ul>
            </motion.div>

            {/* Section 4: Meet the Expert Behind It */}
            <motion.div
              variants={makeFadeUp(0.4)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <h2 className="text-2xl font-semibold mb-3">
                Meet the Expert Behind It
              </h2>
              <p className="flex items-center mb-2">
                <span role="img" aria-label="person" className="mr-2">
                  👤
                </span>
                <strong>Althaf – Managing Director</strong>
              </p>
              <p className="mb-3">
                With over a decade of experience in financial advisory, Althaf
                brings expertise and a client-first approach to every financial
                solution we offer.
              </p>
              <blockquote className="border-l-4 border-blue-500 pl-4 italic mb-3">
                “At Nihal Finserv, our success is defined by the success of our
                clients. We’re not just loan facilitators — we’re growth
                partners.”
              </blockquote>
              <p>
                📞{" "}
                <a
                  href="tel:+919951606993"
                  className="text-blue-600 hover:underline"
                >
                  9951606993
                </a>{" "}
                | ✉️{" "}
                <a
                  href="mailto:nihalfinserv@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  nihalfinserv@gmail.com
                </a>
              </p>
            </motion.div>

            {/* Section 5: Ready to Start */}
            <motion.div
              variants={makeFadeUp(0.48)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="text-center space-y-4"
            >
              <h2 className="text-2xl font-semibold mb-2">Ready to Start?</h2>
              <p>
                Whether it’s your first business loan or your next big expansion,
                Nihal Finserv is ready to guide you.
              </p>
              <p className="text-3xl">Let’s grow together.</p>

              <div className="space-x-4">
                <a
                  href="/services"
                  className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition will-change-transform hover:scale-[1.02] active:scale-[0.99]"
                >
                  Explore Our Services
                </a>
                <a
                  href="/apply"
                  className="inline-block px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition will-change-transform hover:scale-[1.02] active:scale-[0.99]"
                >
                  Apply Now
                </a>
              </div>
            </motion.div>
          </section>
        </motion.main>
      )}

      <Footer />
    </>
  );
}

