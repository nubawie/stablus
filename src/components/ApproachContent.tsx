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

export default function ApproachContent() {
  const t = useTranslations("approach");

  const phases = [
    {
      num: "01",
      name: t("phase1"),
      desc: t("phase1Desc"),
      outcomes: [t("phase1o1"), t("phase1o2"), t("phase1o3"), t("phase1o4")],
    },
    {
      num: "02",
      name: t("phase2"),
      desc: t("phase2Desc"),
      outcomes: [t("phase2o1"), t("phase2o2"), t("phase2o3"), t("phase2o4")],
    },
    {
      num: "03",
      name: t("phase3"),
      desc: t("phase3Desc"),
      outcomes: [t("phase3o1"), t("phase3o2"), t("phase3o3"), t("phase3o4")],
    },
    {
      num: "04",
      name: t("phase4"),
      desc: t("phase4Desc"),
      outcomes: [t("phase4o1"), t("phase4o2"), t("phase4o3"), t("phase4o4")],
    },
    {
      num: "05",
      name: t("phase5"),
      desc: t("phase5Desc"),
      outcomes: [t("phase5o1"), t("phase5o2"), t("phase5o3"), t("phase5o4")],
    },
  ];

  return (
    <div className="pt-32 pb-12 md:pt-36 md:pb-20">
      <div className="max-w-content mx-auto px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-16"
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
          <motion.p
            variants={fadeUp}
            className="mt-4 text-body text-text-secondary max-w-2xl"
          >
            {t("subheading")}
          </motion.p>
        </motion.div>

        <div className="space-y-6">
          {phases.map((phase) => (
            <motion.div
              key={phase.num}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              className="bg-surface rounded-lg border border-border-color shadow-sm p-6 md:p-10"
            >
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-[36px] font-serif font-bold text-border-color">
                  {phase.num}
                </span>
                <h2 className="font-serif text-h3-mobile md:text-h1-mobile font-bold text-navy">
                  {phase.name}
                </h2>
              </div>

              <p className="text-body text-text-secondary mb-6 max-w-3xl">
                {phase.desc}
              </p>

              <div>
                <h3 className="text-label font-semibold text-gold uppercase mb-3">
                  {t("outcomesLabel")}
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {phase.outcomes.map((outcome, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-body text-text-secondary"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
