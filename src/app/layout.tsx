import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stablus | AI-Powered Consultancy for Regulated Financial Systems",
  description:
    "Stablus delivers AI-powered advisory documents for banks and financial institutions operating in the GCC. Regulatory readiness, architecture blueprints, and compliance documentation — built around CBUAE, DFSA, ADGM, VARA, and SCA frameworks. Delivered in hours, not weeks.",
  openGraph: {
    title: "Stablus | AI-Powered Consultancy for Regulated Financial Systems",
    description:
      "Stablus delivers AI-powered advisory documents for banks and financial institutions operating in the GCC. Regulatory readiness, architecture blueprints, and compliance documentation — built around CBUAE, DFSA, ADGM, VARA, and SCA frameworks. Delivered in hours, not weeks.",
    url: "https://stablus.ae",
    siteName: "Stablus",
    type: "website",
  },
  verification: {
    google: "kiwhhm1DAB9AljkuwI8EcYDipt1gp9iwAIIgFv5nNuc",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
