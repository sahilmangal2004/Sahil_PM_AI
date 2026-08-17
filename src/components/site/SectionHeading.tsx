import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  aside?: string;
}) {
  return (
    <Reveal>
      <div className="grid gap-6 md:grid-cols-[1.3fr_0.7fr] md:items-end">
        <div>
          <p className="mono-label">{eyebrow}</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,5.4vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
            {title}
          </h2>
        </div>
        {aside && <p className="text-sm leading-relaxed text-muted-foreground">{aside}</p>}
      </div>
    </Reveal>
  );
}
