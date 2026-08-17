import { useEffect, useRef, useState } from "react";
import { ArrowUp, RotateCcw } from "lucide-react";
import { getAnswer } from "@/lib/portfolio-data";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

type Message = { from: "user" | "ai"; text: string };

const suggestions = [
  "Explain SQL joins",
  "Help me prepare for a PM interview",
  "What is product-market fit?",
  "Tell me about Sahil",
  "What did Sahil build at QuikyGo?",
  "How would you improve QuikyGo?",
];

function Orb({ state }: { state: "idle" | "thinking" | "generating" }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - (rect.left + rect.width / 2)) / window.innerWidth;
      const y = (event.clientY - (rect.top + rect.height / 2)) / window.innerHeight;
      node.style.transform = `translate3d(${x * 22}px, ${y * 22}px, 0)`;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const intensity = state === "idle" ? 0.35 : state === "thinking" ? 0.6 : 0.85;

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[280px] transition-transform duration-500 ease-out">
      <div
        className="absolute inset-0 rounded-full blur-2xl transition-opacity duration-700"
        style={{
          opacity: intensity,
          background:
            "radial-gradient(circle at 35% 30%, color-mix(in oklab, var(--lime) 70%, transparent), transparent 65%)",
        }}
      />
      <div
        className="absolute inset-[12%] rounded-full border border-primary/30"
        style={{ animation: "orb-spin 18s linear infinite" }}
      >
        <span className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 rounded-full bg-primary" />
      </div>
      <div
        className="absolute inset-[24%] rounded-full border border-foreground/15"
        style={{ animation: "orb-spin 11s linear infinite reverse" }}
      >
        <span className="absolute bottom-0 left-1/2 size-1 -translate-x-1/2 rounded-full bg-foreground/60" />
      </div>
      <div
        className="absolute inset-[36%] rounded-full bg-primary/25 backdrop-blur-sm transition-all duration-500"
        style={{
          transform: state === "thinking" ? "scale(1.08)" : "scale(1)",
          boxShadow: `0 0 ${state === "idle" ? 30 : 60}px color-mix(in oklab, var(--lime) 40%, transparent)`,
        }}
      />
    </div>
  );
}

export function AiSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [streaming, setStreaming] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming, thinking]);

  const ask = async (raw: string) => {
    const text = raw.trim();
    if (!text || thinking) return;
    setMessages((current) => [...current, { from: "user", text }]);
    setInput("");
    setThinking(true);

    let answer = "";
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: messages.slice(-8) }),
      });
      if (!response.ok) throw new Error("unavailable");
      const data = (await response.json()) as { text?: string };
      answer = data.text || getAnswer(text);
    } catch {
      answer = getAnswer(text);
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    setThinking(false);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setMessages((current) => [...current, { from: "ai", text: answer }]);
      inputRef.current?.focus();
      return;
    }

    const words = answer.split(" ");
    for (let i = 0; i < words.length; i += 1) {
      setStreaming(words.slice(0, i + 1).join(" "));
      await new Promise((resolve) => setTimeout(resolve, 18));
    }
    setStreaming("");
    setMessages((current) => [...current, { from: "ai", text: answer }]);
    inputRef.current?.focus();
  };

  const state = thinking ? "thinking" : streaming ? "generating" : "idle";

  return (
    <section id="ai" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        eyebrow="06 / Intelligence"
        title="Sahil AI"
        aside="A general-purpose assistant that also knows Sahil's documented work. Ask anything."
      />
      <p className="mt-4 text-lg text-muted-foreground">Ask me anything.</p>

      <Reveal className="mt-12">
        <div className="grid gap-10 rounded-[2rem] border border-border bg-surface/40 p-5 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <Orb state={state} />
            <p className="mono-label mt-6 text-center">
              {state === "idle" ? "● Idle" : state === "thinking" ? "● Thinking" : "● Generating"}
            </p>
          </div>

          <div className="flex min-h-[420px] flex-col rounded-3xl border border-border bg-background/70">
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5">
              {messages.length === 0 && !thinking && (
                <div>
                  <p className="mono-label">Try one of these</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {suggestions.map((prompt, i) => (
                      <button
                        key={prompt}
                        data-cursor="ASK"
                        onClick={() => void ask(prompt)}
                        className="reveal rounded-full border border-border px-3.5 py-2 text-[13px] text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
                        data-visible="true"
                        style={{ transitionDelay: `${i * 60}ms` }}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message, i) => (
                <div
                  key={`${message.from}-${i}`}
                  className={
                    message.from === "user"
                      ? "ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-3 text-sm text-primary-foreground"
                      : "max-w-[92%] text-sm leading-relaxed text-foreground/90"
                  }
                  style={{ animation: "word-in 380ms cubic-bezier(0.22,1,0.36,1) both" }}
                >
                  {message.from === "ai" && <p className="mono-label mb-1.5">Sahil AI</p>}
                  {message.text}
                </div>
              ))}

              {thinking && (
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="size-1.5 rounded-full bg-primary"
                      style={{ animation: `think-dot 1.2s ${i * 0.15}s ease-in-out infinite` }}
                    />
                  ))}
                </div>
              )}

              {streaming && (
                <div className="max-w-[92%] text-sm leading-relaxed text-foreground/90">
                  <p className="mono-label mb-1.5">Sahil AI</p>
                  {streaming}
                  <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-primary" />
                </div>
              )}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                void ask(input);
              }}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about product, data, AI — or about Sahil…"
                aria-label="Ask Sahil AI"
                className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground/70"
              />
              {messages.length > 0 && (
                <button
                  type="button"
                  aria-label="Clear conversation"
                  onClick={() => setMessages([])}
                  className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
                >
                  <RotateCcw size={16} />
                </button>
              )}
              <button
                type="submit"
                aria-label="Send"
                disabled={thinking}
                data-cursor="hover"
                className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-200 hover:scale-105 disabled:opacity-50"
              >
                <ArrowUp size={17} />
              </button>
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
