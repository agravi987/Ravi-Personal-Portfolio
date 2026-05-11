"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  Archive,
  ExternalLink,
  GitFork,
  Github,
  Loader2,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
} from "lucide-react";

interface GitHubProject {
  id: number;
  name: string;
  fullName: string;
  url: string;
  description: string;
  homepage?: string;
  language: string;
  topics: string[];
  stars: number;
  forks: number;
  updatedAt: string;
  pushedAt: string;
  archived: boolean;
  visibility: string;
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

export function GitHubProjectsExplorer() {
  const [projects, setProjects] = useState<GitHubProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("All");
  const [topic, setTopic] = useState("All");
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    let mounted = true;

    async function fetchProjects() {
      try {
        const response = await fetch("/api/github/projects");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to load GitHub projects");
        }

        if (mounted) {
          setProjects(data);
        }
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof Error ? err.message : "Failed to load GitHub projects"
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchProjects();

    return () => {
      mounted = false;
    };
  }, []);

  const languages = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((item) => item.language)))],
    [projects]
  );

  const topics = useMemo(
    () => [
      "All",
      ...Array.from(new Set(projects.flatMap((item) => item.topics))).sort(),
    ],
    [projects]
  );

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects.filter((project) => {
      const searchable = [
        project.name,
        project.description,
        project.language,
        ...project.topics,
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery =
        !normalizedQuery || searchable.includes(normalizedQuery);
      const matchesLanguage =
        language === "All" || project.language === language;
      const matchesTopic = topic === "All" || project.topics.includes(topic);
      const matchesStatus =
        status === "All" ||
        (status === "Active" && !project.archived) ||
        (status === "Archived" && project.archived);

      return matchesQuery && matchesLanguage && matchesTopic && matchesStatus;
    });
  }, [language, projects, query, status, topic]);

  return (
    <section id="github" className="relative overflow-hidden bg-background py-24">
      <div className="absolute inset-0 grid-pattern opacity-25" />
      <div className="container relative mx-auto px-4">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">
              <Github className="h-4 w-4" />
              GitHub Explorer
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-4xl">
              Public repositories, searchable like a project shelf.
            </h2>
          </div>
          <p className="max-w-xl leading-7 text-muted-foreground">
            Live data from github.com/agravi987, organized by language, topic,
            activity, and project text without exposing any access token.
          </p>
        </div>

        <div className="mb-8 grid gap-3 rounded-xl border bg-muted/30 p-4 md:grid-cols-[1.4fr_0.8fr_0.8fr_0.7fr]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-11 w-full rounded-lg border bg-background pl-10 pr-3 text-sm outline-none transition focus:border-primary/60 focus:ring-4 focus:ring-primary/10"
              placeholder="Search repositories, tech, or topics"
            />
          </label>

          <FilterSelect
            icon={<SlidersHorizontal className="h-4 w-4" />}
            label="Language"
            value={language}
            onChange={setLanguage}
            options={languages}
          />
          <FilterSelect
            icon={<Sparkles className="h-4 w-4" />}
            label="Topic"
            value={topic}
            onChange={setTopic}
            options={topics}
          />
          <FilterSelect
            icon={<Archive className="h-4 w-4" />}
            label="Status"
            value={status}
            onChange={setStatus}
            options={["All", "Active", "Archived"]}
          />
        </div>

        {loading && (
          <div className="flex items-center justify-center gap-3 rounded-xl border bg-muted/30 p-10 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading public repositories...
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-5 text-sm font-semibold text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mb-4 text-sm font-semibold text-muted-foreground">
              Showing {filteredProjects.length} of {projects.length} public
              repositories
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className="flex min-h-[270px] flex-col rounded-xl border bg-background p-5 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="break-words text-lg font-bold tracking-tight">
                        {project.name}
                      </h3>
                      <p className="mt-1 text-xs font-semibold text-muted-foreground">
                        Updated {formatDate(project.updatedAt)}
                      </p>
                    </div>
                    <span className="rounded-full border bg-muted px-2.5 py-1 text-xs font-bold">
                      {project.language}
                    </span>
                  </div>

                  <p className="mt-4 line-clamp-4 flex-1 text-sm leading-6 text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.topics.slice(0, 5).map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setTopic(item)}
                        className="rounded-full border bg-muted/50 px-2.5 py-1 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                      >
                        {item}
                      </button>
                    ))}
                    {project.archived && (
                      <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
                        Archived
                      </span>
                    )}
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t pt-4">
                    <div className="flex items-center gap-4 text-sm font-semibold text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        {project.stars}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <GitFork className="h-4 w-4" />
                        {project.forks}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {project.homepage && (
                        <a
                          href={project.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border p-2 transition hover:border-primary/40 hover:text-primary"
                          aria-label={`Open ${project.name} live site`}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-primary p-2 text-primary-foreground transition hover:bg-primary/90"
                        aria-label={`Open ${project.name} on GitHub`}
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function FilterSelect({
  icon,
  label,
  value,
  onChange,
  options,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="relative block">
      <span className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center gap-2 text-muted-foreground">
        {icon}
        <span className="sr-only">{label}</span>
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-lg border bg-background pl-10 pr-3 text-sm font-semibold outline-none transition focus:border-primary/60 focus:ring-4 focus:ring-primary/10"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
