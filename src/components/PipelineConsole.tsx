"use client";

import { AnimatePresence, animate, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiPlay, FiRotateCcw } from "react-icons/fi";
import SectionHeading from "./SectionHeading";

/* ----------------------------- data ----------------------------- */
type Status = "success" | "running" | "idle" | "failed";
type Accent = "cyan" | "blue" | "purple" | "green";

type Stage = {
  id: string;
  label: string;
  sub: string;
  accent: Accent;
  records: string;
  latency: string;
  success: number;
  checks?: string[];
};

const STAGES: Stage[] = [
  { id: "source", label: "Source Systems", sub: "CRM · GDR · Vendor feeds", accent: "cyan", records: "100,000", latency: "0.8s", success: 100 },
  { id: "landing", label: "Landing Zone", sub: "Raw file arrival (GCS)", accent: "cyan", records: "100,000", latency: "1.2s", success: 100 },
  {
    id: "validation",
    label: "Source Validation",
    sub: "Pre-load quality gate",
    accent: "blue",
    records: "100,000",
    latency: "2.4s",
    success: 100,
    checks: ["Schema Validation", "Mandatory Column Check", "File Integrity Validation", "Datatype Validation"],
  },
  { id: "staging", label: "Staging Layer", sub: "BigQuery staging", accent: "blue", records: "100,000", latency: "3.1s", success: 100 },
  {
    id: "dqe",
    label: "Data Quality Engine",
    sub: "Cleanse · CDC · rules",
    accent: "purple",
    records: "99,850",
    latency: "5.6s",
    success: 99.85,
    checks: ["Referential Integrity Checks", "Deduplication Checks", "CDC Processing", "Business Rule Validation", "Null Threshold Monitoring"],
  },
  { id: "curated", label: "Curated Layer", sub: "Production tables", accent: "purple", records: "99,850", latency: "4.0s", success: 100 },
  { id: "analytics", label: "Analytics Layer", sub: "Dashboards & APIs", accent: "green", records: "99,850", latency: "0.6s", success: 100 },
];

const LINEAGE = [
  { id: "src", label: "Source File", sub: "crm_contacts_2026.csv" },
  { id: "land", label: "Landing Table", sub: "raw.crm_contacts" },
  { id: "stage", label: "Stage Table", sub: "stg.crm_contacts" },
  { id: "cur", label: "Curated Table", sub: "core.dim_customer" },
  { id: "tgt", label: "Target Table", sub: "mart.customer_360" },
];

const DAG_TASKS = [
  "receive_source_file",
  "validate_schema",
  "validate_datatypes",
  "load_staging",
  "run_ri_checks",
  "run_deduplication",
  "run_cdc",
  "load_target",
  "publish_success",
];

const REPLAY = [
  { label: "Records received", value: "100,000", note: "CRM · GDR · Vendor feeds" },
  { label: "Schema validation", value: "100,000 passed", note: "0 rejected · contract matched" },
  { label: "Deduplication", value: "2,345 removed", note: "exact + fuzzy match" },
  { label: "CDC processing", value: "15,000 updates · 5,000 inserts", note: "change data capture applied" },
  { label: "Referential integrity", value: "99,850 passed", note: "no orphan keys" },
  { label: "Target load", value: "99,850 loaded", note: "merge into core.dim_customer" },
  { label: "Pipeline successful", value: "exit 0", note: "publish_success ✓", done: true },
];

const COUNTERS = [
  { label: "Records Received", value: 100000, step: 0 },
  { label: "Records Validated", value: 100000, step: 1 },
  { label: "Duplicates Removed", value: 2345, step: 2 },
  { label: "CDC Updates Applied", value: 15000, step: 3 },
  { label: "Target Records Loaded", value: 99850, step: 5 },
];

const TOTAL = STAGES.length; // 7

