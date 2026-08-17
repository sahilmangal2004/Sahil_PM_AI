import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const scrollTo = (next: number) => {
    const clamped = Math.max(0, Math.min(testimonials.length - 1, next));
    setIndex(clamped);
    const track = trackRef.current;
    const card = track?.children[clamped] as HTMLElement | undefined;
    if (track && card) {
      track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
    }
  };

  return (
    <section id="testimonials" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="05 / Testimonials"
          title={
            <>
              People who saw
              <br />
              <span className="text-muted-foreground">the work up close.</span>
            </>
          }
          aside="Four people who worked with Sahil directly, in their own words."
        />

        <div className="mt-10 flex items-center justify-between">
          <span className="mono-label">
            {String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
          <div className="flex gap-2">
            <button
              aria-label="Previous testimonial"
              data-cursor="hover"
              onClick={() => scrollTo(index - 1)}
              className="grid size-10 place-items-center rounded-full border border-border transition-colors hover:border-primary/50 hover:text-primary"
            >
              <ArrowLeft size={17} />
            </button>
            <button
              aria-label="Next testimonial"
              data-cursor="hover"
              onClick={() => scrollTo(index + 1)}
              className="grid size-10 place-items-center rounded-full border border-border transition-colors hover:border-primary/50 hover:text-primary"
            >
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 [scrollbar-width:none] sm:px-8 [&::-webkit-scrollbar]:hidden"
      >
        <div className="hidden shrink-0 xl:block xl:w-[max(0px,calc((100vw-72rem)/2))]" />
        {testimonials.map((person, i) => (
          <Reveal
            key={person.name}
            delay={i * 80}
            className="w-[86vw] shrink-0 snap-start sm:w-[420px]"
          >
            <figure className="flex h-full flex-col justify-between rounded-3xl border border-border bg-surface/50 p-7 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/35 hover:bg-surface">
              <Quote size={22} className="text-primary/70" />
              <blockquote className="mt-5 text-[15px] leading-relaxed text-foreground/90">
                {person.quote}
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3 border-t border-border pt-5">
                <img
                  src={person.image}
                  alt={person.name}
                  loading="lazy"
                  className="size-11 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium">{person.name}</p>
                  <p className="mono-label">
                    {person.role}, {person.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
