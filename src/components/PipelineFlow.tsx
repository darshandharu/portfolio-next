"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { SiApacheairflow, SiApachekafka, SiGooglebigquery } from "react-icons/si";
import { TbChartDots3, TbDatabaseImport } from "react-icons/tb";

type Node = { id: string; label: string; sub: string; icon: IconType; accent: string };

const NODES: Node[] = [
  { id: "src", label: "Sources", sub: "APIs · DBs · Files", icon: TbDatabaseImport, accent: "text-cyan" },
  { id: "kafka", label: "Kafka", sub: "Stream ingest", icon: SiApachekafka, accent: "text-blue-light" },
  { id: "airflow", label: "Airflow", sub: "Orchestration", icon: SiApacheairflow, accent: "text-purple-light" },
  { id: "bq", label: "BigQuery", sub: "Warehouse", icon: SiGooglebigquery, accent: "text-blue-light" },
  { id: "dash", label: "Dashboard", sub: "Analytics", icon: TbChartDots3, accent: "text-cyan" },
];

function Connector({ delay }: { delay: number }) {
  return (
    <div className="relative h-[2px] w-8 min-w-8 flex-none self-center overflow-visible rounded bg-white/10 md:min-w-0 md:flex-1">
      <div className="absolute inset-0 rounded bg-gradient-to-r from-blue/30 via-purple/30 to-cyan/30" />
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_8px_2px_rgba(34,211,238,0.55)]"
          initial={{ left: "0%", opacity: 0 }}
          animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.8, delay: delay + i * 0.6, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}

export default function PipelineFlow() {
  return (
    <div className="no-scrollbar -mx-1 flex items-stretch overflow-x-auto px-1 pb-1">
      {NODES.map((node, i) => {
        const Icon = node.icon;
        return (
          <div key={node.id} className="flex items-stretch md:min-w-0 md:flex-1">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -3 }}
              className="group flex w-[120px] flex-none flex-col gap-2 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 backdrop-blur transition-colors hover:border-purple/40 md:w-auto md:min-w-0 md:flex-1"
            >
              <div className="flex items-center justify-between">
                <span className={`text-2xl ${node.accent}`}>
                  <Icon />
                </span>
                <span className="live-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </div>
              <div>
                <div className="text-sm font-semibold leading-tight">{node.label}</div>
                <div className="font-mono text-[10px] text-muted">{node.sub}</div>
              </div>
            </motion.div>
            {i < NODES.length - 1 && <Connector delay={i * 0.3} />}
          </div>
        );
      })}
    </div>
  );
}
