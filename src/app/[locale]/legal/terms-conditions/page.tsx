"use client";

import { useTranslations } from "next-intl";

export default function TermsConditionsPage() {
  const t = useTranslations("termsPage");

  const sections = [
    { titleKey: "s1t", content: `This website is operated by Stablus Management FZCO ("Stablus", "we", "us", or "our"), registered in Dubai Silicon Oasis under the Dubai Integrated Economic Zones Authority (DIEZA), License No. 78033. Licensed activities include Management Consultancies and Computer Systems Consultancies.` },
    {
      titleKey: "s2t",
      content: "This website is provided for informational purposes and to facilitate access to our AI-powered advisory services. It is intended for professional and institutional audiences.",
      after: "Information published on this website:",
      list: ["Does not constitute legal, regulatory, financial, or professional advice", "Does not create an advisory or contractual relationship through browsing alone", "Is not a substitute for professional advice"],
      after2: "Any advisory services are subject to a separate written agreement.",
    },
    {
      titleKey: "s3t",
      content: "Stablus delivers professional advisory documents generated with the assistance of AI technology and informed by the information provided by the client during the intake process.\n\nAll deliverables are:",
      list: ["Advisory in nature", "Intended to support the client\u2019s internal decision-making process", "Not a substitute for the client\u2019s own legal, compliance, regulatory, or technical review"],
      after: "Regulatory, architectural, and operational decisions remain the sole responsibility of the client and their authorised internal teams.\n\nStablus does not assume responsibility for decisions made on the basis of delivered documents, nor for outcomes resulting from their use.",
    },
    {
      titleKey: "s4t",
      content: "Our services use artificial intelligence technology to generate advisory content. By using our intake process, you acknowledge that:",
      list: ["Outputs are AI-assisted and informed by the information you provide", "Regulatory information is sourced from regulator websites at the time of generation and may change", "You are responsible for verifying all regulatory requirements directly with the relevant authority before acting on them", "Stablus does not guarantee the completeness or continued accuracy of regulatory information after delivery"],
    },
    {
      titleKey: "s5t",
      content: "You agree to use this website only for lawful purposes. You must not:",
      list: ["Violate applicable laws or regulations", "Attempt to gain unauthorised access to systems or data", "Interfere with the operation or security of the website", "Transmit malicious code or harmful content"],
      after: "We reserve the right to restrict or terminate access at any time without notice.",
    },
    {
      titleKey: "s6t",
      content: "Nothing on this website constitutes:",
      list: ["An offer to provide advisory services", "A solicitation of business", "An offer to sell or purchase any financial instrument"],
      after: "Any engagement is subject to mutual agreement and formal documentation.",
    },
    { titleKey: "s7t", content: "Deliverables are provided on a pay-per-project basis. Pricing is displayed on our services page. Delivery timelines begin upon confirmed payment. Stablus reserves the right to update pricing at any time." },
    { titleKey: "s8t", content: "All content on this website, including text, graphics, logos, and layout, is the property of Stablus Management FZCO or its licensors and is protected by applicable intellectual property laws.\n\nDeliverables produced for a client are licensed for the client\u2019s internal use only and may not be resold, published, or distributed without prior written consent." },
    { titleKey: "s9t", content: "Information submitted through this website is treated as confidential and handled in accordance with our Privacy Policy.\n\nSubmission of information through this website does not create a client relationship or obligation of confidentiality beyond applicable data protection laws unless agreed in writing." },
    { titleKey: "s10t", content: `This website and its content are provided on an "as is" basis. To the fullest extent permitted by law, Stablus disclaims all warranties including warranties of accuracy, completeness, or fitness for a particular purpose.` },
    { titleKey: "s11t", content: "To the maximum extent permitted by applicable law, Stablus shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from use of this website or reliance on delivered documents." },
    { titleKey: "s12t", content: "You agree to indemnify and hold harmless Stablus, its affiliates, directors, and employees from any claims or expenses arising from your use of the website or violation of these Terms." },
    { titleKey: "s13t", content: "Your use of this website is also governed by our Privacy Policy." },
    { titleKey: "s14t", content: "Stablus may update these Terms periodically. Continued use of the website constitutes acceptance of the revised Terms." },
    { titleKey: "s15t", content: "These Terms are governed by the laws of the United Arab Emirates. Any disputes shall be subject to the exclusive jurisdiction of the competent courts of the UAE." },
    { titleKey: "s16t", content: "If any provision of these Terms is found invalid or unenforceable, the remaining provisions remain in full force." },
    { titleKey: "s17t", content: "" },
  ];

  return (
    <div className="pt-32 pb-12 md:pt-36 md:pb-20">
      <div className="max-w-[800px] mx-auto px-6">
        <h1 className="font-serif text-display-mobile md:text-display font-bold text-navy">
          {t("title")}
        </h1>
        <p className="mt-3 text-small font-medium text-gold italic">
          {t("lastUpdated")}
        </p>

        <div className="mt-12 space-y-10">
          {sections.map((s) => (
            <div key={s.titleKey}>
              <h2 className="text-[18px] font-semibold text-navy mb-3">
                {t(s.titleKey as never)}
              </h2>
              {s.titleKey === "s17t" ? (
                <div className="text-body text-text-secondary space-y-1">
                  <p>{t("s17email")}</p>
                  <p>{t("s17office")}</p>
                </div>
              ) : (
                <>
                  {s.content.split("\n\n").map((para, i) => (
                    <p key={i} className="text-body text-text-secondary mb-3 last:mb-0">{para}</p>
                  ))}
                  {"after" in s && s.after && <p className="text-body text-text-secondary mb-3">{s.after}</p>}
                  {s.list && (
                    <ul className="mt-3 space-y-1.5 mb-3">
                      {s.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-body text-text-secondary">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {"after2" in s && (s as { after2: string }).after2 && (
                    <p className="text-body text-text-secondary">{(s as { after2: string }).after2}</p>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
