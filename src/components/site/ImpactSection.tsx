import { useEffect, useRef, useState } from "react";
import { metrics } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function CountUp({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(value * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export function ImpactSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        eyebrow="02 / Impact"
        title={
          <>
            Useful numbers.
            <br />
            <span className="text-muted-foreground">Better context.</span>
          </>
        }
        aside="Every number has a source. The point isn't to look impressive — it's to understand what changed and why."
      />

      <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric, i) => (
          <Reveal key={metric.label} delay={i * 70}>
            <div className="group h-full bg-background p-7 transition-colors duration-500 hover:bg-surface">
              <div className="font-display text-[clamp(2.6rem,7vw,4.4rem)] font-bold leading-none tracking-[-0.05em]">
                <CountUp value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
              </div>
              <p className="mt-4 text-sm text-foreground/85">{metric.label}</p>
              <p className="mono-label mt-2 transition-colors group-hover:!text-primary">
                {metric.source}
              </p>
            </div>
          </Reveal>
        ))}
        <Reveal delay={350}>
          <div className="flex h-full flex-col justify-between bg-background p-7">
            <p className="mono-label">Also documented</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              ~40% extraction reliability improvement · 40+ members led · ₹50K+ budgets managed ·
              1,000+ event attendees.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
