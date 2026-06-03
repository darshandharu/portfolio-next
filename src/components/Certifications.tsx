"use client";

import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import { SiGooglecloud } from "react-icons/si";
import { certifications, type Certification } from "@/lib/data";
import SectionHeading from "./SectionHeading";

const ring: Record<Certification["accent"], string> = {
  blue: "from-blue/30 to-blue/0 text-blue-light",
  purple: "from-purple/30 to-purple/0 text-purple-light",
  cyan: "from-cyan/30 to-cyan/0 text-cyan",
};

export default function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading
        title="Certifications"
        subtitle="Google Cloud certified across engineering, foundations, and generative AI."
      />

      <div className="grid gap-6 sm:grid-cols-3">
        {certifications.map((c, i) => (
          <motion.a
            key={c.name}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30, rotateX: -12 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            whileHover={{ y: -8, scale: 1.03 }}
            className="group relative flex flex-col items-center rounded-2xl glass border border-white/10 p-8 text-center"
          >
            <div
              className={`mb-5 grid h-20 w-20 place-items-center rounded-full bg-gradient-to-b ${ring[c.accent]} ring-1 ring-white/10`}
            >
              <SiGooglecloud className="text-4xl" />
            </div>
            <span className="font-mono text-xs text-muted">{c.issuer}</span>
            <h3 className="mt-1 text-lg font-bold">{c.name}</h3>
            <span className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted opacity-0 transition-opacity group-hover:opacity-100">
              <FiExternalLink /> Verify credential
            </span>
            <span className="pointer-events-none absolute inset-x-6 -bottom-px h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.a>
        ))}
      </div>
    </section>
  );
}
