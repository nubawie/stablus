import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stablus | AI-Powered Consultancy for Regulated Financial Systems",
  description:
    "Compliance frameworks, architecture blueprints, and project documentation for regulated financial institutions in the GCC. Delivered in 48 hours.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
