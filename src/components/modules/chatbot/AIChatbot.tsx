"use client";

import {
  Bot,
  Loader2,
  Maximize2,
  MessageSquare,
  Minimize2,
  RotateCcw,
  Send,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { type FC, useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  "How do sprint cycles work in SprintFlow?",
  "What is the difference between Admin and Manager roles?",
  "Tell me about the Enterprise pricing plan",
  "How do I track velocity and team capacity?",
];

// Contextual fallback knowledge base for smooth demo/offline experience
function getSmartFallbackReply(query: string): string {
  const q = query.toLowerCase();

  if (
    q.includes("pricing") ||
    q.includes("plan") ||
    q.includes("cost") ||
    q.includes("tier")
  ) {
    return "SprintFlow offers 3 flexible plans:\n• **Starter**: Free forever (up to 5 team members)\n• **Pro**: $29/mo (unlimited sprints, advanced velocity analytics)\n• **Enterprise**: $99/mo (audit logs, custom SLAs, dedicated support).";
  }

  if (
    q.includes("role") ||
    q.includes("admin") ||
    q.includes("manager") ||
    q.includes("member") ||
    q.includes("permission")
  ) {
    return "SprintFlow features 3 distinct roles:\n• **Admin**: Complete workspace administration, user directory, billing, and system audit logs.\n• **Manager**: Sprint lifecycle planning, velocity estimation, and budget allocation.\n• **Member**: Personal assigned tasks, interactive Kanban board, and activity tracking.";
  }

  if (
    q.includes("sprint") ||
    q.includes("cycle") ||
    q.includes("agile") ||
    q.includes("scrum") ||
    q.includes("kanban")
  ) {
    return "In SprintFlow, sprints are time-boxed iterations (typically 1 to 4 weeks). Managers organize backlog items into sprints, set velocity targets, and track active tickets across the interactive Kanban board with real-time burndown charts.";
  }

  if (q.includes("demo") || q.includes("login") || q.includes("account")) {
    return "You can experience any workspace instantly! On the Login page, click any of the 1-click Demo buttons (Admin, Manager, or Member) to explore role-specific dashboards with pre-populated data without entering credentials.";
  }

  if (
    q.startsWith("hi") ||
    q.startsWith("hello") ||
    q.startsWith("hey") ||
    q.includes("kemon") ||
    q.includes("halo")
  ) {
    return "Hello! 👋 I'm your SprintFlow AI Assistant. How can I help you today with your agile sprints, team workflows, or workspace setup?";
  }

  return `I received your question: "${query}". I am currently running in offline fallback mode because the live SprintFlow Backend API is unreachable. Please ensure the backend server is running (port 5000) or deployed to receive full dynamic Gemini AI responses!`;
}

const AIChatbot: FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "👋 Hi there! I'm your SprintFlow AI Copilot. How can I assist you with your agile workflows, team sprints, or workspace setup today?",
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (isOpen && (messages.length > 0 || loading)) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, loading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText ?? input).trim();
    if (!textToSend || loading) return;

    const timeStr = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setHasInteracted(true);

    try {
      let reply: string | undefined;

      // 1. Send request to SprintFlow Backend via /api/backend/ai/chat proxy
      try {
        const res = await fetch("/api/backend/ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: textToSend }),
        });

        if (res.ok) {
          const data = await res.json();
          reply = data?.data?.reply ?? data?.reply;
        }
      } catch {
        // Continue to local backend fallback
      }

      // 2. If proxy could not connect, attempt direct local backend (port 5000)
      if (!reply) {
        try {
          const localRes = await fetch("http://localhost:5000/api/v1/ai/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: textToSend }),
          });

          if (localRes.ok) {
            const localData = await localRes.json();
            reply = localData?.data?.reply ?? localData?.reply;
          }
        } catch {
          // Backend is offline or unreachable
        }
      }

      if (reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: reply,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
      } else {
        throw new Error("Unable to generate AI reply");
      }
    } catch {
      // Graceful fallback to smart agile knowledge engine
      const smartReply = getSmartFallbackReply(textToSend);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: smartReply,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "bot",
        text: "Chat cleared! How else can I help you navigate SprintFlow today?",
        timestamp: "Just now",
      },
    ]);
    setHasInteracted(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Trigger Button (When Chat is Closed) */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 rounded-full border border-primary/40 bg-linear-to-r from-primary via-primary/95 to-blue-600 px-4 py-3 text-sm font-bold text-primary-foreground shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 active:scale-95 cursor-pointer"
          aria-label="Open SprintFlow AI Chatbot"
        >
          {/* Pulsing Status Glow */}
          <span className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-3 rounded-full bg-emerald-500 border-2 border-primary-foreground" />
          </span>

          <Sparkles className="size-4 animate-pulse" />
          <span className="tracking-wide">Ask SprintFlow AI</span>

          {/* Unread / New Indicator Pill */}
          {!hasInteracted && (
            <span className="rounded-full bg-background/20 backdrop-blur-md px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-primary-foreground">
              Copilot
            </span>
          )}
        </button>
      )}

      {/* Floating Chatbot Window (When Opened) */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="SprintFlow AI Assistant Window"
          className={`flex flex-col rounded-3xl border border-border/80 bg-card/95 backdrop-blur-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
            isExpanded
              ? "w-[94vw] max-w-xl h-[80vh] max-h-[680px]"
              : "w-[92vw] sm:w-[390px] h-[540px] max-h-[85vh]"
          }`}
        >
          {/* Header */}
          <header className="flex items-center justify-between border-b border-border/70 bg-gradient-to-r from-card via-card to-primary/5 px-4 py-3.5 sm:px-5">
            <div className="flex items-center gap-2.5">
              {/* Bot Avatar Icon */}
              <div className="relative flex size-9 items-center justify-center rounded-2xl bg-linear-to-tr from-primary to-blue-600 text-primary-foreground shadow-sm">
                <Bot className="size-5" />
                <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-card bg-emerald-500" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-heading text-sm font-bold tracking-tight text-foreground">
                    SprintFlow Copilot
                  </h3>
                  <span className="rounded-md border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary">
                    AI
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  <span>Online · Agile Assistant</span>
                </p>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-1 text-muted-foreground">
              {/* Clear Chat */}
              <button
                type="button"
                onClick={resetChat}
                className="flex size-7 items-center justify-center rounded-lg hover:bg-muted hover:text-foreground transition cursor-pointer"
                title="Clear conversation"
                aria-label="Clear conversation"
              >
                <RotateCcw className="size-3.5" />
              </button>

              {/* Expand/Contract Toggle */}
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="hidden sm:flex size-7 items-center justify-center rounded-lg hover:bg-muted hover:text-foreground transition cursor-pointer"
                title={isExpanded ? "Collapse window" : "Expand window"}
                aria-label={isExpanded ? "Collapse window" : "Expand window"}
              >
                {isExpanded ? (
                  <Minimize2 className="size-3.5" />
                ) : (
                  <Maximize2 className="size-3.5" />
                )}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex size-7 items-center justify-center rounded-lg hover:bg-muted hover:text-foreground transition cursor-pointer"
                title="Close chat"
                aria-label="Close chat"
              >
                <X className="size-4" />
              </button>
            </div>
          </header>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-muted/20">
            {messages.map((m) => {
              const isUser = m.sender === "user";
              return (
                <div
                  key={m.id}
                  className={`flex items-end gap-2.5 ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* Bot Avatar on Bot messages */}
                  {!isUser && (
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 text-xs">
                      <Sparkles className="size-3.5" />
                    </div>
                  )}

                  <div
                    className={`flex flex-col max-w-[82%] sm:max-w-[78%] ${
                      isUser ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-xs sm:text-[13px] leading-relaxed shadow-2xs whitespace-pre-line ${
                        isUser
                          ? "bg-primary text-primary-foreground rounded-br-xs font-medium"
                          : "bg-card border border-border/80 text-foreground rounded-bl-xs"
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="mt-1 px-1 text-[10px] text-muted-foreground/80">
                      {m.timestamp}
                    </span>
                  </div>

                  {/* User Avatar on User messages */}
                  {isUser && (
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground border border-border/80 text-xs">
                      <User className="size-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Thinking / Loading Animation */}
            {loading && (
              <div className="flex items-end gap-2.5 justify-start">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 text-xs">
                  <Sparkles className="size-3.5" />
                </div>
                <div className="rounded-2xl rounded-bl-xs border border-border/80 bg-card px-4 py-3 shadow-2xs">
                  <div className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                    <span className="size-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                    <span className="size-1.5 rounded-full bg-primary animate-bounce" />
                    <span className="text-[11px] font-medium text-muted-foreground ml-1">
                      Drafting response...
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips (Shown before user types or when conversation is fresh) */}
          {messages.length <= 2 && (
            <div className="border-t border-border/60 bg-card/60 px-4 py-2.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1">
                <MessageSquare className="size-3 text-primary" />
                <span>Suggested Questions</span>
              </p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className="rounded-xl border border-border/80 bg-background/90 px-2.5 py-1 text-[11px] font-medium text-foreground hover:border-primary hover:bg-primary/5 transition text-left cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input & Action Footer */}
          <footer className="border-t border-border/80 bg-card p-3 sm:p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about sprints, roles, pricing, or tasks..."
                  className="w-full rounded-2xl border border-border/80 bg-background/90 py-2.5 pl-3.5 pr-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground shadow-2xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition"
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-xs transition-all duration-150 hover:bg-primary/90 active:scale-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                aria-label="Send message"
              >
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
              </button>
            </form>

            <div className="mt-2 flex items-center justify-between px-1 text-[10px] text-muted-foreground/80">
              <span>Powered by SprintFlow Intelligence</span>
              <span className="hidden sm:inline">Press Enter to send</span>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default AIChatbot;
