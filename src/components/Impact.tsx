"use client";

import { motion } from "framer-motion";
import { FiArrowUpRight, FiDownload } from "react-icons/fi";
import { businessImpact, profile, resumeHighlights } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Impact() {
  return (
    <section id="impact" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-24">
      <SectionHeading
        title="Business Impact"
        subtitle="What this work delivered — measurable outcomes for the teams and platforms I supported."
      />

      {/* impact metric cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {businessImpact.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -5 }}
            className="gradient-border rounded-2xl bg-surface/60 p-5"
          >
            <div className="text-3xl font-extrabold gradient-text">{m.metric}</div>
            <div className="mt-1 font-semibold">{m.label}</div>
            <p className="mt-2 text-sm text-muted">{m.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* resume highlights */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Reveal className="rounded-2xl glass p-6">
          <div className="mb-4 flex items-center gap-2 font-mono text-xs text-muted">
            <span className="h-2 w-2 rounded-full bg-purple-light" /> résumé highlights
          </div>
          <ul className="space-y-3">
            {resumeHighlights.map((h, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-start gap-3 text-sm text-text/85"
              >
                <FiArrowUpRight className="mt-0.5 shrink-0 text-cyan" />
                <span>{h}</span>
              </motion.li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="flex flex-col justify-between gap-5 rounded-2xl bg-gradient-to-br from-blue/15 via-purple/10 to-cyan/10 p-6 ring-1 ring-white/10">
          <div>
            <h3 className="text-xl font-bold">Looking for a Data Engineer who ships?</h3>
            <p className="mt-2 text-sm text-muted">
              2.9 years building production ETL on GCP — BigQuery, Airflow, and data
              quality at scale. Open to Data Engineer, Analytics Engineer, and Cloud
              Data Engineer roles.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={profile.resume}
              download
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue to-purple px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              <FiDownload /> Resume
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 rounded-xl glass glass-hover px-5 py-2.5 text-sm font-semibold"
            >
              Get in touch
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
