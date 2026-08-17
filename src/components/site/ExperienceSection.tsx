import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { experiences } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function ExperienceSection() {
  const [open, setOpen] = useState<string | null>("goeddie");

  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        eyebrow="01 / Experience"
        title={
          <>
            Stories from inside
            <br />
            <span className="text-muted-foreground">the messy middle.</span>
          </>
        }
        aside="Not polished launch stories. The work between a problem showing up and a system getting a little better."
      />

      <div className="mt-14 border-t border-border">
        {experiences.map((item, i) => {
          const isOpen = open === item.id;
          return (
            <Reveal key={item.id} delay={i * 80}>
              <article id={item.id} className="group border-b border-border">
                <button
                  data-cursor="hover"
                  onClick={() => setOpen(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className="relative flex w-full items-center gap-5 overflow-hidden py-7 text-left"
                >
                  <span
                    className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(90deg, color-mix(in oklab, ${item.accent} 10%, transparent), transparent 60%)`,
                    }}
                  />
                  <span className="mono-label w-8 shrink-0">{item.index}</span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span
                        className="font-display text-[clamp(1.6rem,4.4vw,2.9rem)] font-semibold leading-none tracking-[-0.03em] transition-transform duration-500 ease-out group-hover:translate-x-2"
                        style={{ color: isOpen ? item.accent : undefined }}
                      >
                        {item.company}
                      </span>
                      <span className="mono-label translate-y-1 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        {item.date}
                      </span>
                    </span>
                    <span className="mt-2 block text-sm text-muted-foreground">{item.role}</span>
                  </span>
                  <ArrowUpRight
                    size={22}
                    className="shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-foreground"
                    style={{ transform: isOpen ? "rotate(90deg)" : undefined }}
                  />
                </button>

                <div
                  className="grid transition-[grid-template-rows,opacity] duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-8 pb-9 md:grid-cols-3">
                      <div>
                        <p className="mono-label">What I worked on</p>
                        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                          {item.work.map((w) => (
                            <li key={w} className="flex gap-2">
                              <Check size={15} className="mt-0.5 shrink-0 text-primary" />
                              {w}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="mono-label">Impact</p>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {item.title}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {item.summary}
                        </p>
                      </div>
                      <div>
                        <p className="mono-label">Key metrics</p>
                        <div className="mt-3 flex flex-col gap-2">
                          {item.impact.map((metric) => (
                            <span
                              key={metric}
                              className="rounded-xl border border-border bg-surface/60 px-3.5 py-2.5 text-sm"
                            >
                              {metric}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
