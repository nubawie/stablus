"use client";

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

export default function AboutContent() {
  const t = useTranslations("about");

  return (
    <div className="pt-32 pb-12 md:pt-36 md:pb-20">
      <div className="max-w-content mx-auto px-6">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
          <motion.p variants={fadeUp} className="text-label font-semibold text-gold uppercase mb-4">{t("eyebrow")}</motion.p>
          <motion.h1 variants={fadeUp} className="font-serif text-display-mobile md:text-display font-bold text-navy">{t("headline")}</motion.h1>

          <motion.div variants={fadeUp} className="mt-12">
            <h2 className="font-serif text-h1-mobile md:text-h1 font-bold text-navy mb-4">{t("bgTitle")}</h2>
            <p className="text-body text-text-secondary">{t("bgBody")}</p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10">
            <h2 className="font-serif text-h1-mobile md:text-h1 font-bold text-navy mb-4">{t("whyTitle")}</h2>
            <p className="text-body text-text-secondary">{t("whyBody")}</p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10">
            <h2 className="font-serif text-h1-mobile md:text-h1 font-bold text-navy mb-4">{t("regTitle")}</h2>
            <p className="text-body text-text-secondary">{t("regBody")}</p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10">
            <h2 className="font-serif text-h1-mobile md:text-h1 font-bold text-navy mb-4">{t("licTitle")}</h2>
            <p className="text-body text-text-secondary">{t("licBody")}</p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-14 p-6 md:p-8 bg-surface rounded-lg border border-border-color shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-1">
              <h3 className="font-serif text-h3 font-bold text-navy mb-1">{t("contactTitle")}</h3>
              <p className="text-body text-text-secondary">{t("contactBody")}</p>
            </div>
            <a href="mailto:info@stablus.ae" className="px-5 py-2.5 bg-navy text-bg text-[14px] font-semibold tracking-[0.04em] rounded hover:opacity-90 transition-colors min-h-[44px] flex items-center">
              {t("emailCta")}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
