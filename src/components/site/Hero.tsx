import { useEffect, useState } from "react";
import { ArrowDownRight, Sparkles } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { portrait } from "@/lib/portfolio-data";

const words = ["PRODUCT", "DATA", "AI", "AUTOMATION", "EXPERIMENTATION"];

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((v) => (v + 1) % words.length), 2200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="top" className="relative mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
      <div className="grid items-center gap-12 md:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/60 px-3.5 py-1.5">
            <span
              className="size-1.5 rounded-full bg-primary"
              style={{ animation: "pulse-dot 2.4s ease-out infinite" }}
            />
            <span className="mono-label !text-foreground/80">Currently building with AI</span>
          </div>

          <h1 className="font-display text-[clamp(3rem,9vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.04em]">
            Hi, I&apos;m Sahil.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Product-minded builder working at the intersection of{" "}
            <span className="text-foreground">Product × Data × AI.</span>
          </p>

          <div className="mt-8 flex items-center gap-3">
            <span className="mono-label">Focused on</span>
            <span className="relative block h-8 min-w-[13ch] overflow-hidden">
              <span
                key={index}
                className="absolute inset-0 font-mono text-lg tracking-[0.06em] text-primary"
                style={{ animation: "word-in 500ms cubic-bezier(0.22,1,0.36,1) both" }}
              >
                {words[index]}
              </span>
            </span>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#work"
                data-cursor="hover"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_0_0_0_var(--lime)] transition-shadow duration-300 hover:shadow-[0_0_36px_-6px_var(--lime)]"
              >
                Explore my work <ArrowDownRight size={17} />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#ai"
                data-cursor="ASK"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-6 py-3 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Sparkles size={16} /> Talk to Sahil AI
              </a>
            </Magnetic>
          </div>

          <p className="mono-label mt-10">
            MANIT Bhopal &apos;26 · Product Operations · Data · Automation
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-6 -z-10 rounded-full bg-primary/10 blur-3xl" />
          <div className="overflow-hidden rounded-[2rem] border border-border bg-surface">
            <img
              src={portrait}
              alt="Sahil Mangal, product-minded builder"
              className="aspect-square w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
              loading="eager"
            />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="mono-label">01 / Product thinking in progress</span>
            <span className="mono-label !text-primary">● Open to PM roles</span>
          </div>
        </div>
      </div>
    </section>
  );
}
