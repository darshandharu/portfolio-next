"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading
        index="02"
        title="Skills Dashboard"
        subtitle="Core competencies across data engineering, cloud, and analytics — with proficiency at a glance."
      />

      <div className="grid gap-x-10 gap-y-7 md:grid-cols-2">
        {skills.map((skill, i) => (
          <Reveal key={skill.name} delay={i * 0.05}>
            <div className="group rounded-xl glass glass-hover p-4">
              <div className="mb-2 flex items-baseline justify-between">
                <span className="font-medium">{skill.name}</span>
                <span className="font-mono text-sm text-muted">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                  >
                    {skill.level}%
                  </motion.span>
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-blue via-purple to-cyan"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1.1, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <span className="mt-2 inline-block font-mono text-[11px] uppercase tracking-wider text-muted/70">
                {skill.category}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
