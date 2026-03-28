"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslations, useLocale } from "next-intl";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const t = useTranslations("nav");
  const locale = useLocale();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const navLinks = [
    { href: `/${locale}/services`, label: t("services") },
    { href: `/${locale}/approach`, label: t("approach") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/insights`, label: t("insights") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-surface ${
          isScrolled
            ? "shadow-sm border-b border-border-color"
            : "border-b border-transparent"
        }`}
      >
        <div className="max-w-content mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center">
            <Image
              src="/logo.png"
              alt="Stablus"
              width={192}
              height={32}
              className="stablus-logo"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[14px] font-medium tracking-[0.01em] text-text-primary hover:text-navy transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <LanguageSwitcher />
            <ThemeToggle />
            <Link
              href={`/${locale}/start`}
              className="px-5 py-2.5 bg-navy text-surface text-[14px] font-semibold tracking-[0.04em] rounded hover:opacity-90 transition-colors duration-200"
            >
              {t("startProject")}
            </Link>
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-navy transition-all duration-300 ${
                isMobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-navy transition-all duration-300 ${
                isMobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-navy transition-all duration-300 ${
                isMobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-surface border-b border-border-color overflow-hidden md:hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="py-3 text-[14px] font-medium text-text-primary hover:text-navy transition-colors border-b border-border-color/50 last:border-0"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={`/${locale}/start`}
                onClick={() => setIsMobileOpen(false)}
                className="mt-4 px-6 py-3 bg-navy text-surface text-center text-[14px] font-semibold tracking-[0.04em] rounded hover:opacity-90 transition-colors min-h-[44px] flex items-center justify-center"
              >
                {t("startProject")}
              </Link>
              <div className="mt-3 flex justify-center gap-3">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
