"use client";

import { motion } from "framer-motion";
import { FiBriefcase, FiChevronRight } from "react-icons/fi";
import { experience } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading title="Experience" />

      <div className="relative pl-8 md:pl-10">
        {/* animated vertical line */}
        <motion.span
          className="absolute left-[7px] top-1 w-[2px] origin-top rounded bg-gradient-to-b from-blue via-purple to-cyan md:left-[11px]"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          style={{ bottom: "0.5rem" }}
        />

        <div className="space-y-10">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative"
            >
              {/* node */}
              <span className="absolute -left-8 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-gradient-to-br from-blue to-purple ring-4 ring-bg md:-left-10">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>

              <div className="rounded-2xl glass glass-hover p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="flex items-center gap-2 text-xl font-bold">
                    <FiBriefcase className="text-purple-light" />
                    {exp.role}
                    <span className="text-blue-light">· {exp.company}</span>
                  </h3>
                  <span className="font-mono text-xs text-muted">{exp.period}</span>
                </div>
                <p className="mt-1 text-sm text-muted">{exp.location}</p>

                <ul className="mt-4 space-y-2">
                  {exp.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-text/85">
                      <FiChevronRight className="mt-1 shrink-0 text-cyan" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
