import { useEffect, useRef, useState } from "react";

export type BotState = "idle" | "curious" | "thinking" | "ready" | "active";

const STATUS_LABEL: Record<BotState, string> = {
  idle: "IDLE",
  curious: "CURIOUS",
  thinking: "THINKING",
  ready: "READY",
  active: "ACTIVE",
};

/**
 * Sahil AI companion — lightweight SVG robot with rAF spring cursor tracking.
 * No React state updates on pointer move (only on discrete state changes).
 */
export function SahilBot({
  state,
  onProximity,
  onActivate,
  className,
}: {
  state: BotState;
  onProximity?: (near: "none" | "near" | "close") => void;
  onActivate?: () => void;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<SVGGElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const eyesRef = useRef<SVGGElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [blink, setBlink] = useState(false);
  const proximityRef = useRef<"none" | "near" | "close">("none");

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    const target = { x: 0, y: 0 };
    const eye = { x: 0, y: 0 };
    const head = { x: 0, y: 0 };
    const body = { x: 0, y: 0 };
    let visible = true;
    let frame = 0;
    let t = 0;

    const io = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
    });
    io.observe(wrap);

    const onMove = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const radius = Math.max(rect.width, rect.height);
      const dist = Math.hypot(dx, dy);
      target.x = Math.max(-1, Math.min(1, dx / (radius * 0.9)));
      target.y = Math.max(-1, Math.min(1, dy / (radius * 0.9)));

      const next = dist < radius * 0.45 ? "close" : dist < radius * 1.25 ? "near" : "none";
      if (next !== proximityRef.current) {
        proximityRef.current = next;
        onProximity?.(next);
      }
    };

    const loop = () => {
      frame = requestAnimationFrame(loop);
      if (!visible) return;
      t += 0.016;

      eye.x += (target.x - eye.x) * 0.28;
      eye.y += (target.y - eye.y) * 0.28;
      head.x += (target.x - head.x) * 0.09;
      head.y += (target.y - head.y) * 0.09;
      body.x += (target.x - body.x) * 0.04;
      body.y += (target.y - body.y) * 0.04;

      const float = Math.sin(t * 1.1) * 5;
      const breathe = 1 + Math.sin(t * 1.6) * 0.012;

      if (bodyRef.current) {
        bodyRef.current.style.transform = `translate(${body.x * 10}px, ${body.y * 6 + float}px) scale(${breathe})`;
      }
      if (headRef.current) {
        headRef.current.style.transform = `translate(${head.x * 9}px, ${head.y * 6}px) rotate(${head.x * 5}deg)`;
      }
      if (eyesRef.current) {
        eyesRef.current.style.transform = `translate(${eye.x * 7}px, ${eye.y * 5}px)`;
      }
      if (particlesRef.current) {
        particlesRef.current.style.transform = `translate(${-eye.x * 8}px, ${-eye.y * 8}px) rotate(${t * 6}deg)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${body.x * 12}px, ${body.y * 8 + float}px)`;
      }
    };

    if (!coarse && !reduced) window.addEventListener("pointermove", onMove, { passive: true });
    if (!reduced) frame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, [onProximity]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timeout = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 130);
        schedule();
      }, 2600 + Math.random() * 4200);
    };
    schedule();
    return () => clearTimeout(timeout);
  }, []);

  const awake = state !== "idle";
  const intensity = state === "idle" ? 0.3 : state === "curious" ? 0.5 : state === "thinking" ? 0.7 : 0.95;
  const ringSpeed = state === "thinking" ? "9s" : state === "active" ? "6s" : "22s";

  return (
    <div className={className}>
      <button
        type="button"
        ref={wrapRef as never}
        onClick={onActivate}
        aria-label="Open Sahil AI assistant"
        data-cursor="ASK"
        className="relative mx-auto block aspect-square w-full max-w-[300px] rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {/* emissive glow */}
        <div
          ref={glowRef}
          aria-hidden
          className="pointer-events-none absolute inset-[8%] rounded-full blur-2xl transition-opacity duration-700"
          style={{
            opacity: intensity,
            background:
              "radial-gradient(circle at 40% 35%, color-mix(in oklab, var(--lime) 55%, transparent), color-mix(in oklab, var(--ice) 35%, transparent) 45%, transparent 70%)",
          }}
        />

        {/* orbital rings */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full border transition-all duration-700"
          style={{
            borderColor: `color-mix(in oklab, var(--lime) ${awake ? 45 : 18}%, transparent)`,
            transform: state === "active" ? "scale(1.08)" : "scale(1)",
            animation: `orb-spin ${ringSpeed} linear infinite`,
          }}
        >
          <span className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 rounded-full bg-primary" />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[10%] rounded-full border transition-all duration-700"
          style={{
            borderColor: `color-mix(in oklab, var(--foreground) ${awake ? 22 : 10}%, transparent)`,
            transform: state === "active" ? "scale(1.12)" : "scale(1)",
            animation: `orb-spin ${state === "thinking" ? "7s" : "16s"} linear infinite reverse`,
          }}
        >
          <span className="absolute bottom-0 left-1/2 size-1 -translate-x-1/2 rounded-full bg-foreground/50" />
        </div>

        {/* particles */}
        <div ref={particlesRef} aria-hidden className="pointer-events-none absolute inset-0">
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i / 6) * Math.PI * 2;
            const r = 42 + (i % 2) * 6;
            return (
              <span
                key={i}
                className="absolute size-1 rounded-full bg-primary transition-opacity duration-500"
                style={{
                  left: `${50 + Math.cos(angle) * r}%`,
                  top: `${50 + Math.sin(angle) * r}%`,
                  opacity: awake ? 0.75 : 0.2,
                  animation: `think-dot ${2.4 + i * 0.3}s ${i * 0.2}s ease-in-out infinite`,
                }}
              />
            );
          })}
        </div>

        {/* robot */}
        <svg viewBox="0 0 200 200" className="relative size-full overflow-visible">
          <defs>
            <linearGradient id="bot-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.42 0.13 275)" />
              <stop offset="55%" stopColor="oklch(0.29 0.10 265)" />
              <stop offset="100%" stopColor="oklch(0.2 0.06 265)" />
            </linearGradient>
            <linearGradient id="bot-visor" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.32 0.09 262)" />
              <stop offset="100%" stopColor="oklch(0.19 0.05 262)" />
            </linearGradient>
          </defs>

          <g ref={bodyRef} style={{ transformOrigin: "100px 120px" }}>
            {/* shoulders / base */}
            <rect x="56" y="128" width="88" height="30" rx="15" fill="url(#bot-body)" opacity="0.9" />
            <rect
              x="72"
              y="139"
              width="56"
              height="4"
              rx="2"
              fill="var(--lime)"
              opacity={awake ? 0.85 : 0.35}
              style={{ transition: "opacity 500ms" }}
            />

            <g ref={headRef} style={{ transformOrigin: "100px 92px", transition: "none" }}>
              {/* antenna */}
              <line x1="100" y1="46" x2="100" y2="32" stroke="oklch(0.6 0.12 265)" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="100" cy="28" r="4.5" fill="var(--lime)" opacity={awake ? 1 : 0.5}>
                <animate attributeName="r" values="4;5.4;4" dur="2.6s" repeatCount="indefinite" />
              </circle>
              {/* ears */}
              <rect x="36" y="80" width="12" height="28" rx="6" fill="url(#bot-body)" />
              <rect x="152" y="80" width="12" height="28" rx="6" fill="url(#bot-body)" />
              {/* head */}
              <rect x="44" y="48" width="112" height="78" rx="30" fill="url(#bot-body)" />
              <rect
                x="44"
                y="48"
                width="112"
                height="78"
                rx="30"
                fill="none"
                stroke="color-mix(in oklab, var(--ice) 60%, transparent)"
                strokeWidth="1.2"
                opacity={awake ? 0.8 : 0.4}
              />
              {/* visor */}
              <rect x="58" y="64" width="84" height="48" rx="22" fill="url(#bot-visor)" />
              <g ref={eyesRef}>
                <rect
                  x="76"
                  y={blink ? 86 : 76}
                  width="14"
                  height={blink ? 3 : 24}
                  rx={blink ? 1.5 : 7}
                  fill="var(--lime)"
                  opacity={awake ? 1 : 0.75}
                  style={{ filter: `drop-shadow(0 0 ${awake ? 10 : 4}px var(--lime))`, transition: "opacity 400ms" }}
                />
                <rect
                  x="110"
                  y={blink ? 86 : 76}
                  width="14"
                  height={blink ? 3 : 24}
                  rx={blink ? 1.5 : 7}
                  fill="var(--lime)"
                  opacity={awake ? 1 : 0.75}
                  style={{ filter: `drop-shadow(0 0 ${awake ? 10 : 4}px var(--lime))`, transition: "opacity 400ms" }}
                />
                {state === "thinking" && (
                  <g>
                    {[0, 1, 2].map((i) => (
                      <circle key={i} cx={88 + i * 12} cy="104" r="1.6" fill="var(--ice)">
                        <animate
                          attributeName="opacity"
                          values="0.2;1;0.2"
                          dur="1.2s"
                          begin={`${i * 0.15}s`}
                          repeatCount="indefinite"
                        />
                      </circle>
                    ))}
                  </g>
                )}
              </g>
            </g>
          </g>
        </svg>
      </button>

      <div className="mt-6 text-center">
        <p className="mono-label text-foreground/80">SAHIL AI</p>
        <p className="mono-label mt-1.5 flex items-center justify-center gap-2">
          <span
            className="inline-block size-1.5 rounded-full bg-primary"
            style={{ animation: awake ? "pulse-dot 1.8s ease-out infinite" : undefined }}
          />
          {STATUS_LABEL[state]}
        </p>
      </div>
    </div>
  );
}
