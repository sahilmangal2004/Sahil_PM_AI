import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";


const links = [
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#ai", label: "AI" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-[80] px-3 sm:px-6">
      <nav
        className={cn(
          "mx-auto flex max-w-5xl items-center justify-between rounded-full border border-border bg-background/60 backdrop-blur-xl transition-all duration-500 ease-out",
          scrolled ? "px-3 py-1.5 sm:px-4" : "px-4 py-2.5 sm:px-6",
        )}
      >
        <a
          href="#top"
          data-cursor="hover"
          className="flex items-center gap-2.5 font-display font-semibold tracking-tight"
        >
          <span
            className={cn(
              "grid place-items-center rounded-full bg-primary font-mono text-[10px] text-primary-foreground transition-all duration-500",
              scrolled ? "size-6" : "size-7",
            )}
          >
            SM
          </span>
          <span className={cn("transition-all duration-500", scrolled ? "text-sm" : "text-[15px]")}>
            Sahil
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-cursor="hover"
              className="link-underline text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <a
            href="#ai"
            data-cursor="ASK"
            className="inline-flex rounded-full border border-primary/40 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Sahil AI
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-5xl rounded-3xl border border-border bg-background/90 p-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col">
            {[...links, { href: "#ai", label: "Sahil AI" }].map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
