"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Quick Loan Processing",
    description: "Fast approvals and minimal paperwork for your convenience.",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-700",
  },
  {
    title: "Expert Financial Guidance",
    description: "Dedicated professionals to guide you at every step.",
    bgColor: "bg-blue-100",
    textColor: "text-blue-700",
  },
  {
    title: "Customized Loan Options",
    description: "Tailored solutions to suit your needs and repayment capacity.",
    bgColor: "bg-green-100",
    textColor: "text-green-700",
  },
  {
    title: "Transparent Policies",
    description: "No hidden charges, complete clarity on terms.",
    bgColor: "bg-purple-100",
    textColor: "text-purple-700",
  },
  {
    title: "Strong Network of Lending Partners",
    description:
      "We partner with leading financial institutions to offer you the best deals.",
    bgColor: "bg-pink-100",
    textColor: "text-pink-700",
  },
];

// Variants for animation
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, duration: 0.6, ease: [0.25, 1, 0.5, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
};

export default function WhyChooseUsSimpleCards() {
  return (
    <section className="bg-gray-50 py-20 px-6">
      <motion.div
        className="max-w-6xl mx-auto text-center mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
      >
        <h2 className="text-4xl font-extrabold text-gray-900 font-serif">Why Choose Us?</h2>
        <p className="mt-4 text-gray-700 max-w-3xl mx-auto font-serif">
          Discover the reasons why Nihal Finserv stands out as your trusted financial partner.
        </p>
      </motion.div>

      <motion.div
        className="grid gap-8 max-w-6xl mx-auto md:grid-cols-2 lg:grid-cols-3 font-serif"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {features.map(({ title, description, bgColor, textColor }, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            whileHover={{
              y: -6,
              boxShadow:
                "0 15px 30px -10px rgba(79,70,229,0.25), 0 6px 8px -4px rgba(0,0,0,0.08)",
              transition: { duration: 0.3 },
            }}
            className="bg-white rounded-xl p-6 shadow transition-shadow duration-300 flex items-start space-x-4 font-serif"
          >
            <motion.div
              whileHover={{ rotate: [0, 10, -10, 0], scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className={`flex items-center justify-center w-14 h-14 rounded-full text-3xl font-serif ${bgColor} ${textColor}`}
            >
              {title.charAt(0)}
            </motion.div>

            <div>
              <h3 className="text-xl font-serif text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-700">{description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

