import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, Loader, ArrowRight, CheckCircle2 } from "lucide-react";
import { animate, motion, AnimatePresence } from "motion/react";

interface Message {
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

const SUGGESTIONS = [
  { label: "🎙️ 30s Resume Pitch", prompt: "Explain in a brief 30-second summary why Anurag Das is an excellent candidate for an AI/ML or Software Engineering role." },
  { label: "⚙️ Experience in GenAI & RAG", prompt: "Tell me about Anurag's experiences and projects specifically in Generative AI, RAG, and Agentic AI." },
  { label: "💡 Tell me about Reflective RAG", prompt: "Summarize Anurag's IEEE research publication on 'Reflective RAG' and its primary accomplishments." },
  { label: "📞 Contact & Work Location", prompt: "What are Anurag's contact details, location, and where is he looking to work?" }
];

export default function RecruiterBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hello! I am **Anurag's Interactive AI Assistant**, custom-built on his exact engineering and research background.\n\nI can answer questions about his technical skills, internships at **Denvik Technology** and **Slash Mark**, his **IEEE RAG publication**, and his fit for your open roles. What would you like to screen first?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Gather history for context
      // Limit history to last 6 messages to keep processing lightweight and highly relevant
      const slicedHistory = messages.map((m) => ({
        sender: m.sender,
        text: m.text,
      })).slice(-6);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textToSend,
          history: slicedHistory,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not retrieve model response.");
      }

      const data = await response.json();
      const botMsg: Message = {
        sender: "bot",
        text: data.text || "I was unable to retrieve a response. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ **System Notification**\n\nI could not connect to Anurag's portfolio AI server right now. Setting up the `GEMINI_API_KEY` in the application secrets will enable this live screening feature instantly!\n\n*Note to Recruiter: In the meantime, you can explore all details of his resume beautifully structured in the visual sections below!*",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to safely format clean markdown-like text to formatted HTML paragraphs
  const renderMessageContent = (text: string) => {
    return text.split("\n\n").map((para, i) => {
      // Look for custom alerts
      const isAlert = para.startsWith("⚠️");
      
      // Look for lists
      if (para.includes("\n•") || para.includes("\n-") || para.startsWith("•") || para.startsWith("-")) {
        const items = para.split(/\n[•-]\s+/).filter(Boolean);
        return (
          <ul key={i} className="list-disc pl-5 my-2 space-y-1 text-sm leading-relaxed" id={`msg-list-${i}`}>
            {items.map((item, idx) => {
              // Parse bold elements inside list
              const formattedItem = item.split("**").map((subText, subIdx) => 
                subIdx % 2 === 1 ? <strong key={subIdx} className="font-semibold text-slate-900">{subText}</strong> : subText
              );
              return <li key={idx} className="text-slate-700">{formattedItem}</li>;
            })}
          </ul>
        );
      }

      // Format bold markup text safely
      const parts = para.split("**");
      const formattedParagraph = parts.map((part, index) => {
        if (index % 2 === 1) {
          return <strong key={index} className="font-bold text-slate-900">{part}</strong>;
        }
        return part;
      });

      return (
        <p key={i} className={`text-sm leading-relaxed mb-2 last:mb-0 ${isAlert ? "text-amber-700" : "text-slate-700"}`} id={`msg-p-${i}`}>
          {formattedParagraph}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating launcher badge */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(true)}
          id="recruiter-chat-launcher"
          className="relative flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xl shadow-indigo-500/30 px-5 py-4 rounded-full transition-colors cursor-pointer group"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <MessageSquare className="w-5 h-5 group-hover:rotate-6 transition-transform" />
          <span className="font-medium text-sm tracking-wide hidden sm:inline">Recruiter Screening Assistant</span>
        </motion.button>
      </div>

      {/* Slide-over panel */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs transition-opacity" id="recruiter-chat-overlay">
            {/* Backdrop click closer */}
            <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              id="recruiter-chat-panel"
              className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col z-10"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between" id="recruiter-chat-header">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-base flex items-center gap-1.5" id="recruiter-companion-title">
                      Anurag's Recruiter Agent
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block"></span>
                      Powered by Gemini 3.5 Flash
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  id="recruiter-chat-close"
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Viewport */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50" id="recruiter-chat-messages">
                {messages.map((message, i) => (
                  <div
                    key={i}
                    id={`chat-msg-wrapper-${i}`}
                    className={`flex flex-col max-w-[85%] ${message.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}
                  >
                    <div
                      id={`chat-msg-bubble-${i}`}
                      className={`rounded-2xl px-4 py-3 leading-relaxed shadow-xs ${
                        message.sender === "user"
                          ? "bg-indigo-600 text-white rounded-br-none"
                          : "bg-white text-slate-800 border border-slate-100 rounded-bl-none"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <p className="text-sm">{message.text}</p>
                      ) : (
                        renderMessageContent(message.text)
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">{message.timestamp}</span>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-center gap-2 text-indigo-600 bg-white border border-indigo-50/60 shadow-xs rounded-xl px-4 py-3 mr-auto max-w-[85%] animate-pulse" id="chat-loading-indicator">
                    <Loader className="w-4 h-4 animate-spin" />
                    <span className="text-xs font-medium text-indigo-700 font-mono">Formulating candidate synthesis...</span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Suggested Questions */}
              <div className="p-4 border-t border-slate-100 bg-white" id="recruiter-suggestions-area">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Instant Screening Options</p>
                <div className="flex flex-wrap gap-1.5" id="recruiter-suggestions-list">
                  {SUGGESTIONS.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(s.prompt)}
                      id={`suggestion-chip-${idx}`}
                      className="text-xs bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-medium"
                      disabled={isLoading}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }}
                id="recruiter-chat-form"
                className="p-4 border-t border-slate-100 bg-slate-50 flex gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  id="recruiter-chat-input"
                  placeholder="Ask a technical or screening question..."
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-slate-400"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  id="recruiter-chat-submit"
                  className="bg-indigo-600 hover:bg-slate-800 text-white p-2.5 rounded-xl transition-colors cursor-pointer flex items-center justify-center disabled:opacity-50"
                  disabled={isLoading || !inputValue.trim()}
                >
                  <Send className="w-4.5 h-4.5" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
