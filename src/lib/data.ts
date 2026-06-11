export const profile = {
  name: "Darshan BS",
  title: "Data Engineer | Google Cloud Certified",
  tagline:
    "Building scalable data pipelines, cloud solutions, and analytics platforms.",
  roles: [
    "Data Engineer",
    "BigQuery Specialist",
    "Cloud Data Engineer",
    "Analytics Engineer",
  ],
  email: "darshbs047@gmail.com",
  github: "https://github.com/darshandharu",
  linkedin: "https://www.linkedin.com/in/darshanbs-data-engineer/",
  resume: "/resume.pdf",
  location: "Bengaluru, India",
};

export const about = {
  summary:
    "Data Engineer with 2.9 years of experience designing and operating cloud-native data platforms. At Accenture I built ETL pipelines on Google Cloud powering healthcare and CRM analytics — turning raw, high-volume source data into clean, governed, decision-ready datasets.",
  highlights: [
    "2.9 years of professional Data Engineering experience",
    "Built healthcare & CRM analytics platforms at Accenture",
    "Specialized in BigQuery, SQL, ETL, Apache Airflow & GCP",
    "Passionate about Data Engineering, Analytics, Cloud & AI",
  ],
  focus: ["Data Engineering", "Cloud (GCP)", "ETL & Orchestration", "Analytics & AI"],
};

export type Skill = { name: string; level: number; category: string };

export const skills: Skill[] = [
  { name: "SQL", level: 95, category: "Data" },
  { name: "BigQuery", level: 92, category: "Cloud" },
  { name: "Python", level: 85, category: "Data" },
  { name: "Apache Airflow", level: 88, category: "Orchestration" },
  { name: "Google Cloud Platform", level: 88, category: "Cloud" },
  { name: "Data Warehousing", level: 90, category: "Data" },
  { name: "ETL Development", level: 92, category: "Data" },
  { name: "Power BI", level: 80, category: "Analytics" },
  { name: "Git / GitHub", level: 85, category: "Tooling" },
  { name: "Data Quality Engineering", level: 88, category: "Data" },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    role: "Data Engineer",
    company: "Accenture",
    period: "Dec 2022 – Sept 2025",
    location: "Bengaluru, India",
    points: [
      "Built and optimized ETL pipelines using BigQuery for incremental, monthly, and full-history loads.",
      "Developed and managed Airflow DAGs on Cloud Composer to orchestrate multi-step workflows.",
      "Performed data transformation, cleansing, and validation to produce auditable datasets.",
      "Optimized queries using partitioning, clustering, and refactoring to cut scan costs.",
      "Supported healthcare analytics and CRM reporting for downstream business teams.",
    ],
  },
  {
    role: "B.E., Information Science",
    company: "CMR Institute of Technology",
    period: "2018 – 2022",
    location: "Bengaluru, India",
    points: ["Bachelor of Engineering in Information Science & Engineering."],
  },
];

export type Project = {
  title: string;
  blurb: string;
  description: string;
  features: string[];
  stack: string[];
  arch: string[];
  links?: { demo?: string; code?: string };
  accent: "blue" | "purple" | "cyan";
};

export const projects: Project[] = [
  {
    title: "Enterprise Data Quality Monitoring & Observability Platform",
    blurb:
      "Automated data quality & observability with validation, alerting, and KPI dashboards.",
    description:
      "Built a data quality platform using Python, BigQuery, Power BI, and IBM Scheduler with automated validation checks, audit logging, email alerts, and KPI dashboards — simulating enterprise-grade data observability.",
    features: [
      "Missing value detection",
      "Duplicate checks",
      "Schema validation",
      "Email alerts",
      "Audit logging",
      "Interactive KPI dashboard",
    ],
    stack: ["Python", "BigQuery", "Power BI", "IBM Scheduler", "SQL"],
    arch: ["Sources", "Validation Engine", "Audit Log", "Alerts", "KPI Dashboard"],
    links: {
      demo: "https://darshandharu-data-quality-mon-scriptsdashboard-streamlit-vzqtyr.streamlit.app/",
      code: "https://github.com/darshandharu/data-quality-monitoring-dashboard",
    },
    accent: "purple",
  },
  {
    title: "Healthcare ETL Pipeline Automation",
    blurb:
      "BigQuery ETL pipelines for Independence Blue Cross (IBC) healthcare data loads.",
    description:
      "Designed and optimized BigQuery ETL pipelines for Independence Blue Cross (IBC), supporting incremental, monthly, and historical healthcare data loads with governance-aligned validation.",
    features: [
      "Data ingestion",
      "Customer matching",
      "Deduplication",
      "Data governance",
      "Workflow orchestration",
    ],
    stack: ["BigQuery", "Apache Airflow", "Cloud Composer", "SQL", "GCP"],
    arch: ["Sources", "Airflow DAGs", "BigQuery Staging", "Curated Warehouse", "Reporting"],
    accent: "blue",
  },
];

