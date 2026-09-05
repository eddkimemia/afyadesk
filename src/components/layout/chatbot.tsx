"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, ArrowRight, Briefcase, GraduationCap } from "lucide-react";
import Link from "next/link";

type Msg = { from: "bot" | "user"; text: string };

const QUICK_QUESTIONS = [
  "What services do you offer?",
  "How much does a VA cost?",
  "How does security work?",
  "I want to apply for a job",
];

function botReply(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("service")) return "We offer Medical Virtual Assistants, Reception, Transcription, Billing & Claims (SHA/private), Patient Support, Data/Admin and Telehealth Support — all non-clinical. Explore at /services.";
  if (q.includes("cost") || q.includes("price") || q.includes("pricing") || q.includes("rate")) return "We quote flexibly: Part-time (≤20h/wk), Full-time (40h/wk) or Custom team. Example careers pay $10–$20/hr. Tell us your workload for a custom quote — no rigid pricing.";
  if (q.includes("security") || q.includes("data") || q.includes("confiden")) return "We operate with NDAs, least-privilege access, encrypted comms and staff training, aligned to Kenyan Data Protection Act + your policies. No false HIPAA/GDPR certification claims.";
  if (q.includes("job") || q.includes("career") || q.includes("apply")) return "Great! See /careers — 6 roles ($10–$20/hr) with details per job. Each has an Apply form. We reply within 5 days.";
  if (q.includes("contact") || q.includes("consult")) return "Book a free consultation at /contact — we reply within 1 business day, match in 5–7 days.";
  if (q.includes("hello") || q.includes("hi") || q.includes("hey")) return "Hi! I’m Afya — your AfyaDesk assistant. Ask about services, pricing, security, or careers, or book a free consultation.";
  return "Thanks for asking! For specifics, our team is best — book a free consultation at /contact or ask: services, pricing, security, or jobs.";
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ from: "bot", text: "Hi! I’m Afya — how can I help? 👋\nTry: Services • Pricing • Security • Careers" }]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  function send(text?: string) {
    const t = (text ?? input).trim();
    if (!t) return;
    setMessages((m) => [...m, { from: "user", text: t }, { from: "bot", text: botReply(t) }]);
    setInput("");
  }

  return (
    <>
      {/* floating trigger — raised on mobile to sit above StickyMobileCTA (Jobs/Course) */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-[84px] md:bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[#0B1F33] text-white shadow-xl flex items-center justify-center hover:scale-105 transition border border-white/10"
        aria-label={open ? "Close chat" : "Open AfyaDesk chat"}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-[152px] md:bottom-24 right-6 z-50 w-[92vw] max-w-[360px] rounded-[20px] bg-white border border-[#E6EEF6] shadow-2xl overflow-hidden flex flex-col max-h-[60vh] md:max-h-[70vh]">
          <div className="bg-[#0B1F33] text-white px-4 py-3 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-[#0B1F33]">
              <Bot className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold leading-none">Afya — AfyaDesk Assistant</div>
              <div className="text-xs text-white/60">Typically replies instantly • No clinical advice</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center shrink-0"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8FAFC]">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                {m.from === "bot" && (
                  <span className="h-7 w-7 rounded-full bg-[#0B1F33] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="h-4 w-4" />
                  </span>
                )}
                <div
                  className={`max-w-[78%] rounded-2xl px-3 py-2 text-sm leading-6 whitespace-pre-line ${
                    m.from === "user" ? "bg-[#0F8B8D] text-white rounded-br-sm" : "bg-white border border-[#E6EEF6] text-[#172033] rounded-bl-sm"
                  }`}
                >
                  {m.text}
                </div>
                {m.from === "user" && (
                  <span className="h-7 w-7 rounded-full bg-[#EAF6FF] border border-[#E6EEF6] flex items-center justify-center shrink-0 mt-0.5">
                    <User className="h-4 w-4 text-[#0B1F33]" />
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-[#E6EEF6] bg-white">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {QUICK_QUESTIONS.map((q) => (
                <button key={q} onClick={() => send(q)} className="text-xs px-2.5 py-1 rounded-full bg-[#F8FAFC] border border-[#E6EEF6] hover:bg-[#EAF6FF] text-[#0B1F33]">
                  {q}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask about services, pricing..."
                className="flex-1 h-10 rounded-full border border-[#E6EEF6] px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F8B8D]/20"
              />
              <button onClick={() => send()} className="h-10 w-10 rounded-full bg-[#0B1F33] text-white flex items-center justify-center hover:bg-[#132a44]">
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-2 flex gap-2">
              <Link href="/contact" className="flex-1 h-8 rounded-full bg-[#0F8B8D] text-white text-xs font-semibold flex items-center justify-center gap-1">
                Book Free Consultation <ArrowRight className="h-3 w-3" />
              </Link>
              <Link href="/careers" className="h-8 px-3 rounded-full bg-white border border-[#E6EEF6] text-xs font-semibold flex items-center justify-center text-[#0B1F33]">
                Careers
              </Link>
            </div>
            <p className="mt-2 text-[11px] text-[#8A9BB0] text-center">We provide admin support only — not diagnosis or emergency care.</p>
          </div>
        </div>
      )}
    </>
  );
}

export function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E6EEF6] p-3 flex gap-3 md:hidden shadow-[0_-8px_30px_rgba(0,0,0,0.08)] pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
      <Link href="/careers" className="flex-1 h-11 rounded-full bg-[#0B1F33] text-white font-semibold text-sm flex items-center justify-center gap-1.5">
        <Briefcase className="h-4 w-4" /> Jobs
      </Link>
      <Link href="/course" className="flex-1 h-11 rounded-full bg-white border border-[#E6EEF6] text-[#0B1F33] font-semibold text-sm flex items-center justify-center gap-1.5">
        <GraduationCap className="h-4 w-4" /> Course
      </Link>
    </div>
  );
}
