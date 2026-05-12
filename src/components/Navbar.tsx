"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import {
  FolderGit2,
  Home,
  Layers3,
  Mail,
  Menu,
  Rocket,
  Search,
  UserRound,
  X,
} from "lucide-react";
import type { PortfolioProfile } from "@/lib/portfolio-data";

const navLinks = [
  { name: "About", href: "/about", sectionId: "about" },
  { name: "Projects", href: "/projects", sectionId: "projects" },
  { name: "GitHub", href: "/projects#github", sectionId: "projects" },
  { name: "Stack", href: "/stack", sectionId: "skills" },
  { name: "Journey", href: "/#devops-journey", sectionId: "devops-journey" },
  { name: "Knowledge", href: "/knowledge", sectionId: "knowledge" },
  { name: "Experience", href: "/experience", sectionId: "experience" },
  { name: "Contact", href: "/contact", sectionId: "contact" },
];

const mobileDockLinks = [
  { name: "Home", href: "/", icon: Home, sectionId: "home" },
  { name: "About", href: "/about", icon: UserRound, sectionId: "about" },
  { name: "Work", href: "/projects", icon: FolderGit2, sectionId: "projects" },
  { name: "Stack", href: "/stack", icon: Layers3, sectionId: "skills" },
  { name: "Journey", href: "/#devops-journey", icon: Rocket, sectionId: "devops-journey" },
  { name: "Contact", href: "/contact", icon: Mail, sectionId: "contact" },
];

export function Navbar({ profile }: { profile?: PortfolioProfile }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  const openCommandMenu = () => {
    window.dispatchEvent(new Event("portfolio-command-open"));
  };

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = ["home", ...navLinks.map((link) => link.sectionId)];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
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
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.15, 0.35, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <>
    <nav className="fixed top-0 z-50 w-full border-b bg-background/85 backdrop-blur-xl">
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 via-teal-400 to-sky-500 transition-[width] duration-150"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="focus-ring group inline-flex items-center gap-3 rounded-lg">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-black text-primary-foreground shadow-lg shadow-primary/20 transition group-hover:-translate-y-0.5 group-hover:rotate-3">
            RA
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block text-sm font-bold">
              {profile?.fullName || "Ravi Agrahari"}
            </span>
            <span className="block max-w-[13rem] truncate text-xs font-medium text-muted-foreground sm:max-w-none">
              {profile?.role || "Full-stack cloud developer"}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (pathname === "/" && activeSection === link.sectionId);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`focus-ring rounded-full px-3 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-accent hover:text-primary ${
                  isActive
                    ? "bg-primary/10 text-primary shadow-sm shadow-primary/10"
                    : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="focus-ring ml-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
          >
            Hire Ravi
          </Link>
          <button
            type="button"
            onClick={openCommandMenu}
            className="focus-ring hidden items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary lg:inline-flex"
            aria-label="Open command menu"
          >
            <Search className="h-4 w-4" />
            <span>Explore</span>
            <kbd className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-bold">
              Ctrl K
            </kbd>
          </button>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            className="focus-ring rounded-lg p-2 transition hover:bg-accent"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
            aria-controls="mobile-nav"
            aria-expanded={isOpen}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div id="mobile-nav" role="dialog" aria-modal="true" aria-label="mobile navigation" className="border-b bg-background/95 shadow-xl shadow-slate-900/10 backdrop-blur-xl md:hidden">
          <div className="grid max-h-[calc(100dvh-4rem)] gap-2 overflow-y-auto p-4 pb-24">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`focus-ring rounded-lg px-3 py-3 text-sm font-semibold transition hover:bg-accent hover:text-primary ${
                  pathname === link.href ||
                  (pathname === "/" && activeSection === link.sectionId)
                    ? "bg-primary/10 text-primary"
                    : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                openCommandMenu();
              }}
              className="focus-ring flex items-center justify-between rounded-lg border px-3 py-3 text-left text-sm font-semibold transition hover:border-primary/40 hover:text-primary"
            >
              <span className="inline-flex items-center gap-2">
                <Search className="h-4 w-4" />
                Quick search
              </span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                Ctrl K
              </span>
            </button>
            <div className="mt-2 flex items-center justify-between border-t pt-4">
              <Link
                href="/contact"
                className="focus-ring rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                onClick={() => setIsOpen(false)}
              >
                Hire Ravi
              </Link>
              <Link
                href={profile?.resumeUrl || "/resume.pdf"}
                className="focus-ring rounded-full border px-4 py-2 text-sm font-semibold text-muted-foreground"
                onClick={() => setIsOpen(false)}
              >
                Resume
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
    <div className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 md:hidden">
      <div className="mobile-safe-bottom mx-auto grid max-w-md grid-cols-6 rounded-2xl border border-white/60 bg-background/90 p-1.5 shadow-2xl shadow-slate-900/20 backdrop-blur-xl dark:border-white/10">
        {mobileDockLinks.map((link) => {
          const Icon = link.icon;
          const isActive =
            pathname === link.href ||
            (pathname === "/" && activeSection === link.sectionId);

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`focus-ring flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-bold transition ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:bg-accent hover:text-primary"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-4 w-4" />
              {link.name}
            </Link>
          );
        })}
      </div>
    </div>
    </>
  );
}
