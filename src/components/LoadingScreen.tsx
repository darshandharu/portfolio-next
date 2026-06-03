"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const STAGES = ["Source", "Airflow", "BigQuery", "Transform", "Warehouse", "Power BI"];

export default function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2200);
    document.body.style.overflow = "hidden";
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="flex items-center gap-2 md:gap-3">
            {STAGES.map((s, i) => (
              <div key={s} className="flex items-center gap-2 md:gap-3">
                <motion.div
                  className="flex h-11 w-11 md:h-14 md:w-14 items-center justify-center rounded-xl glass text-[9px] md:text-[11px] font-mono text-center leading-tight px-1"
                  initial={{ opacity: 0.25, scale: 0.85, borderColor: "rgba(255,255,255,0.08)" }}
                  animate={{
                    opacity: [0.25, 1, 0.6],
                    scale: [0.85, 1.08, 1],
                    boxShadow: [
                      "0 0 0px rgba(139,92,246,0)",
                      "0 0 24px rgba(139,92,246,0.6)",
                      "0 0 8px rgba(59,130,246,0.3)",
                    ],
                  }}
                  transition={{ duration: 0.5, delay: i * 0.28, ease: "easeOut" }}
                >
                  {s}
                </motion.div>
                {i < STAGES.length - 1 && (
                  <motion.span
                    className="block h-[2px] w-4 md:w-7 origin-left rounded bg-gradient-to-r from-blue to-purple"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.28, delay: i * 0.28 + 0.2 }}
                  />
                )}
              </div>
            ))}
          </div>
          <motion.p
            className="mt-8 font-mono text-xs md:text-sm text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Initializing pipeline<span className="caret" />
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
