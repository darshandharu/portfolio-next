"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { achievements } from "@/lib/data";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);
  const isFloat = !Number.isInteger(value);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="gradient-text text-4xl font-extrabold md:text-5xl">
      {isFloat ? display.toFixed(1) : Math.round(display)}
      {suffix}
    </span>
  );
}

export default function Achievements() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="relative grid grid-cols-2 gap-4 rounded-3xl glass p-8 md:grid-cols-4 md:p-10">
        <div className="absolute -top-3 left-6 rounded-full bg-bg px-3 font-mono text-[10px] uppercase tracking-widest text-muted">
          career.metrics
        </div>
        {achievements.map((a, i) => (
          <motion.div
            key={a.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <Counter value={a.value} suffix={a.suffix} />
            <p className="mt-2 text-sm text-muted">{a.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
