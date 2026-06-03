"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiApacheairflow,
  SiGit,
  SiGithub,
  SiGooglebigquery,
  SiGooglecloud,
  SiPython,
} from "react-icons/si";
import {
  TbArrowsShuffle,
  TbBolt,
  TbBuildingWarehouse,
  TbChartHistogram,
  TbChecks,
  TbDatabase,
  TbSchema,
  TbShieldCheck,
} from "react-icons/tb";
import SectionHeading from "./SectionHeading";

type Item = { name: string; icon: IconType };
type Accent = "blue" | "purple" | "cyan";
type Group = { category: string; accent: Accent; items: Item[] };

const accentText: Record<Accent, string> = {
  blue: "text-blue-light",
  purple: "text-purple-light",
  cyan: "text-cyan",
};

const groups: Group[] = [
  {
    category: "Cloud & Data Platform",
    accent: "blue",
    items: [
      { name: "Google Cloud Platform", icon: SiGooglecloud },
      { name: "BigQuery", icon: SiGooglebigquery },
      { name: "Data Warehousing", icon: TbBuildingWarehouse },
    ],
  },
  {
    category: "Data Engineering",
    accent: "purple",
    items: [
      { name: "SQL", icon: TbDatabase },
      { name: "Python", icon: SiPython },
      { name: "ETL Development", icon: TbArrowsShuffle },
      { name: "Data Modeling", icon: TbSchema },
    ],
  },
  {
    category: "Orchestration & Data Quality",
    accent: "cyan",
    items: [
      { name: "Apache Airflow", icon: SiApacheairflow },
      { name: "Data Quality Engineering", icon: TbShieldCheck },
      { name: "Data Validation", icon: TbChecks },
      { name: "Workflow Automation", icon: TbBolt },
    ],
  },
  {
    category: "Analytics & Tools",
    accent: "blue",
    items: [
      { name: "Power BI", icon: TbChartHistogram },
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-24">
      <SectionHeading
        title="Tech Stack"
        subtitle="Technologies and tools I use to build scalable cloud-native data pipelines, data quality frameworks, and analytics solutions."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {groups.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: gi * 0.08 }}
            className="rounded-2xl glass p-6"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className={`h-2 w-2 rounded-full bg-current ${accentText[group.accent]}`} />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                {group.category}
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {group.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: gi * 0.06 + i * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="group relative flex items-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3.5 transition-colors hover:border-purple/50 hover:bg-white/[0.05]"
                  >
                    {/* hover sheen */}
                    <span className="pointer-events-none absolute -inset-px -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <span className={`text-2xl ${accentText[group.accent]} transition-transform duration-300 group-hover:scale-110`}>
                      <Icon />
                    </span>
                    <span className="text-sm font-medium leading-tight">{item.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
