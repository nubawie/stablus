"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const locale = useLocale();

  return (
    <footer className="bg-footer-bg border-t border-border-color">
      <div className="max-w-content mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Image
              src="/logo.png"
              alt="Stablus"
              width={160}
              height={27}
              className="stablus-logo"
            />
            <p className="mt-4 text-[14px] font-normal text-text-secondary leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          <div>
            <h4 className="text-label font-semibold text-gold uppercase mb-4">
              {t("pagesLabel")}
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { href: `/${locale}/services`, label: tn("services") },
                { href: `/${locale}/approach`, label: tn("approach") },
                { href: `/${locale}/about`, label: tn("about") },
                { href: `/${locale}/insights`, label: tn("insights") },
                { href: `/${locale}/start`, label: tn("startProject") },
                { href: `/${locale}/contact`, label: tn("contact") },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[14px] font-normal text-text-secondary hover:text-navy transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-label font-semibold text-gold uppercase mb-4">
              {t("legalLabel")}
            </h4>
            <div className="flex flex-col gap-3">
              <Link
                href={`/${locale}/legal/privacy-policy`}
                className="text-[14px] font-normal text-text-secondary hover:text-navy transition-colors"
              >
                {t("privacyPolicy")}
              </Link>
              <Link
                href={`/${locale}/legal/terms-conditions`}
                className="text-[14px] font-normal text-text-secondary hover:text-navy transition-colors"
              >
                {t("terms")}
              </Link>
              <Link
                href={`/${locale}/privacy`}
                className="text-[14px] font-normal text-text-secondary hover:text-navy transition-colors"
              >
                {t("dataHandling")}
              </Link>
            </div>
            <p className="mt-6 text-small font-medium text-text-secondary/70 leading-relaxed">
              {t("license")}
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border-color flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            {[
              {
                href: "https://www.facebook.com/stablus.global",
                label: "Facebook",
                icon: (
                  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                ),
              },
              {
                href: "https://www.instagram.com/stablus.global",
                label: "Instagram",
                icon: (
                  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                ),
              },
              {
                href: "https://x.com/stablus_global",
                label: "X",
                icon: (
                  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                ),
              },
              {
                href: "https://www.linkedin.com/company/stablus-global/",
                label: "LinkedIn",
                icon: (
                  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                ),
              },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-border-color text-text-secondary hover:border-gold hover:text-gold transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