export type Certification = {
  name: string;
  issuer: string;
  abbr: string;
  url: string;
  accent: "blue" | "purple" | "cyan";
};

export const certifications: Certification[] = [
  {
    name: "Associate Cloud Engineer",
    issuer: "Google Cloud",
    abbr: "ACE",
    url: "https://www.credly.com/users/darshan-bs.aaea1fbf",
    accent: "blue",
  },
  {
    name: "Cloud Digital Leader",
    issuer: "Google Cloud",
    abbr: "CDL",
    url: "https://www.credly.com/users/darshan-bs.aaea1fbf",
    accent: "cyan",
  },
  {
    name: "Generative AI Leader",
    issuer: "Google Cloud",
    abbr: "GAI",
    url: "https://www.credly.com/users/darshan-bs.aaea1fbf",
    accent: "purple",
  },
];

export type ArchNode = {
  id: string;
  label: string;
  desc: string;
  accent: "blue" | "purple" | "cyan";
};

export const architecture: ArchNode[] = [
  { id: "src", label: "Source Systems", desc: "Operational databases, flat files, and APIs feeding raw healthcare & CRM data.", accent: "cyan" },
  { id: "airflow", label: "Airflow / Cloud Composer", desc: "Orchestrates ingestion and transformation DAGs with scheduling, dependencies, and alerting.", accent: "blue" },
  { id: "staging", label: "BigQuery Staging Layer", desc: "Landing zone for raw loads — incremental, monthly, and full-history snapshots.", accent: "blue" },
  { id: "transform", label: "Transformation Layer", desc: "Cleansing, deduplication, customer matching, and validation logic.", accent: "purple" },
  { id: "warehouse", label: "Curated Data Warehouse", desc: "Governed, partitioned & clustered tables optimized for analytics consumption.", accent: "purple" },
  { id: "bi", label: "Power BI Dashboard", desc: "Self-serve reporting and KPI dashboards for business stakeholders.", accent: "cyan" },
];

export type Achievement = { value: number; suffix: string; label: string };

export const achievements: Achievement[] = [
  { value: 2.9, suffix: "+", label: "Years Experience" },
  { value: 480, suffix: "M+", label: "Records Processed" },
  { value: 40, suffix: "+", label: "ETL Pipelines Built" },
  { value: 99.7, suffix: "%", label: "Data Quality Score" },
];

/* ---------- Hero pipeline flow ---------- */
export type PipelineStage = { id: string; label: string; sub: string };
export const heroPipeline: PipelineStage[] = [
  { id: "src", label: "Sources", sub: "APIs · DBs · Files" },
  { id: "kafka", label: "Kafka", sub: "Stream ingest" },
  { id: "airflow", label: "Airflow", sub: "Orchestration" },
  { id: "bq", label: "BigQuery", sub: "Warehouse" },
  { id: "dash", label: "Dashboard", sub: "Analytics" },
];

/* ---------- Live command-center KPIs (hero) ---------- */
export const liveKpis = [
  { label: "Job success rate", value: "99.4%", trend: "+0.3%", good: true },
  { label: "Avg data freshness", value: "7 min", trend: "-2 min", good: true },
  { label: "Pipelines online", value: "12 / 12", trend: "100%", good: true },
  { label: "Scan cost saved", value: "62%", trend: "↓", good: true },
];

