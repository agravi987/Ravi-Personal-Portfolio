"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Award,
  Briefcase,
  FileText,
  FolderKanban,
  Mail,
  Rocket,
  UserRound,
  Wrench,
} from "lucide-react";

type StatCount = {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  count: string;
  helper: string;
};

const initialStats: StatCount[] = [
  {
    label: "Profile",
    href: "/admin/profile",
    icon: UserRound,
    count: "Ready",
    helper: "Public identity settings",
  },
  {
    label: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
    count: "--",
    helper: "Case studies and delivery links",
  },
  {
    label: "Skills",
    href: "/admin/skills",
    icon: Wrench,
    count: "--",
    helper: "Tools, notes, docs, proof",
  },
  {
    label: "Knowledge",
    href: "/admin/knowledge",
    icon: FileText,
    count: "--",
    helper: "Topics and documentation refs",
  },
  {
    label: "DevOps Journey",
    href: "/admin/devops-journey",
    icon: Rocket,
    count: "--",
    helper: "Roadmap planets and milestones",
  },
  {
    label: "Experience",
    href: "/admin/experience",
    icon: Briefcase,
    count: "--",
    helper: "Timeline and roles",
  },
  {
    label: "Achievements",
    href: "/admin/achievements",
    icon: Award,
    count: "--",
    helper: "Wins and certifications",
  },
  {
    label: "Contacts",
    href: "/admin/contacts",
    icon: Mail,
    count: "--",
    helper: "Inbox submissions",
  },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState(initialStats);

  useEffect(() => {
    let ignore = false;

    const loadCounts = async () => {
      try {
        const responses = await Promise.all([
          fetch("/api/projects"),
          fetch("/api/skills"),
          fetch("/api/knowledge"),
          fetch("/api/devops-journey"),
          fetch("/api/experience"),
          fetch("/api/achievements"),
          fetch("/api/contacts"),
        ]);

        const [
          projects,
          skills,
          knowledge,
          devOpsJourney,
          experience,
          achievements,
          contacts,
        ] =
          await Promise.all(
            responses.map(async (response) => {
              if (!response.ok) return [];
              return response.json();
            })
          );

        if (ignore) return;

        setStats((current) =>
          current.map((stat) => {
            switch (stat.label) {
              case "Projects":
                return { ...stat, count: String(projects.length) };
              case "Skills":
                return { ...stat, count: String(skills.length) };
              case "Knowledge":
                return { ...stat, count: String(knowledge.length) };
              case "DevOps Journey":
                return { ...stat, count: String(devOpsJourney.length) };
              case "Experience":
                return { ...stat, count: String(experience.length) };
              case "Achievements":
                return { ...stat, count: String(achievements.length) };
              case "Contacts":
                return { ...stat, count: String(contacts.length) };
              default:
                return stat;
            }
          })
        );
      } catch (error) {
        console.error("Failed to load dashboard counts", error);
      }
    };

    loadCounts();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Welcome back, Admin</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This dashboard now tracks the portfolio content system, not just the
          visual shell. Use it to keep your cloud and DevOps story current.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="group rounded-xl border bg-card p-6 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-full bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon size={24} />
                </div>
                <ArrowRight
                  size={20}
                  className="text-muted-foreground transition-colors group-hover:text-primary"
                />
              </div>
              <div className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {stat.label}
              </div>
              <div className="mt-2 text-3xl font-bold">{stat.count}</div>
              <p className="mt-2 text-sm text-muted-foreground">{stat.helper}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
