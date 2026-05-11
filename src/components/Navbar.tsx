"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X } from "lucide-react";
import type { PortfolioProfile } from "@/lib/portfolio-data";

const navLinks = [
  { name: "About", href: "/about", sectionId: "about" },
  { name: "Projects", href: "/projects", sectionId: "projects" },
  { name: "GitHub", href: "/projects#github", sectionId: "projects" },
  { name: "Stack", href: "/stack", sectionId: "skills" },
  { name: "Knowledge", href: "/knowledge", sectionId: "knowledge" },
  { name: "Experience", href: "/experience", sectionId: "experience" },
  { name: "Contact", href: "/contact", sectionId: "contact" },
];

export function Navbar({ profile }: { profile?: PortfolioProfile }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

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
    <nav className="fixed top-0 z-50 w-full border-b bg-background/85 backdrop-blur-xl">
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 via-teal-400 to-sky-500 transition-[width] duration-150"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="group inline-flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-black text-primary-foreground shadow-lg shadow-primary/20 transition group-hover:-translate-y-0.5 group-hover:rotate-3">
            RA
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold">
              {profile?.fullName || "Ravi Agrahari"}
            </span>
            <span className="block text-xs font-medium text-muted-foreground">
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
                className={`rounded-full px-3 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-accent hover:text-primary ${
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
            className="ml-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
          >
            Hire Ravi
          </Link>
          <ThemeToggle />
        </div>

        <button
          className="rounded-lg p-2 transition hover:bg-accent md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="border-b bg-background md:hidden">
          <div className="flex flex-col gap-2 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`rounded-lg px-3 py-3 text-sm font-semibold transition hover:bg-accent hover:text-primary ${
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
            <div className="mt-2 flex items-center justify-between border-t pt-4">
              <Link
                href="/contact"
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                onClick={() => setIsOpen(false)}
              >
                Hire Ravi
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
