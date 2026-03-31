export interface InsightBlock {
  type: "p" | "h2" | "ul";
  text?: string;
  items?: string[];
}

export interface InsightArticle {
  slug: string;
  title: { en: string; ar: string };
  metaDescription: { en: string; ar: string };
  date: string;
  readTime: string;
  regulationLastUpdated: { en: string; ar: string };
  regulationSource: string;
  content: { en: InsightBlock[]; ar: InsightBlock[] };
}

export const insightArticles: InsightArticle[] = [
  {
    slug: "vara-licence-uae-requirements",
    title: {
      en: "VARA Licence UAE: Requirements, Process and Costs in 2025",
      ar: "\u062a\u0631\u062e\u064a\u0635 \u0641\u0627\u0631\u0627 \u0641\u064a \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a: \u0627\u0644\u0645\u062a\u0637\u0644\u0628\u0627\u062a \u0648\u0627\u0644\u0639\u0645\u0644\u064a\u0629 \u0648\u0627\u0644\u062a\u0643\u0627\u0644\u064a\u0641 \u0641\u064a 2025",
    },
    metaDescription: {
      en: "Complete guide to VARA licence requirements in Dubai for 2025. Covers the 7 activity categories, capital requirements, application process, and Rulebook 2.0 changes effective June 2025.",
      ar: "\u062f\u0644\u064a\u0644 \u0634\u0627\u0645\u0644 \u0644\u0645\u062a\u0637\u0644\u0628\u0627\u062a \u062a\u0631\u062e\u064a\u0635 \u0641\u0627\u0631\u0627 \u0641\u064a \u062f\u0628\u064a \u0644\u0639\u0627\u0645 2025. \u064a\u063a\u0637\u064a \u0641\u0626\u0627\u062a \u0627\u0644\u0623\u0646\u0634\u0637\u0629 \u0627\u0644\u0633\u0628\u0639 \u0648\u0645\u062a\u0637\u0644\u0628\u0627\u062a \u0631\u0623\u0633 \u0627\u0644\u0645\u0627\u0644 \u0648\u0639\u0645\u0644\u064a\u0629 \u0627\u0644\u062a\u0642\u062f\u064a\u0645.",
    },
    date: "March 2026",
    readTime: "5 min read",
    regulationLastUpdated: {
      en: "June 2025 \u2014 VARA Rulebook Version 2.0",
      ar: "\u064a\u0648\u0646\u064a\u0648 2025 \u2014 \u062f\u0644\u064a\u0644 \u0642\u0648\u0627\u0639\u062f \u0641\u0627\u0631\u0627 \u0627\u0644\u0625\u0635\u062f\u0627\u0631 2.0",
    },
    regulationSource: "https://www.vara.ae",
    content: {
      en: [
        { type: "p", text: "The Dubai Virtual Assets Regulatory Authority (VARA) is the mandatory regulator for any business conducting virtual asset activities in Dubai. Established under Dubai Law No. 4 of 2022, VARA operates across all of Dubai including free zones, except the DIFC which is covered by the DFSA. VARA Rulebook Version 2.0 came into effect on 19 June 2025 and applies to all new applicants and existing licensees." },
        { type: "h2", text: "The 7 Licensed Activity Categories" },
        { type: "ul", items: ["Advisory Services \u2014 investment advice on virtual assets", "Broker-Dealer Services \u2014 executing trades on behalf of clients", "Custody Services \u2014 holding and safeguarding virtual assets", "Exchange Services \u2014 operating a VA trading platform", "Lending Services \u2014 VA-backed credit or direct VA lending", "Transfer and Settlement Services \u2014 moving VA between parties", "VA Issuance \u2014 creating and distributing new tokens"] },
        { type: "h2", text: "Capital Requirements" },
        { type: "ul", items: ["Advisory: AED 150,000 minimum", "Broker-Dealer: AED 2,000,000", "Custody: AED 4,000,000", "Exchange: AED 4,000,000 plus surety bond", "Lending: AED 4,000,000", "Transfer: AED 2,000,000", "ARVA Issuance: AED 1,500,000 or 2% of reserves \u2014 whichever is higher"] },
        { type: "h2", text: "Application Process" },
        { type: "ul", items: ["Pre-application readiness self-assessment against applicable rulebooks", "Submission via VARA portal: corporate docs, business plan, governance framework, technology architecture, AML/CFT programme", "VARA initial review: 4 to 8 weeks", "Detailed assessment including management interviews: 3 to 6 months", "Operational readiness verification before final licence: 1 to 3 months"] },
        { type: "h2", text: "Key Rulebook 2.0 Changes You Must Know" },
        { type: "ul", items: ["New token categories: FRVA, ARVA, Category 2, Exempt \u2014 each with different obligations", "Near real-time STR submission via goAML mandatory", "48-hour response window to VARA compliance queries", "Technology Governance and Risk Assessment Framework required for all licensees", "Stricter custody standards: full asset segregation and formal insurance", "Sponsored VASP framework allows licensed entities to sponsor unlicensed affiliates"] },
        { type: "h2", text: "What Takes the Longest" },
        { type: "p", text: "Most VARA applications stall on documentation, not on the business model. Incomplete technology architecture blueprints, AML/CFT programmes that do not map to VARA's specific requirements, and governance structures missing key roles are the three most common causes of delay. A complete, well-prepared application moves through assessment in 6 to 9 months. Incomplete applications take 12 to 18 months or more." },
      ],
      ar: [
        { type: "p", text: "\u0647\u064a\u0626\u0629 \u0627\u0644\u0623\u0635\u0648\u0644 \u0627\u0644\u0627\u0641\u062a\u0631\u0627\u0636\u064a\u0629 \u0641\u064a \u062f\u0628\u064a (\u0641\u0627\u0631\u0627) \u0647\u064a \u0627\u0644\u062c\u0647\u0629 \u0627\u0644\u062a\u0646\u0638\u064a\u0645\u064a\u0629 \u0627\u0644\u0625\u0644\u0632\u0627\u0645\u064a\u0629 \u0644\u0623\u064a \u0646\u0634\u0627\u0637 \u064a\u062a\u0639\u0644\u0642 \u0628\u0627\u0644\u0623\u0635\u0648\u0644 \u0627\u0644\u0627\u0641\u062a\u0631\u0627\u0636\u064a\u0629 \u0641\u064a \u062f\u0628\u064a. \u062a\u0623\u0633\u0633\u062a \u0628\u0645\u0648\u062c\u0628 \u0627\u0644\u0642\u0627\u0646\u0648\u0646 \u0631\u0642\u0645 4 \u0644\u0633\u0646\u0629 2022\u060c \u0648\u062a\u063a\u0637\u064a \u062c\u0645\u064a\u0639 \u0645\u0646\u0627\u0637\u0642 \u062f\u0628\u064a \u0628\u0645\u0627 \u0641\u064a\u0647\u0627 \u0627\u0644\u0645\u0646\u0627\u0637\u0642 \u0627\u0644\u062d\u0631\u0629\u060c \u0628\u0627\u0633\u062a\u062b\u0646\u0627\u0621 \u0645\u0631\u0643\u0632 \u062f\u0628\u064a \u0627\u0644\u0645\u0627\u0644\u064a \u0627\u0644\u0639\u0627\u0644\u0645\u064a." },
        { type: "h2", text: "\u0641\u0626\u0627\u062a \u0627\u0644\u0623\u0646\u0634\u0637\u0629 \u0627\u0644\u0645\u0631\u062e\u0651\u0635\u0629 \u0627\u0644\u0633\u0628\u0639" },
        { type: "ul", items: ["\u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0627\u0633\u062a\u0634\u0627\u0631\u064a\u0629", "\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0648\u0633\u064a\u0637 \u0648\u0627\u0644\u062a\u0627\u062c\u0631", "\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u062d\u0636\u0627\u0646\u0629", "\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0635\u0631\u0641", "\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0625\u0642\u0631\u0627\u0636", "\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0646\u0642\u0644 \u0648\u0627\u0644\u062a\u0633\u0648\u064a\u0629", "\u0625\u0635\u062f\u0627\u0631 \u0627\u0644\u0623\u0635\u0648\u0644 \u0627\u0644\u0627\u0641\u062a\u0631\u0627\u0636\u064a\u0629"] },
        { type: "h2", text: "\u0645\u062a\u0637\u0644\u0628\u0627\u062a \u0631\u0623\u0633 \u0627\u0644\u0645\u0627\u0644" },
        { type: "ul", items: ["\u0627\u0644\u0627\u0633\u062a\u0634\u0627\u0631\u0627\u062a: 150,000 \u062f\u0631\u0647\u0645", "\u0627\u0644\u0648\u0633\u064a\u0637 \u0648\u0627\u0644\u062a\u0627\u062c\u0631: 2,000,000 \u062f\u0631\u0647\u0645", "\u0627\u0644\u062d\u0636\u0627\u0646\u0629 \u0648\u0627\u0644\u0635\u0631\u0641: 4,000,000 \u062f\u0631\u0647\u0645", "\u0625\u0635\u062f\u0627\u0631 \u0627\u0644\u0623\u0635\u0648\u0644 \u0627\u0644\u0645\u0631\u062a\u0628\u0637\u0629: 1,500,000 \u062f\u0631\u0647\u0645 \u0623\u0648 2% \u0645\u0646 \u0627\u0644\u0627\u062d\u062a\u064a\u0627\u0637\u064a\u0627\u062a"] },
        { type: "h2", text: "\u0639\u0645\u0644\u064a\u0629 \u0627\u0644\u062a\u0642\u062f\u064a\u0645" },
        { type: "ul", items: ["\u062a\u0642\u064a\u064a\u0645 \u0630\u0627\u062a\u064a \u0644\u0644\u062c\u0627\u0647\u0632\u064a\u0629 \u0642\u0628\u0644 \u0627\u0644\u062a\u0642\u062f\u064a\u0645", "\u062a\u0642\u062f\u064a\u0645 \u0627\u0644\u0637\u0644\u0628 \u0639\u0628\u0631 \u0628\u0648\u0627\u0628\u0629 \u0641\u0627\u0631\u0627", "\u0627\u0644\u0645\u0631\u0627\u062c\u0639\u0629 \u0627\u0644\u0623\u0648\u0644\u064a\u0629: 4 \u0625\u0644\u0649 8 \u0623\u0633\u0627\u0628\u064a\u0639", "\u0627\u0644\u062a\u0642\u064a\u064a\u0645 \u0627\u0644\u062a\u0641\u0635\u064a\u0644\u064a: 3 \u0625\u0644\u0649 6 \u0623\u0634\u0647\u0631", "\u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u062c\u0627\u0647\u0632\u064a\u0629 \u0627\u0644\u062a\u0634\u063a\u064a\u0644\u064a\u0629: 1 \u0625\u0644\u0649 3 \u0623\u0634\u0647\u0631"] },
      ],
    },
  },
  {
    slug: "cbuae-crypto-licence-2026-deadline",
    title: {
      en: "CBUAE Crypto Licence: September 2026 Deadline and What You Must Do Now",
      ar: "\u062a\u0631\u062e\u064a\u0635 \u0627\u0644\u0639\u0645\u0644\u0627\u062a \u0627\u0644\u0645\u0634\u0641\u0631\u0629 \u0645\u0646 \u0627\u0644\u0628\u0646\u0643 \u0627\u0644\u0645\u0631\u0643\u0632\u064a: \u0627\u0644\u0645\u0648\u0639\u062f \u0627\u0644\u0646\u0647\u0627\u0626\u064a \u0633\u0628\u062a\u0645\u0628\u0631 2026 \u0648\u0645\u0627 \u064a\u062c\u0628 \u0641\u0639\u0644\u0647 \u0627\u0644\u0622\u0646",
    },
    metaDescription: {
      en: "Federal Decree Law No. 6 of 2025 sets September 2026 as the CBUAE compliance deadline. This guide covers who needs a licence, Article 62 obligations, and the steps to meet the deadline.",
      ar: "\u064a\u064f\u062d\u062f\u062f \u0627\u0644\u0645\u0631\u0633\u0648\u0645 \u0628\u0642\u0627\u0646\u0648\u0646 \u0627\u062a\u062d\u0627\u062f\u064a \u0631\u0642\u0645 6 \u0644\u0633\u0646\u0629 2025 \u0633\u0628\u062a\u0645\u0628\u0631 2026 \u0645\u0648\u0639\u062f\u0627\u064b \u0646\u0647\u0627\u0626\u064a\u0627\u064b \u0644\u0644\u0627\u0645\u062a\u062b\u0627\u0644. \u064a\u063a\u0637\u064a \u0647\u0630\u0627 \u0627\u0644\u062f\u0644\u064a\u0644 \u0645\u0646 \u064a\u062d\u062a\u0627\u062c \u0625\u0644\u0649 \u062a\u0631\u062e\u064a\u0635 \u0648\u0645\u062a\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0645\u0627\u062f\u0629 62.",
    },
    date: "March 2026",
    readTime: "5 min read",
    regulationLastUpdated: {
      en: "September 2025 \u2014 Federal Decree Law No. 6 of 2025",
      ar: "\u0633\u0628\u062a\u0645\u0628\u0631 2025 \u2014 \u0627\u0644\u0645\u0631\u0633\u0648\u0645 \u0628\u0642\u0627\u0646\u0648\u0646 \u0627\u062a\u062d\u0627\u062f\u064a \u0631\u0642\u0645 6 \u0644\u0633\u0646\u0629 2025",
    },
    regulationSource: "https://www.centralbank.ae",
    content: {
      en: [
        { type: "p", text: "Federal Decree Law No. 6 of 2025, effective September 16, 2025, fundamentally expands the CBUAE's regulatory perimeter. Entities whose activities are newly captured by the law have until September 16, 2026 to achieve full licensing compliance. The penalty for operating a licensed financial activity without authorisation is now a criminal offence, with fines ranging from AED 1 million to AED 500 million." },
        { type: "h2", text: "Who the New Law Captures" },
        { type: "ul", items: ["Payment service providers using virtual assets (Article 61)", "Open finance and API-based financial data services (Article 61)", "Virtual asset exchanges, custody providers, and transfer services", "Technology providers whose platforms enable regulated financial activities (Article 62)", "DeFi protocols with significant UAE user activity or dirham-denominated flows", "Stablecoin issuers and payment token operators"] },
        { type: "h2", text: "Article 62: The Technology Provider Trap" },
        { type: "p", text: "Article 62 is the provision most commonly overlooked by technology companies. It captures any entity that facilitates, intermediates, or enables a licensed financial activity through technology, regardless of whether the entity itself is the licensed institution. This includes API aggregators, middleware platforms, blockchain node operators, and fintech infrastructure providers. If your technology enables payments, credit, deposits, or investment services for regulated institutions, you likely need to assess your Article 62 exposure." },
        { type: "h2", text: "The Licensing Process in Brief" },
        { type: "ul", items: ["Pre-application consultation with CBUAE FinTech Office to confirm activity category", "Full application submission: corporate docs, business plan, technology architecture, AML/CFT programme, governance framework", "CBUAE review and management assessment: 3 to 6 months typical", "Conditional approval and operational readiness verification", "Final licence grant"] },
        { type: "h2", text: "Key Requirements" },
        { type: "ul", items: ["Minimum capital proportional to activity type: AED 2 million to AED 50 million", "AML/CFT programme mapped to CBUAE and Federal Decree Law No. 20 of 2018", "Technology architecture blueprint showing all systems, data flows, and security controls", "Fit and proper governance: board, CEO, CCO, AMLCO, CISO", "UAE data residency for customer financial data", "Fraud detection and prevention systems per 2025 law Article requirements"] },
        { type: "h2", text: "Realistic Timeline to September 2026" },
        { type: "p", text: "If you have not already begun your compliance assessment, you are behind. Applications submitted after March 2026 risk not receiving authorisation before the September 2026 deadline given typical CBUAE processing times. The assessment and documentation preparation phase alone takes 4 to 8 weeks for well-prepared organisations. Start now." },
      ],
      ar: [
        { type: "p", text: "\u064a\u064f\u0648\u0633\u0651\u0639 \u0627\u0644\u0645\u0631\u0633\u0648\u0645 \u0628\u0642\u0627\u0646\u0648\u0646 \u0627\u062a\u062d\u0627\u062f\u064a \u0631\u0642\u0645 6 \u0644\u0633\u0646\u0629 2025 \u0646\u0637\u0627\u0642 \u0625\u0634\u0631\u0627\u0641 \u0627\u0644\u0628\u0646\u0643 \u0627\u0644\u0645\u0631\u0643\u0632\u064a \u0644\u064a\u0634\u0645\u0644 \u0627\u0644\u0623\u0635\u0648\u0644 \u0627\u0644\u0627\u0641\u062a\u0631\u0627\u0636\u064a\u0629 \u0648\u0645\u0632\u0648\u062f\u064a \u0627\u0644\u062a\u0643\u0646\u0648\u0644\u0648\u062c\u064a\u0627 \u0648\u0627\u0644\u062a\u0645\u0648\u064a\u0644 \u0627\u0644\u0644\u0627\u0645\u0631\u0643\u0632\u064a. \u0627\u0644\u0645\u0648\u0639\u062f \u0627\u0644\u0646\u0647\u0627\u0626\u064a \u0644\u0644\u0627\u0645\u062a\u062b\u0627\u0644 \u0647\u0648 16 \u0633\u0628\u062a\u0645\u0628\u0631 2026\u060c \u0648\u0627\u0644\u0639\u0642\u0648\u0628\u0627\u062a \u0634\u062f\u064a\u062f\u0629 \u062a\u0635\u0644 \u0625\u0644\u0649 500 \u0645\u0644\u064a\u0648\u0646 \u062f\u0631\u0647\u0645." },
        { type: "h2", text: "\u0645\u0646 \u064a\u0634\u0645\u0644\u0647 \u0627\u0644\u0642\u0627\u0646\u0648\u0646 \u0627\u0644\u062c\u062f\u064a\u062f" },
        { type: "ul", items: ["\u0645\u0632\u0648\u062f\u0648 \u062e\u062f\u0645\u0627\u062a \u0627\u0644\u062f\u0641\u0639 \u0628\u0627\u0644\u0623\u0635\u0648\u0644 \u0627\u0644\u0627\u0641\u062a\u0631\u0627\u0636\u064a\u0629", "\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u062a\u0645\u0648\u064a\u0644 \u0627\u0644\u0645\u0641\u062a\u0648\u062d", "\u0645\u0646\u0635\u0627\u062a \u062a\u062f\u0627\u0648\u0644 \u0627\u0644\u0623\u0635\u0648\u0644 \u0627\u0644\u0627\u0641\u062a\u0631\u0627\u0636\u064a\u0629 \u0648\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u062d\u0636\u0627\u0646\u0629", "\u0645\u0632\u0648\u062f\u0648 \u0627\u0644\u062a\u0643\u0646\u0648\u0644\u0648\u062c\u064a\u0627 \u0627\u0644\u0630\u064a\u0646 \u064a\u064f\u0645\u0643\u0651\u0646\u0648\u0646 \u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0645\u0627\u0644\u064a\u0629 \u0627\u0644\u0645\u0646\u0638\u064e\u0645\u0629", "\u0645\u064f\u0635\u062f\u0631\u0648 \u0627\u0644\u0639\u0645\u0644\u0627\u062a \u0627\u0644\u0645\u0633\u062a\u0642\u0631\u0629"] },
        { type: "h2", text: "\u0627\u0644\u062c\u062f\u0648\u0644 \u0627\u0644\u0632\u0645\u0646\u064a \u0627\u0644\u0648\u0627\u0642\u0639\u064a" },
        { type: "p", text: "\u0625\u0630\u0627 \u0644\u0645 \u062a\u0628\u062f\u0623 \u062a\u0642\u064a\u064a\u0645 \u0627\u0644\u0627\u0645\u062a\u062b\u0627\u0644 \u0628\u0639\u062f\u060c \u0641\u0623\u0646\u062a \u0645\u062a\u0623\u062e\u0631. \u0627\u0644\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0645\u0642\u062f\u064e\u0645\u0629 \u0628\u0639\u062f \u0645\u0627\u0631\u0633 2026 \u0642\u062f \u0644\u0627 \u062a\u062d\u0638\u0649 \u0628\u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0642\u0628\u0644 \u0627\u0644\u0645\u0648\u0639\u062f \u0627\u0644\u0646\u0647\u0627\u0626\u064a \u0641\u064a \u0633\u0628\u062a\u0645\u0628\u0631 2026. \u0627\u0628\u062f\u0623 \u0627\u0644\u0622\u0646." },
      ],
    },
  },
  {
    slug: "stablecoin-licence-uae",
    title: {
      en: "Stablecoin Licence UAE: CBUAE vs VARA \u2014 Which Regulator and What It Takes",
      ar: "\u062a\u0631\u062e\u064a\u0635 \u0627\u0644\u0639\u0645\u0644\u0627\u062a \u0627\u0644\u0645\u0633\u062a\u0642\u0631\u0629 \u0641\u064a \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a: \u0627\u0644\u0628\u0646\u0643 \u0627\u0644\u0645\u0631\u0643\u0632\u064a \u0645\u0642\u0627\u0628\u0644 \u0641\u0627\u0631\u0627",
    },
    metaDescription: {
      en: "Issuing a stablecoin in the UAE? This guide clarifies whether CBUAE or VARA applies, what reserves and capital you need, and the key compliance requirements for AED and USD stablecoin issuers.",
      ar: "\u0647\u0644 \u062a\u062e\u0637\u0637 \u0644\u0625\u0635\u062f\u0627\u0631 \u0639\u0645\u0644\u0629 \u0645\u0633\u062a\u0642\u0631\u0629 \u0641\u064a \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a\u061f \u064a\u0648\u0636\u062d \u0647\u0630\u0627 \u0627\u0644\u062f\u0644\u064a\u0644 \u0627\u0644\u062c\u0647\u0629 \u0627\u0644\u062a\u0646\u0638\u064a\u0645\u064a\u0629 \u0627\u0644\u0645\u062e\u062a\u0635\u0629 \u0648\u0645\u062a\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0627\u0645\u062a\u062b\u0627\u0644.",
    },
    date: "March 2026",
    readTime: "5 min read",
    regulationLastUpdated: {
      en: "September 2025 \u2014 CBUAE Federal Decree Law No. 6 of 2025 and VARA Rulebook 2.0 June 2025",
      ar: "\u0633\u0628\u062a\u0645\u0628\u0631 2025 \u2014 \u0627\u0644\u0645\u0631\u0633\u0648\u0645 \u0627\u0644\u0627\u062a\u062d\u0627\u062f\u064a \u0631\u0642\u0645 6 \u0648\u062f\u0644\u064a\u0644 \u0642\u0648\u0627\u0639\u062f \u0641\u0627\u0631\u0627 \u0627\u0644\u0625\u0635\u062f\u0627\u0631 2.0",
    },
    regulationSource: "https://www.centralbank.ae",
    content: {
      en: [
        { type: "p", text: "Stablecoin regulation in the UAE is split between two regulators depending on the currency peg and the jurisdiction of operation. Understanding which regulator applies to your stablecoin is the first and most critical decision." },
        { type: "h2", text: "AED-Pegged Stablecoins: CBUAE is Your Regulator" },
        { type: "p", text: "Dirham-denominated payment tokens fall under direct CBUAE supervision under Federal Decree Law No. 6 of 2025. The CBUAE issued the Payment Token Services Regulation (Circular No. 2/2024) which governs issuance, redemption, and reserve management for AED-pegged tokens. The first approved AED stablecoin is AE Coin, approved by the CBUAE in 2024." },
        { type: "ul", items: ["100% reserve backing required in approved asset classes", "Reserves must be held with UAE-licensed custodian banks", "Real-time proof of reserves mechanisms required", "Redemption at par guaranteed to token holders at all times", "Regular CBUAE audits and reporting obligations", "Capital adequacy proportional to tokens in circulation"] },
        { type: "h2", text: "Non-AED Stablecoins in Dubai: VARA Governs" },
        { type: "p", text: "USD-pegged, EUR-pegged, or basket-referenced stablecoins issued or distributed in Dubai fall under VARA's Virtual Asset Issuance Rulebook. Version 2.0 (effective June 2025) classifies them as Fully Regulated Virtual Assets (FRVAs) for single fiat-pegged tokens and Asset-Referenced Virtual Assets (ARVAs) for basket-backed tokens." },
        { type: "ul", items: ["FRVA issuers require Category 1 VA Issuance licence from VARA", "100% reserve backing with daily attestations", "ARVA issuers require AED 1.5 million minimum capital or 2% of reserves", "Whitepaper with technical documentation and risk disclosures required", "Distribution only through VARA-licensed distributors or exchanges"] },
        { type: "h2", text: "Technology Architecture Requirements" },
        { type: "ul", items: ["Blockchain layer: smart contract audit, mint and burn controls, immutable transaction records", "Banking integration: fiat on-ramp and off-ramp with licensed UAE banks", "Reserve management system: real-time reconciliation between tokens in circulation and reserve assets", "AML/CFT monitoring: on-chain transaction screening, sanctions checking, Travel Rule compliance", "Proof of reserves: automated or third-party verified reserve attestation mechanism"] },
        { type: "h2", text: "Common Stablecoin Compliance Gaps" },
        { type: "ul", items: ["Reserve management architecture not formally documented", "Smart contract audit not completed by a recognised firm", "AML/CFT programme not mapped to VARA or CBUAE specific requirements", "Proof of reserves mechanism missing or not auditable", "Governance structure lacks qualified individuals for regulator fit-and-proper assessment"] },
      ],
      ar: [
        { type: "p", text: "\u062a\u0646\u0638\u064a\u0645 \u0627\u0644\u0639\u0645\u0644\u0627\u062a \u0627\u0644\u0645\u0633\u062a\u0642\u0631\u0629 \u0641\u064a \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a \u0645\u0646\u0642\u0633\u0645 \u0628\u064a\u0646 \u062c\u0647\u062a\u064a\u0646 \u062a\u0646\u0638\u064a\u0645\u064a\u062a\u064a\u0646 \u062d\u0633\u0628 \u0639\u0645\u0644\u0629 \u0627\u0644\u0631\u0628\u0637 \u0648\u0646\u0637\u0627\u0642 \u0627\u0644\u062a\u0634\u063a\u064a\u0644." },
        { type: "h2", text: "\u0627\u0644\u0639\u0645\u0644\u0627\u062a \u0627\u0644\u0645\u0633\u062a\u0642\u0631\u0629 \u0627\u0644\u0645\u0631\u062a\u0628\u0637\u0629 \u0628\u0627\u0644\u062f\u0631\u0647\u0645: \u0627\u0644\u0628\u0646\u0643 \u0627\u0644\u0645\u0631\u0643\u0632\u064a \u0647\u0648 \u0627\u0644\u0645\u0646\u0638\u0651\u0645" },
        { type: "ul", items: ["\u0627\u062d\u062a\u064a\u0627\u0637\u064a 100% \u0641\u064a \u0623\u0635\u0648\u0644 \u0645\u0639\u062a\u0645\u062f\u0629 \u0644\u062f\u0649 \u0628\u0646\u0648\u0643 \u0625\u0645\u0627\u0631\u0627\u062a\u064a\u0629", "\u0622\u0644\u064a\u0627\u062a \u0625\u062b\u0628\u0627\u062a \u0627\u0644\u0627\u062d\u062a\u064a\u0627\u0637\u064a \u0641\u064a \u0627\u0644\u0648\u0642\u062a \u0627\u0644\u0641\u0639\u0644\u064a", "\u0627\u0633\u062a\u0631\u062f\u0627\u062f \u0628\u0627\u0644\u0642\u064a\u0645\u0629 \u0627\u0644\u0627\u0633\u0645\u064a\u0629 \u0645\u0636\u0645\u0648\u0646 \u0644\u062d\u0627\u0645\u0644\u064a \u0627\u0644\u0631\u0645\u0648\u0632", "\u062a\u062f\u0642\u064a\u0642 \u0648\u0627\u0639\u0644\u0627\u0645 \u062f\u0648\u0631\u064a\u0627\u0646 \u0644\u0644\u0628\u0646\u0643 \u0627\u0644\u0645\u0631\u0643\u0632\u064a"] },
        { type: "h2", text: "\u0627\u0644\u0639\u0645\u0644\u0627\u062a \u0627\u0644\u0645\u0633\u062a\u0642\u0631\u0629 \u063a\u064a\u0631 \u0627\u0644\u0645\u0631\u062a\u0628\u0637\u0629 \u0628\u0627\u0644\u062f\u0631\u0647\u0645 \u0641\u064a \u062f\u0628\u064a: \u0641\u0627\u0631\u0627 \u0647\u064a \u0627\u0644\u0645\u0646\u0638\u0651\u0645" },
        { type: "ul", items: ["\u062a\u0631\u062e\u064a\u0635 \u0625\u0635\u062f\u0627\u0631 \u0623\u0635\u0648\u0644 \u0627\u0641\u062a\u0631\u0627\u0636\u064a\u0629 \u0645\u0646 \u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 \u0645\u0637\u0644\u0648\u0628", "\u0631\u0623\u0633 \u0645\u0627\u0644 \u0623\u062f\u0646\u0649 1.5 \u0645\u0644\u064a\u0648\u0646 \u062f\u0631\u0647\u0645 \u0623\u0648 2% \u0645\u0646 \u0627\u0644\u0627\u062d\u062a\u064a\u0627\u0637\u064a\u0627\u062a", "\u0646\u0634\u0631\u0629 \u0625\u0635\u062f\u0627\u0631 \u0648\u0627\u0641\u064a\u0629 \u0645\u0639 \u0625\u0641\u0635\u0627\u062d \u0643\u0627\u0645\u0644 \u0639\u0646 \u0627\u0644\u0645\u062e\u0627\u0637\u0631"] },
      ],
    },
  },
  {
    slug: "crypto-wallet-licence-uae",
    title: {
      en: "Crypto Wallet Licence UAE 2025: CBUAE, VARA, and DFSA Requirements",
      ar: "\u062a\u0631\u062e\u064a\u0635 \u0645\u062d\u0641\u0638\u0629 \u0627\u0644\u0639\u0645\u0644\u0627\u062a \u0627\u0644\u0645\u0634\u0641\u0631\u0629 \u0641\u064a \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a 2025: \u0645\u062a\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0628\u0646\u0643 \u0627\u0644\u0645\u0631\u0643\u0632\u064a \u0648\u0641\u0627\u0631\u0627 \u0648\u0647\u064a\u0626\u0629 \u062e\u062f\u0645\u0627\u062a \u0645\u0627\u0644\u064a\u0629 \u062f\u0628\u064a",
    },
    metaDescription: {
      en: "Planning a crypto wallet in the UAE? This guide covers which licence you need based on your wallet type, custody model, and target jurisdiction \u2014 CBUAE, VARA, or DFSA.",
      ar: "\u0647\u0644 \u062a\u062e\u0637\u0637 \u0644\u0625\u0637\u0644\u0627\u0642 \u0645\u062d\u0641\u0638\u0629 \u0639\u0645\u0644\u0627\u062a \u0645\u0634\u0641\u0631\u0629 \u0641\u064a \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a\u061f \u064a\u063a\u0637\u064a \u0647\u0630\u0627 \u0627\u0644\u062f\u0644\u064a\u0644 \u0646\u0648\u0639 \u0627\u0644\u062a\u0631\u062e\u064a\u0635 \u0627\u0644\u0645\u0637\u0644\u0648\u0628.",
    },
    date: "March 2026",
    readTime: "5 min read",
    regulationLastUpdated: { en: "June 2025 \u2014 VARA Rulebook Version 2.0", ar: "\u064a\u0648\u0646\u064a\u0648 2025 \u2014 \u062f\u0644\u064a\u0644 \u0642\u0648\u0627\u0639\u062f \u0641\u0627\u0631\u0627 \u0627\u0644\u0625\u0635\u062f\u0627\u0631 2.0" },
    regulationSource: "https://www.vara.ae",
    content: {
      en: [
        { type: "p", text: "A crypto wallet in the UAE may require authorisation from the CBUAE, VARA, or DFSA depending on whether the wallet holds customer assets, what currencies it supports, and in which jurisdiction it operates. The key regulatory question is whether the wallet is custodial or non-custodial \u2014 this determines whether you need a licence at all." },
        { type: "h2", text: "Custodial vs Non-Custodial: The Core Distinction" },
        { type: "p", text: "A custodial wallet holds private keys on behalf of users, meaning the operator controls the assets. This is a regulated custody activity requiring a licence. A non-custodial or self-custody wallet gives users full control of their own private keys. The operator never holds assets, and this falls outside the scope of custody regulations in most cases. Most retail and institutional wallets built for financial institutions are custodial." },
        { type: "h2", text: "Which Licence You Need" },
        { type: "ul", items: ["Dubai (excluding DIFC): VARA Custody Services licence \u2014 minimum capital AED 4 million", "UAE mainland and payment wallets: CBUAE Stored Value Facility or payment licence", "DIFC-based operations: DFSA licence with custody endorsement", "ADGM-based operations: FSRA virtual asset custody permission", "Wallets handling AED stablecoins: CBUAE oversight regardless of jurisdiction"] },
        { type: "h2", text: "Technical Requirements for a Licensed Crypto Wallet" },
        { type: "ul", items: ["Hardware Security Module (HSM) for private key storage", "Multi-signature architecture with configurable approval thresholds", "Hot and cold wallet segregation with defined transfer protocols", "Full asset segregation between client assets and operational funds", "Real-time balance reconciliation and immutable audit trail", "AML/CFT transaction monitoring with blockchain analytics integration", "Travel Rule compliance for transfers above regulatory thresholds", "Incident response plan with VARA or CBUAE notification within defined timeframes"] },
        { type: "h2", text: "Documentation You Will Need" },
        { type: "ul", items: ["System architecture blueprint: full wallet infrastructure, key management, security controls", "Custody policy and procedures manual", "Business continuity and disaster recovery plan for key management systems", "Third-party security audit of smart contracts and custody infrastructure", "AML/CFT programme specific to virtual asset custody activities", "Insurance arrangements for assets under custody"] },
      ],
      ar: [
        { type: "p", text: "\u0642\u062f \u062a\u0633\u062a\u0644\u0632\u0645 \u0645\u062d\u0641\u0638\u0629 \u0627\u0644\u0639\u0645\u0644\u0627\u062a \u0627\u0644\u0645\u0634\u0641\u0631\u0629 \u0641\u064a \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a \u0627\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u062a\u0631\u062e\u064a\u0635 \u0645\u0646 \u0627\u0644\u0628\u0646\u0643 \u0627\u0644\u0645\u0631\u0643\u0632\u064a \u0623\u0648 \u0641\u0627\u0631\u0627 \u0623\u0648 \u0647\u064a\u0626\u0629 \u062e\u062f\u0645\u0627\u062a \u0645\u0627\u0644\u064a\u0629 \u062f\u0628\u064a\u060c \u0648\u0641\u0642\u0627\u064b \u0644\u0646\u0645\u0648\u0630\u062c \u0627\u0644\u062d\u0636\u0627\u0646\u0629 \u0648\u0627\u0644\u0639\u0645\u0644\u0629 \u0648\u0646\u0637\u0627\u0642 \u0627\u0644\u062a\u0634\u063a\u064a\u0644." },
        { type: "h2", text: "\u0627\u0644\u0645\u062d\u0641\u0638\u0629 \u0627\u0644\u062d\u0627\u0641\u0638\u0629 \u0645\u0642\u0627\u0628\u0644 \u063a\u064a\u0631 \u0627\u0644\u062d\u0627\u0641\u0638\u0629" },
        { type: "p", text: "\u0627\u0644\u0645\u062d\u0641\u0638\u0629 \u0627\u0644\u062d\u0627\u0641\u0638\u0629 \u062a\u062d\u062a\u0641\u0638 \u0628\u0627\u0644\u0645\u0641\u0627\u062a\u064a\u062d \u0627\u0644\u062e\u0627\u0635\u0629 \u0646\u064a\u0627\u0628\u0629\u064b \u0639\u0646 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645\u064a\u0646 \u0648\u062a\u064f\u0639\u062f\u0651 \u0646\u0634\u0627\u0637\u0627\u064b \u0645\u0646\u0638\u064e\u0645\u0627\u064b \u064a\u0633\u062a\u0644\u0632\u0645 \u0627\u0644\u062a\u0631\u062e\u064a\u0635." },
        { type: "h2", text: "\u0646\u0648\u0639 \u0627\u0644\u062a\u0631\u062e\u064a\u0635 \u0627\u0644\u0645\u0637\u0644\u0648\u0628" },
        { type: "ul", items: ["\u062f\u0628\u064a: \u062a\u0631\u062e\u064a\u0635 \u062e\u062f\u0645\u0627\u062a \u062d\u0636\u0627\u0646\u0629 \u0645\u0646 \u0641\u0627\u0631\u0627 \u2014 \u0631\u0623\u0633 \u0645\u0627\u0644 \u0623\u062f\u0646\u0649 4 \u0645\u0644\u064a\u0648\u0646 \u062f\u0631\u0647\u0645", "\u0627\u0644\u0628\u0631 \u0627\u0644\u0631\u0626\u064a\u0633\u064a \u0644\u0644\u0625\u0645\u0627\u0631\u0627\u062a: \u062a\u0631\u062e\u064a\u0635 \u0645\u0646 \u0627\u0644\u0628\u0646\u0643 \u0627\u0644\u0645\u0631\u0643\u0632\u064a", "\u0645\u0631\u0643\u0632 \u062f\u0628\u064a \u0627\u0644\u0645\u0627\u0644\u064a: \u062a\u0631\u062e\u064a\u0635 \u0647\u064a\u0626\u0629 \u062e\u062f\u0645\u0627\u062a \u0645\u0627\u0644\u064a\u0629 \u062f\u0628\u064a", "\u0633\u0648\u0642 \u0623\u0628\u0648\u0638\u0628\u064a \u0627\u0644\u0639\u0627\u0644\u0645\u064a: \u0625\u0630\u0646 \u0623\u0635\u0648\u0644 \u0627\u0641\u062a\u0631\u0627\u0636\u064a\u0629 \u0645\u0646 \u0647\u064a\u0626\u0629 \u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0645\u0627\u0644\u064a\u0629"] },
      ],
    },
  },
  {
    slug: "blockchain-licence-uae",
    title: {
      en: "Blockchain Licence UAE: Which Regulator, Which Licence, and How to Apply",
      ar: "\u062a\u0631\u062e\u064a\u0635 \u0627\u0644\u0628\u0644\u0648\u0643 \u062a\u0634\u064a\u0646 \u0641\u064a \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a: \u0627\u0644\u062c\u0647\u0629 \u0627\u0644\u062a\u0646\u0638\u064a\u0645\u064a\u0629 \u0648\u0627\u0644\u062a\u0631\u062e\u064a\u0635 \u0648\u0643\u064a\u0641\u064a\u0629 \u0627\u0644\u062a\u0642\u062f\u064a\u0645",
    },
    metaDescription: {
      en: "There is no single blockchain licence in the UAE. This guide maps your blockchain use case to the correct regulator \u2014 CBUAE, VARA, DFSA, or FSRA \u2014 and explains exactly what you need.",
      ar: "\u0644\u0627 \u064a\u0648\u062c\u062f \u062a\u0631\u062e\u064a\u0635 \u0628\u0644\u0648\u0643 \u062a\u0634\u064a\u0646 \u0645\u0648\u062d\u0651\u062f \u0641\u064a \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a. \u064a\u064f\u062d\u062f\u062f \u0647\u0630\u0627 \u0627\u0644\u062f\u0644\u064a\u0644 \u0627\u0644\u062c\u0647\u0629 \u0627\u0644\u062a\u0646\u0638\u064a\u0645\u064a\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629 \u0644\u062d\u0627\u0644\u0629 \u0627\u0633\u062a\u062e\u062f\u0627\u0645\u0643.",
    },
    date: "March 2026",
    readTime: "5 min read",
    regulationLastUpdated: { en: "September 2025 \u2014 Federal Decree Law No. 6 of 2025", ar: "\u0633\u0628\u062a\u0645\u0628\u0631 2025 \u2014 \u0627\u0644\u0645\u0631\u0633\u0648\u0645 \u0628\u0642\u0627\u0646\u0648\u0646 \u0627\u062a\u062d\u0627\u062f\u064a \u0631\u0642\u0645 6 \u0644\u0633\u0646\u0629 2025" },
    regulationSource: "https://www.centralbank.ae",
    content: {
      en: [
        { type: "p", text: "There is no single blockchain licence in the UAE. Whether you need a licence, and from which regulator, depends entirely on what your blockchain does \u2014 specifically whether it involves financial activities, virtual assets, or services to regulated institutions." },
        { type: "h2", text: "Blockchain Use Case to Regulator Mapping" },
        { type: "ul", items: ["Crypto exchange or trading platform in Dubai \u2192 VARA Exchange Services licence", "Virtual asset custody or wallet \u2192 VARA Custody Services licence", "Stablecoin issuance (AED-pegged) \u2192 CBUAE Payment Token Services", "Stablecoin issuance (non-AED) in Dubai \u2192 VARA VA Issuance licence", "Blockchain settlement layer for a licensed bank \u2192 CBUAE approval or variation", "Tokenised securities or investment products \u2192 DFSA (DIFC) or FSRA (ADGM)", "Blockchain technology provider enabling licensed financial activities \u2192 CBUAE Article 62 assessment", "DeFi protocol with UAE users \u2192 CBUAE Article 62 risk assessment required"] },
        { type: "h2", text: "If You Are a Technology Provider" },
        { type: "p", text: "Article 62 of Federal Decree Law No. 6 of 2025 captures technology providers whose platforms enable regulated financial activities. If your blockchain infrastructure processes payments, supports deposit-taking, enables lending, or facilitates investment services for regulated institutions, you may need CBUAE authorisation even if you are not the licensed institution yourself. This is the single most underestimated compliance risk for blockchain technology companies operating in the UAE." },
        { type: "h2", text: "Regulatory Sandboxes for New Use Cases" },
        { type: "ul", items: ["CBUAE FinTech Office sandbox \u2014 for innovative payment and financial technology", "VARA \u2014 no formal sandbox, but engagement process for novel business models", "DFSA Innovation Testing Licence \u2014 2-year testing period for unproven models in DIFC", "FSRA RegLab \u2014 ADGM's regulatory sandbox for fintech and virtual asset innovation"] },
        { type: "h2", text: "Core Documentation for Any Blockchain Licence Application" },
        { type: "ul", items: ["System architecture blueprint: node infrastructure, consensus mechanism, data flows, security controls", "Smart contract audit by a recognised security firm", "AML/CFT programme covering on-chain and off-chain monitoring", "Token economics documentation if a token is involved", "Legal opinion confirming the applicable regulatory classification", "Governance framework with qualified individuals in all key roles"] },
      ],
      ar: [
        { type: "p", text: "\u0644\u0627 \u064a\u0648\u062c\u062f \u062a\u0631\u062e\u064a\u0635 \u0628\u0644\u0648\u0643 \u062a\u0634\u064a\u0646 \u0645\u0648\u062d\u0651\u062f \u0641\u064a \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a. \u0647\u0644 \u062a\u062d\u062a\u0627\u062c \u0625\u0644\u0649 \u062a\u0631\u062e\u064a\u0635 \u0648\u0623\u064a\u0651 \u0645\u0646\u0647 \u064a\u0639\u062a\u0645\u062f \u0643\u0644\u064a\u0627\u064b \u0639\u0644\u0649 \u0645\u0627 \u062a\u0641\u0639\u0644\u0647 \u0645\u0646\u0635\u062a\u0643 \u0648\u0645\u0627 \u0625\u0630\u0627 \u0643\u0627\u0646\u062a \u062a\u0646\u0637\u0648\u064a \u0639\u0644\u0649 \u0623\u0646\u0634\u0637\u0629 \u0645\u0627\u0644\u064a\u0629 \u0623\u0648 \u0623\u0635\u0648\u0644 \u0627\u0641\u062a\u0631\u0627\u0636\u064a\u0629." },
        { type: "h2", text: "\u062a\u062d\u062f\u064a\u062f \u0627\u0644\u062c\u0647\u0629 \u0627\u0644\u062a\u0646\u0638\u064a\u0645\u064a\u0629 \u0628\u062d\u0633\u0628 \u062d\u0627\u0644\u0629 \u0627\u0644\u0627\u0633\u062a\u062e\u062f\u0627\u0645" },
        { type: "ul", items: ["\u0645\u0646\u0635\u0629 \u062a\u062f\u0627\u0648\u0644 \u0641\u064a \u062f\u0628\u064a: \u062a\u0631\u062e\u064a\u0635 \u0641\u0627\u0631\u0627", "\u062d\u0636\u0627\u0646\u0629 \u0627\u0644\u0623\u0635\u0648\u0644 \u0627\u0644\u0627\u0641\u062a\u0631\u0627\u0636\u064a\u0629: \u062a\u0631\u062e\u064a\u0635 \u0641\u0627\u0631\u0627", "\u0625\u0635\u062f\u0627\u0631 \u0627\u0644\u0639\u0645\u0644\u0627\u062a \u0627\u0644\u0645\u0633\u062a\u0642\u0631\u0629 \u0628\u0627\u0644\u062f\u0631\u0647\u0645: \u0627\u0644\u0628\u0646\u0643 \u0627\u0644\u0645\u0631\u0643\u0632\u064a", "\u0627\u0644\u0623\u0648\u0631\u0627\u0642 \u0627\u0644\u0645\u0627\u0644\u064a\u0629 \u0627\u0644\u0645\u064f\u0631\u0645\u064e\u0632\u0629: \u0647\u064a\u0626\u0629 \u062e\u062f\u0645\u0627\u062a \u0645\u0627\u0644\u064a\u0629 \u062f\u0628\u064a \u0623\u0648 \u0647\u064a\u0626\u0629 \u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0645\u0627\u0644\u064a\u0629 \u0628\u0633\u0648\u0642 \u0623\u0628\u0648\u0638\u0628\u064a \u0627\u0644\u0639\u0627\u0644\u0645\u064a", "\u0645\u0632\u0648\u062f\u0648 \u0627\u0644\u062a\u0643\u0646\u0648\u0644\u0648\u062c\u064a\u0627: \u062a\u0642\u064a\u064a\u0645 \u0627\u0644\u0645\u0627\u062f\u0629 62 \u0645\u0646 \u0627\u0644\u0642\u0627\u0646\u0648\u0646 \u0627\u0644\u0627\u062a\u062d\u0627\u062f\u064a"] },
      ],
    },
  },
  {
    slug: "dfsa-crypto-licence-difc",
    title: {
      en: "DFSA Crypto Licence DIFC: Requirements, Process, and Innovation Testing Licence",
      ar: "\u062a\u0631\u062e\u064a\u0635 \u0627\u0644\u0639\u0645\u0644\u0627\u062a \u0627\u0644\u0645\u0634\u0641\u0631\u0629 \u0645\u0646 \u0647\u064a\u0626\u0629 \u062e\u062f\u0645\u0627\u062a \u0645\u0627\u0644\u064a\u0629 \u062f\u0628\u064a \u0641\u064a \u0645\u0631\u0643\u0632 \u062f\u0628\u064a \u0627\u0644\u0645\u0627\u0644\u064a: \u0627\u0644\u0645\u062a\u0637\u0644\u0628\u0627\u062a \u0648\u0627\u0644\u0639\u0645\u0644\u064a\u0629",
    },
    metaDescription: {
      en: "Operating in DIFC with crypto or virtual assets? This guide covers DFSA Crypto Token and Investment Token requirements, the Innovation Testing Licence, and how to apply.",
      ar: "\u0647\u0644 \u062a\u0639\u0645\u0644 \u0641\u064a \u0645\u0631\u0643\u0632 \u062f\u0628\u064a \u0627\u0644\u0645\u0627\u0644\u064a \u0645\u0639 \u0627\u0644\u0639\u0645\u0644\u0627\u062a \u0627\u0644\u0645\u0634\u0641\u0631\u0629\u061f \u064a\u063a\u0637\u064a \u0647\u0630\u0627 \u0627\u0644\u062f\u0644\u064a\u0644 \u0645\u062a\u0637\u0644\u0628\u0627\u062a \u0647\u064a\u0626\u0629 \u062e\u062f\u0645\u0627\u062a \u0645\u0627\u0644\u064a\u0629 \u062f\u0628\u064a \u0648\u0639\u0645\u0644\u064a\u0629 \u0627\u0644\u062a\u0642\u062f\u064a\u0645.",
    },
    date: "March 2026",
    readTime: "5 min read",
    regulationLastUpdated: { en: "2024 \u2014 DFSA Crypto Token and Investment Token frameworks", ar: "2024 \u2014 \u0623\u0637\u0631 \u0627\u0644\u0631\u0645\u0648\u0632 \u0627\u0644\u0645\u0634\u0641\u0631\u0629 \u0648\u0631\u0645\u0648\u0632 \u0627\u0644\u0627\u0633\u062a\u062b\u0645\u0627\u0631 \u0644\u062f\u0649 \u0647\u064a\u0626\u0629 \u062e\u062f\u0645\u0627\u062a \u0645\u0627\u0644\u064a\u0629 \u062f\u0628\u064a" },
    regulationSource: "https://www.dfsa.ae",
    content: {
      en: [
        { type: "p", text: "The Dubai Financial Services Authority (DFSA) regulates virtual asset and cryptocurrency activities conducted in or from the Dubai International Financial Centre (DIFC). The DFSA framework is distinct from VARA \u2014 VARA governs Dubai outside DIFC, while the DFSA exclusively covers DIFC. If you intend to operate from DIFC, you need a DFSA licence, not a VARA licence." },
        { type: "h2", text: "DFSA Crypto Token Framework" },
        { type: "p", text: "The DFSA introduced its Crypto Token regime covering tokens that are not investment products but have monetary value and are used as a medium of exchange. Firms wishing to operate a Crypto Token exchange, custody service, or related activity in DIFC require a DFSA financial services licence with a specific Crypto Token endorsement. The DFSA maintains an approved Crypto Token list \u2014 only tokens on this list may be offered or traded by DFSA-regulated firms." },
        { type: "h2", text: "Innovation Testing Licence (ITL)" },
        { type: "ul", items: ["2-year testing period for innovative business models not yet covered by existing frameworks", "Lighter-touch regulatory requirements during the testing phase", "Available to firms with a genuine innovation that cannot be authorised under existing rules", "Successful ITL graduates can convert to a full DFSA licence", "ITL does not permit retail customer-facing activities without specific DFSA approval"] },
        { type: "h2", text: "DFSA Licence Application Requirements" },
        { type: "ul", items: ["Regulatory business plan demonstrating DIFC nexus and client base", "Governance structure with DFSA-approved Senior Executive Officer and Compliance Officer", "Capital adequacy: base capital of USD 500,000 minimum for most crypto activities", "Technology and cybersecurity framework meeting DFSA standards", "AML/CFT programme aligned with DFSA Anti-Money Laundering Module", "Client asset protection arrangements for custody activities"] },
        { type: "h2", text: "DFSA vs VARA: Choosing Your Jurisdiction" },
        { type: "ul", items: ["DIFC/DFSA: English common law, recognised globally, preferred by institutional and international clients", "Dubai mainland/VARA: broader market access to UAE retail and commercial clients", "Many firms obtain both a VARA and DFSA licence to serve both markets", "Regulatory arbitrage between the two frameworks is not permitted \u2014 activities must match the licence scope"] },
      ],
      ar: [
        { type: "p", text: "\u062a\u064f\u0646\u0638\u0651\u0645 \u0647\u064a\u0626\u0629 \u062e\u062f\u0645\u0627\u062a \u0645\u0627\u0644\u064a\u0629 \u062f\u0628\u064a \u0623\u0646\u0634\u0637\u0629 \u0627\u0644\u0623\u0635\u0648\u0644 \u0627\u0644\u0627\u0641\u062a\u0631\u0627\u0636\u064a\u0629 \u0641\u064a \u0645\u0631\u0643\u0632 \u062f\u0628\u064a \u0627\u0644\u0645\u0627\u0644\u064a \u0627\u0644\u0639\u0627\u0644\u0645\u064a. \u064a\u062e\u062a\u0644\u0641 \u0625\u0637\u0627\u0631\u0647\u0627 \u0627\u0644\u062a\u0646\u0638\u064a\u0645\u064a \u0639\u0646 \u0625\u0637\u0627\u0631 \u0641\u0627\u0631\u0627\u060c \u0625\u0630 \u062a\u062e\u062a\u0635 \u0647\u064a\u0626\u0629 \u062e\u062f\u0645\u0627\u062a \u0645\u0627\u0644\u064a\u0629 \u062f\u0628\u064a \u062d\u0635\u0631\u064a\u0627\u064b \u0628\u0645\u0631\u0643\u0632 \u062f\u0628\u064a \u0627\u0644\u0645\u0627\u0644\u064a." },
        { type: "h2", text: "\u062a\u0631\u062e\u064a\u0635 \u0627\u0644\u0627\u062e\u062a\u0628\u0627\u0631 \u0627\u0644\u062a\u062c\u0631\u064a\u0628\u064a" },
        { type: "ul", items: ["\u0641\u062a\u0631\u0629 \u0627\u062e\u062a\u0628\u0627\u0631 \u0645\u062f\u062a\u0647\u0627 \u0633\u0646\u062a\u0627\u0646", "\u0645\u062a\u0637\u0644\u0628\u0627\u062a \u062a\u0646\u0638\u064a\u0645\u064a\u0629 \u0645\u062e\u0641\u0641\u0629 \u062e\u0644\u0627\u0644 \u0645\u0631\u062d\u0644\u0629 \u0627\u0644\u0627\u062e\u062a\u0628\u0627\u0631", "\u0645\u062a\u0627\u062d \u0644\u0644\u0646\u0645\u0627\u0630\u062c \u0627\u0644\u0645\u0628\u062a\u0643\u0631\u0629 \u063a\u064a\u0631 \u0627\u0644\u0645\u0634\u0645\u0648\u0644\u0629 \u0628\u0627\u0644\u0623\u0637\u0631 \u0627\u0644\u0642\u0627\u0626\u0645\u0629"] },
      ],
    },
  },
  {
    slug: "fsra-adgm-virtual-asset-licence",
    title: {
      en: "FSRA ADGM Virtual Asset Licence: Abu Dhabi's Crypto Regulatory Framework",
      ar: "\u062a\u0631\u062e\u064a\u0635 \u0627\u0644\u0623\u0635\u0648\u0644 \u0627\u0644\u0627\u0641\u062a\u0631\u0627\u0636\u064a\u0629 \u0645\u0646 \u0647\u064a\u0626\u0629 \u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0645\u0627\u0644\u064a\u0629 \u0628\u0633\u0648\u0642 \u0623\u0628\u0648\u0638\u0628\u064a \u0627\u0644\u0639\u0627\u0644\u0645\u064a",
    },
    metaDescription: {
      en: "ADGM's FSRA regulates virtual asset activities in Abu Dhabi Global Market. This guide covers the FSRA virtual asset framework, licence categories, capital requirements, and application process.",
      ar: "\u062a\u064f\u0646\u0638\u0651\u0645 \u0647\u064a\u0626\u0629 \u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0645\u0627\u0644\u064a\u0629 \u0641\u064a \u0633\u0648\u0642 \u0623\u0628\u0648\u0638\u0628\u064a \u0627\u0644\u0639\u0627\u0644\u0645\u064a \u0623\u0646\u0634\u0637\u0629 \u0627\u0644\u0623\u0635\u0648\u0644 \u0627\u0644\u0627\u0641\u062a\u0631\u0627\u0636\u064a\u0629 \u0641\u064a \u0623\u0628\u0648\u0638\u0628\u064a.",
    },
    date: "March 2026",
    readTime: "5 min read",
    regulationLastUpdated: { en: "2024 \u2014 FSRA Virtual Asset Framework and Financial Services and Markets Regulations", ar: "2024 \u2014 \u0625\u0637\u0627\u0631 \u0627\u0644\u0623\u0635\u0648\u0644 \u0627\u0644\u0627\u0641\u062a\u0631\u0627\u0636\u064a\u0629 \u0648\u0627\u0644\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0645\u0627\u0644\u064a\u0629 \u0644\u0647\u064a\u0626\u0629 \u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0645\u0627\u0644\u064a\u0629" },
    regulationSource: "https://www.fsra.adgm.com",
    content: {
      en: [
        { type: "p", text: "The Financial Services Regulatory Authority (FSRA) of the Abu Dhabi Global Market (ADGM) was one of the first regulators globally to introduce a comprehensive virtual asset framework. The FSRA framework applies to virtual asset activities conducted within ADGM, Abu Dhabi's international financial centre, and operates under English common law." },
        { type: "h2", text: "Virtual Asset Activities Regulated by FSRA" },
        { type: "ul", items: ["Operating a Multilateral Trading Facility (MTF) for virtual assets", "Virtual asset custody and safeguarding", "Dealing in virtual assets as principal or agent", "Managing virtual asset portfolios", "Arranging virtual asset transactions", "Providing financial advice on virtual assets", "Providing technology and infrastructure enabling the above"] },
        { type: "h2", text: "Licence Categories and Capital Requirements" },
        { type: "ul", items: ["Category 1 \u2014 USD 2 million minimum capital: custody, exchanges, MTF operators", "Category 2 \u2014 USD 250,000 minimum: advisory, arranging, portfolio management", "Capital must be held in ADGM or UAE in liquid form", "Professional indemnity insurance required for certain categories", "Annual capital adequacy reporting to FSRA mandatory"] },
        { type: "h2", text: "ADGM RegLab: The Regulatory Sandbox" },
        { type: "p", text: "ADGM operates the RegLab, a dedicated regulatory sandbox for fintech and virtual asset businesses testing novel products and services. RegLab participants operate under bespoke regulatory frameworks tailored to their specific business model, with a defined testing period before transitioning to full FSRA authorisation." },
        { type: "h2", text: "FSRA Application Requirements" },
        { type: "ul", items: ["Regulatory business plan demonstrating ADGM nexus", "Governance structure with FSRA-approved Senior Executive Officer, Finance Officer, and Compliance Officer", "Technology architecture documentation: systems, security, data management", "AML/CFT programme aligned with FSRA Anti-Money Laundering Rulebook", "Client asset protection policy for custody activities", "Risk management framework appropriate to the activity type"] },
      ],
      ar: [
        { type: "p", text: "\u0643\u0627\u0646\u062a \u0647\u064a\u0626\u0629 \u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0645\u0627\u0644\u064a\u0629 \u0641\u064a \u0633\u0648\u0642 \u0623\u0628\u0648\u0638\u0628\u064a \u0627\u0644\u0639\u0627\u0644\u0645\u064a \u0645\u0646 \u0623\u0648\u0627\u0626\u0644 \u0627\u0644\u062c\u0647\u0627\u062a \u0627\u0644\u062a\u0646\u0638\u064a\u0645\u064a\u0629 \u0639\u0644\u0649 \u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0639\u0627\u0644\u0645 \u0627\u0644\u062a\u064a \u0623\u062f\u062e\u0644\u062a \u0625\u0637\u0627\u0631\u0627\u064b \u0634\u0627\u0645\u0644\u0627\u064b \u0644\u0644\u0623\u0635\u0648\u0644 \u0627\u0644\u0627\u0641\u062a\u0631\u0627\u0636\u064a\u0629." },
        { type: "h2", text: "\u0627\u0644\u0623\u0646\u0634\u0637\u0629 \u0627\u0644\u0645\u0646\u0638\u064e\u0645\u0629" },
        { type: "ul", items: ["\u062a\u0634\u063a\u064a\u0644 \u0645\u0646\u0635\u0627\u062a \u062a\u062f\u0627\u0648\u0644 \u0645\u062a\u0639\u062f\u062f\u0629 \u0627\u0644\u0623\u0637\u0631\u0627\u0641", "\u062d\u0636\u0627\u0646\u0629 \u0627\u0644\u0623\u0635\u0648\u0644 \u0627\u0644\u0627\u0641\u062a\u0631\u0627\u0636\u064a\u0629 \u0648\u062d\u0641\u0638\u0647\u0627", "\u0627\u0644\u062a\u0639\u0627\u0645\u0644 \u0641\u064a \u0627\u0644\u0623\u0635\u0648\u0644 \u0627\u0644\u0627\u0641\u062a\u0631\u0627\u0636\u064a\u0629", "\u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0645\u062d\u0627\u0641\u0638 \u0627\u0644\u0627\u0641\u062a\u0631\u0627\u0636\u064a\u0629", "\u062a\u0642\u062f\u064a\u0645 \u0627\u0644\u0645\u0634\u0648\u0631\u0629 \u0627\u0644\u0645\u0627\u0644\u064a\u0629 \u0628\u0634\u0623\u0646 \u0627\u0644\u0623\u0635\u0648\u0644 \u0627\u0644\u0627\u0641\u062a\u0631\u0627\u0636\u064a\u0629"] },
        { type: "h2", text: "\u0627\u0644\u0645\u062e\u062a\u0628\u0631 \u0627\u0644\u062a\u0646\u0638\u064a\u0645\u064a RegLab" },
        { type: "p", text: "\u064a\u064f\u062a\u064a\u062d \u0627\u0644\u0645\u062e\u062a\u0628\u0631 \u0627\u0644\u062a\u0646\u0638\u064a\u0645\u064a \u0644\u0633\u0648\u0642 \u0623\u0628\u0648\u0638\u0628\u064a \u0627\u0644\u0639\u0627\u0644\u0645\u064a \u0644\u0644\u0634\u0631\u0643\u0627\u062a \u0627\u0644\u0645\u0628\u062a\u0643\u0631\u0629 \u0627\u062e\u062a\u0628\u0627\u0631 \u0645\u0646\u062a\u062c\u0627\u062a\u0647\u0627 \u0636\u0645\u0646 \u0625\u0637\u0627\u0631 \u062a\u0646\u0638\u064a\u0645\u064a \u0645\u062e\u0635\u0635 \u0642\u0628\u0644 \u0627\u0644\u0627\u0646\u062a\u0642\u0627\u0644 \u0625\u0644\u0649 \u0627\u0644\u062a\u0631\u062e\u064a\u0635 \u0627\u0644\u0643\u0627\u0645\u0644." },
      ],
    },
  },
  {
    slug: "uae-payment-licence-cbuae",
    title: {
      en: "UAE Payment Service Provider Licence: CBUAE Requirements and Application Guide",
      ar: "\u062a\u0631\u062e\u064a\u0635 \u0645\u0632\u0648\u062f \u062e\u062f\u0645\u0627\u062a \u0627\u0644\u062f\u0641\u0639 \u0641\u064a \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a: \u0645\u062a\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0628\u0646\u0643 \u0627\u0644\u0645\u0631\u0643\u0632\u064a \u0648\u062f\u0644\u064a\u0644 \u0627\u0644\u062a\u0642\u062f\u064a\u0645",
    },
    metaDescription: {
      en: "Launching a payment service in the UAE? This guide covers CBUAE payment service provider licence categories, capital requirements, technical standards, and the application process.",
      ar: "\u0647\u0644 \u062a\u062e\u0637\u0637 \u0644\u0625\u0637\u0644\u0627\u0642 \u062e\u062f\u0645\u0629 \u062f\u0641\u0639 \u0641\u064a \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a\u061f \u064a\u063a\u0637\u064a \u0647\u0630\u0627 \u0627\u0644\u062f\u0644\u064a\u0644 \u0641\u0626\u0627\u062a \u062a\u0631\u062e\u064a\u0635 \u0645\u0632\u0648\u062f\u064a \u062e\u062f\u0645\u0627\u062a \u0627\u0644\u062f\u0641\u0639 \u0648\u0645\u062a\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0628\u0646\u0643 \u0627\u0644\u0645\u0631\u0643\u0632\u064a.",
    },
    date: "March 2026",
    readTime: "5 min read",
    regulationLastUpdated: { en: "September 2025 \u2014 Federal Decree Law No. 6 of 2025 and Retail Payment Services Regulation", ar: "\u0633\u0628\u062a\u0645\u0628\u0631 2025 \u2014 \u0627\u0644\u0645\u0631\u0633\u0648\u0645 \u0627\u0644\u0627\u062a\u062d\u0627\u062f\u064a \u0631\u0642\u0645 6 \u0648\u0644\u0627\u0626\u062d\u0629 \u062e\u062f\u0645\u0627\u062a \u0627\u0644\u062f\u0641\u0639 \u0628\u0627\u0644\u062a\u062c\u0632\u0626\u0629" },
    regulationSource: "https://www.centralbank.ae",
    content: {
      en: [
        { type: "p", text: "The CBUAE regulates payment services in the UAE under the Retail Payment Services and Card Schemes (RPSCS) Regulation and the Stored Value Facilities (SVF) Regulation. Federal Decree Law No. 6 of 2025 reinforces and extends these frameworks. Any entity providing payment services to customers in the UAE \u2014 including digital wallets, payment gateways, remittance services, and card scheme operations \u2014 requires a CBUAE licence." },
        { type: "h2", text: "Payment Service Provider Licence Categories" },
        { type: "ul", items: ["Retail Payment Services Provider \u2014 for payment initiation, account information, and merchant acquiring services", "Stored Value Facility Provider \u2014 for prepaid cards, digital wallets, and stored value products", "Card Scheme Operator \u2014 for operating a card payment network", "Payment Token Service Provider \u2014 for AED-pegged stablecoins and payment tokens under the 2024 Circular"] },
        { type: "h2", text: "Capital Requirements" },
        { type: "ul", items: ["Retail Payment Services Provider: AED 2 million minimum base capital", "Stored Value Facility: capital proportional to outstanding balances, minimum AED 2 million", "Payment Token Service Provider: capital determined by CBUAE based on token issuance scale", "All licensees must maintain capital on an ongoing basis with quarterly reporting"] },
        { type: "h2", text: "Application Timeline" },
        { type: "p", text: "CBUAE payment licence applications typically take three to six months from submission to approval for well-prepared applications. The most common delays are incomplete technology architecture documentation, AML/CFT programmes that do not specifically address the payment activity type, and governance structures missing key CBUAE-required roles. Pre-application consultation with the CBUAE FinTech Office significantly reduces the risk of application rejection." },
      ],
      ar: [
        { type: "p", text: "\u064a\u064f\u0646\u0638\u0651\u0645 \u0627\u0644\u0628\u0646\u0643 \u0627\u0644\u0645\u0631\u0643\u0632\u064a \u062e\u062f\u0645\u0627\u062a \u0627\u0644\u062f\u0641\u0639 \u0641\u064a \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a \u0628\u0645\u0648\u062c\u0628 \u0644\u0627\u0626\u062d\u0629 \u062e\u062f\u0645\u0627\u062a \u0627\u0644\u062f\u0641\u0639 \u0628\u0627\u0644\u062a\u062c\u0632\u0626\u0629 \u0648\u0645\u0646\u0634\u0622\u062a \u0627\u0644\u0642\u064a\u0645\u0629 \u0627\u0644\u0645\u062e\u0632\u0646\u0629. \u0623\u064a \u062c\u0647\u0629 \u062a\u0642\u062f\u0645 \u062e\u062f\u0645\u0627\u062a \u062f\u0641\u0639 \u0644\u0644\u0639\u0645\u0644\u0627\u0621 \u0641\u064a \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a \u062a\u062d\u062a\u0627\u062c \u0625\u0644\u0649 \u062a\u0631\u062e\u064a\u0635 \u0645\u0646 \u0627\u0644\u0628\u0646\u0643 \u0627\u0644\u0645\u0631\u0643\u0632\u064a." },
        { type: "h2", text: "\u0641\u0626\u0627\u062a \u062a\u0631\u062e\u064a\u0635 \u0645\u0632\u0648\u062f\u064a \u062e\u062f\u0645\u0627\u062a \u0627\u0644\u062f\u0641\u0639" },
        { type: "ul", items: ["\u0645\u0632\u0648\u062f \u062e\u062f\u0645\u0627\u062a \u0627\u0644\u062f\u0641\u0639 \u0628\u0627\u0644\u062a\u062c\u0632\u0626\u0629", "\u0645\u0632\u0648\u062f \u0645\u0646\u0634\u0623\u0629 \u0627\u0644\u0642\u064a\u0645\u0629 \u0627\u0644\u0645\u062e\u0632\u0646\u0629", "\u0645\u0634\u063a\u0651\u0644 \u0645\u062e\u0637\u0637 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062a", "\u0645\u0632\u0648\u062f \u062e\u062f\u0645\u0629 \u0631\u0645\u0632 \u0627\u0644\u062f\u0641\u0639"] },
        { type: "h2", text: "\u0627\u0644\u062c\u062f\u0648\u0644 \u0627\u0644\u0632\u0645\u0646\u064a \u0644\u0644\u062a\u0642\u062f\u064a\u0645" },
        { type: "p", text: "\u062a\u0633\u062a\u063a\u0631\u0642 \u0637\u0644\u0628\u0627\u062a \u062a\u0631\u062e\u064a\u0635 \u0627\u0644\u062f\u0641\u0639 \u0644\u062f\u0649 \u0627\u0644\u0628\u0646\u0643 \u0627\u0644\u0645\u0631\u0643\u0632\u064a \u0639\u0627\u062f\u0629\u064b \u0645\u0646 \u062b\u0644\u0627\u062b\u0629 \u0625\u0644\u0649 \u0633\u062a\u0629 \u0623\u0634\u0647\u0631 \u0645\u0646 \u062a\u0627\u0631\u064a\u062e \u0627\u0644\u062a\u0642\u062f\u064a\u0645 \u062d\u062a\u0649 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0644\u0644\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0645\u0643\u062a\u0645\u0644\u0629." },
      ],
    },
  },
  {
    slug: "crypto-exchange-licence-dubai-vara",
    title: {
      en: "Crypto Exchange Licence Dubai: VARA Requirements, Capital, and Application Process",
      ar: "\u062a\u0631\u062e\u064a\u0635 \u0645\u0646\u0635\u0629 \u062a\u062f\u0627\u0648\u0644 \u0627\u0644\u0639\u0645\u0644\u0627\u062a \u0627\u0644\u0645\u0634\u0641\u0631\u0629 \u0641\u064a \u062f\u0628\u064a: \u0645\u062a\u0637\u0644\u0628\u0627\u062a \u0641\u0627\u0631\u0627 \u0648\u0631\u0623\u0633 \u0627\u0644\u0645\u0627\u0644 \u0648\u0639\u0645\u0644\u064a\u0629 \u0627\u0644\u062a\u0642\u062f\u064a\u0645",
    },
    metaDescription: {
      en: "Launching a crypto exchange in Dubai? This guide covers VARA Exchange Services licence requirements, capital thresholds, technology standards, and what Rulebook 2.0 changes for exchange operators.",
      ar: "\u0647\u0644 \u062a\u062e\u0637\u0637 \u0644\u0625\u0637\u0644\u0627\u0642 \u0645\u0646\u0635\u0629 \u062a\u062f\u0627\u0648\u0644 \u0639\u0645\u0644\u0627\u062a \u0645\u0634\u0641\u0631\u0629 \u0641\u064a \u062f\u0628\u064a\u061f \u064a\u063a\u0637\u064a \u0647\u0630\u0627 \u0627\u0644\u062f\u0644\u064a\u0644 \u0645\u062a\u0637\u0644\u0628\u0627\u062a \u062a\u0631\u062e\u064a\u0635 \u0641\u0627\u0631\u0627 \u0644\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0635\u0631\u0641.",
    },
    date: "March 2026",
    readTime: "5 min read",
    regulationLastUpdated: { en: "June 2025 \u2014 VARA Rulebook Version 2.0", ar: "\u064a\u0648\u0646\u064a\u0648 2025 \u2014 \u062f\u0644\u064a\u0644 \u0642\u0648\u0627\u0639\u062f \u0641\u0627\u0631\u0627 \u0627\u0644\u0625\u0635\u062f\u0627\u0631 2.0" },
    regulationSource: "https://www.vara.ae",
    content: {
      en: [
        { type: "p", text: "Operating a cryptocurrency exchange in Dubai requires a VARA Exchange Services licence. This is one of VARA's seven licensed activity categories and carries some of the highest capital and operational requirements in the framework. VARA Rulebook Version 2.0, effective June 2025, significantly tightened requirements for exchange operators, particularly around margin trading, market conduct, and technology governance." },
        { type: "h2", text: "Exchange Services Licence Requirements" },
        { type: "ul", items: ["Minimum capital: AED 4 million plus a surety bond", "Technology Governance and Risk Assessment Framework mandatory", "Order book and trade matching system documentation required", "Market surveillance system to detect manipulation, wash trading, and spoofing", "Client asset segregation: exchange operating funds strictly separated from client assets", "Cold storage for majority of client virtual assets", "24/7 operational monitoring with incident response capability"] },
        { type: "h2", text: "Application Timeline" },
        { type: "p", text: "VARA exchange licence applications are among the most complex and time-consuming in the virtual asset space. From initial application to final licence, the typical timeline is 9 to 15 months. The most common causes of delay are incomplete technology architecture documentation, AML/CFT programmes that do not specifically address exchange activities, and governance teams lacking the required experience. A minimum viable product demonstration is typically required during the assessment phase." },
      ],
      ar: [
        { type: "p", text: "\u064a\u0633\u062a\u0644\u0632\u0645 \u062a\u0634\u063a\u064a\u0644 \u0645\u0646\u0635\u0629 \u062a\u062f\u0627\u0648\u0644 \u0639\u0645\u0644\u0627\u062a \u0645\u0634\u0641\u0631\u0629 \u0641\u064a \u062f\u0628\u064a \u0627\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u062a\u0631\u062e\u064a\u0635 \u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0635\u0631\u0641 \u0645\u0646 \u0641\u0627\u0631\u0627\u060c \u0648\u0647\u0648 \u0623\u062d\u062f \u0623\u0643\u062b\u0631 \u0641\u0626\u0627\u062a \u0627\u0644\u062a\u0631\u0627\u062e\u064a\u0635 \u0635\u0631\u0627\u0645\u0629\u064b \u0645\u0646 \u062d\u064a\u062b \u0645\u062a\u0637\u0644\u0628\u0627\u062a \u0631\u0623\u0633 \u0627\u0644\u0645\u0627\u0644 \u0648\u0627\u0644\u062a\u0634\u063a\u064a\u0644." },
        { type: "h2", text: "\u0645\u062a\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u062a\u0631\u062e\u064a\u0635" },
        { type: "ul", items: ["\u0631\u0623\u0633 \u0645\u0627\u0644 \u0623\u062f\u0646\u0649 4 \u0645\u0644\u064a\u0648\u0646 \u062f\u0631\u0647\u0645 \u0628\u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0625\u0644\u0649 \u0636\u0645\u0627\u0646 \u0645\u0635\u0631\u0641\u064a", "\u0625\u0637\u0627\u0631 \u062d\u0648\u0643\u0645\u0629 \u0648\u062a\u0642\u064a\u064a\u0645 \u0645\u062e\u0627\u0637\u0631 \u062a\u0642\u0646\u064a\u0629 \u0625\u0644\u0632\u0627\u0645\u064a", "\u062a\u0648\u062b\u064a\u0642 \u0646\u0638\u0627\u0645 \u0645\u0637\u0627\u0628\u0642\u0629 \u0627\u0644\u0623\u0648\u0627\u0645\u0631", "\u0646\u0638\u0627\u0645 \u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u0633\u0648\u0642 \u0644\u0631\u0635\u062f \u0627\u0644\u062a\u0644\u0627\u0639\u0628"] },
        { type: "h2", text: "\u0627\u0644\u062c\u062f\u0648\u0644 \u0627\u0644\u0632\u0645\u0646\u064a" },
        { type: "p", text: "\u062a\u064f\u0639\u062f\u0651 \u0637\u0644\u0628\u0627\u062a \u062a\u0631\u062e\u064a\u0635 \u0627\u0644\u0635\u0631\u0641 \u0645\u0646 \u0628\u064a\u0646 \u0627\u0644\u0623\u0643\u062b\u0631 \u062a\u0639\u0642\u064a\u062f\u0627\u064b \u0641\u064a \u0645\u062c\u0627\u0644 \u0627\u0644\u0623\u0635\u0648\u0644 \u0627\u0644\u0627\u0641\u062a\u0631\u0627\u0636\u064a\u0629. \u064a\u0645\u062a\u062f \u0627\u0644\u0645\u0633\u0627\u0631 \u0645\u0646 \u0627\u0644\u062a\u0642\u062f\u064a\u0645 \u062d\u062a\u0649 \u0645\u0646\u062d \u0627\u0644\u062a\u0631\u062e\u064a\u0635 \u0627\u0644\u0646\u0647\u0627\u0626\u064a \u0628\u064a\u0646 9 \u064815 \u0634\u0647\u0631\u0627\u064b." },
      ],
    },
  },
  {
    slug: "uae-fintech-licence-complete-guide",
    title: {
      en: "UAE Fintech Licence: Complete Guide to Every Regulator and Pathway in 2025",
      ar: "\u062a\u0631\u062e\u064a\u0635 \u0627\u0644\u0641\u0646\u062a\u0643 \u0641\u064a \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a: \u0627\u0644\u062f\u0644\u064a\u0644 \u0627\u0644\u0634\u0627\u0645\u0644 \u0644\u0643\u0644 \u062c\u0647\u0629 \u062a\u0646\u0638\u064a\u0645\u064a\u0629 \u0648\u0645\u0633\u0627\u0631 \u062a\u0631\u062e\u064a\u0635 \u0641\u064a 2025",
    },
    metaDescription: {
      en: "The UAE has four main financial regulators for fintech: CBUAE, VARA, DFSA, and FSRA. This guide maps every fintech business model to the right regulator, licence category, and application pathway.",
      ar: "\u0644\u0644\u0625\u0645\u0627\u0631\u0627\u062a \u0623\u0631\u0628\u0639 \u062c\u0647\u0627\u062a \u062a\u0646\u0638\u064a\u0645\u064a\u0629 \u0631\u0626\u064a\u0633\u064a\u0629 \u0644\u0644\u0641\u0646\u062a\u0643. \u064a\u064f\u062d\u062f\u062f \u0647\u0630\u0627 \u0627\u0644\u062f\u0644\u064a\u0644 \u0627\u0644\u062c\u0647\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629 \u0644\u0643\u0644 \u0646\u0645\u0648\u0630\u062c \u0639\u0645\u0644 \u0648\u0645\u0633\u0627\u0631 \u0627\u0644\u062a\u0631\u062e\u064a\u0635.",
    },
    date: "March 2026",
    readTime: "6 min read",
    regulationLastUpdated: { en: "September 2025 \u2014 Federal Decree Law No. 6 of 2025", ar: "\u0633\u0628\u062a\u0645\u0628\u0631 2025 \u2014 \u0627\u0644\u0645\u0631\u0633\u0648\u0645 \u0628\u0642\u0627\u0646\u0648\u0646 \u0627\u062a\u062d\u0627\u062f\u064a \u0631\u0642\u0645 6 \u0644\u0633\u0646\u0629 2025" },
    regulationSource: "https://www.centralbank.ae",
    content: {
      en: [
        { type: "p", text: "The UAE operates one of the most sophisticated fintech regulatory ecosystems in the world. Four primary regulators govern different activities and jurisdictions, and choosing the right regulator \u2014 and the right jurisdiction \u2014 is the foundational decision for any fintech entering the market. Getting this wrong adds 12 to 24 months to your go-to-market timeline." },
        { type: "h2", text: "The Four Regulators and Their Scope" },
        { type: "ul", items: ["CBUAE \u2014 covers all of UAE mainland: banks, payment services, stored value, stablecoins, virtual asset payment activities, open banking, and enabling technology providers under Article 62", "VARA \u2014 covers Dubai (excluding DIFC): all seven virtual asset activity categories including exchange, custody, lending, transfer, advisory, broker-dealer, and issuance", "DFSA \u2014 covers DIFC only: Crypto Tokens, Investment Tokens, and conventional financial services including banking and capital markets", "FSRA \u2014 covers ADGM only: virtual asset activities, conventional financial services, tokenised securities, and DeFi-adjacent products"] },
        { type: "h2", text: "Fintech Business Model to Regulator Mapping" },
        { type: "ul", items: ["Digital payment wallet or remittance app \u2192 CBUAE (Payment Service Provider or SVF licence)", "Crypto exchange or OTC trading desk in Dubai \u2192 VARA (Exchange or Broker-Dealer licence)", "Institutional crypto custody \u2192 VARA or DFSA depending on jurisdiction", "Stablecoin issuer (AED-pegged) \u2192 CBUAE exclusively", "Stablecoin issuer (non-AED) in Dubai \u2192 VARA (VA Issuance licence)", "Tokenised securities or funds \u2192 DFSA (DIFC) or FSRA (ADGM)", "Crypto lending platform \u2192 VARA (Lending Services licence)", "Open banking or API aggregator \u2192 CBUAE (Open Finance Framework)", "DeFi protocol with UAE users \u2192 CBUAE Article 62 assessment required", "Robo-advisor or AI investment platform \u2192 DFSA or FSRA depending on assets covered"] },
        { type: "h2", text: "Common Mistakes That Delay UAE Fintech Licensing" },
        { type: "ul", items: ["Applying to the wrong regulator for your activity type", "Submitting applications without complete technology architecture documentation", "AML/CFT programmes copied from templates rather than mapped to the specific regulatory requirements", "Governance structures assembled after application submission rather than before", "Underestimating capital requirements and timeline to raise and hold required capital in the UAE", "Not engaging in pre-application consultation before investing in full application preparation"] },
      ],
      ar: [
        { type: "p", text: "\u062a\u0645\u062a\u0644\u0643 \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a \u0648\u0627\u062d\u062f\u0627\u064b \u0645\u0646 \u0623\u0643\u062b\u0631 \u0623\u0646\u0638\u0645\u0629 \u062a\u0646\u0638\u064a\u0645 \u0627\u0644\u0641\u0646\u062a\u0643 \u062a\u0637\u0648\u0631\u0627\u064b \u0641\u064a \u0627\u0644\u0639\u0627\u0644\u0645. \u0623\u0631\u0628\u0639 \u062c\u0647\u0627\u062a \u062a\u0646\u0638\u064a\u0645\u064a\u0629 \u0631\u0626\u064a\u0633\u064a\u0629 \u062a\u063a\u0637\u064a \u0623\u0646\u0634\u0637\u0629\u064b \u0648\u0648\u0644\u0627\u064a\u0627\u062a\u064d \u0645\u062e\u062a\u0644\u0641\u0629\u060c \u0648\u0627\u062e\u062a\u064a\u0627\u0631 \u0627\u0644\u062c\u0647\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629 \u0647\u0648 \u0627\u0644\u0642\u0631\u0627\u0631 \u0627\u0644\u0623\u0633\u0627\u0633\u064a \u0644\u0623\u064a \u0634\u0631\u0643\u0629 \u0641\u0646\u062a\u0643 \u062a\u062f\u062e\u0644 \u0627\u0644\u0633\u0648\u0642." },
        { type: "h2", text: "\u0627\u0644\u062c\u0647\u0627\u062a \u0627\u0644\u062a\u0646\u0638\u064a\u0645\u064a\u0629 \u0627\u0644\u0623\u0631\u0628\u0639 \u0648\u0646\u0637\u0627\u0642 \u0627\u062e\u062a\u0635\u0627\u0635\u0647\u0627" },
        { type: "ul", items: ["\u0627\u0644\u0628\u0646\u0643 \u0627\u0644\u0645\u0631\u0643\u0632\u064a: \u0627\u0644\u0628\u0631 \u0627\u0644\u0631\u0626\u064a\u0633\u064a \u0644\u0644\u0625\u0645\u0627\u0631\u0627\u062a \u2014 \u0627\u0644\u062f\u0641\u0639 \u0648\u0627\u0644\u0628\u0646\u0648\u0643 \u0648\u0627\u0644\u0623\u0635\u0648\u0644 \u0627\u0644\u0627\u0641\u062a\u0631\u0627\u0636\u064a\u0629 \u0627\u0644\u0645\u0631\u062a\u0628\u0637\u0629 \u0628\u0627\u0644\u062f\u0641\u0639", "\u0641\u0627\u0631\u0627: \u062f\u0628\u064a \u062e\u0627\u0631\u062c \u0627\u0644\u0645\u0631\u0643\u0632 \u0627\u0644\u0645\u0627\u0644\u064a \u2014 \u062c\u0645\u064a\u0639 \u0623\u0646\u0634\u0637\u0629 \u0627\u0644\u0623\u0635\u0648\u0644 \u0627\u0644\u0627\u0641\u062a\u0631\u0627\u0636\u064a\u0629 \u0627\u0644\u0633\u0628\u0639", "\u0647\u064a\u0626\u0629 \u062e\u062f\u0645\u0627\u062a \u0645\u0627\u0644\u064a\u0629 \u062f\u0628\u064a: \u0645\u0631\u0643\u0632 \u062f\u0628\u064a \u0627\u0644\u0645\u0627\u0644\u064a \u0641\u0642\u0637", "\u0647\u064a\u0626\u0629 \u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0645\u0627\u0644\u064a\u0629: \u0633\u0648\u0642 \u0623\u0628\u0648\u0638\u0628\u064a \u0627\u0644\u0639\u0627\u0644\u0645\u064a \u0641\u0642\u0637"] },
        { type: "h2", text: "\u062a\u062d\u062f\u064a\u062f \u0627\u0644\u062c\u0647\u0629 \u0627\u0644\u062a\u0646\u0638\u064a\u0645\u064a\u0629 \u0628\u062d\u0633\u0628 \u0646\u0645\u0648\u0630\u062c \u0627\u0644\u0639\u0645\u0644" },
        { type: "ul", items: ["\u0645\u062d\u0641\u0638\u0629 \u062f\u0641\u0639 \u0631\u0642\u0645\u064a\u0629: \u0627\u0644\u0628\u0646\u0643 \u0627\u0644\u0645\u0631\u0643\u0632\u064a", "\u0645\u0646\u0635\u0629 \u062a\u062f\u0627\u0648\u0644 \u0639\u0645\u0644\u0627\u062a \u0645\u0634\u0641\u0631\u0629 \u0641\u064a \u062f\u0628\u064a: \u0641\u0627\u0631\u0627", "\u062d\u0636\u0627\u0646\u0629 \u0645\u0624\u0633\u0633\u064a\u0629: \u0641\u0627\u0631\u0627 \u0623\u0648 \u0647\u064a\u0626\u0629 \u062e\u062f\u0645\u0627\u062a \u0645\u0627\u0644\u064a\u0629 \u062f\u0628\u064a", "\u0625\u0635\u062f\u0627\u0631 \u0639\u0645\u0644\u0629 \u0645\u0633\u062a\u0642\u0631\u0629 \u0628\u0627\u0644\u062f\u0631\u0647\u0645: \u0627\u0644\u0628\u0646\u0643 \u0627\u0644\u0645\u0631\u0643\u0632\u064a \u062d\u0635\u0631\u0627\u064b", "\u0627\u0644\u0623\u0648\u0631\u0627\u0642 \u0627\u0644\u0645\u0627\u0644\u064a\u0629 \u0627\u0644\u0645\u064f\u0631\u0645\u064e\u0632\u0629: \u0647\u064a\u0626\u0629 \u062e\u062f\u0645\u0627\u062a \u0645\u0627\u0644\u064a\u0629 \u062f\u0628\u064a \u0623\u0648 \u0647\u064a\u0626\u0629 \u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0645\u0627\u0644\u064a\u0629"] },
      ],
    },
  },
];
