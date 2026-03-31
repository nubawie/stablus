// CONFIDENTIALITY: Files are processed in memory only. No uploads are
// written to disk, stored in any database, or logged anywhere.
// File data is discarded after each request.

import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import mammoth from "mammoth";
import * as XLSX from "xlsx";
import { SYSTEM_PROMPT } from "./system-prompt";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

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
    const { messages, file, regulation, orgType, role: userRole, selectedService, serviceAnswers, documentMode } = body;

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
      system: documentMode
        ? SYSTEM_PROMPT + `\n\nDOCUMENT ANALYSIS MODE:\nThe user has uploaded a document for analysis. Your task is:\n1. Identify what this document is (type, purpose, scope)\n2. Summarise its key contents in 3-5 concise sentences\n3. Identify which UAE/GCC regulatory framework(s) it relates to or should be mapped against\n4. List 3-5 specific gaps, weaknesses, or missing elements a compliance professional would notice\n5. End with: "I can help you take this further. Choose what you would like me to do with it from the options below."\nKeep your response under 200 words. Do not ask questions. Do not recommend contacting anyone. Be direct and expert.`
        : SYSTEM_PROMPT + (selectedService && selectedService !== "document-analysis" ? `\n\nCLIENT INTAKE DATA:\nRegulation: ${regulation || "not specified"}\nOrganisation type: ${orgType || "not specified"}\nUser role: ${userRole || "not specified"}\nSelected deliverable: ${selectedService}\nAnswers to intake questions: ${JSON.stringify(serviceAnswers || {})}.\n\nThe client has completed all intake steps. Use this data as the foundation for your conversation and document. Do not repeat these questions.` : ""),
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
  } catch (err) {
    console.error("Chat API error:", err);
    return Response.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}
