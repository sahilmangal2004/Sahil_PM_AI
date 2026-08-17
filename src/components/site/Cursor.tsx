import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      const el = (event.target as HTMLElement | null)?.closest?.("[data-cursor]") as
        | HTMLElement
        | null;
      const value = el?.dataset["cursor"];
      setLabel(value && value !== "hover" ? value : null);
      setExpanded(Boolean(value));
    };

    const loop = () => {
      current.x += (target.x - current.x) * 0.22;
      current.y += (target.y - current.y) * 0.22;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(loop);
    document.documentElement.style.cursor = "none";
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      document.documentElement.style.cursor = "";
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden items-center justify-center rounded-full border border-primary/60 bg-primary/15 backdrop-blur-[1px] transition-[width,height,background-color] duration-200 ease-out md:flex"
      style={{
        width: label ? 62 : expanded ? 34 : 12,
        height: label ? 62 : expanded ? 34 : 12,
        backgroundColor: label ? "color-mix(in oklab, var(--lime) 22%, transparent)" : undefined,
      }}
    >
      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-primary">
        {label}
      </span>
    </div>
  );
}
