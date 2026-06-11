"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiArrowDown } from "react-icons/fi";
import {
  dagEdges,
  dagNodes,
  lineageEdges,
  lineageNodes,
  pipelineHealth,
  warehouseLayers,
} from "@/lib/data";
import FlowGraph, { type GraphNode } from "./FlowGraph";
import SectionHeading from "./SectionHeading";

const TABS = ["DAG", "Lineage", "Warehouse", "Monitoring"] as const;
type Tab = (typeof TABS)[number];

const STATUS_TONE: Record<string, string> = {
  success: "#34d399",
  running: "#fbbf24",
  queued: "#475569",
};
const LAYER_TONE: Record<string, string> = {
  source: "#22d3ee",
  staging: "#60a5fa",
  core: "#a78bfa",
  mart: "#34d399",
};
const TIER_TONE: Record<string, string> = {
  cyan: "#22d3ee",
  blue: "#60a5fa",
  purple: "#a78bfa",
};

const dagGraph: GraphNode[] = dagNodes.map((n) => ({
  ...n,
  tone: STATUS_TONE[n.status],
}));
const lineageGraph: GraphNode[] = lineageNodes.map((n) => ({
  ...n,
  tone: LAYER_TONE[n.layer],
}));

const RUNS = ["ok", "ok", "ok", "ok", "warn", "ok", "ok", "ok", "ok", "ok", "ok", "warn", "ok", "ok"];
const RUN_COLOR: Record<string, string> = {
  ok: "bg-emerald-400/80",
  warn: "bg-amber-400/80",
  run: "bg-blue-light",
};

export default function ArchitecturePlayground() {
  const [tab, setTab] = useState<Tab>("DAG");

  return (
    <section id="architecture" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-24">
      <SectionHeading
        title="Architecture Playground"
        subtitle="Explore the systems I build — orchestration DAGs, data lineage, warehouse layers, and live pipeline monitoring. Hover or tap any node."
      />

      {/* tabs */}
      <div className="mb-6 inline-flex flex-wrap gap-1 rounded-xl glass p-1">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              tab === t ? "text-white" : "text-muted hover:text-text"
            }`}
          >
            {tab === t && (
              <motion.span
                layoutId="arch-tab"
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue to-purple"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            <span className="relative z-10">{t}</span>
          </button>
        ))}
      </div>

      <div className="rounded-2xl glass p-5 md:p-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {tab === "DAG" && (
              <div>
                <Caption title="ETL orchestration DAG" note="Apache Airflow · Cloud Composer" />
                <FlowGraph nodes={dagGraph} edges={dagEdges} />
                <Legend
                  items={[
                    ["#34d399", "success"],
                    ["#fbbf24", "running"],
                    ["#475569", "queued"],
                  ]}
                />
              </div>
            )}

            {tab === "Lineage" && (
              <div>
                <Caption title="Column-level data lineage" note="source → staging → core → mart" />
                <FlowGraph nodes={lineageGraph} edges={lineageEdges} />
                <Legend
                  items={[
                    ["#22d3ee", "source"],
                    ["#60a5fa", "staging"],
                    ["#a78bfa", "core"],
                    ["#34d399", "mart"],
                  ]}
                />
              </div>
            )}

            {tab === "Warehouse" && (
              <div>
                <Caption title="Medallion warehouse architecture" note="BigQuery" />
                <div className="flex flex-col items-center gap-2">
                  {warehouseLayers.map((layer, i) => (
                    <div key={layer.name} className="flex w-full max-w-2xl flex-col items-center">
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                        whileHover={{ scale: 1.015 }}
                        className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4"
                        style={{ borderLeft: `3px solid ${TIER_TONE[layer.accent]}` }}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className="rounded-md px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider"
                              style={{ background: `${TIER_TONE[layer.accent]}22`, color: TIER_TONE[layer.accent] }}
                            >
                              {layer.tier}
                            </span>
                            <span className="font-semibold">{layer.name}</span>
                          </div>
                          <p className="mt-1.5 text-sm text-muted">{layer.desc}</p>
                        </div>
                        <div className="ml-4 shrink-0 text-right">
                          <div className="text-xl font-bold text-text">{layer.tables}</div>
                          <div className="font-mono text-[10px] text-muted">tables</div>
                        </div>
                      </motion.div>
                      {i < warehouseLayers.length - 1 && (
                        <FiArrowDown className="my-1 text-muted" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "Monitoring" && (
              <div>
                <Caption title="Pipeline run monitor" note="last 14 runs · live" />
                <div className="space-y-3">
                  {pipelineHealth.map((p, idx) => {
                    const runs = RUNS.slice(idx % 3, (idx % 3) + 12);
                    const last = p.status === "running" ? "run" : "ok";
                    return (
                      <div
                        key={p.name}
                        className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 md:flex-row md:items-center md:justify-between"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <StatusDot status={p.status} />
                            <span className="truncate font-mono text-sm">{p.name}</span>
                          </div>
                          <div className="mt-1 font-mono text-[11px] text-muted">
                            success {p.success}% · fresh {p.freshness} · {p.lastRun}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {runs.map((r, i) => (
                            <span
                              key={i}
                              className={`h-6 w-2 rounded-sm ${RUN_COLOR[r]}`}
                            />
                          ))}
                          <span className={`h-6 w-2 rounded-sm ${RUN_COLOR[last]}`} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function Caption({ title, note }: { title: string; note: string }) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
      <h3 className="font-semibold">{title}</h3>
      <span className="font-mono text-[11px] text-muted">{note}</span>
    </div>
  );
}

function Legend({ items }: { items: [string, string][] }) {
  return (
    <div className="mt-5 flex flex-wrap gap-4">
      {items.map(([c, l]) => (
        <span key={l} className="flex items-center gap-2 font-mono text-[11px] text-muted">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
          {l}
        </span>
      ))}
    </div>
  );
}

function StatusDot({ status }: { status: string }) {
  const c =
    status === "healthy" ? "bg-emerald-400" : status === "running" ? "bg-amber-400 live-dot" : "bg-red-400";
  return <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${c}`} />;
}
