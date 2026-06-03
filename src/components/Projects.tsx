"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiExternalLink, FiGithub, FiPlus } from "react-icons/fi";
import { projects, type Project } from "@/lib/data";
import SectionHeading from "./SectionHeading";

const accentRing: Record<Project["accent"], string> = {
  blue: "hover:border-blue/50",
  purple: "hover:border-purple/50",
  cyan: "hover:border-cyan/50",
};
const accentText: Record<Project["accent"], string> = {
  blue: "text-blue-light",
  purple: "text-purple-light",
  cyan: "text-cyan",
};

function Card({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className={`flex flex-col rounded-2xl glass border border-white/10 p-6 transition-colors ${accentRing[project.accent]}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`font-mono text-xs ${accentText[project.accent]}`}>
            Featured Project
          </p>
          <h3 className="mt-2 text-xl font-bold leading-snug">{project.title}</h3>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg glass glass-hover"
        >
          <motion.span animate={{ rotate: open ? 45 : 0 }}>
            <FiPlus />
          </motion.span>
        </button>
      </div>

      <p className="mt-3 text-sm text-muted">{project.blurb}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span
            key={s}
            className="rounded-md bg-white/[0.05] px-2.5 py-1 font-mono text-[11px] text-text/80"
          >
            {s}
          </span>
        ))}
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="mt-5 text-sm leading-relaxed text-text/85">
              {project.description}
            </p>
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {project.features.map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-2 rounded-lg bg-white/[0.03] px-3 py-2 text-xs text-muted"
                >
                  <span className={`h-1.5 w-1.5 rounded-full bg-current ${accentText[project.accent]}`} />
                  {f}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 flex flex-1 items-end gap-3">
        {project.links?.demo && (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue to-purple px-3.5 py-2 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            <FiExternalLink /> Live Demo
          </a>
        )}
        {project.links?.code && (
          <a
            href={project.links.code}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg glass glass-hover px-3.5 py-2 text-sm font-semibold"
          >
            <FiGithub /> Code
          </a>
        )}
        {!project.links?.demo && !project.links?.code && (
          <span className="rounded-lg bg-white/[0.03] px-3.5 py-2 text-xs text-muted">
            Client project · Accenture (private)
          </span>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading
        index="04"
        title="Featured Projects"
        subtitle="Click a card to expand the full breakdown of features and architecture."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Card key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
