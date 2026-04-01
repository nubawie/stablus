"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import ReactMarkdown from "react-markdown";

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
  content: "__hidden__",
};

const GUIDE_STEPS = [
  "Select your target regulation",
  "Select your organisation type",
  "Select your role",
  "Choose your deliverable",
  "Answer a few quick questions",
  "Complete payment to unlock",
  "Type your message to generate",
];

function GuideDots({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center gap-2 py-3 border-b border-border-color bg-surface">
      {GUIDE_STEPS.map((label, i) => (
        <div key={i} title={label} className="relative group">
          <div className={`rounded-full transition-all duration-300 ${i < step ? "w-2 h-2 bg-navy ring-1 ring-navy/30" : i === step ? "w-3 h-3 bg-gold ring-2 ring-gold/30" : "w-2 h-2 bg-border-color"}`} />
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-navy text-white text-[10px] px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

function GuideHint({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-lg mx-4 mb-2 animate-pulse">
      <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
      <span className="text-small font-medium text-gold">{text}</span>
    </div>
  );
}

const DOCUMENT_ACTIONS = [
  { id: "regulatory", label: "Map to regulation requirements", description: "Gap analysis against CBUAE, VARA, DFSA, or FSRA", price: "AED 2,500", amount: 2500 },
  { id: "architecture", label: "Generate architecture diagrams", description: "Full system architecture blueprint with ASCII diagrams", price: "AED 3,500", amount: 3500 },
  { id: "prd", label: "Turn into a full PRD", description: "Complete Product Requirements Document", price: "AED 2,500", amount: 2500 },
  { id: "audit", label: "Audit readiness check", description: "Checklist mapped to your target regulator", price: "AED 1,800", amount: 1800 },
  { id: "business", label: "Build a business case", description: "Board-ready business case document", price: "AED 4,500", amount: 4500 },
  { id: "delivery", label: "Create project delivery pack", description: "Charter, RAID log, governance and delivery plan", price: "AED 2,000", amount: 2000 },
];

const SERVICES = [
  { id: "regulatory", label: "Regulatory Readiness Report", price: "AED 2,500", time: "2 hrs", amount: 2500 },
  { id: "architecture", label: "System Architecture Blueprint", price: "AED 3,500", time: "4 hrs", amount: 3500 },
  { id: "delivery", label: "Project Delivery Pack", price: "AED 2,000", time: "2 hrs", amount: 2000 },
  { id: "prd", label: "Product Requirements Document", price: "AED 2,500", time: "3 hrs", amount: 2500 },
  { id: "audit", label: "Audit Readiness Checklist", price: "AED 1,800", time: "1 hr", amount: 1800 },
  { id: "business", label: "Business Case Document", price: "AED 4,500", time: "4 hrs", amount: 4500 },
];

const SERVICE_FLOWS: Record<string, { question: string; options: string[] }[]> = {
  regulatory: [
    { question: "What activity are you seeking to operate?", options: ["Payment services", "Stored value facility", "Crypto exchange / VASP", "Custody services", "Lending / BNPL", "Open banking / API", "Other"] },
    { question: "What is your current licensing status?", options: ["No license yet", "In sandbox", "Provisional approval", "Fully licensed", "License under review"] },
    { question: "What is your biggest compliance gap right now?", options: ["AML / KYC framework", "Capital adequacy", "Governance & board structure", "Technology & cybersecurity", "Not sure \u2014 need full assessment"] },
    { question: "What is your timeline pressure?", options: ["Urgent \u2014 under 3 months", "3\u20136 months", "6\u201312 months", "Exploratory \u2014 no fixed date"] },
  ],
  architecture: [
    { question: "What is your current core banking platform?", options: ["Temenos", "Finacle", "Flexcube", "Mambu", "Custom / in-house", "None yet"] },
    { question: "What are you building?", options: ["Crypto / digital asset wallet", "Payment platform", "Open banking layer", "Blockchain settlement", "Digital bank", "DeFi or lending product"] },
    { question: "What is your infrastructure preference?", options: ["Cloud (AWS / Azure / GCP)", "On-premise", "Hybrid", "Not yet decided"] },
    { question: "What is the primary integration challenge?", options: ["Core banking API connectivity", "Blockchain node integration", "Third-party KYC / AML tools", "Regulatory reporting pipeline", "Legacy middleware modernisation"] },
  ],
  delivery: [
    { question: "What type of project is this?", options: ["New platform launch", "System migration", "Third-party integration", "Regulatory remediation", "Vendor implementation"] },
    { question: "What is the current project phase?", options: ["Planning", "In execution", "Approaching go-live", "Post-launch stabilisation"] },
    { question: "What is the governance framework?", options: ["Agile / Scrum", "Waterfall", "Hybrid", "Not defined yet"] },
    { question: "What documentation is missing?", options: ["Project charter", "RAID log", "Vendor SOW / SLA", "Test plans", "Runbook / go-live plan", "All of the above"] },
  ],
  prd: [
    { question: "What product are you building?", options: ["Digital wallet", "Payment application", "Crypto trading platform", "Lending / BNPL product", "Open banking product", "Tokenisation platform"] },
    { question: "Who are your target users?", options: ["Retail consumers", "Corporate clients", "Institutional clients", "Mixed"] },
    { question: "What is your current tech stack?", options: ["Defined and documented", "Partially defined", "Not yet decided", "Vendor-provided"] },
    { question: "What regulatory constraints must the PRD embed?", options: ["CBUAE payment rules", "VARA virtual asset rules", "FSRA / DFSA framework", "AML / KYC requirements", "Multiple \u2014 need full mapping"] },
  ],
  audit: [
    { question: "Which regulator is conducting the audit?", options: ["CBUAE", "VARA", "FSRA / ADGM", "DFSA / DIFC", "SCA", "Internal audit"] },
    { question: "What type of audit is this?", options: ["Routine supervisory", "License renewal", "Triggered by incident", "Pre-licensing inspection", "Internal readiness review"] },
    { question: "How much time do you have before the audit?", options: ["Under 4 weeks", "1\u20133 months", "3\u20136 months", "Date not confirmed"] },
    { question: "What is your primary area of concern?", options: ["AML / CFT controls", "Cybersecurity posture", "Governance documentation", "Capital and liquidity", "All areas \u2014 need full checklist"] },
  ],
  business: [
    { question: "What initiative are you making the case for?", options: ["Stablecoin issuance", "Crypto exchange / trading", "Blockchain settlement layer", "CBDC integration", "Asset tokenisation", "DeFi / digital lending", "Digital banking licence"] },
    { question: "Who is the primary audience for this document?", options: ["Board of directors", "Executive committee (ExCo)", "External investors", "Regulator submission", "Internal strategy team"] },
    { question: "What format do you need?", options: ["PowerPoint \u2014 for board presentation", "Word \u2014 for internal editing", "PDF \u2014 for formal submission"] },
    { question: "What is the primary decision being made?", options: ["Approve the initiative", "Secure budget / investment", "Choose between options", "Obtain regulatory pre-approval"] },
  ],
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
  const [selectedService, setSelectedService] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "pending" | "paid">("idle");
  const [showPayButton, setShowPayButton] = useState(false);
  const [guideStep, setGuideStep] = useState(0);
  const [flowType, setFlowType] = useState<"select" | "guided" | "document">("select");
  const [documentSummaryDone, setDocumentSummaryDone] = useState(false);
  const [documentAction, setDocumentAction] = useState("");
  const [serviceStep, setServiceStep] = useState(0);
  const [serviceAnswers, setServiceAnswers] = useState<Record<string, string>>({});
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get("payment");
    const savedEmail = sessionStorage.getItem("stablus-email");
    const savedService = sessionStorage.getItem("stablus-service");
    const savedAnswers = sessionStorage.getItem("stablus-answers");
    const savedRegulation = sessionStorage.getItem("stablus-regulation");
    const savedOrgType = sessionStorage.getItem("stablus-orgType");
    const savedRole = sessionStorage.getItem("stablus-role");
    if (savedEmail) { setUserEmail(savedEmail); setEmailSubmitted(true); }
    if (savedRegulation) setRegulation(savedRegulation);
    if (savedOrgType) setOrgType(savedOrgType);
    if (savedRole) setRole(savedRole);
    if (savedService) { setSelectedService(savedService); setIntakeStep(3); }
    if (savedAnswers) { setServiceAnswers(JSON.parse(savedAnswers)); setServiceStep(SERVICE_FLOWS[savedService || ""]?.length || 0); }
    const savedMessages = sessionStorage.getItem("stablus-messages");
    if (savedMessages) { try { setMessages(JSON.parse(savedMessages)); } catch { /* ignore */ } }
    const savedPaywall = sessionStorage.getItem("stablus-paywall");
    if (savedPaywall === "true") { setShowPayButton(true); }
    if (payment === "success") {
      setPaymentStatus("paid");
      setShowPayButton(false);
      sessionStorage.removeItem("stablus-paywall");
      setGuideStep(6);
      window.history.replaceState({}, "", window.location.pathname);
    }
    if (payment === "cancelled") {
      setShowPayButton(true);
      window.history.replaceState({}, "", window.location.pathname);
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
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const oversized = files.filter(f => f.size > MAX_FILE_SIZE);
    if (oversized.length > 0) {
      alert(`These files exceed 10MB: ${oversized.map(f => f.name).join(", ")}`);
      return;
    }

    const file = files[0];
    setUploadProgress(true);
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1];
      const isImage = file.type.startsWith("image/");
      setAttachedFile({
        name: files.length > 1 ? `${files.length} files — ${files.map(f => f.name).join(", ")}` : file.name,
        type: file.type,
        base64,
        size: file.size,
        previewUrl: isImage ? URL.createObjectURL(file) : undefined,
      });
      setUploadProgress(false);

      if (flowType === "document" && !documentSummaryDone) {
        setTimeout(() => {
          const fileMsg: Message = { role: "user", content: `[Document uploaded for analysis]` };
          const newMsgs = [...messages, fileMsg];
          setMessages(newMsgs);
          setIsLoading(true);
          fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              messages: newMsgs,
              regulation: "",
              orgType: "",
              role: "",
              selectedService: "document-analysis",
              serviceAnswers: {},
              file: { name: file.name, type: file.type, base64 },
              documentMode: true,
            }),
          })
            .then((r) => r.json())
            .then((data) => {
              if (data.message) {
                setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
                setDocumentSummaryDone(true);
              }
            })
            .catch(() => {
              setMessages((prev) => [...prev, { role: "assistant", content: "I had trouble reading that file. Please try again." }]);
            })
            .finally(() => setIsLoading(false));
        }, 300);
      }
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

  async function triggerAIResponse(overrideMessages?: Message[]) {
    const currentMessages = overrideMessages || messages;
    setIsLoading(true);
    try {
      const body: Record<string, unknown> = {
        messages: currentMessages,
        regulation,
        orgType,
        role,
        selectedService,
        serviceAnswers,
      };
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.error) {
        setMessages([...currentMessages, { role: "assistant", content: "I\u2019m having trouble connecting right now. Please try again in a moment." }]);
        fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ regulation, orgType, role, query: "", status: "error", email: userEmail, service: selectedService, amount: 0 }) });
      } else {
        setMessages([...currentMessages, { role: "assistant", content: data.message }]);
        setShowPayButton(true);
        const svcAmount = SERVICES.find(s => s.id === selectedService)?.amount || 0;
        fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ regulation, orgType, role, query: currentMessages[currentMessages.length - 1]?.content || "", status: "success", email: userEmail, service: selectedService, amount: svcAmount }) });
      }
    } catch {
      setMessages([...currentMessages, { role: "assistant", content: "I\u2019m having trouble connecting right now. Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  }

  async function handlePayment() {
    if (!selectedService || !userEmail) return;
    sessionStorage.setItem("stablus-email", userEmail);
    sessionStorage.setItem("stablus-messages", JSON.stringify(messages));
    sessionStorage.setItem("stablus-paywall", "true");
    sessionStorage.setItem("stablus-service", selectedService);
    sessionStorage.setItem("stablus-answers", JSON.stringify(serviceAnswers));
    sessionStorage.setItem("stablus-regulation", regulation);
    sessionStorage.setItem("stablus-orgType", orgType);
    sessionStorage.setItem("stablus-role", role);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId: selectedService, email: userEmail, sessionData: { regulation, orgType, role, serviceAnswers } }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      alert("Payment setup failed. Please try again.");
    }
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
      const body: Record<string, unknown> = { messages: newMessages, regulation, orgType, role, selectedService, serviceAnswers };
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
      {!emailSubmitted && !showConsent && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", zIndex: 9998, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", maxWidth: "460px", width: "100%", padding: "40px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "8px" }}>GET STARTED</p>
            <h2 style={{ fontFamily: "Libre Baskerville, serif", fontSize: "22px", color: "var(--navy)", marginBottom: "12px" }}>Enter your email</h2>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "24px" }}>Your document will be accessible in this session. Enter your email to begin.</p>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && userEmail.includes("@")) { setEmailSubmitted(true); sessionStorage.setItem("stablus-email", userEmail); } }}
              placeholder="you@company.com"
              style={{ width: "100%", padding: "12px 14px", borderRadius: "8px", border: "1px solid var(--border)", backgroundColor: "var(--bg)", color: "var(--text-primary)", fontSize: "16px", fontFamily: "Inter, sans-serif", marginBottom: "16px", boxSizing: "border-box", outline: "none" }}
            />
            <button
              onClick={() => { if (userEmail.includes("@")) { setEmailSubmitted(true); sessionStorage.setItem("stablus-email", userEmail); } }}
              disabled={!userEmail.includes("@")}
              style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "none", backgroundColor: userEmail.includes("@") ? "var(--navy)" : "var(--border)", color: userEmail.includes("@") ? "#ffffff" : "#888888", fontSize: "14px", fontWeight: 600, cursor: userEmail.includes("@") ? "pointer" : "not-allowed", fontFamily: "Inter, sans-serif", opacity: 1 }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

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
              style={{ width: "100%", padding: "14px", borderRadius: "8px", border: checked1 && checked2 ? "2px solid var(--navy)" : "2px solid var(--border)", backgroundColor: checked1 && checked2 ? "var(--navy)" : "transparent", color: checked1 && checked2 ? "#ffffff" : "#888888", fontSize: "14px", fontWeight: 600, cursor: checked1 && checked2 ? "pointer" : "not-allowed", fontFamily: "Inter, sans-serif", letterSpacing: "0.02em", transition: "all 0.2s ease" }}
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
          <GuideDots step={guideStep} />
          {/* Messages area: scrolls internally only */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-6 md:p-8 space-y-5"
            style={{ overscrollBehavior: "contain" }}
          >
            {flowType === "select" && !showConsent && emailSubmitted && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex flex-col gap-4 pt-4">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-surface border border-border-color rounded-2xl rounded-bl-md px-5 py-3.5 mb-2 max-w-[85%]">
                  <p className="text-body text-text-primary leading-relaxed">Welcome to Stablus. I&apos;m here to help you get a professional advisory document for your regulated financial initiative. How would you like to start?</p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button type="button" onClick={() => { setFlowType("guided"); setGuideStep(0); }} className="text-left p-5 border-2 border-border-color rounded-xl hover:border-navy transition-colors bg-surface group">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center mb-3 group-hover:bg-gold/20 transition-colors">
                      <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                    </div>
                    <p className="font-semibold text-navy mb-1">I know what I need</p>
                    <p className="text-small text-text-secondary">Answer a few questions and get your document generated in hours</p>
                  </button>
                  <button type="button" onClick={() => { setFlowType("document"); }} className="text-left p-5 border-2 border-border-color rounded-xl hover:border-navy transition-colors bg-surface group">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center mb-3 group-hover:bg-gold/20 transition-colors">
                      <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    </div>
                    <p className="font-semibold text-navy mb-1">I have a document</p>
                    <p className="text-small text-text-secondary">Drop your file and get an instant analysis — free. Then choose what to do with it</p>
                  </button>
                </div>
              </motion.div>
            )}

            {messages.map((msg, i) => (
              msg.content === "__hidden__" ? null : <motion.div
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
                  {msg.role === "assistant" ? (
                    <ReactMarkdown
                      components={{
                        h1: ({children}) => <h1 className="text-xl font-bold font-serif text-navy mt-4 mb-2">{children}</h1>,
                        h2: ({children}) => <h2 className="text-lg font-bold font-serif text-navy mt-4 mb-2">{children}</h2>,
                        h3: ({children}) => <h3 className="text-base font-semibold text-navy mt-3 mb-1">{children}</h3>,
                        h4: ({children}) => <h4 className="text-base font-semibold text-text-primary mt-2 mb-1">{children}</h4>,
                        p: ({children}) => <p className="mb-2 leading-relaxed">{children}</p>,
                        ul: ({children}) => <ul className="list-disc pl-5 mb-2 space-y-1">{children}</ul>,
                        ol: ({children}) => <ol className="list-decimal pl-5 mb-2 space-y-1">{children}</ol>,
                        li: ({children}) => <li className="leading-relaxed">{children}</li>,
                        strong: ({children}) => <strong className="font-semibold text-text-primary">{children}</strong>,
                        hr: () => <hr className="border-border-color my-4" />,
                        code: ({children}) => <code className="font-mono text-sm bg-navy/10 px-1.5 py-0.5 rounded">{children}</code>,
                        pre: ({children}) => <pre className="font-mono text-sm bg-navy/5 border border-border-color rounded-lg p-4 overflow-x-auto my-3 whitespace-pre">{children}</pre>,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  ) : (
                    msg.content
                  )}
                </div>
              </motion.div>
            ))}

            {flowType === "document" && !documentSummaryDone && !showConsent && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex justify-start">
                <div className="max-w-[90%] bg-surface border-2 border-dashed border-border-color rounded-2xl px-6 py-8 text-center">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                  </div>
                  <p className="font-semibold text-navy mb-1">Upload your document</p>
                  <p className="text-small text-text-secondary mb-4">PDF, Word, Excel, PowerPoint, or image — up to 10MB</p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#0a1628",
                      color: "#ffffff",
                      fontSize: "13px",
                      fontWeight: 600,
                      borderRadius: "8px",
                      border: "1px solid rgba(255,255,255,0.15)",
                      cursor: "pointer",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    Choose file
                  </button>
                  <p className="text-[11px] text-text-secondary mt-3">Your document is processed in memory only. Nothing is stored.</p>
                </div>
              </motion.div>
            )}

            {flowType === "document" && documentSummaryDone && !documentAction && !showConsent && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex justify-start">
                <div className="max-w-[90%] bg-surface border border-border-color rounded-2xl rounded-bl-md px-5 py-4">
                  <p className="text-small font-medium text-text-secondary mb-3">What would you like to do with this document?</p>
                  <div className="flex flex-col gap-2">
                    {DOCUMENT_ACTIONS.map((action) => (
                      <button key={action.id} type="button" onClick={() => {
                        setDocumentAction(action.id);
                        setSelectedService(action.id);
                        setShowPayButton(true);
                        const msg: Message = { role: "user", content: action.label };
                        setMessages((prev) => [...prev, msg]);
                      }} className="text-left px-4 py-3 border border-border-color rounded-lg hover:border-navy transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-body font-medium text-text-primary">{action.label}</p>
                            <p className="text-small text-text-secondary">{action.description}</p>
                          </div>
                          <span className="text-small font-semibold text-gold ml-4 whitespace-nowrap">{action.price}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {flowType === "guided" && intakeStep === 3 && !selectedService && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex justify-start">
                <div className="max-w-[90%] bg-surface border border-border-color rounded-2xl rounded-bl-md px-5 py-4">
                  <GuideHint text="Click to choose your deliverable" />
                  <p className="text-small font-medium text-text-secondary mb-3">Which deliverable do you need?</p>
                  <div className="flex flex-col gap-2">
                    {SERVICES.map((svc) => (
                      <button key={svc.id} type="button" onClick={() => {
                        setSelectedService(svc.id);
                        setGuideStep(4);
                        setServiceStep(0);
                        setShowPayButton(false);
                        setPaymentStatus("idle");
                        const msg: Message = { role: "user", content: svc.label };
                        setMessages((prev) => [...prev, msg]);
                      }} className="text-left px-4 py-3 border border-border-color rounded-lg hover:border-navy transition-colors">
                        <span className="text-small font-medium text-text-primary">{svc.label}</span>
                        <span className="text-small text-text-secondary ml-2">{svc.price} · {svc.time}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {flowType === "guided" && intakeStep === 3 && selectedService && serviceStep < (SERVICE_FLOWS[selectedService]?.length || 0) && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex justify-start">
                <div className="max-w-[90%] bg-surface border border-border-color rounded-2xl rounded-bl-md px-5 py-4">
                  <GuideHint text="Click to answer this question" />
                  <p className="text-small font-medium text-text-secondary mb-3">{SERVICE_FLOWS[selectedService][serviceStep].question}</p>
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_FLOWS[selectedService][serviceStep].options.map((opt) => (
                      <button key={opt} type="button" onClick={() => {
                        const newStep = serviceStep + 1;
                        const newAnswers = { ...serviceAnswers, [SERVICE_FLOWS[selectedService][serviceStep].question]: opt };
                        setServiceAnswers(newAnswers);
                        setServiceStep(newStep);
                        const newMsg: Message = { role: "user", content: opt };
                        const newMessages = [...messages, newMsg];
                        setMessages(newMessages);
                        setGuideStep(5);
                        if (newStep >= SERVICE_FLOWS[selectedService].length) {
                          setTimeout(() => triggerAIResponse(newMessages), 300);
                        }
                      }} className="px-3 py-1.5 text-small border border-border-color rounded hover:border-navy transition-colors">
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

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
                  <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md" style={{ backgroundColor: "var(--navy)", color: "#ffffff" }}>
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
                    <span className="text-[12px] font-medium max-w-[200px] truncate" style={{ color: "#ffffff" }}>{attachedFile.name}</span>
                    <button
                      onClick={removeFile}
                      style={{ background: "none", border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer", padding: 0, fontSize: "14px", lineHeight: 1, flexShrink: 0 }}
                      aria-label="Remove file"
                    >
                      &times;
                    </button>
                  </div>
                ) : null}
              </div>
            )}

            {flowType === "guided" && intakeStep < 3 && !showConsent && (
              <div className="px-4 md:px-6 py-4 border-b border-border-color relative">
                {intakeStep === 0 && (
                  <div>
                    <GuideHint text="Click to select your target regulation" />
                    <p className="text-small font-medium text-text-secondary mb-3">Which regulation are you targeting?</p>
                    <div className="flex flex-wrap gap-2">
                      {["CBUAE","VARA","FSRA","DFSA","SCA","Not sure"].map((r) => (
                        <button key={r} type="button" onClick={() => { setRegulation(r); setIntakeStep(1); setGuideStep(1); }} className={`px-3 py-1.5 text-small border rounded transition-colors ${regulation === r ? "border-navy bg-navy text-bg" : "border-border-color hover:border-navy"}`}>{r}</button>
                      ))}
                    </div>
                  </div>
                )}
                {intakeStep === 1 && (
                  <div>
                    <GuideHint text="Click to select your organisation type" />
                    <p className="text-small font-medium text-text-secondary mb-3">What type of organization are you?</p>
                    <div className="flex flex-wrap gap-2">
                      {["Bank","Fintech","Payment Institution","IT Company","Consultancy","Other"].map((o) => (
                        <button key={o} type="button" onClick={() => { setOrgType(o); setIntakeStep(2); setGuideStep(2); }} className={`px-3 py-1.5 text-small border rounded transition-colors ${orgType === o ? "border-navy bg-navy text-bg" : "border-border-color hover:border-navy"}`}>{o}</button>
                      ))}
                    </div>
                  </div>
                )}
                {intakeStep === 2 && (
                  <div>
                    <GuideHint text="Click to select your role" />
                    <p className="text-small font-medium text-text-secondary mb-3">What is your role?</p>
                    <div className="flex flex-wrap gap-2">
                      {["Compliance","Legal","Technology","C-Suite","Consultant","Other"].map((rl) => (
                        <button key={rl} type="button" onClick={() => { setRole(rl); setIntakeStep(3); setGuideStep(3); fetch("/api/track",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({regulation,orgType,role:rl,query:"",status:"started"})}); }} className="px-3 py-1.5 text-small border border-border-color rounded hover:border-navy transition-colors">{rl}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {showPayButton && paymentStatus !== "paid" && selectedService && (
              <div className="flex-shrink-0 border-t border-border-color bg-surface px-4 md:px-6 py-4">
                <div className="flex items-center justify-between gap-4">
                  <GuideHint text="Payment unlocks document generation — you will not be charged again for this session" />
                  <p className="text-small text-text-secondary">Ready to generate your document. Complete payment to unlock.</p>
                  <button
                    onClick={handlePayment}
                    className="px-6 py-3 bg-navy text-bg text-[14px] font-semibold rounded hover:opacity-90 transition-colors whitespace-nowrap"
                  >
                    Pay {SERVICES.find(s => s.id === selectedService)?.price} &rarr;
                  </button>
                </div>
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
                placeholder={paymentStatus === "paid" ? "Type 'generate the document' to receive your full report..." : t("placeholder")}
                rows={1}
                disabled={showConsent || (flowType === "guided" && intakeStep < 3) || (flowType === "document" && !documentSummaryDone) || (selectedService !== "" && selectedService !== "document-analysis" && serviceStep < (SERVICE_FLOWS[selectedService]?.length || 0)) || (showPayButton && paymentStatus !== "paid")}
                className="flex-1 px-4 py-3 bg-bg border border-border-color rounded-lg text-text-primary text-body placeholder:text-text-secondary/50 focus:outline-none focus:border-navy transition-colors resize-none min-h-[44px]"
                style={{ opacity: showConsent || (flowType === "guided" && intakeStep < 3) || (flowType === "document" && !documentSummaryDone) || (selectedService !== "" && selectedService !== "document-analysis" && serviceStep < (SERVICE_FLOWS[selectedService]?.length || 0)) || (showPayButton && paymentStatus !== "paid") ? 0.4 : 1, maxHeight: "160px", overflowY: "auto" }}
              />

              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_TYPES}
                onChange={handleFileSelect}
                multiple
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={showConsent || (flowType === "guided" && intakeStep < 3) || (flowType === "document" && !documentSummaryDone) || (selectedService !== "" && selectedService !== "document-analysis" && serviceStep < (SERVICE_FLOWS[selectedService]?.length || 0)) || (showPayButton && paymentStatus !== "paid")}
                className="p-3 text-navy hover:opacity-70 transition-colors min-h-[44px] flex items-center disabled:opacity-30"
                aria-label="Attach file"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                </svg>
              </button>

              <button
                type="submit"
                aria-label="Send message"
                disabled={showConsent || (flowType === "guided" && intakeStep < 3) || (flowType === "document" && !documentSummaryDone) || (selectedService !== "" && selectedService !== "document-analysis" && serviceStep < (SERVICE_FLOWS[selectedService]?.length || 0)) || (showPayButton && paymentStatus !== "paid") || isLoading || (!input.trim() && !attachedFile)}
                className="px-5 py-3 bg-navy text-bg text-[14px] font-semibold tracking-[0.04em] rounded hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] flex items-center"
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
