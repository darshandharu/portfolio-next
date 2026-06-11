"use client";

import { useState } from "react";

export type GraphNode = {
  id: string;
  label: string;
  col: number;
  row: number;
  tone: string; // hex
  status?: "success" | "running" | "queued";
};
export type GraphEdge = { from: string; to: string };

const COL = 172;
const ROW = 104;
const NW = 132;
const NH = 56;
const PAD = 18;

const STATUS_COLOR: Record<string, string> = {
  success: "#34d399",
  running: "#fbbf24",
  queued: "#64748b",
};

export default function FlowGraph({
  nodes,
  edges,
}: {
  nodes: GraphNode[];
  edges: GraphEdge[];
}) {
  const [active, setActive] = useState<string | null>(null);

  const maxCol = Math.max(...nodes.map((n) => n.col));
  const maxRow = Math.max(...nodes.map((n) => n.row));
  const W = PAD * 2 + maxCol * COL + NW;
  const H = PAD * 2 + maxRow * ROW + NH;

  const pos = (n: GraphNode) => ({ x: PAD + n.col * COL, y: PAD + n.row * ROW });
  const byId = (id: string) => nodes.find((n) => n.id === id)!;

  const isEdgeActive = (e: GraphEdge) =>
    active !== null && (e.from === active || e.to === active);
  const isNodeDim = (id: string) => {
    if (active === null) return false;
    if (id === active) return false;
    const connected = edges.some(
      (e) =>
        (e.from === active && e.to === id) || (e.to === active && e.from === id)
    );
    return !connected;
  };

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full min-w-[640px]"
        role="img"
        aria-label="Pipeline graph"
      >
        {/* edges */}
        {edges.map((e, i) => {
          const a = pos(byId(e.from));
          const b = pos(byId(e.to));
          const x1 = a.x + NW;
          const y1 = a.y + NH / 2;
          const x2 = b.x;
          const y2 = b.y + NH / 2;
          const mx = (x1 + x2) / 2;
          const activeEdge = isEdgeActive(e);
          return (
            <path
              key={i}
              d={`M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`}
              fill="none"
              stroke={activeEdge ? "#a78bfa" : "rgba(148,163,184,0.35)"}
              strokeWidth={activeEdge ? 2.4 : 1.4}
              className="flow-line"
              style={{ transition: "stroke 0.25s, stroke-width 0.25s" }}
            />
          );
        })}

        {/* nodes */}
        {nodes.map((n) => {
          const { x, y } = pos(n);
          const dim = isNodeDim(n.id);
          const on = active === n.id;
          return (
            <g
              key={n.id}
              transform={`translate(${x} ${y})`}
              onMouseEnter={() => setActive(n.id)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive((p) => (p === n.id ? null : n.id))}
              style={{
                cursor: "pointer",
                opacity: dim ? 0.4 : 1,
                transition: "opacity 0.25s",
              }}
            >
              <rect
                width={NW}
                height={NH}
                rx={11}
                fill="#0e1426"
                stroke={on ? n.tone : "rgba(255,255,255,0.12)"}
                strokeWidth={on ? 2 : 1.2}
                style={{
                  filter: on ? `drop-shadow(0 0 10px ${n.tone}88)` : "none",
                  transition: "stroke 0.25s",
                }}
              />
              <rect width={4} height={NH} rx={2} fill={n.tone} opacity={0.9} />
              {n.status && (
                <circle
                  cx={NW - 14}
                  cy={15}
                  r={5}
                  fill={STATUS_COLOR[n.status]}
                >
                  {n.status === "running" && (
                    <animate
                      attributeName="opacity"
                      values="1;0.3;1"
                      dur="1.2s"
                      repeatCount="indefinite"
                    />
                  )}
                </circle>
              )}
              <text
                x={16}
                y={NH / 2 + 1}
                fontFamily="var(--font-jetbrains), monospace"
                fontSize={13}
                fill="#e8eefb"
                dominantBaseline="middle"
              >
                {n.label}
              </text>
              {n.status && (
                <text
                  x={16}
                  y={NH / 2 + 17}
                  fontFamily="var(--font-jetbrains), monospace"
                  fontSize={9.5}
                  fill="#93a1bd"
                  dominantBaseline="middle"
                >
                  {n.status}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
