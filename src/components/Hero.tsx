"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowRight, FiDownload, FiMail } from "react-icons/fi";
import {
  SiApacheairflow,
  SiGooglecloud,
  SiGooglebigquery,
  SiPython,
} from "react-icons/si";
import { TbDatabase } from "react-icons/tb";
import { profile } from "@/lib/data";

function useTypewriter(words: string[], speed = 90, pause = 1600) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setI((p) => p + 1);
    } else {
      timeout = setTimeout(() => {
        setText((prev) =>
          deleting ? word.slice(0, prev.length - 1) : word.slice(0, prev.length + 1)
        );
      }, deleting ? speed / 2 : speed);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, i, words, speed, pause]);

  return text;
}

const float = (delay: number) => ({
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero() {
  const typed = useTypewriter(profile.roles);
  const base = 2.3; // start after loading screen

  return (
    <section id="top" className="relative flex min-h-screen items-center px-6 pt-28">
      {/* floating tech icons */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <motion.div {...float(base + 0.2)} className="absolute left-[8%] top-[26%]">
          <div className="float glass grid h-16 w-16 place-items-center rounded-2xl text-3xl text-blue-light" style={{ animationDelay: "0s" }}>
            <SiGooglebigquery />
          </div>
        </motion.div>
        <motion.div {...float(base + 0.35)} className="absolute right-[10%] top-[22%]">
          <div className="float glass grid h-16 w-16 place-items-center rounded-2xl text-3xl text-purple-light" style={{ animationDelay: "1.2s" }}>
            <SiApacheairflow />
          </div>
        </motion.div>
        <motion.div {...float(base + 0.5)} className="absolute left-[12%] bottom-[18%]">
          <div className="float glass grid h-16 w-16 place-items-center rounded-2xl text-3xl text-cyan" style={{ animationDelay: "0.6s" }}>
            <SiGooglecloud />
          </div>
        </motion.div>
        <motion.div {...float(base + 0.65)} className="absolute right-[12%] bottom-[22%]">
          <div className="float glass grid h-16 w-16 place-items-center rounded-2xl text-3xl text-blue-light" style={{ animationDelay: "1.8s" }}>
            <TbDatabase />
          </div>
        </motion.div>
        <motion.div {...float(base + 0.8)} className="absolute right-[26%] top-[12%]">
          <div className="float glass grid h-12 w-12 place-items-center rounded-xl text-xl text-purple-light" style={{ animationDelay: "0.9s" }}>
            <SiPython />
          </div>
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: base, duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-mono text-muted"
        >
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          Open to Data Engineer roles · {profile.location}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: base + 0.1, duration: 0.6 }}
          className="mt-6 text-5xl font-extrabold tracking-tight md:text-7xl"
        >
          {profile.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: base + 0.3, duration: 0.6 }}
          className="mt-4 text-xl font-semibold md:text-3xl"
        >
          <span className="gradient-text">{typed}</span>
          <span className="caret" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: base + 0.45, duration: 0.6 }}
          className="mx-auto mt-6 max-w-2xl text-base text-muted md:text-lg"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: base + 0.6, duration: 0.6 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={profile.resume}
            download
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue to-purple px-6 py-3 font-semibold text-white shadow-xl shadow-purple/25 transition-transform hover:scale-105"
          >
            <FiDownload /> Download Resume
          </a>
          <a
            href="#projects"
            className="group flex items-center gap-2 rounded-xl glass glass-hover px-6 py-3 font-semibold"
          >
            View Projects
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-muted transition-colors hover:text-text"
          >
            <FiMail /> Contact Me
          </a>
        </motion.div>
      </div>
    </section>
  );
}
