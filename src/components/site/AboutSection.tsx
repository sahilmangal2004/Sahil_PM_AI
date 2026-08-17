import { ArrowDownRight } from "lucide-react";
import { leadership, principles, portrait } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        eyebrow="07 / About"
        title={
          <>
            Less interested in perfect plans
            <br />
            <span className="text-muted-foreground">than useful next steps.</span>
          </>
        }
        aside="Chemical Engineering at MANIT Bhopal led to research and operations, then data, automation and Product Operations."
      />

      <div className="mt-14 grid gap-10 md:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] border border-border">
            <img
              src={portrait}
              alt="Sahil Mangal"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <p className="mono-label mt-3">Curious by default</p>
        </Reveal>

        <div className="space-y-10">
          <Reveal delay={80}>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              I graduated from MANIT Bhopal with a degree in Chemical Engineering, but my
              professional journey gradually pulled me toward a different kind of problem: figuring
              out why systems don&apos;t work as well as they should — and then improving them.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {["Chemical Engineering", "Research & Operations", "Data + Automation", "Product Operations"].map(
                (step, i, all) => (
                  <span key={step} className="flex items-center gap-3">
                    <span className="rounded-full border border-border bg-surface/50 px-3.5 py-2 text-[13px]">
                      {step}
                    </span>
                    {i < all.length - 1 && (
                      <ArrowDownRight size={15} className="text-muted-foreground" />
                    )}
                  </span>
                ),
              )}
            </div>
          </Reveal>

          <Reveal delay={140}>
            <p className="mono-label">How I think</p>
            <div className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
              {principles.map((item) => (
                <div key={item.n} className="bg-background p-5 transition-colors hover:bg-surface">
                  <span className="mono-label">{item.n}</span>
                  <p className="mt-2 font-display text-lg font-semibold tracking-tight">{item.t}</p>
                  <p className="mt-1.5 text-sm text-muted-foreground">{item.d}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p className="mono-label">Leadership</p>
            <div className="mt-4 space-y-2">
              {leadership.map((role) => (
                <div
                  key={role.org}
                  className="group flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-2xl border border-border bg-surface/40 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35"
                >
                  <span className="font-display text-lg font-semibold tracking-tight">
                    {role.role}
                  </span>
                  <span className="mono-label !text-primary">{role.org}</span>
                  <span className="w-full text-sm text-muted-foreground">{role.detail}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
