"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function ContactContent() {
  const [submitted, setSubmitted] = useState(false);
  const t = useTranslations("contact");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="pt-32 pb-12 md:pt-36 md:pb-20">
      <div className="max-w-content mx-auto px-6">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} className="mb-12">
            <p className="text-label font-semibold text-gold uppercase mb-4">
              {t("eyebrow")}
            </p>
            <h1 className="font-serif text-display-mobile md:text-display font-bold text-navy">
              {t("headline")}
            </h1>
            <p className="mt-4 text-body text-text-secondary max-w-xl">
              {t("subheading")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div variants={fadeUp}>
              {submitted ? (
                <div className="p-8 bg-surface rounded-lg border border-border-color shadow-sm text-center">
                  <h3 className="font-serif text-h3 font-bold text-navy mb-2">
                    {t("sentTitle")}
                  </h3>
                  <p className="text-body text-text-secondary">
                    {t("sentBody")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-[14px] font-medium text-navy mb-1.5">
                      {t("name")}
                    </label>
                    <input type="text" id="name" name="name" required className="w-full px-4 py-3 bg-surface border border-border-color rounded text-text-primary text-body placeholder:text-text-secondary/50 focus:outline-none focus:border-navy transition-colors min-h-[44px]" placeholder={t("namePlaceholder")} />
                  </div>
                  <div>
                    <label htmlFor="organization" className="block text-[14px] font-medium text-navy mb-1.5">
                      {t("organisation")}
                    </label>
                    <input type="text" id="organization" name="organization" className="w-full px-4 py-3 bg-surface border border-border-color rounded text-text-primary text-body placeholder:text-text-secondary/50 focus:outline-none focus:border-navy transition-colors min-h-[44px]" placeholder={t("orgPlaceholder")} />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[14px] font-medium text-navy mb-1.5">
                      {t("email")}
                    </label>
                    <input type="email" id="email" name="email" required className="w-full px-4 py-3 bg-surface border border-border-color rounded text-text-primary text-body placeholder:text-text-secondary/50 focus:outline-none focus:border-navy transition-colors min-h-[44px]" placeholder={t("emailPlaceholder")} />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-[14px] font-medium text-navy mb-1.5">
                      {t("message")}
                    </label>
                    <textarea id="message" name="message" rows={5} required className="w-full px-4 py-3 bg-surface border border-border-color rounded text-text-primary text-body placeholder:text-text-secondary/50 focus:outline-none focus:border-navy transition-colors resize-none" placeholder={t("messagePlaceholder")} />
                  </div>
                  <button type="submit" className="w-full px-6 py-3 bg-navy text-bg text-[14px] font-semibold tracking-[0.04em] rounded hover:opacity-90 transition-colors min-h-[44px]">
                    {t("submit")}
                  </button>
                </form>
              )}
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-8">
              <div>
                <h3 className="font-serif text-h3 font-bold text-navy mb-3">
                  {t("emailTitle")}
                </h3>
                <a href="mailto:info@stablus.ae" className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy text-bg text-[14px] font-semibold tracking-[0.04em] rounded hover:opacity-90 transition-colors min-h-[44px]">
                  {t("emailCta")}
                </a>
                <p className="mt-2 text-body text-text-secondary">info@stablus.ae</p>
              </div>
              <div className="p-5 bg-surface rounded-lg border border-border-color">
                <p className="text-body text-text-secondary">{t("responseNote")}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
