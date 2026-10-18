"use client";

import { Loader2, Search, Sparkles, X } from "lucide-react";
import { type FC, useCallback, useEffect, useRef, useState } from "react";

export interface SuggestionItem {
  id: string;
  text: string;
}

export interface SmartSearchProps {
  value?: string;
  onChange?: (term: string) => void;
  onSelect?: (term: string) => void;
  placeholder?: string;
  className?: string;
}

const FALLBACK_KEYWORD_MAP: Record<string, string[]> = {
  spr: [
    "sprint planning",
    "sprint backlog",
    "sprint velocity",
    "sprint retrospective",
  ],
  tas: ["task assignment", "task board", "task priority", "task estimation"],
  pro: [
    "project roadmap",
    "project settings",
    "project members",
    "project budget",
  ],
  kan: ["kanban workflow", "kanban columns", "kanban swimlanes", "wip limits"],
  adm: ["admin dashboard", "user directory", "audit logs", "role permissions"],
  bil: [
    "billing overview",
    "invoice history",
    "subscription plans",
    "payment method",
  ],
};

function getLocalSuggestions(query: string): string[] {
  const lower = query.toLowerCase().trim();
  for (const [key, list] of Object.entries(FALLBACK_KEYWORD_MAP)) {
    if (lower.includes(key)) {
      return list;
    }
  }
  return [
    `${query} in projects`,
    `${query} in tasks`,
    `${query} documentation`,
    `${query} agile workflow`,
  ];
}

const SmartSearch: FC<SmartSearchProps> = ({
  value: controlledValue,
  onChange,
  onSelect,
  placeholder = "Search projects, tasks, or sprints...",
  className = "",
}) => {
  const [internalTerm, setInternalTerm] = useState<string>("");
  const searchTerm =
    controlledValue !== undefined ? controlledValue : internalTerm;

  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const updateTerm = (newTerm: string) => {
    if (controlledValue === undefined) {
      setInternalTerm(newTerm);
    }
    onChange?.(newTerm);
  };

  const fetchSuggestions = useCallback(async (query: string) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);

    try {
      let rawList: string[] | undefined;

      // 1. Try Next.js backend proxy
      try {
        const res = await fetch("/api/backend/ai/search-suggestions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
          signal: controller.signal,
        });

        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data?.data?.suggestions)) {
            rawList = data.data.suggestions;
          }
        }
      } catch {
        // Fallback to local backend
      }

      // 2. Try direct local backend if proxy didn't return
      if (!rawList && !controller.signal.aborted) {
        try {
          const localRes = await fetch(
            "http://localhost:5000/api/v1/ai/search-suggestions",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ query }),
              signal: controller.signal,
            },
          );

          if (localRes.ok) {
            const localData = await localRes.json();
            if (Array.isArray(localData?.data?.suggestions)) {
              rawList = localData.data.suggestions;
            }
          }
        } catch {
          // Backend unavailable
        }
      }

      // 3. Fallback to smart keyword list if backend is offline
      if (!rawList || rawList.length === 0) {
        rawList = getLocalSuggestions(query);
      }

      if (!controller.signal.aborted) {
        const formatted: SuggestionItem[] = rawList
          .slice(0, 5)
          .map((item, index) => ({
            id: `${item}-${index}`,
            text: item,
          }));
        setSuggestions(formatted);
        setIsOpen(formatted.length > 0);
        setActiveIndex(-1);
      }
    } catch {
      if (!controller.signal.aborted) {
        setSuggestions([]);
        setIsOpen(false);
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const trimmed = searchTerm.trim();
    if (trimmed.length >= 2) {
      const timer = setTimeout(() => {
        fetchSuggestions(trimmed);
      }, 300);

      return () => clearTimeout(timer);
    }
    setSuggestions([]);
    setIsOpen(false);
    setLoading(false);
  }, [searchTerm, fetchSuggestions]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (text: string) => {
    updateTerm(text);
    setSuggestions([]);
    setIsOpen(false);
    onSelect?.(text);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        e.preventDefault();
        handleSelect(suggestions[activeIndex].text);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    updateTerm("");
    setSuggestions([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={`relative w-full max-w-md ${className}`}>
      <div className="relative flex items-center">
        {/* Search Icon */}
        <Search className="absolute left-3.5 size-4 text-muted-foreground pointer-events-none" />

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => updateTerm(e.target.value)}
          onFocus={() => {
            if (suggestions.length > 0) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label={placeholder}
          className="w-full h-10 pl-10 pr-10 text-sm bg-background border border-border/80 rounded-xl outline-none text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 shadow-xs"
        />

        {/* Loading Indicator or Clear Button */}
        <div className="absolute right-3 flex items-center gap-1">
          {loading ? (
            <Loader2 className="size-4 text-primary animate-spin" />
          ) : searchTerm ? (
            <button
              type="button"
              onClick={handleClear}
              className="text-muted-foreground hover:text-foreground p-0.5 rounded-full transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <X className="size-3.5" />
            </button>
          ) : null}
        </div>
      </div>

      {/* Auto-complete Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 z-50 mt-1.5 overflow-hidden rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md shadow-xl transition-all duration-200 animate-in fade-in slide-in-from-top-1">
          <div className="px-3 py-1.5 border-b border-border/50 flex items-center justify-between text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Sparkles className="size-3 text-primary animate-pulse" />
              AI Suggestions
            </span>
            <span className="text-[10px] lowercase font-normal opacity-70">
              arrow keys to navigate
            </span>
          </div>

          <ul className="py-1 max-h-60 overflow-y-auto">
            {suggestions.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(item.text)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`w-full text-left px-3.5 py-2 text-sm flex items-center justify-between transition-colors cursor-pointer ${
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-foreground hover:bg-muted/60"
                    }`}
                  >
                    <span className="flex items-center gap-2.5 truncate">
                      <Search className="size-3.5 text-muted-foreground shrink-0" />
                      <span className="truncate">{item.text}</span>
                    </span>
                    <span className="text-[10px] text-muted-foreground/60 shrink-0 font-mono">
                      select ↵
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SmartSearch;
