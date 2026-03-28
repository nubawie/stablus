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

export default function PrivacyPage() {
  const t = useTranslations("dataHandlingPage");

  return (
    <div className="pt-32 pb-12 md:pt-36 md:pb-20">
      <div className="max-w-content mx-auto px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            className="text-label font-semibold text-gold uppercase mb-4"
          >
            {t("eyebrow")}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-serif text-display-mobile md:text-display font-bold text-navy"
          >
            {t("headline")}
          </motion.h1>

          <motion.div variants={fadeUp} className="mt-12">
            <h2 className="font-serif text-h1-mobile md:text-h1 font-bold text-navy mb-4">
              {t("s1Title")}
            </h2>
            <p className="text-body text-text-secondary">{t("s1Body")}</p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10">
            <h2 className="font-serif text-h1-mobile md:text-h1 font-bold text-navy mb-4">
              {t("s2Title")}
            </h2>
            <p className="text-body text-text-secondary">{t("s2Body")}</p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10">
            <h2 className="font-serif text-h1-mobile md:text-h1 font-bold text-navy mb-4">
              {t("s3Title")}
            </h2>
            <p className="text-body text-text-secondary">
              {t("s3Body")}{" "}
              <a
                href="mailto:info@stablus.ae"
                className="text-gold hover:text-gold-light transition-colors font-medium"
              >
                info@stablus.ae
              </a>
              . {t("s3After")}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