const accentText: Record<Accent, string> = {
  cyan: "text-cyan",
  blue: "text-blue-light",
  purple: "text-purple-light",
  green: "text-emerald-400",
};
const accentHex: Record<Accent, string> = {
  cyan: "#22d3ee",
  blue: "#60a5fa",
  purple: "#a78bfa",
  green: "#34d399",
};
const STATUS_META: Record<Status, { dot: string; label: string; text: string }> = {
  success: { dot: "bg-emerald-400", label: "success", text: "text-emerald-400" },
  running: { dot: "bg-amber-400 live-dot", label: "running", text: "text-amber-400" },
  idle: { dot: "bg-slate-500", label: "idle", text: "text-slate-400" },
  failed: { dot: "bg-red-400", label: "failed", text: "text-red-400" },
};

/* ----------------------- helpers / atoms ----------------------- */
function LiveCounter({ value, active }: { value: number; active: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) {
      setV(0);
      return;
    }
    const c = animate(0, value, { duration: 1, ease: [0.22, 1, 0.36, 1], onUpdate: (x) => setV(x) });
    return () => c.stop();
  }, [active, value]);
  return <>{Math.round(v).toLocaleString()}</>;
}

function StatusPill({ status }: { status: Status }) {
  const m = STATUS_META[status];
  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] ${m.text}`}>
      <span className={`h-2 w-2 rounded-full ${m.dot}`} />
      {m.label}
    </span>
  );
}

function Connector({ active }: { active: boolean }) {
  return (
    <div className="relative mx-auto h-7 w-[2px] overflow-visible rounded bg-white/10">
      <div className={`absolute inset-0 rounded ${active ? "bg-gradient-to-b from-cyan to-purple" : "bg-white/10"}`} />
      {active &&
        [0, 1].map((i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_8px_2px_rgba(34,211,238,0.6)]"
            initial={{ top: "0%", opacity: 0 }}
            animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
            transition={{ duration: 1, delay: i * 0.5, repeat: Infinity, ease: "linear" }}
          />
        ))}
    </div>
  );
}

/* --------------------------- main --------------------------- */
type Mode = "pipeline" | "lineage" | "dag";

export default function PipelineConsole() {
  const [mode, setMode] = useState<Mode>("pipeline");
  const [hasRun, setHasRun] = useState(false);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [step, setStep] = useState(-1);
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["validation", "dqe"]));
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const run = () => {
    if (timer.current) clearTimeout(timer.current);
    setHasRun(true);
    setDone(false);
    setRunning(true);
    setStep(0);
  };

  useEffect(() => {
    if (!running) return;
    if (step >= TOTAL - 1) {
      timer.current = setTimeout(() => {
        setRunning(false);
        setDone(true);
      }, 800);
    } else {
      timer.current = setTimeout(() => setStep((s) => s + 1), 850);
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [running, step]);

  // status of a stage given run progress
  const stageStatus = (i: number): Status => {
    if (done) return "success";
    if (!hasRun) return STAGES[i].id === "dqe" ? "running" : "success"; // last-run snapshot
    if (step > i) return "success";
    if (step === i) return "running";
    return "idle";
  };

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const counterActive = (cStep: number) => done || (hasRun && step >= cStep);
  const progress = hasRun ? (done ? 1 : (step + 1) / TOTAL) : 0.7;

  return (
    <section id="architecture" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-24">
      <SectionHeading
        title="Live ETL Pipeline Console"
        subtitle="A production-style view of a CRM / GDR onboarding pipeline. Switch views, hover the validation engines, and hit Run Pipeline to replay a real load end-to-end."
      />

      {/* controls */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex flex-wrap gap-1 rounded-xl glass p-1">
          {(["pipeline", "lineage", "dag"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`relative rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${
                mode === m ? "text-white" : "text-muted hover:text-text"
              }`}
            >
              {mode === m && (
                <motion.span layoutId="console-tab" className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue to-purple" transition={{ type: "spring", duration: 0.5 }} />
              )}
              <span className="relative z-10">{m === "dag" ? "DAG" : m}</span>
            </button>
          ))}
        </div>

        <button
          onClick={run}
          disabled={running}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue to-purple px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple/25 transition-transform hover:scale-105 disabled:opacity-60"
        >
          {running ? <FiRotateCcw className="animate-spin" /> : done ? <FiRotateCcw /> : <FiPlay />}
          {running ? "Running…" : done ? "Replay Pipeline" : "Run Pipeline"}
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        {/* ---------------- canvas ---------------- */}
        <div className="overflow-hidden rounded-2xl glass">
          <div className="terminal-bar">
            <span className="terminal-dot bg-red-400/80" />
            <span className="terminal-dot bg-amber-400/80" />
            <span className="terminal-dot bg-emerald-400/80" />
            <span className="ml-2 font-mono text-[11px] text-muted">crm_gdr_onboarding · {mode === "dag" ? "airflow" : mode}</span>
            <span className="ml-auto font-mono text-[11px] text-muted">{Math.round(progress * 100)}%</span>
          </div>

          <div className="p-5 md:p-6">
            <div>
              {/* ---------- PIPELINE ---------- */}
              {mode === "pipeline" && (
                <motion.div key="pipeline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                  {STAGES.map((s, i) => {
                    const status = stageStatus(i);
                    const open = expanded.has(s.id);
                    const dim = status === "idle";
                    return (
                      <div key={s.id} className="flex flex-col items-center">
                        <motion.div
                          onMouseEnter={() => s.checks && setExpanded((p) => new Set(p).add(s.id))}
                          onClick={() => s.checks && toggle(s.id)}
                          className={`w-full rounded-xl border bg-surface/60 p-4 transition-all ${
                            s.checks ? "cursor-pointer" : ""
                          } ${dim ? "opacity-45" : "opacity-100"}`}
                          style={{
                            borderColor: status === "running" ? accentHex[s.accent] : "rgba(255,255,255,0.1)",
                            boxShadow: status === "running" ? `0 0 22px -8px ${accentHex[s.accent]}` : "none",
                          }}
                          animate={status === "running" ? { scale: [1, 1.012, 1] } : { scale: 1 }}
                          transition={{ duration: 1.2, repeat: status === "running" ? Infinity : 0 }}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="h-2.5 w-2.5 rounded-full" style={{ background: accentHex[s.accent] }} />
                                <span className="font-semibold leading-tight">{s.label}</span>
                              </div>
                              <div className="mt-0.5 font-mono text-[11px] text-muted">{s.sub}</div>
                            </div>
                            <StatusPill status={status} />
                          </div>

                          {/* metrics */}
                          <div className="mt-3 grid grid-cols-3 gap-2">
                            <Metric k="records" v={s.records} />
                            <Metric k="latency" v={s.latency} />
                            <Metric k="success" v={`${s.success}%`} />
                          </div>

                          {/* expandable checks */}
                          {s.checks && (
                            <AnimatePresence initial={false}>
                              {open && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="mt-3 grid grid-cols-1 gap-1.5 border-t border-white/10 pt-3 sm:grid-cols-2">
                                    {s.checks.map((c) => (
                                      <div key={c} className="flex items-center gap-2 font-mono text-[11px] text-muted">
                                        <span className={accentText[s.accent]}>✓</span>
                                        {c}
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          )}
                        </motion.div>
                        {i < STAGES.length - 1 && <Connector active={hasRun ? step > i || done : true} />}
                      </div>
                    );
                  })}
                </motion.div>
              )}

              {/* ---------- LINEAGE ---------- */}
              {mode === "lineage" && (
                <motion.div key="lineage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                  {LINEAGE.map((n, i) => {
                    const reached = hasRun ? Math.floor(((done ? TOTAL : step + 1) / TOTAL) * LINEAGE.length) : LINEAGE.length;
                    const on = i < reached;
                    return (
                      <div key={n.id} className="flex flex-col items-center">
                        <motion.div
                          className="flex w-full items-center justify-between rounded-xl border bg-surface/60 p-4 transition-all"
                          style={{ borderColor: on ? "#a78bfa" : "rgba(255,255,255,0.1)", opacity: on ? 1 : 0.45 }}
                          animate={on ? { boxShadow: ["0 0 0px rgba(167,139,250,0)", "0 0 18px -6px rgba(167,139,250,0.7)", "0 0 0px rgba(167,139,250,0)"] } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <div>
                            <div className="font-semibold">{n.label}</div>
                            <div className="font-mono text-[11px] text-muted">{n.sub}</div>
                          </div>
                          <span className="font-mono text-[10px] text-muted">{["SOURCE", "RAW", "STAGE", "CORE", "MART"][i]}</span>
                        </motion.div>
                        {i < LINEAGE.length - 1 && <Connector active={on} />}
                      </div>
                    );
                  })}
                </motion.div>
              )}

              {/* ---------- DAG ---------- */}
              {mode === "dag" && (
                <motion.div key="dag" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="grid gap-2.5 sm:grid-cols-2">
                  {DAG_TASKS.map((t, i) => {
                    const doneCount = hasRun ? Math.floor(((done ? TOTAL : step + 1) / TOTAL) * DAG_TASKS.length) : DAG_TASKS.length;
                    const status: Status = done || i < doneCount ? "success" : hasRun && i === doneCount ? "running" : hasRun ? "idle" : "success";
                    return (
                      <motion.div
                        key={t}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="flex items-center justify-between rounded-lg border border-white/10 bg-surface/60 px-3.5 py-2.5"
                        style={{ opacity: status === "idle" ? 0.45 : 1 }}
                      >
                        <span className="font-mono text-[12px]">{t}</span>
                        <StatusPill status={status} />
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* ---------------- monitor panel ---------------- */}
        <div className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl glass p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Pipeline monitor</span>
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-400">
                <span className="live-dot h-2 w-2 rounded-full bg-emerald-400" /> live
              </span>
            </div>
            <div className="space-y-3">
              <BigStat label="Pipeline health" value="99.9%" tone="text-emerald-400" />
              <BigStat label="Data quality score" value="98.7%" tone="gradient-text" />
              <div className="grid grid-cols-2 gap-3 pt-1">
                <SmallStat label="Processing time" value="4m 12s" />
                <SmallStat label="Last successful run" value="2m ago" />
                <SmallStat label="Failed records" value="150" />
                <SmallStat label="Throughput" value="397 r/s" />
              </div>
            </div>
          </div>

          {/* real-time counters */}
          <div className="rounded-2xl glass p-5">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Real-time counters</span>
            <div className="mt-3 space-y-2.5">
              {COUNTERS.map((c) => (
                <div key={c.label} className="flex items-center justify-between">
                  <span className="text-xs text-muted">{c.label}</span>
                  <span className="font-mono text-sm font-semibold text-text">
                    <LiveCounter value={c.value} active={counterActive(c.step)} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- live replay log ---------------- */}
      <AnimatePresence>
        {hasRun && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="terminal mt-5"
          >
            <div className="terminal-bar">
              <span className="terminal-dot bg-red-400/80" />
              <span className="terminal-dot bg-amber-400/80" />
              <span className="terminal-dot bg-emerald-400/80" />
              <span className="ml-2 text-muted">~/pipelines · airflow dags trigger crm_gdr_onboarding</span>
            </div>
            <div className="space-y-1 p-4">
              {REPLAY.map((r, i) => {
                const shown = done || step >= i;
                if (!shown) return null;
                return (
                  <motion.p key={r.label} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className={r.done ? "text-emerald-400" : ""}>
                    <span className="text-muted">{r.done ? "✓" : "→"}</span>{" "}
                    <span className={r.done ? "" : "text-blue-light"}>{r.label}</span>
                    <span className="text-muted"> · </span>
                    <span className="text-text">{r.value}</span>
                    <span className="text-muted"> · {r.note}</span>
                  </motion.p>
                );
              })}
              {running && <span className="caret" />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Metric({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg bg-white/[0.03] px-2.5 py-1.5">
      <div className="font-mono text-[9px] uppercase tracking-wider text-muted">{k}</div>
      <div className="font-mono text-xs font-semibold text-text">{v}</div>
    </div>
  );
}

function BigStat({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
      <span className="text-sm text-muted">{label}</span>
      <span className={`text-xl font-bold ${tone}`}>{value}</span>
    </div>
  );
}

function SmallStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
      <div className="font-mono text-[9px] uppercase tracking-wider text-muted">{label}</div>
      <div className="mt-0.5 text-sm font-semibold">{value}</div>
    </div>
  );
}
