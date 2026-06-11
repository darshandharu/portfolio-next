"use client";

import { tickerEvents } from "@/lib/data";

export default function Ticker() {
  const items = [...tickerEvents, ...tickerEvents];
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/30 py-2.5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-bg to-transparent" />
      <div className="marquee-track gap-8 font-mono text-[11px] text-muted">
        {items.map((e, i) => (
          <span key={i} className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {e}
          </span>
        ))}
      </div>
    </div>
  );
}
