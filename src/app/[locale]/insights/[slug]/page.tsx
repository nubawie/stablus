import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { insightArticles } from "@/data/insights-articles";

type Props = { params: { locale: string; slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = insightArticles.find((a) => a.slug === params.slug);
  if (!article) return {};
  const isAr = params.locale === "ar";
  const title = isAr ? article.title.ar : article.title.en;
  const description = isAr ? article.metaDescription.ar : article.metaDescription.en;
  return {
    title: `${title} | Stablus`,
    description,
    alternates: {
      canonical: `https://stablus.ae/${params.locale}/insights/${params.slug}`,
      languages: {
        en: `https://stablus.ae/en/insights/${params.slug}`,
        ar: `https://stablus.ae/ar/insights/${params.slug}`,
      },
    },
    openGraph: {
      title: `${title} | Stablus`,
      description,
      url: `https://stablus.ae/${params.locale}/insights/${params.slug}`,
      siteName: "Stablus",
      type: "article",
    },
  };
}

export function generateStaticParams() {
  const locales = ["en", "ar"];
  return insightArticles.flatMap((a) =>
    locales.map((locale) => ({ locale, slug: a.slug }))
  );
}

export default function InsightArticlePage({ params }: Props) {
  const article = insightArticles.find((a) => a.slug === params.slug);
  if (!article) notFound();
  const isAr = params.locale === "ar";
  const title = isAr ? article.title.ar : article.title.en;
  const content = isAr ? article.content.ar : article.content.en;
  const regulationLastUpdated = isAr ? article.regulationLastUpdated.ar : article.regulationLastUpdated.en;

  return (
    <div className="pt-32 pb-20 md:pt-36">
      <div className="max-w-[720px] mx-auto px-6">
        <Link
          href={`/${params.locale}/insights`}
          className="inline-flex items-center gap-2 text-small text-text-secondary hover:text-navy transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          {isAr ? "\u0627\u0644\u0639\u0648\u062f\u0629 \u0625\u0644\u0649 \u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062a" : "Back to Insights"}
        </Link>

        <p className="text-label font-semibold text-gold uppercase mb-4">Insights</p>

        <h1 className="font-serif text-display-mobile md:text-[36px] font-bold text-navy leading-[1.2] mb-6">
          {title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 mb-4 text-small text-text-secondary">
          <span>{article.date}</span>
          <span className="w-1 h-1 rounded-full bg-gold" />
          <span>{article.readTime}</span>
        </div>

        <div className="flex items-start gap-2 mb-10 px-4 py-3 bg-gold/10 border border-gold/30 rounded-lg">
          <svg className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-small font-semibold text-gold mb-0.5">
              {isAr ? "\u0622\u062e\u0631 \u062a\u062d\u062f\u064a\u062b \u0644\u0644\u0627\u0626\u062d\u0629" : "Regulation last updated"}
            </p>
            <p className="text-small text-text-secondary">
              {regulationLastUpdated} —{" "}
              <a href={article.regulationSource} target="_blank" rel="noopener noreferrer" className="underline hover:text-navy transition-colors">
                {isAr ? "\u0627\u0644\u0645\u0635\u062f\u0631 \u0627\u0644\u0631\u0633\u0645\u064a" : "Official source"}
              </a>
            </p>
          </div>
        </div>

        <div className="space-y-5 text-body text-text-secondary leading-relaxed">
          {content.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2 key={i} className="font-serif text-[22px] font-bold text-navy mt-10 mb-3">
                  {block.text}
                </h2>
              );
            }
            if (block.type === "ul" && block.items) {
              return (
                <ul key={i} className="space-y-2 pl-1">
                  {block.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return <p key={i}>{block.text}</p>;
          })}
        </div>

        <div className="mt-14 pt-8 border-t border-border-color">
          <p className="font-serif text-[20px] font-bold text-navy mb-3">
            {isAr ? "\u0647\u0644 \u062a\u062d\u062a\u0627\u062c \u0625\u0644\u0649 \u062a\u0642\u064a\u064a\u0645 \u062c\u0627\u0647\u0632\u064a\u0629 \u062a\u0646\u0638\u064a\u0645\u064a\u0629\u061f" : "Need a regulatory readiness assessment?"}
          </p>
          <p className="text-body text-text-secondary mb-6">
            {isAr
              ? "\u062a\u064f\u0648\u0644\u0651\u062f Stablus \u062a\u0642\u0627\u0631\u064a\u0631 \u062c\u0627\u0647\u0632\u064a\u0629 \u062a\u0646\u0638\u064a\u0645\u064a\u0629 \u0645\u062e\u0635\u0635\u0629 \u0648\u062e\u0631\u0627\u0626\u0637 \u0645\u0639\u0645\u0627\u0631\u064a\u0629 \u0648\u062d\u0632\u0645 \u062a\u0633\u0644\u064a\u0645 \u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639 \u0641\u064a \u063a\u0636\u0648\u0646 \u0633\u0627\u0639\u0627\u062a."
              : "Stablus generates tailored regulatory readiness reports, architecture blueprints, and project delivery packs in hours \u2014 built around your regulator, your stack, and your specific compliance gaps."}
          </p>
          <Link
            href={`/${params.locale}/start`}
            className="inline-flex items-center px-6 py-3 bg-navy text-bg text-[14px] font-semibold tracking-[0.04em] rounded hover:opacity-90 transition-colors min-h-[44px]"
          >
            {isAr ? "\u0627\u062d\u0635\u0644 \u0639\u0644\u0649 \u062a\u0642\u064a\u064a\u0645 \u0627\u0644\u062c\u0627\u0647\u0632\u064a\u0629 \u0627\u0644\u062a\u0646\u0638\u064a\u0645\u064a\u0629 \u2190" : "Get your regulatory readiness assessment \u2192"}
          </Link>
        </div>
      </div>
    </div>
  );
}
