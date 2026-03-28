"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const articles = [
  {
    id: "cbuae-compliance-2026",
    title: "CBUAE compliance deadline September 2026: what financial institutions need to do now",
    date: "March 2026",
    readTime: "5 min read",
    content: [
      {
        type: "p" as const,
        text: "Federal Decree Law No. 6 of 2025 introduced a comprehensive regulatory framework for virtual assets and stablecoins under the Central Bank of the UAE. The law establishes September 2026 as the deadline by which all existing virtual asset service providers and stablecoin issuers must either obtain a licence or cease operations. For institutions currently operating without a formal CBUAE licence, the window for compliance is narrowing.",
      },
      {
        type: "h2" as const,
        text: "What the decree covers",
      },
      {
        type: "p" as const,
        text: "The law brings several activities under direct CBUAE supervision: issuance of dirham-denominated payment tokens, custody of virtual assets on behalf of clients, operation of virtual asset exchanges, and provision of transfer or conversion services. Institutions that previously operated under informal guidance or sandbox arrangements must now formalise their licensing status under the new framework.",
      },
      {
        type: "h2" as const,
        text: "Key requirements for compliance",
      },
      {
        type: "p" as const,
        text: "Compliance involves more than a licence application. Institutions need a documented AML/CFT framework aligned with CBUAE expectations, a technology architecture that meets security and data residency requirements, a governance structure with fit and proper assessed directors, and capital adequacy provisions proportional to their operational scope. The CBUAE has signalled that it expects applicants to demonstrate operational readiness, not just intent.",
      },
      {
        type: "h2" as const,
        text: "Architecture and documentation gaps",
      },
      {
        type: "p" as const,
        text: "Most institutions we engage with have a working product but lack the documentation layer that regulators require. This includes system architecture blueprints that map data flows and security controls, regulatory gap analyses against the specific CBUAE provisions, and project delivery packs that governance committees can review. These documents take weeks to produce through traditional consultancies. Stablus delivers them in hours using AI, tailored to your specific product and regulatory context.",
      },
      {
        type: "h2" as const,
        text: "What to prioritise now",
      },
      {
        type: "p" as const,
        text: "If you are operating in the UAE virtual asset space, the first step is a regulatory readiness assessment against the Federal Decree Law provisions. This tells you exactly where you stand and what needs to change before the September 2026 deadline. Waiting until mid-2026 to begin this process creates unnecessary risk.",
      },
    ],
  },
  {
    id: "vasp-license-uae",
    title: "VASP licence UAE: requirements, timeline, and architecture checklist",
    date: "March 2026",
    readTime: "5 min read",
    content: [
      {
        type: "p" as const,
        text: "Obtaining a Virtual Asset Service Provider licence in the UAE depends on which jurisdiction you operate in. VARA governs Dubai mainland, the DFSA covers DIFC, ADGM FSRA handles Abu Dhabi, and CBUAE oversees dirham-denominated payment tokens and stablecoin issuance federally. Each authority has distinct requirements, timelines, and technical expectations. Understanding which licence you need is the first decision.",
      },
      {
        type: "h2" as const,
        text: "VARA licence requirements",
      },
      {
        type: "p" as const,
        text: "VARA requires applicants to demonstrate a compliant technology stack, AML/CFT programme, qualified management team, and adequate financial resources. The application process involves an initial assessment, followed by a minimum viable product review and operational readiness assessment. VARA categorises activities into seven service types including exchange, broker-dealer, custody, lending, transfer, and advisory. Each category has specific capital and governance requirements.",
      },
      {
        type: "h2" as const,
        text: "DFSA and ADGM pathways",
      },
      {
        type: "p" as const,
        text: "The DFSA crypto asset regime applies to firms operating within DIFC. It covers recognised crypto tokens and requires a financial services licence with the relevant crypto token endorsement. ADGM FSRA has its own framework for virtual asset activities through the Financial Services and Markets Regulations. Both free zones offer regulatory sandboxes for early-stage firms, but graduating to a full licence requires complete architecture documentation and compliance frameworks.",
      },
      {
        type: "h2" as const,
        text: "Architecture documentation checklist",
      },
      {
        type: "p" as const,
        text: "Regardless of jurisdiction, every VASP licence application requires: a system architecture blueprint showing all components, integrations, and data flows. A security framework documenting access controls, encryption, key management, and incident response. Network topology showing infrastructure deployment, redundancy, and disaster recovery. API documentation for any third-party integrations, especially with banking rails, payment processors, and blockchain nodes. Stablus generates these documents from your specific stack and regulatory context.",
      },
      {
        type: "h2" as const,
        text: "Timeline expectations",
      },
      {
        type: "p" as const,
        text: "VARA licence timelines typically range from 3 to 12 months depending on the activity category and the completeness of your application. DFSA and ADGM processes can run 6 to 18 months. The single biggest factor in timeline compression is having your documentation ready before you apply. Incomplete applications create back-and-forth cycles that add months to the process.",
      },
    ],
  },
  {
    id: "cbdc-implementation-gcc",
    title: "CBDC implementation in the GCC: regulatory framework and architecture requirements",
    date: "March 2026",
    readTime: "5 min read",
    content: [
      {
        type: "p" as const,
        text: "Central Bank Digital Currency initiatives across the GCC are moving from research to implementation. The UAE Central Bank has been involved in Project mBridge, a multi-CBDC platform for cross-border payments involving the BIS Innovation Hub, the Hong Kong Monetary Authority, the Bank of Thailand, and the People's Bank of China. Saudi Arabia has explored the Aber project jointly with the UAE. These initiatives signal that CBDC infrastructure will become a core component of GCC financial architecture.",
      },
      {
        type: "h2" as const,
        text: "Architecture considerations for participating institutions",
      },
      {
        type: "p" as const,
        text: "Banks and financial institutions that want to participate in CBDC distribution or integration need to prepare their technology stack. This includes API gateway infrastructure capable of connecting to central bank CBDC nodes, wallet management systems for holding and transferring CBDC balances, real-time settlement integration with existing core banking platforms like Temenos or Finacle, and compliance monitoring layers that satisfy CBUAE reporting requirements.",
      },
      {
        type: "h2" as const,
        text: "Regulatory framework",
      },
      {
        type: "p" as const,
        text: "Federal Decree Law No. 6 of 2025 explicitly addresses CBDC within its scope. The CBUAE has authority over the issuance and regulation of any digital form of the dirham. Institutions involved in CBDC distribution, custody, or conversion will need to comply with licensing requirements under this framework. The technical standards for CBDC participation are expected to be detailed in implementing regulations, but institutions should begin architecture planning now based on the patterns established by mBridge and international CBDC implementations.",
      },
      {
        type: "h2" as const,
        text: "What institutions should prepare",
      },
      {
        type: "p" as const,
        text: "A CBDC readiness assessment covers three areas: regulatory alignment with the Federal Decree Law and anticipated implementing regulations, technology architecture readiness including API infrastructure, core banking integration points, and security controls, and operational readiness covering governance, risk management, and compliance monitoring. Stablus delivers architecture blueprints and regulatory gap analyses specifically structured for institutions preparing for CBDC participation.",
      },
    ],
  },
  {
    id: "aed-stablecoin-compliance",
    title: "AED stablecoin compliance: what issuers need under CBUAE rules",
    date: "March 2026",
    readTime: "5 min read",
    content: [
      {
        type: "p" as const,
        text: "The issuance of dirham-denominated stablecoins in the UAE falls under direct CBUAE supervision. Federal Decree Law No. 6 of 2025 classifies AED-pegged payment tokens as a regulated activity requiring a specific licence from the Central Bank. This is distinct from virtual asset licences issued by VARA or DFSA. If you are building or planning to issue a dirham stablecoin, the CBUAE is your primary regulator.",
      },
      {
        type: "h2" as const,
        text: "Licensing requirements for stablecoin issuers",
      },
      {
        type: "p" as const,
        text: "The CBUAE requires stablecoin issuers to maintain full reserves backing all tokens in circulation, hold reserves in approved asset classes with approved custodians, implement redemption mechanisms that guarantee holders can convert tokens back to fiat at par value, maintain capital adequacy requirements proportional to tokens in circulation, and submit to regular CBUAE audits and reporting obligations. The regulatory framework is designed to ensure that payment tokens function as stable stores of value, not speculative instruments.",
      },
      {
        type: "h2" as const,
        text: "Technology architecture requirements",
      },
      {
        type: "p" as const,
        text: "Beyond the regulatory licence, issuers need a compliant technology architecture. This includes the blockchain layer where tokens are minted and burned, integration with banking rails for fiat on-ramp and off-ramp, reserve management systems connected to custody providers, real-time proof of reserves mechanisms, and AML/CFT transaction monitoring across on-chain and off-chain activity. The architecture must be documented in a format that the CBUAE can review and assess.",
      },
      {
        type: "h2" as const,
        text: "Timeline and preparation",
      },
      {
        type: "p" as const,
        text: "The September 2026 deadline established by Federal Decree Law No. 6 applies to stablecoin issuers as well as VASPs. Issuers who are currently operational need to assess their compliance posture against the new requirements and begin the licensing process. Stablus delivers regulatory readiness reports and architecture blueprints specifically for stablecoin issuers, covering CBUAE requirements, reserve management architecture, and compliance documentation.",
      },
    ],
  },
  {
    id: "defi-regulation-uae-2026",
    title: "DeFi regulation UAE 2026: Article 62 and what it means for protocols",
    date: "March 2026",
    readTime: "5 min read",
    content: [
      {
        type: "p" as const,
        text: "Article 62 of Federal Decree Law No. 6 of 2025 introduces one of the most significant provisions for decentralised finance in the UAE. It establishes that the CBUAE may classify certain DeFi activities as regulated virtual asset services, regardless of whether they operate through a centralised entity or a decentralised protocol. This means that DeFi protocols with significant UAE user bases or dirham-denominated activity may face licensing requirements.",
      },
      {
        type: "h2" as const,
        text: "What Article 62 actually says",
      },
      {
        type: "p" as const,
        text: "The provision gives the CBUAE discretionary authority to determine when a decentralised arrangement constitutes a virtual asset service. The criteria include the degree of control exercised by identifiable parties, the volume of activity involving UAE residents or dirham-denominated assets, and the risk profile of the service to consumers and financial stability. This is not a blanket ban on DeFi. It is a framework for bringing high-risk or high-volume DeFi activity within regulatory scope.",
      },
      {
        type: "h2" as const,
        text: "Implications for protocol operators",
      },
      {
        type: "p" as const,
        text: "Protocol teams with UAE operations, UAE-based foundations, or significant UAE user activity should assess their exposure to Article 62. Key questions include whether the protocol has identifiable governance participants in the UAE, whether the protocol processes dirham-denominated assets or stablecoins, and whether the protocol's risk profile meets the CBUAE's thresholds for regulatory classification. A regulatory readiness assessment can map these exposure points and recommend a compliance pathway.",
      },
      {
        type: "h2" as const,
        text: "Architecture and compliance documentation",
      },
      {
        type: "p" as const,
        text: "If a protocol falls within Article 62 scope, the CBUAE will expect the same documentation as any other virtual asset service provider: architecture blueprints, AML/CFT frameworks, governance structures, and risk assessments. For decentralised protocols, this documentation needs to address how governance decisions are made, how smart contract upgrades are controlled, and how user protections are enforced. Stablus generates these documents tailored to DeFi architectures, covering both the on-chain protocol layer and any off-chain operational components.",
      },
      {
        type: "h2" as const,
        text: "What to do now",
      },
      {
        type: "p" as const,
        text: "The implementing regulations for Article 62 are expected before the September 2026 deadline. Protocols operating in the UAE should not wait for final regulations to begin their assessment. A regulatory readiness report identifies your exposure and gives you a clear path forward, whether that means pursuing a licence, restructuring operations, or implementing geo-restrictions. Stablus delivers these assessments in hours, built around your specific protocol architecture and regulatory context.",
      },
    ],
  },
];

