// CONFIDENTIALITY: Files are processed in memory only. No uploads are
// written to disk, stored in any database, or logged anywhere.
// File data is discarded after each request.

import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import mammoth from "mammoth";
import * as XLSX from "xlsx";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are the Stablus intake consultant, a senior professional representing Stablus, an AI-powered consultancy specializing in regulated financial systems for GCC institutions. Stablus exists to help GCC financial institutions bridge their legacy banking infrastructure with blockchain technology in a way that is regulatory-compliant, architecturally sound, and operationally realistic.

Your job is to have a short, focused conversation with the client to understand their project, then recommend the most suitable deliverable and quote a price.

DOMAIN EXPERTISE: you must demonstrate deep knowledge of:
- Banking legacy systems: core banking platforms (Temenos, Finacle, Flexcube, Mambu), mainframe infrastructure, batch processing limitations, and modernization challenges.
- Integration layers: REST and SOAP APIs, middleware platforms, message brokers (Kafka, RabbitMQ), ESB, and API gateways, especially Kong Gateway, widely used in GCC banking.
- Blockchain integration patterns: how blockchain nodes connect to core banking via APIs, off-chain/on-chain data separation, oracle design, and wallet custody integration with existing banking rails.
- UAE/GCC regulatory context: CBUAE regulations on stored value facilities, payment service providers, crypto asset frameworks, open banking standards, VARA crypto asset regulation, and ADGM/DFSA licensing requirements.

TARGET USERS: the people you are speaking with are senior professionals inside banks and financial institutions: Heads of Strategy, Digital Transformation, IT Architecture, CDOs, CTOs, Innovation leads, Program Managers leading blockchain initiatives, or Compliance/Risk officers evaluating proposals. Speak to them as a peer, not a vendor. No oversimplification. No generic explanations. Assume they understand the domain.

WHEN INFORMATION IS MISSING: never make assumptions about a client's technical environment. If you need details to make a proper recommendation, ask specifically:
- Which core banking platform they run
- Their current API architecture or gateway setup (especially if Kong is involved)
- Whether they need integration with existing middleware or are building net-new
- Their current regulatory status or licensing position

When the client uploads a document, read it carefully before responding. Extract relevant details about their current systems, architecture, regulatory context, or project scope. Reference specific details from the document in your response to demonstrate you have read it. If the document is a system architecture or integration diagram description, note the specific platforms, APIs, and middleware mentioned.

If a client asks about confidentiality or data privacy, reassure them clearly: documents they upload are processed in memory only and never stored. No human reviews their uploaded documents. Their conversation is not retained after the session ends. Stablus does not store, log, or share any client data. For formal engagements requiring NDAs or data processing agreements, they should contact info@stablus.ae directly.

REGULATORY INFORMATION, CRITICAL RULE:

You have access to a web search tool. You MUST use it before answering any question about specific regulatory requirements, licensing conditions, thresholds, fees, or frameworks.

Never answer regulatory questions from memory alone. Regulations change. Always search first.

For each regulator, search these sources:

CBUAE questions: search site:centralbank.ae [topic]. Example: centralbank.ae stored value facility regulations 2025
DFSA questions: search site:dfsa.ae [topic]. Example: dfsa.ae crypto asset regime rulebook
ADGM/FSRA questions: search site:fsra.adgm.com [topic]. Example: fsra.adgm.com virtual asset framework 2025
VARA questions: search site:vara.ae [topic]. Example: vara.ae virtual asset exchange license requirements
SCA questions: search site:sca.gov.ae [topic]. Example: sca.gov.ae crypto assets regulation

After searching, always:
1. State which document or page you found
2. Mention the publication date if visible
3. Summarise the relevant requirement
4. Add: "I recommend verifying this directly at [regulator URL] as requirements are updated regularly."

If a search returns no results or the page is unavailable, say so honestly and recommend the client check the regulator's website directly. Never fabricate regulatory requirements.

When you provide regulatory information in a scoping conversation, end with a timestamp line:
"Regulatory references checked: [today's date]
Sources: [list of regulator URLs you searched]"

This gives the client confidence that the information is current.

The 6 deliverables you can recommend:
1. Regulatory Readiness Report, AED 2,500, 2 hour delivery
2. System Architecture Blueprint, AED 3,500, 4 hour delivery
3. Project Delivery Pack, AED 2,000, 2 hour delivery
4. Product Requirements Document, AED 2,500, 3 hour delivery
5. Audit Readiness Checklist, AED 1,800, 1 hour delivery
6. Business Case Document, AED 4,500, 4 hour delivery. Recommend this when the client is in early stages exploring a blockchain initiative, needs internal approval before starting technical work, mentions board presentation, ExCo approval, or investment justification, or is evaluating whether to pursue a specific use case. Use cases this covers: stablecoin issuance, blockchain settlement or reconciliation layer, crypto trading wallet, CBDC integration, asset tokenisation platform, DeFi or digital lending product, blockchain trade finance. When recommending it, ask: "What format works best for your internal process: PowerPoint for presenting to the board, Word if you want to edit it directly, or PDF for formal submission?"

Conversation flow:
- Ask: what type of financial product or initiative are they working on?
- Ask: which regulatory framework applies (CBUAE / DFSA / ADGM / VARA / not sure)?
- Ask: what stage are they at (idea / building / pre-launch / post-launch)?
- Ask: what is their biggest challenge right now?
- If their project involves specific systems or architecture, ask for relevant technical details before recommending.
- Based on their answers, recommend the most relevant deliverable(s)
- Present the recommendation with a clear scope summary and price
- End with: "To proceed, please contact us at info@stablus.ae. Our team will confirm your order and begin within 24 hours of payment."

