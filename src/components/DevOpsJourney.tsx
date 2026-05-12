"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, FileText, Rocket } from "lucide-react";
import type { PortfolioDevOpsMilestone } from "@/lib/portfolio-data";
import { DetailSheet } from "@/components/DetailSheet";
import { TechIcon } from "@/components/TechIcon";

interface DevOpsJourneyProps {
  milestones: PortfolioDevOpsMilestone[];
}

const colorStyles: Record<string, string> = {
  amber: "from-amber-300 via-orange-400 to-rose-500 shadow-amber-500/25",
  blue: "from-blue-300 via-sky-500 to-indigo-600 shadow-blue-500/25",
  cyan: "from-cyan-200 via-sky-400 to-blue-600 shadow-cyan-500/25",
  emerald: "from-emerald-200 via-teal-400 to-cyan-600 shadow-emerald-500/25",
  purple: "from-fuchsia-300 via-violet-500 to-indigo-700 shadow-violet-500/25",
  rose: "from-rose-200 via-pink-500 to-red-600 shadow-rose-500/25",
  sky: "from-sky-200 via-cyan-400 to-blue-600 shadow-sky-500/25",
  slate: "from-slate-200 via-slate-500 to-slate-800 shadow-slate-500/25",
  violet: "from-violet-200 via-indigo-500 to-sky-600 shadow-indigo-500/25",
};

const statusStyles: Record<PortfolioDevOpsMilestone["status"], string> = {
  Planned: "border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200",
  Learning: "border-sky-300 bg-sky-50 text-sky-800 dark:border-sky-400/30 dark:bg-sky-400/10 dark:text-sky-100",
  Practicing: "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-100",
  Confident: "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-100",
};

const getCurvePoint = (index: number, total: number) => {
  const ratio = total <= 1 ? 0 : index / (total - 1);
  return {
    x: 7 + ratio * 86,
    y: 48 + Math.sin(ratio * Math.PI * 5.2) * 23,
  };
};

