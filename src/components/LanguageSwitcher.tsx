"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale() {
    const newLocale = locale === "en" ? "ar" : "en";
    const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, "") || "/";
    router.push(`/${newLocale}${pathWithoutLocale}`);
  }

  return (
    <button
      onClick={switchLocale}
      className="w-9 h-9 flex items-center justify-center rounded border border-border-color bg-surface hover:border-gold hover:text-gold transition-colors text-[12px] font-semibold text-text-secondary"
      aria-label={locale === "en" ? "Switch to Arabic" : "Switch to English"}
    >
      {locale === "en" ? "AR" : "EN"}
    </button>
  );
}
