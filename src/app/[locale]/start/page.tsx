"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

function useStartTranslations() {
  return useTranslations("start");
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AttachedFile {
  name: string;
  type: string;
  base64: string;
  size: number;
  previewUrl?: string;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES =
  ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.png,.jpg,.jpeg,.txt";

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Welcome to Stablus. I\u2019m here to help you scope your project and find the right starting point. To begin, what are you building, or what challenge are you trying to solve?",
};

export default function StartPage() {
  const t = useStartTranslations();
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [attachedFile, setAttachedFile] = useState<AttachedFile | null>(null);
  const [uploadProgress, setUploadProgress] = useState(false);
  const [showConsent, setShowConsent] = useState(true);
  const [intakeStep, setIntakeStep] = useState<0 | 1 | 2 | 3>(0);
  const [regulation, setRegulation] = useState("");
  const [orgType, setOrgType] = useState("");
  const [role, setRole] = useState("");
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const consented = sessionStorage.getItem("stablus-consent");
    if (consented === "true") {
      setShowConsent(false);
    }
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  function handleTextareaInput() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert("File must be under 10MB.");
      return;
    }

    setUploadProgress(true);
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1];
      const isImage = file.type.startsWith("image/");
      setAttachedFile({
        name: file.name,
        type: file.type,
        base64,
        size: file.size,
        previewUrl: isImage ? URL.createObjectURL(file) : undefined,
      });
      setUploadProgress(false);
    };
    reader.readAsDataURL(file);

    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeFile() {
    if (attachedFile?.previewUrl) {
      URL.revokeObjectURL(attachedFile.previewUrl);
    }
    setAttachedFile(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if ((!input.trim() && !attachedFile) || isLoading) return;

    const userContent = attachedFile
      ? `${input.trim()}${input.trim() ? "\n" : ""}[Attached: ${attachedFile.name}]`
      : input.trim();

    const userMessage: Message = { role: "user", content: userContent };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    const fileToSend = attachedFile;
    setInput("");
    setAttachedFile(null);
    setIsLoading(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const body: Record<string, unknown> = { messages: newMessages, regulation, orgType, role };
      if (fileToSend) {
        body.file = {
          name: fileToSend.name,
          type: fileToSend.type,
          base64: fileToSend.base64,
        };
      }

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.error) {
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content:
              "I apologize, but I\u2019m having trouble connecting right now. Please try again in a moment, or reach out to us directly at info@stablus.ae.",
          },
        ]);
        fetch("/api/track",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({regulation,orgType,role,query:userContent,status:"error"})});
      } else {
        setMessages([
          ...newMessages,
          { role: "assistant", content: data.message },
        ]);
        fetch("/api/track",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({regulation,orgType,role,query:userContent,status:"success"})});
      }
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "I apologize, but I\u2019m having trouble connecting right now. Please try again in a moment, or reach out to us directly at info@stablus.ae.",
        },
      ]);
      fetch("/api/track",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({regulation,orgType,role,query:userContent,status:"error"})});
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  return (
    <>
      {showConsent && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", maxWidth: "520px", width: "100%", padding: "40px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "8px" }}>
              {isArabic ? "\u0642\u0628\u0644 \u0627\u0644\u0628\u062f\u0621" : "BEFORE YOU BEGIN"}
            </p>
            <h2 style={{ fontFamily: "Libre Baskerville, serif", fontSize: "22px", color: "var(--navy)", marginBottom: "32px" }}>
              {isArabic ? "\u064a\u0631\u062c\u0649 \u0627\u0644\u0642\u0631\u0627\u0621\u0629 \u0648\u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629" : "Please read and accept"}
            </h2>

            <div onClick={() => setChecked1(!checked1)} style={{ display: "flex", gap: "16px", padding: "16px", borderRadius: "8px", border: `1px solid ${checked1 ? "var(--gold)" : "var(--border)"}`, cursor: "pointer", marginBottom: "12px", backgroundColor: checked1 ? "rgba(184,150,62,0.04)" : "transparent" }}>
              <div style={{ width: "18px", height: "18px", borderRadius: "4px", border: `1.5px solid ${checked1 ? "var(--gold)" : "var(--border)"}`, backgroundColor: checked1 ? "var(--gold)" : "transparent", flexShrink: 0, marginTop: "2px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {checked1 && (<svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>)}
              </div>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--navy)", marginBottom: "6px" }}>
                  {isArabic ? "\u0627\u0644\u0633\u0631\u064a\u0629 \u0648\u0645\u0639\u0627\u0644\u062c\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a" : "Confidentiality and data handling"}
                </p>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                  {isArabic
                    ? "\u062a\u064f\u0639\u0627\u0644\u062c \u0645\u062d\u0627\u062f\u062b\u062a\u0643 \u0648\u0623\u064a \u0648\u062b\u0627\u0626\u0642 \u062a\u0634\u0627\u0631\u0643\u0647\u0627 \u0641\u064a \u0627\u0644\u0630\u0627\u0643\u0631\u0629 \u0641\u0642\u0637. \u0644\u0627 \u064a\u062a\u0645 \u062a\u062e\u0632\u064a\u0646 \u0623\u064a \u0634\u064a\u0621 \u0623\u0648 \u062a\u0633\u062c\u064a\u0644\u0647 \u0623\u0648 \u0627\u0644\u0627\u062d\u062a\u0641\u0627\u0638 \u0628\u0647 \u0628\u0639\u062f \u0627\u0646\u062a\u0647\u0627\u0621 \u062c\u0644\u0633\u062a\u0643. \u0644\u0627 \u064a\u0637\u0644\u0639 \u0623\u064a \u0634\u062e\u0635 \u0639\u0644\u0649 \u0648\u062b\u0627\u0626\u0642\u0643 \u0627\u0644\u0645\u0631\u0641\u0648\u0639\u0629. \u0627\u0644\u0648\u062b\u0627\u0626\u0642 \u0627\u0644\u062a\u064a \u062a\u0633\u0644\u0645\u0647\u0627 Stablus \u0630\u0627\u062a \u0637\u0627\u0628\u0639 \u0627\u0633\u062a\u0634\u0627\u0631\u064a \u0648\u0644\u0627 \u062a\u0634\u0643\u0644 \u0645\u0648\u0627\u0641\u0642\u0629 \u062a\u0646\u0638\u064a\u0645\u064a\u0629 \u0623\u0648 \u0645\u0634\u0648\u0631\u0629 \u0642\u0627\u0646\u0648\u0646\u064a\u0629."
                    : "Your conversation and any documents you share are processed in memory only. Nothing is stored, logged, or retained after your session ends. No human reviews your uploaded documents. Documents delivered by Stablus are advisory in nature and do not constitute regulatory approval, legal advice, or certified architectural specifications."}
                </p>
              </div>
            </div>

            <div onClick={() => setChecked2(!checked2)} style={{ display: "flex", gap: "16px", padding: "16px", borderRadius: "8px", border: `1px solid ${checked2 ? "var(--gold)" : "var(--border)"}`, cursor: "pointer", marginBottom: "32px", backgroundColor: checked2 ? "rgba(184,150,62,0.04)" : "transparent" }}>
              <div style={{ width: "18px", height: "18px", borderRadius: "4px", border: `1.5px solid ${checked2 ? "var(--gold)" : "var(--border)"}`, backgroundColor: checked2 ? "var(--gold)" : "transparent", flexShrink: 0, marginTop: "2px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {checked2 && (<svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>)}
              </div>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--navy)", marginBottom: "6px" }}>
                  {isArabic ? "\u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u062a\u0646\u0638\u064a\u0645\u064a\u0629" : "Regulatory information"}
                </p>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                  {isArabic
                    ? "\u064a\u062a\u0645 \u0627\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u062a\u0646\u0638\u064a\u0645\u064a\u0629 \u0645\u0628\u0627\u0634\u0631\u0629 \u0645\u0646 \u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u062c\u0647\u0627\u062a \u0627\u0644\u062a\u0646\u0638\u064a\u0645\u064a\u0629 \u0641\u064a \u0627\u0644\u0648\u0642\u062a \u0627\u0644\u0641\u0639\u0644\u064a. \u062a\u062d\u0642\u0642 \u062f\u0627\u0626\u0645\u0627\u064b \u0645\u0646 \u0627\u0644\u0645\u062a\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u062d\u064a\u0648\u064a\u0629 \u0645\u0639 \u0627\u0644\u0633\u0644\u0637\u0629 \u0627\u0644\u0645\u0639\u0646\u064a\u0629 \u0642\u0628\u0644 \u0627\u062a\u062e\u0627\u0630 \u0623\u064a \u0642\u0631\u0627\u0631\u0627\u062a \u062a\u062a\u0639\u0644\u0642 \u0628\u0627\u0644\u062a\u0631\u062e\u064a\u0635 \u0623\u0648 \u0627\u0644\u0642\u0631\u0627\u0631\u0627\u062a \u0627\u0644\u0645\u0639\u0645\u0627\u0631\u064a\u0629."
                    : "Regulatory information is sourced directly from regulator websites in real time. Always verify critical requirements with the relevant authority before making licensing or architectural decisions."}
                </p>
              </div>
            </div>

            <button
              onClick={() => { if (checked1 && checked2) { sessionStorage.setItem("stablus-consent", "true"); setShowConsent(false); } }}
              disabled={!checked1 || !checked2}
              style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "none", backgroundColor: checked1 && checked2 ? "var(--navy)" : "var(--border)", color: checked1 && checked2 ? "var(--bg)" : "var(--text-secondary)", fontSize: "14px", fontWeight: 600, cursor: checked1 && checked2 ? "pointer" : "not-allowed", fontFamily: "Inter, sans-serif", letterSpacing: "0.02em", transition: "all 0.2s ease" }}
            >
              {isArabic ? "\u0623\u0641\u0647\u0645 \u0648\u0623\u0648\u0627\u0641\u0642" : "I understand and agree"}
            </button>
          </div>
        </div>
      )}

      {/* Page container: fixed viewport, no page scroll */}
      <div className="h-screen overflow-hidden flex flex-col md:flex-row pt-[72px]">
        {/* Left panel */}
        <div className="md:w-[420px] shrink-0 p-8 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-border-color bg-surface overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/logo.png"
              alt="Stablus"
              width={160}
              height={27}
              className="stablus-logo"
            />

            <h1 className="mt-6 font-serif text-display-mobile md:text-[36px] font-bold text-navy leading-[1.15]">
              {t("headline")}
            </h1>

            <p className="mt-4 text-body text-text-secondary">
              {t("subheading")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {[t("badge1"), t("badge2"), t("badge3")].map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1.5 text-small font-medium text-text-secondary border border-border-color rounded"
                >
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right panel: chat with fixed layout */}
        <div className="flex-1 flex flex-col min-h-0 bg-bg">
          {/* Messages area: scrolls internally only */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-6 md:p-8 space-y-5"
            style={{ overscrollBehavior: "contain" }}
          >
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-5 py-3.5 rounded-2xl text-body leading-relaxed ${
                    msg.role === "user"
                      ? "bg-navy text-bg rounded-br-md"
                      : "bg-surface text-text-primary border border-border-color rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-surface border border-border-color rounded-2xl rounded-bl-md px-5 py-3.5">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-text-secondary/40 animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 rounded-full bg-text-secondary/40 animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 rounded-full bg-text-secondary/40 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area: anchored to bottom, never scrolls page */}
          <div className="flex-shrink-0 border-t border-border-color bg-surface">
            {/* File chip inside input area */}
            {(attachedFile || uploadProgress) && (
              <div className="px-4 md:px-6 pt-3 flex flex-wrap gap-2">
                {uploadProgress ? (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-navy/10 rounded text-small font-medium text-navy">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {t("processing")}
                  </div>
                ) : attachedFile ? (
                  <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md" style={{ backgroundColor: "var(--navy)", color: "white" }}>
                    {attachedFile.previewUrl ? (
                      <img
                        src={attachedFile.previewUrl}
                        alt=""
                        className="w-[48px] h-[48px] object-cover rounded"
                      />
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    )}
                    <span className="text-[12px] font-medium max-w-[200px] truncate">{attachedFile.name}</span>
                    <button
                      onClick={removeFile}
                      style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", cursor: "pointer", padding: 0, fontSize: "14px", lineHeight: 1, flexShrink: 0 }}
                      aria-label="Remove file"
                    >
                      &times;
                    </button>
                  </div>
                ) : null}
              </div>
            )}

            {intakeStep < 3 && !showConsent && (
              <div className="px-4 md:px-6 py-4 border-b border-border-color">
                {intakeStep === 0 && (
                  <div>
                    <p className="text-small font-medium text-text-secondary mb-3">Which regulation are you targeting?</p>
                    <div className="flex flex-wrap gap-2">
                      {["CBUAE","VARA","FSRA","DFSA","SCA","Not sure"].map((r) => (
                        <button key={r} type="button" onClick={() => { setRegulation(r); setIntakeStep(1); }} className="px-3 py-1.5 text-small border border-border-color rounded hover:border-navy transition-colors">{r}</button>
                      ))}
                    </div>
                  </div>
                )}
                {intakeStep === 1 && (
                  <div>
                    <p className="text-small font-medium text-text-secondary mb-3">What type of organization are you?</p>
                    <div className="flex flex-wrap gap-2">
                      {["Bank","Fintech","Payment Institution","IT Company","Consultancy","Other"].map((o) => (
                        <button key={o} type="button" onClick={() => { setOrgType(o); setIntakeStep(2); }} className="px-3 py-1.5 text-small border border-border-color rounded hover:border-navy transition-colors">{o}</button>
                      ))}
                    </div>
                  </div>
                )}
                {intakeStep === 2 && (
                  <div>
                    <p className="text-small font-medium text-text-secondary mb-3">What is your role?</p>
                    <div className="flex flex-wrap gap-2">
                      {["Compliance","Legal","Technology","C-Suite","Consultant","Other"].map((rl) => (
                        <button key={rl} type="button" onClick={() => { setRole(rl); setIntakeStep(3); fetch("/api/track",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({regulation,orgType,role:rl,query:"",status:"started"})}); }} className="px-3 py-1.5 text-small border border-border-color rounded hover:border-navy transition-colors">{rl}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex gap-3 items-end p-4 md:p-6 pt-3">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  handleTextareaInput();
                }}
                onKeyDown={handleKeyDown}
                placeholder={t("placeholder")}
                rows={1}
                disabled={showConsent || intakeStep < 3}
                className="flex-1 px-4 py-3 bg-bg border border-border-color rounded-lg text-text-primary text-body placeholder:text-text-secondary/50 focus:outline-none focus:border-navy transition-colors resize-none min-h-[44px]"
                style={{ opacity: showConsent || intakeStep < 3 ? 0.4 : 1, maxHeight: "160px", overflowY: "auto" }}
              />

              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_TYPES}
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={showConsent || intakeStep < 3}
                className="p-3 text-navy hover:opacity-70 transition-colors min-h-[44px] flex items-center disabled:opacity-30"
                aria-label="Attach file"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                </svg>
              </button>

              <button
                type="submit"
                disabled={showConsent || intakeStep < 3 || isLoading || (!input.trim() && !attachedFile)}
                className="px-5 py-3 bg-navy text-bg text-[14px] font-semibold tracking-[0.04em] rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] flex items-center"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
