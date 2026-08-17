import { ArrowUpRight, Github, Mail, Sparkles } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { Reveal } from "./Reveal";

export function ContactSection() {
  return (
    <footer id="contact" className="mx-auto max-w-6xl px-5 pb-14 pt-24 sm:px-8 sm:pt-32">
      <Reveal>
        <div className="rounded-[2rem] border border-border bg-surface/40 p-8 sm:p-12">
          <p className="mono-label">08 / Contact</p>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,6.5vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
            Got a messy problem?
            <br />
            <span className="text-muted-foreground">Let&apos;s figure it out.</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Open to conversations about Product Management, Product Operations and the systems
            around them.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Magnetic>
              <a
                href="mailto:hello@sahilmangal.com"
                data-cursor="OPEN"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-shadow duration-300 hover:shadow-[0_0_36px_-6px_var(--lime)]"
              >
                <Mail size={16} /> Get in touch
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#ai"
                data-cursor="ASK"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Sparkles size={16} /> Ask Sahil AI
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="https://github.com/sahilmangal2004"
                target="_blank"
                rel="noreferrer"
                data-cursor="OPEN"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Github size={16} /> GitHub <ArrowUpRight size={14} />
              </a>
            </Magnetic>
          </div>
        </div>
      </Reveal>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-[13px] text-muted-foreground">
        <span>© 2026 Sahil Mangal</span>
        <span>Built to be explored, not just skimmed.</span>
        <button
          data-cursor="hover"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="link-underline transition-colors hover:text-foreground"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