/* ---------- Streaming ticker ---------- */
export const tickerEvents = [
  "load.healthcare_claims · 1,284,003 rows · ✓ committed",
  "dag.curate_customer_360 · running · 00:42",
  "validate.schema(core.fct_claims) · 100% pass",
  "bq.partition_prune · scanned 1.2 GB (was 9.4 GB)",
  "dedupe.crm_contacts · 18,442 dupes removed · ✓",
  "freshness.mart_executive · 6m ago · within SLA",
  "merge.incremental(stg.events) · 402,118 upserts · ✓",
  "alert.cleared · airflow.composer · healthy",
];

/* ---------- Airflow-style DAG ---------- */
export type DagStatus = "success" | "running" | "queued";
export type DagNode = {
  id: string;
  label: string;
  status: DagStatus;
  col: number;
  row: number;
};
export type DagEdge = { from: string; to: string };

export const dagNodes: DagNode[] = [
  { id: "extract_api", label: "extract_api", status: "success", col: 0, row: 0 },
  { id: "extract_db", label: "extract_db", status: "success", col: 0, row: 2 },
  { id: "land_raw", label: "land_raw", status: "success", col: 1, row: 1 },
  { id: "validate_schema", label: "validate_schema", status: "success", col: 2, row: 1 },
  { id: "dedupe", label: "dedupe", status: "success", col: 3, row: 0 },
  { id: "customer_match", label: "customer_match", status: "success", col: 3, row: 2 },
  { id: "transform_curate", label: "transform_curate", status: "running", col: 4, row: 1 },
  { id: "load_warehouse", label: "load_warehouse", status: "queued", col: 5, row: 1 },
  { id: "quality_checks", label: "quality_checks", status: "queued", col: 6, row: 0 },
  { id: "publish_bi", label: "publish_bi", status: "queued", col: 6, row: 2 },
];

export const dagEdges: DagEdge[] = [
  { from: "extract_api", to: "land_raw" },
  { from: "extract_db", to: "land_raw" },
  { from: "land_raw", to: "validate_schema" },
  { from: "validate_schema", to: "dedupe" },
  { from: "validate_schema", to: "customer_match" },
  { from: "dedupe", to: "transform_curate" },
  { from: "customer_match", to: "transform_curate" },
  { from: "transform_curate", to: "load_warehouse" },
  { from: "load_warehouse", to: "quality_checks" },
  { from: "load_warehouse", to: "publish_bi" },
];

/* ---------- Data lineage graph ---------- */
export type LineageLayer = "source" | "staging" | "core" | "mart";
export type LineageNode = { id: string; label: string; layer: LineageLayer; col: number; row: number };
export const lineageNodes: LineageNode[] = [
  { id: "raw_events", label: "raw.events", layer: "source", col: 0, row: 0 },
  { id: "raw_customers", label: "raw.customers", layer: "source", col: 0, row: 1 },
  { id: "raw_claims", label: "raw.claims", layer: "source", col: 0, row: 2 },
  { id: "stg_customers", label: "stg.customers", layer: "staging", col: 1, row: 0 },
  { id: "stg_claims", label: "stg.claims", layer: "staging", col: 1, row: 2 },
  { id: "dim_customer", label: "core.dim_customer", layer: "core", col: 2, row: 0 },
  { id: "fct_claims", label: "core.fct_claims", layer: "core", col: 2, row: 2 },
  { id: "mart_exec", label: "mart.executive_kpis", layer: "mart", col: 3, row: 1 },
];
export const lineageEdges: DagEdge[] = [
  { from: "raw_events", to: "stg_customers" },
  { from: "raw_customers", to: "stg_customers" },
  { from: "raw_claims", to: "stg_claims" },
  { from: "stg_customers", to: "dim_customer" },
  { from: "stg_claims", to: "fct_claims" },
  { from: "dim_customer", to: "fct_claims" },
  { from: "dim_customer", to: "mart_exec" },
  { from: "fct_claims", to: "mart_exec" },
];

