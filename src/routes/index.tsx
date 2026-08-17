import { createFileRoute } from "@tanstack/react-router";
import { Cursor } from "@/components/site/Cursor";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { ExperienceSection } from "@/components/site/ExperienceSection";
import { ImpactSection } from "@/components/site/ImpactSection";
import { ProjectsSection } from "@/components/site/ProjectsSection";
import { SkillsSection } from "@/components/site/SkillsSection";
import { TestimonialsSection } from "@/components/site/TestimonialsSection";
import { AiSection } from "@/components/site/AiSection";
import { AboutSection } from "@/components/site/AboutSection";
import { ContactSection } from "@/components/site/ContactSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sahil Mangal — Product × Data × AI" },
      {
        name: "description",
        content:
          "Product-minded builder working across product operations, data, automation and AI. Case studies from GoEddie.ai, QuikyGo and Forethought India.",
      },
      { property: "og:title", content: "Sahil Mangal — Product × Data × AI" },
      {
        property: "og:description",
        content:
          "Interactive portfolio: experience, impact metrics, projects, testimonials and Sahil AI, a general-purpose assistant.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <ScrollProgress />
      <Cursor />

      {/* Background: soft grid + one slow drifting mesh */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in oklab, var(--foreground) 4%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--foreground) 4%, transparent) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse at 50% 0%, black 20%, transparent 78%)",
          }}
        />
        <div
          className="absolute left-1/2 top-[-18%] h-[70vh] w-[80vw] -translate-x-1/2 rounded-full blur-[110px]"
          style={{
            background:
              "radial-gradient(circle at 40% 40%, color-mix(in oklab, var(--lime) 18%, transparent), transparent 65%)",
            animation: "mesh-drift 26s ease-in-out infinite",
          }}
        />
      </div>

      <Nav />
      <main>
        <Hero />
        <ExperienceSection />
        <ImpactSection />
        <ProjectsSection />
        <SkillsSection />
        <TestimonialsSection />
        <AiSection />
        <AboutSection />
        <ContactSection />
      </main>
    </div>
  );
}
