"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiArrowDown, FiInfo } from "react-icons/fi";
import { architecture, type ArchNode } from "@/lib/data";
import SectionHeading from "./SectionHeading";

const accent: Record<ArchNode["accent"], string> = {
  blue: "border-blue/60 shadow-[0_0_30px_-8px] shadow-blue/50 text-blue-light",
  purple: "border-purple/60 shadow-[0_0_30px_-8px] shadow-purple/50 text-purple-light",
  cyan: "border-cyan/60 shadow-[0_0_30px_-8px] shadow-cyan/50 text-cyan",
};

export default function Architecture() {
  const [active, setActive] = useState<string>(architecture[0].id);
  const activeNode = architecture.find((n) => n.id === active)!;

  return (
    <section id="architecture" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading
        index="06"
        title="Data Platform Architecture"
        subtitle="An end-to-end GCP data pipeline. Hover or tap any stage to explore what it does."
      />

      <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-center">
        {/* pipeline */}
        <div className="flex flex-col items-center">
          {architecture.map((node, i) => (
            <div key={node.id} className="flex w-full max-w-sm flex-col items-center">
              <motion.button
                onMouseEnter={() => setActive(node.id)}
                onFocus={() => setActive(node.id)}
                onClick={() => setActive(node.id)}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`w-full rounded-xl border bg-surface/70 px-5 py-3.5 text-center font-medium backdrop-blur transition-all ${
                  active === node.id
                    ? accent[node.accent] + " scale-[1.04]"
                    : "border-white/10 text-text/80 hover:border-white/25"
                }`}
              >
                {node.label}
              </motion.button>
              {i < architecture.length - 1 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.2 }}
                  className="my-1.5 text-muted"
                >
                  <FiArrowDown />
                </motion.span>
              )}
            </div>
          ))}
        </div>

        {/* detail panel */}
        <div className="rounded-2xl glass p-7 md:sticky md:top-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <span className={`inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 font-mono text-xs ${accent[activeNode.accent].split(" ").pop()}`}>
                <FiInfo /> Pipeline stage
              </span>
              <h3 className="mt-4 text-2xl font-bold">{activeNode.label}</h3>
              <p className="mt-3 leading-relaxed text-muted">{activeNode.desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
