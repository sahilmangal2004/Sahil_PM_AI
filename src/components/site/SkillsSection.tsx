import { skillGroups } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function SkillsSection() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        eyebrow="04 / Skills"
        title={
          <>
            The toolkit,
            <br />
            <span className="text-muted-foreground">in context.</span>
          </>
        }
        aside="Hover a skill to see how it actually gets used."
      />

      <div className="mt-14 space-y-8">
        {skillGroups.map((group, gi) => (
          <Reveal key={group.category} delay={gi * 70}>
            <div className="grid gap-4 border-t border-border pt-6 md:grid-cols-[160px_1fr]">
              <p className="mono-label pt-1">{group.category}</p>
              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill.name}
                    data-cursor="hover"
                    className="group inline-flex items-center gap-0 rounded-full border border-border bg-surface/50 px-4 py-2.5 text-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary/45 hover:bg-surface"
                  >
                    {skill.name}
                    <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-400 ease-out group-hover:grid-cols-[1fr]">
                      <span className="overflow-hidden whitespace-nowrap">
                        <span className="mono-label ml-3 !text-primary">{skill.note}</span>
                      </span>
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
