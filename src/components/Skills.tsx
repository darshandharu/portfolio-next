"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiApacheairflow,
  SiGooglebigquery,
  SiGooglecloud,
  SiGithub,
  SiPython,
} from "react-icons/si";
import {
  TbArrowsShuffle,
  TbBuildingWarehouse,
  TbChartHistogram,
  TbDatabase,
  TbShieldCheck,
} from "react-icons/tb";
import SectionHeading from "./SectionHeading";

type Item = { name: string; icon: IconType };
type Group = { category: string; accent: string; items: Item[] };

const groups: Group[] = [
  {
    category: "Cloud & Warehouse",
    accent: "text-blue-light",
    items: [
      { name: "Google Cloud Platform", icon: SiGooglecloud },
      { name: "BigQuery", icon: SiGooglebigquery },
      { name: "Data Warehousing", icon: TbBuildingWarehouse },
    ],
  },
  {
    category: "Data Engineering",
    accent: "text-purple-light",
    items: [
      { name: "SQL", icon: TbDatabase },
      { name: "Python", icon: SiPython },
      { name: "ETL Development", icon: TbArrowsShuffle },
    ],
  },
  {
    category: "Orchestration & Quality",
    accent: "text-cyan",
    items: [
      { name: "Apache Airflow", icon: SiApacheairflow },
      { name: "Data Quality Engineering", icon: TbShieldCheck },
    ],
  },
  {
    category: "Analytics & Tooling",
    accent: "text-blue-light",
    items: [
      { name: "Power BI", icon: TbChartHistogram },
      { name: "Git / GitHub", icon: SiGithub },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-24">
      <SectionHeading
        title="Tech Stack"
        subtitle="The tools I build with day to day — across cloud, data engineering, and analytics."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {groups.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: gi * 0.08 }}
            className="rounded-2xl glass p-6"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className={`h-2 w-2 rounded-full bg-current ${group.accent}`} />
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
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: gi * 0.08 + i * 0.06 }}
                    whileHover={{ y: -4 }}
                    className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 transition-colors hover:border-purple/50 hover:bg-white/[0.05]"
                  >
                    <span className={`text-2xl ${group.accent} transition-transform group-hover:scale-110`}>
                      <Icon />
                    </span>
                    <span className="text-sm font-medium">{item.name}</span>
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
