import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://portfolio-next-darshan-bs.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Darshan BS — Data Engineer | Google Cloud Certified",
  description:
    "Darshan BS — Data Engineer with 2.9+ years building scalable ETL pipelines on Google Cloud with BigQuery, Apache Airflow, and Cloud Composer. Google Cloud Certified.",
  keywords: [
    "Darshan BS", "Data Engineer", "BigQuery", "Apache Airflow", "Google Cloud",
    "GCP", "ETL", "Cloud Composer", "Data Warehousing", "Analytics Engineer",
    "Data Quality", "Power BI", "SQL", "Python",
  ],
  authors: [{ name: "Darshan BS" }],
  creator: "Darshan BS",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Darshan BS — Data Engineer | Google Cloud Certified",
    description:
      "Building scalable data pipelines, cloud solutions, and analytics platforms with BigQuery, Airflow, and GCP.",
    siteName: "Darshan BS — Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Darshan BS — Data Engineer",
    description:
      "Building scalable data pipelines, cloud solutions, and analytics platforms.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050711",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
