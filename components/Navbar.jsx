"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll } from "framer-motion";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-[100]">
      <ScrollProgress />

      <nav
        className="
          mx-auto max-w-7xl px-4
          backdrop-blur-xl bg-white/60 dark:bg-black/40
          border-b border-white/20 dark:border-white/10
          shadow-[0_1px_12px_-6px_rgba(0,0,0,0.2)]
          supports-[backdrop-filter]:bg-white/50
        "
      >
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Nihal Finserv Logo"
              width={100}
              height={40}
              className="object-contain"
              priority
            />
            <span className="font-serif text-lg tracking-tight">
              Nihal Finserv
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 font-serif">
            <DesktopLinks pathname={pathname} />
            <Link
              href="/apply"
              className="ml-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-serif text-white shadow hover:opacity-95 transition"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative z-[110] p-2"
            aria-label="Toggle menu"
            onClick={() => setOpen((p) => !p)}
          >
          {/* Simple hamburger to X animation */}
            <motion.span
              initial={false}
              animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 bg-current mb-1 transition"
            />
            <motion.span
              initial={false}
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="block h-0.5 w-6 bg-current mb-1 transition"
            />
            <motion.span
              initial={false}
              animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 bg-current transition"
            />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="mobile"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-2 pb-4 pt-2">
                {links.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="relative rounded-lg px-3 py-2 text-sm font-serif hover:bg-black/5 dark:hover:bg-white/5 transition"
                    >
                      {active && (
                        <motion.span
                          layoutId="activeMobile"
                          className="absolute inset-0 rounded-lg bg-black/5 dark:bg-white/10"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{link.name}</span>
                    </Link>
                  );
                })}

                <Link
                  href="/apply"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-center text-sm font-serif text-white shadow hover:opacity-95 transition"
                >
                  Apply Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

/* -------- Desktop links (JS version, no types) -------- */
function DesktopLinks({ pathname }) {
  return (
    <div className="relative flex items-center gap-2">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className="relative rounded-md px-3 py-1.5 text-sm hover:text-blue-600 transition"
          >
            {active && (
              <motion.span
                layoutId="activeDesktop"
                className="absolute inset-0 rounded-md bg-blue-600/10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{link.name}</span>
          </Link>
        );
      })}
    </div>
  );
}

/* -------- Scroll progress bar (tiny FM version) -------- */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div className="fixed left-0 right-0 top-0 z-[120] h-0.5 bg-transparent origin-left">
      <motion.div
        className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
        style={{ scaleX: scrollYProgress, transformOrigin: "0% 0%" }}
      />
    </motion.div>
  );
}


