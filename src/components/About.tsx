"use client";

import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { about } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading title="About Me" />

      <div className="grid items-center gap-10 md:grid-cols-5">
        <Reveal className="md:col-span-3">
          <p className="text-lg leading-relaxed text-muted md:text-xl">
            {about.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {about.focus.map((f) => (
              <span
                key={f}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-blue-light"
              >
                {f}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="md:col-span-2 space-y-3">
          {about.highlights.map((h, i) => (
            <motion.div
              key={h}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-start gap-3 rounded-xl glass glass-hover p-4"
            >
              <FiCheckCircle className="mt-0.5 shrink-0 text-xl text-purple-light" />
              <span className="text-sm text-text/90">{h}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
