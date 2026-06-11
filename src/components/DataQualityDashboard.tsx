"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { costSeries, dqChecks, dqMetrics } from "@/lib/data";
import SectionHeading from "./SectionHeading";

function AnimatedNumber({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: setV });
    return () => c.stop();
  }, [inView, value]);
  return (
    <span ref={ref}>
      {v.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function Gauge({ value }: { value: number }) {
  const ref = useRef<SVGCircleElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const r = 52;
  const circ = 2 * Math.PI * r;
  const [offset, setOffset] = useState(circ);
  useEffect(() => {
    if (!inView) return;
    const target = circ * (1 - value / 100);
    const c = animate(circ, target, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: setOffset });
    return () => c.stop();
  }, [inView, value, circ]);
  return (
    <div className="relative grid place-items-center">
      <svg width="140" height="140" className="-rotate-90">
        <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
        <circle
          ref={ref}
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke="url(#dqgrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
        />
        <defs>
          <linearGradient id="dqgrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <div className="text-2xl font-bold gradient-text">
          <AnimatedNumber value={value} decimals={1} suffix="%" />
        </div>
        <div className="font-mono text-[10px] text-muted">DQ score</div>
      </div>
    </div>
  );
}

const maxCost = Math.max(...costSeries.map((d) => d.before));

export default function DataQualityDashboard() {
  return (
    <section id="data-quality" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-24">
      <SectionHeading
        title="Data Quality Monitoring"
        subtitle="A production-style observability dashboard — pipeline health, freshness, schema validation, and BigQuery cost optimization."
      />

      <div className="overflow-hidden rounded-2xl glass">
        {/* window bar */}
        <div className="terminal-bar">
          <span className="terminal-dot bg-red-400/80" />
          <span className="terminal-dot bg-amber-400/80" />
          <span className="terminal-dot bg-emerald-400/80" />
          <span className="ml-2 font-mono text-[11px] text-muted">data-quality-monitor · prod</span>
          <span className="ml-auto flex items-center gap-2 font-mono text-[11px] text-emerald-400">
            <span className="live-dot h-2 w-2 rounded-full bg-emerald-400" /> healthy
          </span>
        </div>

        <div className="p-5 md:p-7">
          {/* top metrics */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { v: dqMetrics.jobSuccessRate, d: 1, s: "%", label: "Job success rate" },
              { v: dqMetrics.freshnessMinutes, d: 0, s: " min", label: "Avg freshness" },
              { v: dqMetrics.schemaValidation, d: 0, s: "%", label: "Schema validation" },
              { v: dqMetrics.scanCostReduction, d: 0, s: "%", label: "Scan cost ↓" },
            ].map((m) => (
              <div key={m.label} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="text-2xl font-bold gradient-text">
                  <AnimatedNumber value={m.v} decimals={m.d} suffix={m.s} />
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">{m.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[300px_1fr]">
            {/* gauge + counts */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <Gauge value={99.7} />
              <div className="mt-4 grid w-full grid-cols-2 gap-3 text-center">
                <div>
                  <div className="text-lg font-bold">{dqMetrics.recordsToday}</div>
                  <div className="font-mono text-[10px] text-muted">records today</div>
                </div>
                <div>
                  <div className="text-lg font-bold">{dqMetrics.checksPassed}</div>
                  <div className="font-mono text-[10px] text-muted">checks passed</div>
                </div>
              </div>
            </div>

            {/* cost chart */}
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-semibold">BigQuery scan cost · GB / day</h3>
                <div className="flex items-center gap-4 font-mono text-[10px] text-muted">
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-white/20" /> before</span>
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-gradient-to-r from-blue to-purple" /> after</span>
                </div>
              </div>
              <div className="flex h-40 items-stretch justify-between gap-2 md:gap-4">
                {costSeries.map((d, i) => (
                  <div key={d.label} className="flex flex-1 flex-col items-center gap-1.5">
                    <div className="flex w-full flex-1 items-end justify-center gap-1">
                      <motion.div
                        className="w-1/2 rounded-t bg-white/15"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${(d.before / maxCost) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: i * 0.06 }}
                      />
                      <motion.div
                        className="w-1/2 rounded-t bg-gradient-to-t from-blue to-purple"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${(d.after / maxCost) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: i * 0.06 + 0.1 }}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-muted">{d.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* checks */}
          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {dqChecks.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3.5"
              >
                <span
                  className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md ${
                    c.pass ? "bg-emerald-400/15 text-emerald-400" : "bg-amber-400/15 text-amber-400"
                  }`}
                >
                  {c.pass ? <FiCheck size={14} /> : <FiX size={14} />}
                </span>
                <div>
                  <div className="text-sm font-medium">{c.name}</div>
                  <div className="font-mono text-[11px] text-muted">{c.detail}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* terminal log */}
          <div className="terminal mt-5">
            <div className="terminal-bar">
              <span className="terminal-dot bg-red-400/80" />
              <span className="terminal-dot bg-amber-400/80" />
              <span className="terminal-dot bg-emerald-400/80" />
              <span className="ml-2 text-muted">~/pipelines · airflow tasks run validate_dq</span>
            </div>
            <div className="space-y-1 p-4">
              <p><span className="text-muted">$</span> <span className="text-blue-light">python</span> dq/run_checks.py --table core.fct_claims</p>
              <p className="text-emerald-400">✓ null_check        passed   0 critical nulls / 1,204,883 rows</p>
              <p className="text-emerald-400">✓ duplicate_check   passed   18,442 dupes removed</p>
              <p className="text-emerald-400">✓ schema_contract   passed   100% column match</p>
              <p className="text-amber-400">⚠ rowcount_anomaly  review   +3.1% vs 7-day avg</p>
              <p className="text-emerald-400">✓ freshness_sla     passed   7m &lt; 15m SLA</p>
              <p className="text-muted">— 1,847 / 1,852 checks passed · DQ score 99.7% · exit 0</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
