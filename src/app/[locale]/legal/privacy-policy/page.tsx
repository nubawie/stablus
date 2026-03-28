"use client";

import { useTranslations } from "next-intl";

export default function PrivacyPolicyPage() {
  const t = useTranslations("privacyPolicyPage");

  const sections = [
    {
      titleKey: "s1t",
      content: `Stablus Management FZCO ("Stablus", "we", "us", or "our") operates this website and the advisory services delivered through it. Stablus is registered in Dubai Silicon Oasis under the Dubai Integrated Economic Zones Authority (DIEZA), License No. 78033.\n\nThis Privacy Policy explains how we collect, use, and protect personal information obtained through our website, intake process, and related communications.\n\nBy accessing or using our website, you acknowledge the practices described in this Privacy Policy.`,
    },
    {
      titleKey: "s2t",
      content: "This website is intended for professional and institutional audiences. We do not knowingly collect personal data from minors.",
      list: ["Visitors to our website", "Individuals contacting us via the intake bot, contact form, or email", "Professional contacts representing institutions or organisations"],
    },
    {
      titleKey: "s3t",
      content: "a. Information you provide voluntarily",
      list: ["Name and professional email address", "Organisation or institution name", "Role or function", "Information included in messages or enquiries", "Project descriptions submitted through our AI intake process"],
      after: "b. Automatically collected information",
      list2: ["IP address", "Browser type and device information", "Pages visited and interaction data", "Date and time of access"],
    },
    {
      titleKey: "s4t",
      content: "Our website includes an AI-powered intake process. Any documents or files you upload during this process are handled as follows:",
      list: ["Files are processed in memory only for the duration of your session", "No uploaded documents are written to disk, stored in a database, or retained after your session ends", "No Stablus team member views your uploaded documents", "Conversation content passes through Anthropic\u2019s API for AI processing. Anthropic\u2019s data handling policies apply to that processing", "We do not retain conversation history on Stablus servers"],
      after: "For engagements requiring a formal Non-Disclosure Agreement or Data Processing Agreement, contact us at info@stablus.ae before sharing sensitive information.",
    },
    {
      titleKey: "s5t",
      content: "We collect and process personal information to:",
      list: ["Respond to enquiries and project requests", "Communicate regarding our advisory services", "Manage professional relationships", "Improve website functionality and security", "Comply with applicable legal or regulatory obligations"],
      after: "We do not use personal data for unsolicited marketing or sales outreach.",
    },
    {
      titleKey: "s6t",
      content: "Personal data is processed on the basis of:",
      list: ["Your consent when submitting a contact form or engaging the intake process", "Legitimate business interests related to advisory engagement and communication", "Compliance with legal or regulatory requirements"],
    },
    {
      titleKey: "s7t",
      content: "Stablus treats all information submitted through this website as confidential. We apply appropriate technical and administrative safeguards to protect personal information against unauthorised access, misuse, or disclosure.\n\nInformation provided through this website is not shared with third parties except:",
      list: ["Where required by law or regulatory authority", "Where necessary to protect legal rights", "With trusted service providers for operational purposes, subject to confidentiality obligations"],
    },
    { titleKey: "s8t", content: "Personal data is retained only for as long as necessary to fulfill the purposes outlined in this Privacy Policy or to comply with applicable legal and regulatory requirements." },
    {
      titleKey: "s9t",
      content: "Subject to applicable laws, you may have the right to:",
      list: ["Request access to your personal data", "Request correction of inaccurate information", "Request deletion of personal data", "Object to or restrict certain processing"],
      after: "Requests may be submitted to info@stablus.ae",
    },
    { titleKey: "s10t", content: "Our website may use limited cookies to support functionality, analytics, and security. You may adjust browser settings to disable cookies, though this may affect website performance." },
    { titleKey: "s11t", content: "Our website may contain links to third-party websites for reference. Stablus is not responsible for the privacy practices or content of external websites." },
    { titleKey: "s12t", content: "Nothing on this website constitutes legal, regulatory, or professional advice unless expressly agreed in writing as part of a formal advisory engagement." },
    { titleKey: "s13t", content: "To the maximum extent permitted by applicable law, Stablus shall not be liable for any direct or indirect damages arising from the use of this website or reliance on information provided herein." },
    { titleKey: "s14t", content: "We may update this Privacy Policy periodically. Any updates will be posted on this page with a revised date." },
    { titleKey: "s15t", content: "This Privacy Policy is governed by the laws of the United Arab Emirates. Any disputes shall be subject to the jurisdiction of the competent courts of the UAE." },
    { titleKey: "s16t", content: "" },
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
              {s.titleKey === "s16t" ? (
                <div className="text-body text-text-secondary space-y-1">
                  <p>{t("s16email")}</p>
                  <p>{t("s16office")}</p>
                </div>
              ) : (
                <>
                  {s.content.split("\n\n").map((para, i) => (
                    <p key={i} className="text-body text-text-secondary mb-3 last:mb-0">{para}</p>
                  ))}
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
                  {"after" in s && s.after && <p className="text-body text-text-secondary mb-3">{s.after}</p>}
                  {"list2" in s && (s as { list2: string[] }).list2 && (
                    <ul className="mt-3 space-y-1.5">
                      {(s as { list2: string[] }).list2.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-body text-text-secondary">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
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
