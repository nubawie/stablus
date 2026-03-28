import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Stablus | AI-Powered Blockchain Compliance & Regulatory Consultancy — UAE & GCC",
  description:
    "Stablus delivers AI-powered regulatory readiness reports, system architecture blueprints, and compliance documentation for banks, fintechs, and VASPs operating in the UAE and GCC. Built around CBUAE, DFSA, ADGM, VARA, and SCA frameworks. VASP licensing, CBDC implementation, stablecoin compliance, and DeFi regulation advisory. Delivered in hours, not weeks.",
  keywords: [
    "CBUAE compliance",
    "VASP license UAE",
    "VARA license requirements",
    "crypto license Dubai",
    "blockchain compliance UAE",
    "CBDC implementation UAE",
    "stablecoin regulation UAE",
    "DeFi regulation UAE",
    "ADGM crypto framework",
    "DFSA digital assets",
    "regulatory readiness GCC",
    "blockchain consultant UAE",
    "fintech compliance GCC",
  ],
  openGraph: {
    title:
      "Stablus | AI-Powered Blockchain Compliance & Regulatory Consultancy — UAE & GCC",
    description:
      "Stablus delivers AI-powered regulatory readiness reports, system architecture blueprints, and compliance documentation for banks, fintechs, and VASPs operating in the UAE and GCC. Built around CBUAE, DFSA, ADGM, VARA, and SCA frameworks. Delivered in hours, not weeks.",
    url: "https://stablus.ae",
    siteName: "Stablus",
    type: "website",
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: "/apple-icon.png",
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
