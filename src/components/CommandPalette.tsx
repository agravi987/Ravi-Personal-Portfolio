"use client";

import { useEffect, useMemo, useState, type ElementType } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  BriefcaseBusiness,
  ContactRound,
  FileDown,
  FolderGit2,
  GraduationCap,
  Home,
  Layers3,
  Linkedin,
  Mail,
  Rocket,
  Search,
  Sparkles,
  UserRound,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import type {
  PortfolioExperience,
  PortfolioDevOpsMilestone,
  PortfolioKnowledge,
  PortfolioProfile,
  PortfolioProject,
  PortfolioSkill,
} from "@/lib/portfolio-data";
import { portfolioItemId } from "@/lib/portfolio-links";
import { TechIcon } from "@/components/TechIcon";

type CommandPaletteData = {
  projects?: PortfolioProject[];
  skills?: PortfolioSkill[];
  knowledge?: PortfolioKnowledge[];
  devOpsJourney?: PortfolioDevOpsMilestone[];
  experience?: PortfolioExperience[];
};

type IconComponent = ElementType<{ className?: string }>;

type CommandAction = {
  id: string;
  group:
    | "Navigate"
    | "Projects"
    | "Stack"
    | "Journey"
    | "Knowledge"
    | "Experience"
    | "Connect";
  label: string;
  description: string;
  href: string;
  icon: IconComponent;
  external?: boolean;
  tech?: string;
  keywords?: string[];
};

const primaryActions: CommandAction[] = [
  {
    id: "home",
    group: "Navigate",
    label: "Home",
    description: "Return to the opening portfolio experience.",
    href: "/",
    icon: Home,
    keywords: ["intro", "hero", "ravi"],
  },
  {
    id: "about",
    group: "Navigate",
    label: "About",
    description: "Read Ravi's full-stack and cloud-minded profile.",
    href: "/about",
    icon: UserRound,
    keywords: ["bio", "profile", "developer"],
  },
  {
    id: "projects",
    group: "Navigate",
    label: "Projects",
    description: "Open the featured work and case studies.",
    href: "/projects",
    icon: FolderGit2,
    keywords: ["work", "case study", "portfolio"],
  },
  {
    id: "stack",
    group: "Navigate",
    label: "Stack",
    description: "Explore tools, languages, and delivery skills.",
    href: "/stack",
    icon: Layers3,
    keywords: ["skills", "technologies", "tools"],
  },
  {
    id: "devops-journey",
    group: "Navigate",
    label: "DevOps Journey",
    description: "Open the roadmap of DevOps learning milestones.",
    href: "/#devops-journey",
    icon: Rocket,
    keywords: ["roadmap", "devops", "milestones", "planets"],
  },
  {
    id: "knowledge",
    group: "Navigate",
    label: "Knowledge",
    description: "Browse notes, proof links, and learning areas.",
    href: "/knowledge",
    icon: BookOpen,
    keywords: ["notes", "docs", "learning"],
  },
  {
    id: "experience",
    group: "Navigate",
    label: "Experience",
    description: "Review internships, education, and milestones.",
    href: "/experience",
    icon: BriefcaseBusiness,
    keywords: ["internship", "education", "timeline"],
  },
  {
    id: "contact",
    group: "Navigate",
    label: "Contact",
    description: "Start a conversation or send a project request.",
    href: "/contact",
    icon: ContactRound,
    keywords: ["hire", "email", "message"],
  },
];

