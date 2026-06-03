"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiDownload, FiMenu, FiX } from "react-icons/fi";
import { profile } from "@/lib/data";

const LINKS = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["Architecture", "#architecture"],
  ["Contact", "#contact"],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 2.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 md:px-6 transition-all duration-300 ${
          scrolled
            ? "border border-white/10 bg-[#0a0e1d]/92 py-2.5 shadow-lg shadow-black/40 backdrop-blur-xl"
            : "py-2"
        }`}
        style={{ width: "calc(100% - 2rem)" }}
      >
        <a href="#top" className="group flex items-center gap-2 font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-blue to-purple text-sm font-mono">
            D
          </span>
          <span className="hidden sm:block tracking-tight">Darshan BS</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-text"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={profile.resume}
            download
            className="hidden items-center gap-2 rounded-lg bg-gradient-to-r from-blue to-purple px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-purple/20 transition-transform hover:scale-105 sm:flex"
          >
            <FiDownload /> Resume
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-lg glass lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-4 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0e1d]/97 p-2 backdrop-blur-xl lg:hidden"
          >
            {LINKS.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-muted transition-colors hover:bg-white/5 hover:text-text"
              >
                {label}
              </a>
            ))}
            <a
              href={profile.resume}
              download
              className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue to-purple px-4 py-3 font-semibold text-white"
            >
              <FiDownload /> Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
