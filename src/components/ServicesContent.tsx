"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

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

const deliverablePrices = ["AED 2,500", "AED 3,500", "AED 2,000", "AED 2,500", "AED 1,800", "AED 4,500"];

export default function ServicesContent() {
  const locale = useLocale();
  const ts = useTranslations("services");
  const td = useTranslations("deliverables");

  const regulators = [
    { abbr: "CBUAE", name: ts("reg1name"), desc: ts("reg1desc") },
    { abbr: "DFSA", name: ts("reg2name"), desc: ts("reg2desc") },
    { abbr: "ADGM", name: ts("reg3name"), desc: ts("reg3desc") },
    { abbr: "VARA", name: ts("reg4name"), desc: ts("reg4desc") },
    { abbr: "SCA", name: ts("reg5name"), desc: ts("reg5desc") },
  ];

  const deliverables = [
    {
      title: td("card1Title"), desc: ts("d1body"), price: deliverablePrices[0], turnaround: td("card1Time"), iconPath: deliverableIcons[0],
      included: [ts("d1i1"), ts("d1i2"), ts("d1i3"), ts("d1i4"), ts("d1i5")],
      who: ts("d1who"),
    },
    {
      title: td("card2Title"), desc: ts("d2body"), price: deliverablePrices[1], turnaround: td("card2Time"), iconPath: deliverableIcons[1],
      included: [ts("d2i1"), ts("d2i2"), ts("d2i3"), ts("d2i4"), ts("d2i5")],
      who: ts("d2who"),
    },
    {
      title: td("card3Title"), desc: ts("d3body"), price: deliverablePrices[2], turnaround: td("card3Time"), iconPath: deliverableIcons[2],
      included: [ts("d3i1"), ts("d3i2"), ts("d3i3"), ts("d3i4"), ts("d3i5")],
      who: ts("d3who"),
    },
    {
      title: td("card4Title"), desc: ts("d4body"), price: deliverablePrices[3], turnaround: td("card4Time"), iconPath: deliverableIcons[3],
      included: [ts("d4i1"), ts("d4i2"), ts("d4i3"), ts("d4i4"), ts("d4i5")],
      who: ts("d4who"),
    },
    {
      title: td("card5Title"), desc: ts("d5body"), price: deliverablePrices[4], turnaround: td("card5Time"), iconPath: deliverableIcons[4],
      included: [ts("d5i1"), ts("d5i2"), ts("d5i3"), ts("d5i4"), ts("d5i5")],
      who: ts("d5who"),
    },
    {
      title: td("card6Title"), desc: ts("d6body"), price: deliverablePrices[5], turnaround: td("card6Time"), iconPath: deliverableIcons[5],
      included: [ts("d6i1"), ts("d6i2"), ts("d6i3"), ts("d6i4"), ts("d6i5"), ts("d6i6"), ts("d6i7"), ts("d6i8"), ts("d6i9")],
      who: ts("d6who"),
    },
  ];

  return (
    <div className="pt-32 pb-12 md:pt-36 md:pb-20">
      <div className="max-w-content mx-auto px-6">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-16">
          <motion.p variants={fadeUp} className="text-label font-semibold text-gold uppercase mb-4">{ts("eyebrow")}</motion.p>
          <motion.h1 variants={fadeUp} className="font-serif text-display-mobile md:text-display font-bold text-navy">{ts("headline")}</motion.h1>
          <motion.p variants={fadeUp} className="mt-4 text-body text-text-secondary max-w-2xl">{ts("subheading")}</motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="mb-16">
          <motion.p variants={fadeUp} className="text-label font-semibold text-gold uppercase mb-4">{ts("regFrameworks")}</motion.p>
          <motion.h2 variants={fadeUp} className="font-serif text-h1-mobile md:text-h1 font-bold text-navy mb-8">{ts("frameworksHeadline")}</motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {regulators.map((r) => (
              <motion.div key={r.abbr} variants={fadeUp} className="p-4 bg-surface rounded-lg border border-border-color">
                <span className="font-serif text-h3 font-bold text-navy">{r.abbr}</span>
                <p className="text-small font-medium text-text-secondary mt-1 leading-relaxed">
                  <span className="font-semibold text-text-primary">{r.name}</span>
                  {" — "}{r.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="space-y-8">
          {deliverables.map((d) => (
            <motion.div key={d.title} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="bg-surface rounded-lg border border-border-color border-l-[3px] border-l-navy shadow-sm p-6 md:p-10">
              <div className="flex flex-col md:flex-row md:items-start gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <svg className="w-7 h-7 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={d.iconPath} />
                    </svg>
                    <h2 className="font-serif text-h3-mobile md:text-h1-mobile font-bold text-navy">{d.title}</h2>
                  </div>
                  <p className="text-body text-text-secondary mb-6">{d.desc}</p>
                  <div className="mb-6">
                    <h3 className="text-label font-semibold text-gold uppercase mb-3">{ts("whatsIncluded")}</h3>
                    <ul className="space-y-2">
                      {d.included.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-body text-text-secondary">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-body text-text-secondary">
                    <span className="font-semibold text-text-primary">{ts("whoItsFor")}: </span>
                    {d.who}
                  </p>
                </div>
                <div className="md:w-56 shrink-0 flex flex-col items-start md:items-end gap-4">
                  <span className="font-serif text-price font-bold text-navy">{d.price}</span>
                  <span className="px-3 py-1 rounded text-small font-medium bg-bg text-text-secondary border border-border-color">{d.turnaround}</span>
                  <Link href={`/${locale}/start`} className="px-6 py-3 bg-navy text-bg text-[14px] font-semibold tracking-[0.04em] rounded hover:opacity-90 transition-colors min-h-[44px] flex items-center">
                    {ts("startThis")} &rarr;
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