export default function InsightsPage() {
  const locale = useLocale();

  return (
    <div className="pt-32 pb-12 md:pt-36 md:pb-20">
      <div className="max-w-content mx-auto px-6">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.p
            variants={fadeUp}
            className="text-label font-semibold text-gold uppercase mb-4"
          >
            Insights
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-serif text-display-mobile md:text-display font-bold text-navy"
          >
            Regulatory intelligence for the GCC
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-body text-text-secondary max-w-3xl"
          >
            Analysis of blockchain regulation, crypto licensing, and compliance
            requirements across CBUAE, DFSA, ADGM, VARA, and SCA. Written for
            compliance officers, CTOs, and strategy leads at regulated financial
            institutions.
          </motion.p>
        </motion.div>

        <div className="mt-16 space-y-12">
          {articles.map((article) => (
            <motion.article
              key={article.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              id={article.id}
              className="bg-surface rounded-lg border border-border-color shadow-sm p-6 md:p-10"
            >
              <div className="flex items-center gap-4 mb-4 text-small font-medium text-text-secondary">
                <span>{article.date}</span>
                <span className="w-1 h-1 rounded-full bg-gold" />
                <span>{article.readTime}</span>
              </div>

              <h2 className="font-serif text-h3-mobile md:text-h1-mobile font-bold text-navy mb-6">
                {article.title}
              </h2>

              <div className="space-y-4">
                {article.content.map((block, i) =>
                  block.type === "h2" ? (
                    <h3
                      key={i}
                      className="font-serif text-[18px] font-bold text-navy mt-8 mb-2"
                    >
                      {block.text}
                    </h3>
                  ) : (
                    <p
                      key={i}
                      className="text-body text-text-secondary leading-relaxed"
                    >
                      {block.text}
                    </p>
                  )
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-border-color">
                <Link
                  href={`/${locale}/start`}
                  className="inline-flex items-center px-6 py-3 bg-navy text-bg text-[14px] font-semibold tracking-[0.04em] rounded hover:opacity-90 transition-colors min-h-[44px]"
                >
                  Get a regulatory readiness assessment &rarr;
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