/* ---------- Warehouse layers (medallion) ---------- */
export type WarehouseLayer = {
  name: string;
  tier: string;
  tables: number;
  desc: string;
  accent: "cyan" | "blue" | "purple";
};
export const warehouseLayers: WarehouseLayer[] = [
  { name: "Raw / Landing", tier: "Bronze", tables: 38, desc: "Immutable source snapshots — incremental, monthly & full-history loads.", accent: "cyan" },
  { name: "Staging", tier: "Silver", tables: 24, desc: "Cleansed, deduplicated & schema-validated; customer matching applied.", accent: "blue" },
  { name: "Curated Core", tier: "Gold", tables: 16, desc: "Conformed dimensions & facts — partitioned and clustered for performance.", accent: "purple" },
  { name: "Marts / BI", tier: "Serving", tables: 9, desc: "Governed, query-optimized marts feeding Power BI & executive KPIs.", accent: "blue" },
];

/* ---------- Data Quality Monitoring ---------- */
export type PipelineHealth = {
  name: string;
  status: "healthy" | "running" | "degraded";
  success: number;
  freshness: string;
  lastRun: string;
};
export const pipelineHealth: PipelineHealth[] = [
  { name: "healthcare_claims_ingest", status: "healthy", success: 99.8, freshness: "4m ago", lastRun: "02:14" },
  { name: "crm_customer_360", status: "running", success: 99.1, freshness: "now", lastRun: "00:42" },
  { name: "incremental_events_merge", status: "healthy", success: 99.6, freshness: "6m ago", lastRun: "01:08" },
  { name: "executive_kpi_mart", status: "healthy", success: 100, freshness: "9m ago", lastRun: "00:55" },
  { name: "schema_drift_monitor", status: "healthy", success: 100, freshness: "2m ago", lastRun: "00:18" },
];

export const dqMetrics = {
  jobSuccessRate: 99.4,
  freshnessMinutes: 7,
  schemaValidation: 100,
  scanCostReduction: 62,
  recordsToday: "12.4M",
  checksPassed: "1,847 / 1,852",
};

export const dqChecks = [
  { name: "Null / missing values", pass: true, detail: "0 critical nulls in 1.2M rows" },
  { name: "Duplicate detection", pass: true, detail: "18,442 dupes removed" },
  { name: "Schema validation", pass: true, detail: "100% column contract match" },
  { name: "Referential integrity", pass: true, detail: "no orphan FKs" },
  { name: "Freshness SLA (< 15m)", pass: true, detail: "7m — within SLA" },
  { name: "Row-count anomaly", pass: false, detail: "+3.1% vs 7-day avg (review)" },
];

export const costSeries = [
  { label: "Mon", before: 9.4, after: 3.6 },
  { label: "Tue", before: 8.9, after: 3.1 },
  { label: "Wed", before: 10.2, after: 3.9 },
  { label: "Thu", before: 9.1, after: 3.4 },
  { label: "Fri", before: 11.0, after: 4.1 },
  { label: "Sat", before: 7.8, after: 2.9 },
  { label: "Sun", before: 8.3, after: 3.0 },
];

/* ---------- Recruiter: business impact + highlights ---------- */
export const businessImpact = [
  { metric: "↓ 62%", label: "BigQuery scan cost", desc: "Partitioning, clustering & query refactoring on high-frequency jobs." },
  { metric: "99.7%", label: "Data quality score", desc: "Automated validation, audit logging & observability framework." },
  { metric: "480M+", label: "Records processed", desc: "Incremental, monthly & full-history loads across domains." },
  { metric: "40+", label: "ETL pipelines built", desc: "Across healthcare & CRM analytics at enterprise scale." },
];

export const resumeHighlights = [
  "Designed & maintained SQL-based ETL pipelines in BigQuery for incremental, monthly & full-history loads.",
  "Built and managed Apache Airflow DAGs on Cloud Composer with scheduling, dependencies & alerting.",
  "Engineered staging & curated tables with deduplication, cleansing & audit-column logic for auditable datasets.",
  "Optimized BigQuery via partitioning, clustering & query refactoring — cutting scan costs on high-frequency jobs.",
  "Delivered the healthcare ETL pipeline for Independence Blue Cross (IBC) with governance-aligned validation.",
];
