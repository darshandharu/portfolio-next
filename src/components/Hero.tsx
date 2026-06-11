"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowRight, FiDownload, FiMail } from "react-icons/fi";
import { SiApacheairflow, SiApachekafka, SiGooglebigquery, SiGooglecloud } from "react-icons/si";
import { TbChartDots3 } from "react-icons/tb";
import { liveKpis, profile } from "@/lib/data";
import PipelineFlow from "./PipelineFlow";
import Ticker from "./Ticker";

function useTypewriter(words: string[], speed = 85, pause = 1500) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[i % words.length];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && text === word) t = setTimeout(() => setDeleting(true), pause);
    else if (deleting && text === "") {
      setDeleting(false);
      setI((p) => p + 1);
    } else {
      t = setTimeout(
        () => setText((p) => (deleting ? word.slice(0, p.length - 1) : word.slice(0, p.length + 1))),
        deleting ? speed / 2 : speed
      );
    }
    return () => clearTimeout(t);
  }, [text, deleting, i, words, speed, pause]);
  return text;
}

const FLOATERS = [
  { Icon: SiGooglebigquery, cls: "left-[6%] top-[24%] text-blue-light", d: "0s" },
  { Icon: SiApacheairflow, cls: "right-[7%] top-[20%] text-purple-light", d: "1.4s" },
  { Icon: SiApachekafka, cls: "left-[9%] bottom-[16%] text-cyan", d: "0.7s" },
  { Icon: SiGooglecloud, cls: "right-[10%] bottom-[20%] text-blue-light", d: "2s" },
  { Icon: TbChartDots3, cls: "right-[24%] top-[12%] text-purple-light", d: "1s" },
];

export default function Hero() {
  const typed = useTypewriter(profile.roles);
  const base = 2.3;

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 pb-16">
      {/* aurora */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="aurora" />
      </div>

      {/* floating DE nodes */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {FLOATERS.map(({ Icon, cls, d }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.85, scale: 1 }}
            transition={{ delay: base + 0.2 + i * 0.12, duration: 0.6 }}
            className={`absolute ${cls}`}
          >
            <div className="float grid h-14 w-14 place-items-center rounded-2xl glass text-2xl" style={{ animationDelay: d }}>
              <Icon />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative mx-auto w-full max-w-5xl">
        {/* status pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: base, duration: 0.5 }}
          className="mx-auto flex w-fit items-center gap-2.5 rounded-full glass px-4 py-1.5 font-mono text-xs text-muted"
        >
          <span className="live-dot h-2 w-2 rounded-full bg-emerald-400" />
          All systems operational · 12 / 12 pipelines online · {profile.location}
        </motion.div>

        {/* identity */}
        <div className="mt-7 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: base + 0.1, duration: 0.6 }}
            className="text-5xl font-extrabold tracking-tight md:text-7xl"
          >
            <span className="gradient-text">{profile.name}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: base + 0.3, duration: 0.5 }}
            className="mt-4 font-mono text-lg text-text/90 md:text-2xl"
          >
            <span className="text-muted">{"> "}</span>
            {typed}
            <span className="caret" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: base + 0.45, duration: 0.5 }}
            className="mx-auto mt-5 max-w-2xl text-base text-muted md:text-lg"
          >
            Building scalable, cloud-native data platforms — streaming ingestion, ETL
            orchestration, and analytics on Google Cloud &amp; BigQuery.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: base + 0.6, duration: 0.5 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <a href={profile.resume} download className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue to-purple px-6 py-3 font-semibold text-white shadow-xl shadow-purple/25 transition-transform hover:scale-105">
              <FiDownload /> Download Resume
            </a>
            <a href="#projects" className="group flex items-center gap-2 rounded-xl glass glass-hover px-6 py-3 font-semibold">
              View Projects <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#contact" className="flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-muted transition-colors hover:text-text">
              <FiMail /> Contact
            </a>
          </motion.div>
        </div>

        {/* live pipeline panel */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: base + 0.75, duration: 0.6 }}
          className="gradient-border mt-12 rounded-2xl bg-surface/60 p-5 backdrop-blur"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs text-muted">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              <span className="ml-2">career.pipeline · live</span>
            </div>
            <span className="font-mono text-[11px] text-emerald-400">● streaming</span>
          </div>

          <PipelineFlow />

          {/* live KPIs */}
          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
            {liveKpis.map((k) => (
              <div key={k.label} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted">{k.label}</div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-lg font-bold text-text">{k.value}</span>
                  <span className="font-mono text-[11px] text-emerald-400">{k.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* streaming ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: base + 1, duration: 0.6 }}
          className="mt-5"
        >
          <Ticker />
        </motion.div>
      </div>
    </section>
  );
}
