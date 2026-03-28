"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import HeroVisual from "./HeroVisual";

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

const deliverableIcons = [
  "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  "M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L12 12.75 6.429 9.75m11.142 0l4.179 2.25-4.179 2.25m0 0L12 17.25l-5.571-3m11.142 0L22 14.25l-4.179 2.25M6.429 14.25L2.25 16.5l9.75 5.25 9.75-5.25-4.179-2.25",
  "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z",
  "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
  "M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z",
  "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v-1.5m0 1.5v1.5m3-3v3m3-4.5v4.5",
];

const deliverablePrices = [
  "AED 2,500",
  "AED 3,500",
  "AED 2,000",
  "AED 2,500",
  "AED 1,800",
  "AED 4,500",
];

// Turnaround times are now translated via deliverables.card*Time keys

export default function HomeContent() {
  const t = useTranslations();
  const locale = useLocale();

  const badges = ["CBUAE", "DFSA", "ADGM", "VARA", "SCA"];

  const problems = [
    { title: t("problem.card1Title"), desc: t("problem.card1Desc") },
    { title: t("problem.card2Title"), desc: t("problem.card2Desc") },
    { title: t("problem.card3Title"), desc: t("problem.card3Desc") },
  ];

  const steps = [
    { num: "01", title: t("howItWorks.step1Title"), desc: t("howItWorks.step1Desc") },
    { num: "02", title: t("howItWorks.step2Title"), desc: t("howItWorks.step2Desc") },
    { num: "03", title: t("howItWorks.step3Title"), desc: t("howItWorks.step3Desc") },
  ];

  const deliverables = Array.from({ length: 6 }, (_, i) => ({
    title: t(`deliverables.card${i + 1}Title`),
    desc: t(`deliverables.card${i + 1}Desc`),
    turnaround: t(`deliverables.card${i + 1}Time`),
    price: deliverablePrices[i],
    iconPath: deliverableIcons[i],
  }));

  const reasons = [
    { title: t("whyStablus.col1Title"), desc: t("whyStablus.col1Desc") },
    { title: t("whyStablus.col2Title"), desc: t("whyStablus.col2Desc") },
    { title: t("whyStablus.col3Title"), desc: t("whyStablus.col3Desc") },
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-12 md:pt-48 md:pb-20">
        <div className="max-w-content mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.h1
                variants={fadeUp}
                className="font-serif text-display-mobile md:text-display font-bold text-navy"
              >
                {t("hero.headline")}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="mt-6 text-body text-text-secondary max-w-lg"
              >
                {t("hero.subheading")}
              </motion.p>
              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href={`/${locale}/start`}
                  className="px-7 py-3.5 bg-navy text-bg text-[14px] font-semibold tracking-[0.04em] rounded hover:opacity-90 transition-colors min-h-[44px] flex items-center justify-center"
                >
                  {t("hero.cta1")} &rarr;
                </Link>
                <Link
                  href={`/${locale}/services`}
                  className="px-7 py-3.5 border border-navy text-navy text-[14px] font-semibold tracking-[0.04em] rounded hover:bg-navy hover:text-bg transition-colors min-h-[44px] flex items-center justify-center"
                >
                  {t("hero.cta2")}
                </Link>
              </motion.div>
              <motion.div
                variants={fadeUp}
                className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-small font-medium text-text-secondary"
              >
                {badges.map((badge) => (
                  <span key={badge} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-gold" />
                    {badge}
                  </span>
                ))}
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden md:block w-full h-[500px] relative bg-[#0a0a0f] rounded-2xl overflow-hidden"
            >
              <HeroVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-12 md:py-20">
        <div className="max-w-content mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-label font-semibold text-gold uppercase mb-4">{t("problem.eyebrow")}</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-h1-mobile md:text-h1 font-bold text-navy">{t("problem.headline")}</motion.h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {problems.map((p) => (
                <motion.div key={p.title} variants={fadeUp} className="p-6 bg-surface rounded-lg border border-border-color">
                  <h3 className="font-serif text-h3-mobile md:text-h3 font-bold text-navy mb-2">{p.title}</h3>
                  <p className="text-body text-text-secondary">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-20 border-t border-border-color">
        <div className="max-w-content mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-label font-semibold text-gold uppercase mb-4">{t("howItWorks.eyebrow")}</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-h1-mobile md:text-h1 font-bold text-navy">{t("howItWorks.headline")}</motion.h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((s) => (
                <motion.div key={s.num} variants={fadeUp}>
                  <span className="text-[48px] font-serif font-bold text-border-color">{s.num}</span>
                  <h3 className="mt-2 font-serif text-h3-mobile md:text-h3 font-bold text-navy">{s.title}</h3>
                  <p className="mt-2 text-body text-text-secondary">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-12 md:py-20 border-t border-border-color">
        <div className="max-w-content mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-label font-semibold text-gold uppercase mb-4">{t("deliverables.eyebrow")}</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-h1-mobile md:text-h1 font-bold text-navy">{t("deliverables.headline")}</motion.h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {deliverables.map((d) => (
                <motion.div key={d.title} variants={fadeUp} className="group bg-surface rounded-lg border border-border-color border-l-[3px] border-l-navy shadow-sm hover:border-l-gold hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-6">
                  <svg className="w-7 h-7 text-navy mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={d.iconPath} />
                  </svg>
                  <h3 className="font-serif text-h3-mobile md:text-h3 font-bold text-navy mb-2">{d.title}</h3>
                  <p className="text-body text-text-secondary mb-5">{d.desc}</p>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-serif text-price font-bold text-navy">{d.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-small font-medium bg-bg text-text-secondary border border-border-color">{d.turnaround}</span>
                    <Link href={`/${locale}/start`} className="text-[14px] font-semibold tracking-[0.04em] text-gold hover:text-gold-light transition-colors">
                      {t("deliverables.getThis")} &rarr;
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Stablus */}
      <section className="py-12 md:py-20 border-t border-border-color">
        <div className="max-w-content mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-label font-semibold text-gold uppercase mb-4">{t("whyStablus.eyebrow")}</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-h1-mobile md:text-h1 font-bold text-navy">{t("whyStablus.headline")}</motion.h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              {reasons.map((r) => (
                <motion.div key={r.title} variants={fadeUp}>
                  <h3 className="font-serif text-h3-mobile md:text-h3 font-bold text-navy mb-2">{r.title}</h3>
                  <p className="text-body text-text-secondary">{r.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Always Current */}
      <section className="py-12 md:py-20 border-t border-border-color">
        <div className="max-w-content mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="max-w-3xl">
            <motion.p variants={fadeUp} className="text-label font-semibold text-gold uppercase mb-4">{t("alwaysCurrent.eyebrow")}</motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-h1-mobile md:text-h1 font-bold text-navy">{t("alwaysCurrent.headline")}</motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-body text-text-secondary">{t("alwaysCurrent.body")}</motion.p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
