"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ElementType } from "react";
import {
  BookOpen,
  BriefcaseBusiness,
  ContactRound,
  FolderGit2,
  Home,
  Layers3,
  Rocket,
  UserRound,
} from "lucide-react";

const sections: Array<{
  id: string;
  label: string;
  href: string;
  icon: ElementType<{ className?: string }>;
}> = [
  { id: "home", label: "Home", href: "/", icon: Home },
  { id: "about", label: "About", href: "/about", icon: UserRound },
  { id: "projects", label: "Projects", href: "/projects", icon: FolderGit2 },
  { id: "skills", label: "Stack", href: "/stack", icon: Layers3 },
  { id: "devops-journey", label: "Journey", href: "/#devops-journey", icon: Rocket },
  { id: "knowledge", label: "Knowledge", href: "/knowledge", icon: BookOpen },
  {
    id: "experience",
    label: "Experience",
    href: "/experience",
    icon: BriefcaseBusiness,
  },
  { id: "contact", label: "Contact", href: "/contact", icon: ContactRound },
];

const pathToSection: Record<string, string> = {
  "/": "home",
  "/about": "about",
  "/projects": "projects",
  "/skills": "skills",
  "/stack": "skills",
  "/knowledge": "knowledge",
  "/experience": "experience",
  "/contact": "contact",
};

export function SectionNavigator() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  const activeId =
    pathname === "/" ? activeSection : pathToSection[pathname] || "home";

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const observedSections = sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-18% 0px -56% 0px",
        threshold: [0.12, 0.28, 0.5],
      }
    );

    observedSections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <nav
      aria-label="Portfolio section navigator"
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <div className="rounded-full border bg-background/82 p-2 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
        <div className="mb-2 px-2 text-center text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground">
          Flow
        </div>
        <div className="relative grid gap-1">
          <span className="pointer-events-none absolute left-5 top-4 h-[calc(100%-2rem)] w-px bg-border" />
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeId === section.id;
            const href =
              pathname === "/" ? `#${section.id}` : section.href;

            return (
              <Link
                key={section.id}
                href={href}
                className={`focus-ring group relative z-10 flex h-10 items-center gap-2 overflow-hidden rounded-full px-2 transition-all duration-300 hover:w-36 hover:bg-accent hover:text-primary ${
                  isActive
                    ? "w-36 bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "w-10 text-muted-foreground"
                }`}
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                    isActive ? "bg-primary-foreground/18" : "bg-background"
                  } ${isActive ? "animate-section-pulse" : ""}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <span className="whitespace-nowrap text-xs font-bold">
                  {section.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