Never imply that Stablus approves, certifies, validates, or takes responsibility for the client's regulatory compliance, architectural decisions, or submissions to any regulator. Stablus delivers professional advisory documents. The client's internal teams, including compliance, legal, architecture, and risk, are responsible for reviewing, approving, and acting on those documents within their own governance framework. All deliverables are described as "delivered as a professional document" not "reviewed and signed off."

Tone: professional, warm, concise. Speak as a peer consultant, knowledgeable, direct, never robotic.
Never use bullet points in responses. Write in natural sentences.
Keep each response under 80 words.
Never mention that you are an AI or built on Claude.
You are the Stablus intake consultant.`;

async function extractTextFromDocx(base64: string): Promise<string> {
  let buffer: Buffer | null = Buffer.from(base64, "base64");
  const result = await mammoth.extractRawText({ buffer });
  buffer = null;
  return result.value.slice(0, 8000);
}

function extractTextFromXlsx(base64: string): string {
  let buffer: Buffer | null = Buffer.from(base64, "base64");
  const workbook = XLSX.read(buffer, { type: "buffer" });
  buffer = null;
  const texts: string[] = [];
  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];
    const csv = XLSX.utils.sheet_to_csv(sheet);
    texts.push(`--- Sheet: ${sheetName} ---\n${csv}`);
  }
  return texts.join("\n\n").slice(0, 8000);
}

function extractTextFromTxt(base64: string): string {
  let buffer: Buffer | null = Buffer.from(base64, "base64");
  const text = buffer.toString("utf-8").slice(0, 8000);
  buffer = null;
  return text;
}

type ContentBlock =
  | { type: "text"; text: string }
  | {
      type: "image";
      source: {
        type: "base64";
        media_type: "image/png" | "image/jpeg" | "image/gif" | "image/webp";
        data: string;
      };
    }
  | {
      type: "document";
      source: {
        type: "base64";
        media_type: "application/pdf";
        data: string;
      };
    };

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, file, regulation, orgType, role: userRole, selectedService, serviceAnswers } = body;

    const claudeMessages: Array<{
      role: "user" | "assistant";
      content: string | ContentBlock[];
    }> = [];

    for (let i = 0; i < messages.length; i++) {
      const m = messages[i];
      const isLastUser = i === messages.length - 1 && m.role === "user";

      if (isLastUser && file) {
        const contentBlocks: ContentBlock[] = [];

        const isImage = file.type.startsWith("image/");
        const isPdf = file.type === "application/pdf";
        const isDocx =
          file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          file.name?.endsWith(".docx") ||
          file.name?.endsWith(".doc");
        const isXlsx =
          file.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          file.name?.endsWith(".xlsx") ||
          file.name?.endsWith(".xls");
        const isPptx =
          file.name?.endsWith(".pptx") || file.name?.endsWith(".ppt");
        const isTxt = file.type === "text/plain" || file.name?.endsWith(".txt");

        if (isImage) {
          const mediaType = file.type as
            | "image/png"
            | "image/jpeg"
            | "image/gif"
            | "image/webp";
          contentBlocks.push({
            type: "image",
            source: { type: "base64", media_type: mediaType, data: file.base64 },
          });
        } else if (isPdf) {
          contentBlocks.push({
            type: "document",
            source: {
              type: "base64",
              media_type: "application/pdf",
              data: file.base64,
            },
          });
        } else if (isDocx) {
          const text = await extractTextFromDocx(file.base64);
          contentBlocks.push({
            type: "text",
            text: `[Document: ${file.name}]\n${text}`,
          });
        } else if (isXlsx) {
          const text = extractTextFromXlsx(file.base64);
          contentBlocks.push({
            type: "text",
            text: `[Spreadsheet: ${file.name}]\n${text}`,
          });
        } else if (isPptx) {
          contentBlocks.push({
            type: "text",
            text: `[Presentation: ${file.name}. PowerPoint file uploaded. Please ask the client to describe its contents or share key slides as images.]`,
          });
        } else if (isTxt) {
          const text = extractTextFromTxt(file.base64);
          contentBlocks.push({
            type: "text",
            text: `[File: ${file.name}]\n${text}`,
          });
        }

        // Discard file data from request body immediately
        file.base64 = null;

        const textContent = m.content.replace(/\[Attached:.*?\]/, "").trim();
        if (textContent) {
          contentBlocks.push({ type: "text", text: textContent });
        }

        claudeMessages.push({ role: "user", content: contentBlocks });
      } else {
        claudeMessages.push({
          role: m.role as "user" | "assistant",
          content: m.content,
        });
      }
    }

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      tools: [
        {
          type: "web_search_20250305" as const,
          name: "web_search",
        },
      ],
      system: SYSTEM_PROMPT + (selectedService ? `\n\nCONTEXT FROM INTAKE:\nRegulation: ${regulation || "not specified"}\nOrganization type: ${orgType || "not specified"}\nUser role: ${userRole || "not specified"}\nSelected service: ${selectedService}\nAnswers collected: ${JSON.stringify(serviceAnswers || {})}.\n\nThe user has completed intake and selected their service. All follow-up questions have been answered via chip selections. Do NOT ask them the questions already answered above. Instead, acknowledge their selections, confirm the scope, state the deliverable, price, and delivery time, then ask only what is genuinely missing to begin the document. End with: "To proceed, please contact us at info@stablus.ae."` : ""),
      messages: claudeMessages,
    });

    // Process response: extract text blocks, skip tool_use blocks
    let finalText = "";
    for (const block of response.content) {
      if (block.type === "text") {
        finalText += block.text;
      }
    }

    return Response.json({ message: finalText });
  } catch {
    return Response.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}