export function DevOpsJourney({ milestones }: DevOpsJourneyProps) {
  const [selectedMilestone, setSelectedMilestone] =
    useState<PortfolioDevOpsMilestone | null>(null);
  const orderedMilestones = useMemo(
    () => [...milestones].sort((a, b) => a.order - b.order),
    [milestones]
  );

  if (!orderedMilestones.length) return null;

  const currentFocus = orderedMilestones.filter(
    (milestone) =>
      milestone.featured ||
      milestone.status === "Learning" ||
      milestone.status === "Practicing"
  ).length;

  return (
    <section
      id="devops-journey"
      className="relative overflow-hidden bg-slate-950 py-24 text-white"
    >
      <div className="space-dust absolute inset-0 opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(56,189,248,0.22),transparent_28%),radial-gradient(circle_at_78%_78%,rgba(16,185,129,0.14),transparent_30%)]" />
      <div className="container relative mx-auto px-4">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_0.78fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-cyan-200">
              <Rocket className="h-4 w-4" />
              DevOps Journey
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-4xl">
              A learning roadmap shaped like a mission path.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-300">
              Each planet is a milestone in the DevOps path, from scripting and
              networking foundations to containers, CI/CD, orchestration, and
              operations.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-lg border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
            <div>
              <div className="text-3xl font-bold">{orderedMilestones.length}</div>
              <p className="mt-1 text-sm text-slate-300">roadmap planets</p>
            </div>
            <div>
              <div className="text-3xl font-bold">{currentFocus}</div>
              <p className="mt-1 text-sm text-slate-300">active focus areas</p>
            </div>
          </div>
        </div>

        <div className="relative hidden min-h-[34rem] md:block">
          <svg
            viewBox="0 0 100 88"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M 6 18 C 18 2, 21 70, 33 56 S 42 5, 53 25 S 59 83, 72 62 S 83 23, 94 73"
              fill="none"
              stroke="rgba(125, 211, 252, 0.42)"
              strokeWidth="0.8"
              strokeDasharray="1.8 1.4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-120px" }}
            />
          </svg>

          {orderedMilestones.map((milestone, index) => {
            const point = getCurvePoint(index, orderedMilestones.length);
            const colorClass =
              colorStyles[milestone.color || ""] || colorStyles.cyan;

            return (
              <motion.button
                key={milestone._id}
                type="button"
                initial={{ opacity: 0, scale: 0.88, y: 18 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -10, scale: 1.03 }}
                onClick={() => setSelectedMilestone(milestone)}
                className="focus-ring group absolute text-left"
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                aria-label={`View ${milestone.title} milestone`}
              >
                <span
                  className={`grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br ${colorClass} shadow-2xl transition group-hover:shadow-cyan-300/30`}
                >
                  <span className="grid h-16 w-16 place-items-center rounded-full border border-white/35 bg-white/15 text-white backdrop-blur">
                    <TechIcon name={milestone.title} className="h-8 w-8" />
                  </span>
                </span>
                <span className="mt-3 block w-40 rounded-lg border border-white/10 bg-slate-950/78 p-3 shadow-xl shadow-slate-950/25 backdrop-blur">
                  <span className="block text-sm font-bold">
                    {milestone.order}. {milestone.title}
                  </span>
                  <span className="mt-1 block text-xs text-slate-300">
                    {milestone.category}
                  </span>
                </span>
              </motion.button>
            );
          })}
        </div>

        <div className="grid gap-4 md:hidden">
          {orderedMilestones.map((milestone, index) => (
            <JourneyListItem
              key={milestone._id}
              milestone={milestone}
              index={index}
              isLast={index === orderedMilestones.length - 1}
              onSelect={() => setSelectedMilestone(milestone)}
            />
          ))}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {["Planned", "Learning", "Practicing", "Confident"].map((status) => (
            <div
              key={status}
              className={`rounded-lg border px-4 py-3 text-sm font-semibold ${statusStyles[status as PortfolioDevOpsMilestone["status"]]}`}
            >
              {status}:{" "}
              {
                orderedMilestones.filter(
                  (milestone) => milestone.status === status
                ).length
              }
            </div>
          ))}
        </div>
      </div>

      {selectedMilestone && (
        <DetailSheet
          title={selectedMilestone.title}
          eyebrow={selectedMilestone.category}
          onClose={() => setSelectedMilestone(null)}
        >
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-primary/10 text-primary">
              <TechIcon name={selectedMilestone.title} className="h-6 w-6" />
            </span>
            <span
              className={`rounded-full border px-3 py-1 text-xs font-bold ${statusStyles[selectedMilestone.status]}`}
            >
              {selectedMilestone.status}
            </span>
          </div>
          <p className="mt-5 leading-7 text-muted-foreground">
            {selectedMilestone.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 border-t pt-5">
            {selectedMilestone.docsLink && (
              <a
                href={selectedMilestone.docsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition hover:border-primary/40 hover:text-primary"
              >
                <FileText className="h-4 w-4" /> Docs
              </a>
            )}
            {selectedMilestone.proofLink && (
              <a
                href={selectedMilestone.proofLink}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                <ExternalLink className="h-4 w-4" /> Proof
              </a>
            )}
          </div>
        </DetailSheet>
      )}
    </section>
  );
}

function JourneyListItem({
  milestone,
  index,
  isLast,
  onSelect,
}: {
  milestone: PortfolioDevOpsMilestone;
  index: number;
  isLast: boolean;
  onSelect: () => void;
}) {
  const colorClass = colorStyles[milestone.color || ""] || colorStyles.cyan;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      viewport={{ once: true }}
      onClick={onSelect}
      className="focus-ring group relative flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.06] p-4 text-left backdrop-blur"
    >
      {!isLast && (
        <span className="absolute bottom-[-1rem] left-9 top-16 w-px bg-cyan-200/20" />
      )}
      <span
        className={`grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br ${colorClass} shadow-lg`}
      >
        <TechIcon name={milestone.title} className="h-7 w-7 text-white" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold">
          {milestone.order}. {milestone.title}
        </span>
        <span className="mt-1 line-clamp-2 block text-sm text-slate-300">
          {milestone.summary}
        </span>
      </span>
      <ArrowRight className="h-4 w-4 shrink-0 text-cyan-200 transition group-hover:translate-x-1" />
    </motion.button>
  );
}
