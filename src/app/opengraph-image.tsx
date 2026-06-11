import { ImageResponse } from "next/og";

export const alt =
  "Darshan BS — Data Engineer | Google Cloud Certified. Building scalable ETL pipelines, cloud data platforms, and analytics solutions.";
export const size = { width: 1200, height: 627 };
export const contentType = "image/png";

const BLUE = "#60a5fa";
const PURPLE = "#a78bfa";
const CYAN = "#22d3ee";
const TEXT = "#e8eefb";
const MUTED = "#93a1bd";

const TECH = [
  "Google Cloud",
  "BigQuery",
  "Apache Airflow",
  "SQL",
  "Python",
  "Power BI",
  "GitHub",
];

const STATS = [
  { value: "2.9+", label: "Years Experience" },
  { value: "Healthcare", label: "Data Projects" },
  { value: "Google Cloud", label: "Certified ×3" },
  { value: "ETL & Analytics", label: "Specialist" },
];

const PIPELINE = ["Source", "Airflow", "BigQuery", "Warehouse", "Power BI"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "52px 64px",
          backgroundColor: "#050711",
          color: TEXT,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* grid layer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* glow blue */}
        <div
          style={{
            position: "absolute",
            top: -160,
            left: -120,
            width: 640,
            height: 520,
            display: "flex",
            backgroundImage:
              "radial-gradient(circle at center, rgba(59,130,246,0.35), transparent 60%)",
          }}
        />
        {/* glow purple */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -140,
            width: 640,
            height: 540,
            display: "flex",
            backgroundImage:
              "radial-gradient(circle at center, rgba(139,92,246,0.38), transparent 60%)",
          }}
        />
        {/* glow cyan bottom */}
        <div
          style={{
            position: "absolute",
            bottom: -200,
            left: "30%",
            width: 700,
            height: 460,
            display: "flex",
            backgroundImage:
              "radial-gradient(circle at center, rgba(34,211,238,0.16), transparent 60%)",
          }}
        />

        {/* HEADER */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 18px",
              borderRadius: 999,
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                backgroundColor: "#34d399",
                display: "flex",
              }}
            />
            <div style={{ fontSize: 20, color: MUTED }}>
              Open to Data Engineer roles
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 20, color: MUTED }}>
              darshan-data-engineer.vercel.app
            </div>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                fontWeight: 800,
                color: "#0b1020",
                backgroundImage: `linear-gradient(135deg, ${BLUE}, ${PURPLE})`,
              }}
            >
              DB
            </div>
          </div>
        </div>

        {/* MIDDLE */}
        <div style={{ display: "flex", flexDirection: "column", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              fontSize: 88,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.05,
              backgroundImage: `linear-gradient(110deg, ${BLUE}, ${PURPLE} 55%, ${CYAN})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            DARSHAN BS
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 14,
              fontSize: 34,
              fontWeight: 600,
              color: TEXT,
            }}
          >
            Data Engineer  ·  Google Cloud Certified
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 12,
              fontSize: 24,
              color: MUTED,
              maxWidth: 940,
              lineHeight: 1.35,
            }}
          >
            Building scalable ETL pipelines, cloud data platforms, and analytics
            solutions.
          </div>

          {/* pipeline motif */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 26,
            }}
          >
            {PIPELINE.map((stage, i) => (
              <div
                key={stage}
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <div
                  style={{
                    display: "flex",
                    padding: "7px 14px",
                    borderRadius: 10,
                    fontSize: 17,
                    color: TEXT,
                    backgroundColor: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  {stage}
                </div>
                {i < PIPELINE.length - 1 && (
                  <div style={{ display: "flex", fontSize: 18, color: CYAN }}>
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* tech chips */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 22,
            }}
          >
            {TECH.map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  padding: "8px 16px",
                  borderRadius: 999,
                  fontSize: 18,
                  color: "#cbd5e1",
                  backgroundColor: "rgba(139,92,246,0.10)",
                  border: "1px solid rgba(139,92,246,0.28)",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* divider */}
        <div
          style={{
            display: "flex",
            height: 1,
            width: "100%",
            backgroundImage:
              "linear-gradient(90deg, transparent, rgba(139,92,246,0.5), rgba(59,130,246,0.5), transparent)",
            zIndex: 1,
          }}
        />

        {/* STATS */}
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            gap: 16,
            zIndex: 1,
          }}
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                padding: "16px 20px",
                borderRadius: 16,
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 28,
                  fontWeight: 800,
                  backgroundImage: `linear-gradient(110deg, ${BLUE}, ${PURPLE})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                {s.value}
              </div>
              <div style={{ display: "flex", marginTop: 6, fontSize: 17, color: MUTED }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