export function CommandPalette({
  profile,
  data,
}: {
  profile?: PortfolioProfile;
  data?: CommandPaletteData;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const openMenu = () => setOpen(true);
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };

    window.addEventListener("portfolio-command-open", openMenu);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("portfolio-command-open", openMenu);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const actions = useMemo(() => {
    const projectActions: CommandAction[] = (data?.projects || [])
      .slice(0, 8)
      .map((project) => ({
      id: `project-${project._id}`,
      group: "Projects" as const,
      label: project.title,
      description:
        project.category || project.status || "Open this project case study.",
      href: `/projects#${portfolioItemId("project", project._id || project.title)}`,
      icon: FolderGit2,
      keywords: [
        project.description,
        project.category || "",
        project.status || "",
        ...project.technologies,
      ],
      }));

    const skillCategories = Array.from(
      new Set((data?.skills || []).map((skill) => skill.category))
    );
    const skillActions: CommandAction[] = skillCategories.map((category) => {
      const categorySkills = (data?.skills || []).filter(
        (skill) => skill.category === category
      );
      return {
        id: `skill-${category}`,
        group: "Stack" as const,
        label: category,
        description: categorySkills
          .slice(0, 4)
          .map((skill) => skill.name)
          .join(", "),
        href: `/stack#${portfolioItemId("skill", category)}`,
        icon: Layers3,
        tech: categorySkills[0]?.name,
        keywords: categorySkills.map((skill) => skill.name),
      };
    });

    const knowledgeActions: CommandAction[] = (data?.knowledge || [])
      .slice(0, 8)
      .map((item) => ({
      id: `knowledge-${item._id}`,
      group: "Knowledge" as const,
      label: item.title,
      description: item.category,
      href: `/knowledge#${portfolioItemId("knowledge", item._id || item.title)}`,
      icon: BookOpen,
      keywords: [item.summary, item.category, ...item.topics],
      }));

    const journeyActions: CommandAction[] = (data?.devOpsJourney || [])
      .slice(0, 10)
      .map((milestone) => ({
        id: `journey-${milestone._id}`,
        group: "Journey" as const,
        label: milestone.title,
        description: `${milestone.category} - ${milestone.status}`,
        href: `/#devops-journey`,
        icon: Rocket,
        tech: milestone.title,
        keywords: [
          milestone.summary,
          milestone.category,
          milestone.status,
          "devops",
          "roadmap",
        ],
      }));

    const experienceActions: CommandAction[] = (data?.experience || [])
      .slice(0, 6)
      .map((exp) => ({
        id: `experience-${exp._id}`,
        group: "Experience" as const,
        label: exp.role,
        description: `${exp.company} - ${exp.duration}`,
        href: `/experience#${portfolioItemId("experience", exp._id || exp.role)}`,
        icon:
          exp.type.toLowerCase() === "education"
            ? GraduationCap
            : BriefcaseBusiness,
        keywords: [exp.company, exp.duration, exp.type, exp.description || ""],
      }));

    const connectActions: CommandAction[] = [
      {
        id: "email",
        group: "Connect",
        label: "Email Ravi",
        description: profile?.email || "Open email composer.",
        href: `mailto:${profile?.email || "hello@ravi.dev"}`,
        icon: Mail,
        external: true,
        keywords: ["contact", "hire", "message"],
      },
      {
        id: "resume",
        group: "Connect",
        label: "Resume",
        description: "Open Ravi's resume in a new tab.",
        href: profile?.resumeUrl || "/resume.pdf",
        icon: FileDown,
        external: true,
        keywords: ["cv", "download", "profile"],
      },
      {
        id: "github-profile",
        group: "Connect",
        label: "GitHub",
        description: `github.com/${profile?.githubUsername || "agravi987"}`,
        href: `https://github.com/${profile?.githubUsername || "agravi987"}`,
        icon: SiGithub,
        external: true,
        keywords: ["code", "repo", "source"],
      },
      {
        id: "linkedin-profile",
        group: "Connect",
        label: "LinkedIn",
        description: `linkedin.com/in/${profile?.linkedinUsername || "ravi-agrahari"}`,
        href: `https://linkedin.com/in/${profile?.linkedinUsername || "ravi-agrahari"}`,
        icon: Linkedin,
        external: true,
        keywords: ["social", "career", "network"],
      },
    ];

    return [
      ...primaryActions,
      ...projectActions,
      ...skillActions,
      ...journeyActions,
      ...knowledgeActions,
      ...experienceActions,
      ...connectActions,
    ];
  }, [data, profile]);

  const runAction = (action: CommandAction) => {
    setOpen(false);

    if (action.href.startsWith("mailto:")) {
      window.location.assign(action.href);
      return;
    }

    if (action.external || /^https?:\/\//.test(action.href)) {
      window.open(action.href, "_blank", "noopener,noreferrer");
      return;
    }

    router.push(action.href);
  };

  const groups = ["Navigate", "Projects", "Stack", "Journey", "Knowledge", "Experience", "Connect"] as const;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.span
            key="command-glow"
            initial={{ opacity: 0.5, scale: 0.35 }}
            animate={{ opacity: 0, scale: 4.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="pointer-events-none fixed bottom-28 left-4 z-[69] h-12 w-12 rounded-full border border-primary/50 bg-primary/15 md:bottom-6"
          />
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="focus-ring fixed bottom-28 left-4 z-40 inline-flex items-center gap-2 rounded-full border bg-background/90 px-3 py-2 text-xs font-bold text-foreground shadow-xl shadow-slate-900/10 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary md:bottom-6 md:px-4"
        aria-label="Open command menu"
      >
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="hidden sm:inline">Command</span>
        <kbd className="hidden rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground md:inline">
          Ctrl K
        </kbd>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Portfolio command menu"
        loop
        overlayClassName="fixed inset-0 z-[70] bg-slate-950/45 backdrop-blur-sm"
        contentClassName="fixed left-1/2 top-20 z-[80] w-[calc(100vw-1.5rem)] max-w-2xl -translate-x-1/2 overflow-hidden rounded-lg border bg-background shadow-2xl shadow-slate-950/20 md:top-24"
        className="bg-background"
      >
        <div className="flex items-center gap-3 border-b px-4 py-3">
          <Search className="h-5 w-5 text-primary" />
          <Command.Input
            placeholder="Search pages, projects, stack, notes..."
            className="h-11 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden rounded-full border bg-muted px-2 py-1 text-[11px] font-bold text-muted-foreground sm:inline">
            Esc
          </kbd>
        </div>

        <Command.List className="max-h-[min(28rem,calc(100dvh-9rem))] overflow-y-auto p-2">
          <Command.Empty className="px-4 py-10 text-center text-sm text-muted-foreground">
            No result found. Try project, stack, contact, or resume.
          </Command.Empty>

          {groups.map((group) => {
            const groupActions = actions.filter((action) => action.group === group);
            if (!groupActions.length) return null;

            return (
              <Command.Group
                key={group}
                heading={group}
                className="pb-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-black [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.18em] [&_[cmdk-group-heading]]:text-muted-foreground"
              >
                {groupActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Command.Item
                      key={action.id}
                      value={`${action.group} ${action.label}`}
                      keywords={action.keywords}
                      onSelect={() => runAction(action)}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3 text-sm outline-none transition data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border bg-background text-primary">
                        {action.tech ? (
                          <TechIcon name={action.tech} className="h-4 w-4" />
                        ) : (
                          <Icon className="h-4 w-4" />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-bold">
                          {action.label}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {action.description}
                        </span>
                      </span>
                    </Command.Item>
                  );
                })}
              </Command.Group>
            );
          })}
        </Command.List>
      </Command.Dialog>
    </>
  );
}
