import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    node.style.setProperty("--mx", `${px * 100}%`);
    node.style.setProperty("--my", `${py * 100}%`);
    node.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 4}deg) rotateY(${(px - 0.5) * 4}deg) translateY(-4px)`;
  };

  const reset = () => {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "";
  };

  const Wrapper = project.link ? "a" : "div";

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="group relative h-full rounded-3xl border border-border bg-surface/50 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:border-primary/35 hover:shadow-[0_24px_60px_-40px_var(--lime)] will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--lime) 10%, transparent), transparent 70%)",
        }}
      />
      <Wrapper
        {...(project.link
          ? { href: project.link, target: "_blank", rel: "noreferrer", "data-cursor": "OPEN" }
          : { "data-cursor": "VIEW" })}
        className="relative flex h-full flex-col p-7"
      >
        <div className="flex items-start justify-between">
          <span className="mono-label transition-transform duration-300 group-hover:-translate-y-0.5">
            {project.number}
          </span>
          <ArrowUpRight
            size={20}
            className="text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-hover:text-primary"
          />
        </div>

        <h3 className="mt-6 font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
          {project.name}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        <dl className="mt-7 space-y-4 border-t border-border pt-6 text-sm">
          {[
            ["Problem", project.problem],
            ["What I built", project.built],
            ["Result", project.result],
          ].map(([label, body]) => (
            <div key={label}>
              <dt className="mono-label">{label}</dt>
              <dd className="mt-1.5 leading-relaxed text-muted-foreground">{body}</dd>
            </div>
          ))}
        </dl>
      </Wrapper>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        eyebrow="03 / Projects"
        title={
          <>
            Small tools for
            <br />
            <span className="text-muted-foreground">real patterns.</span>
          </>
        }
        aside="Built to solve a specific friction, documented so the result is verifiable."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={i * 90} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
