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
    period: "Sept 2023 – Present",
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
  { value: 10, suffix: "+", label: "ETL Pipelines Delivered" },
  { value: 3, suffix: "", label: "Google Cloud Certifications" },
  { value: 5, suffix: "+", label: "Healthcare Data Projects" },
];
