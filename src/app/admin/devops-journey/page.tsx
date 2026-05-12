"use client";

import { useEffect, useState } from "react";
import { Edit, Loader2, Plus, Trash2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { TechIcon } from "@/components/TechIcon";

interface DevOpsMilestone {
  _id: string;
  title: string;
  category: string;
  summary: string;
  status: "Planned" | "Learning" | "Practicing" | "Confident";
  order: number;
  color?: string;
  docsLink?: string;
  proofLink?: string;
  featured?: boolean;
}

const STATUSES: DevOpsMilestone["status"][] = [
  "Planned",
  "Learning",
  "Practicing",
  "Confident",
];

const COLORS = [
  "sky",
  "emerald",
  "amber",
  "slate",
  "cyan",
  "violet",
  "blue",
  "purple",
  "rose",
];

const inputClass =
  "w-full rounded-md border bg-background px-3 py-2 outline-none transition focus:border-primary/60 focus:ring-4 focus:ring-primary/10";

export default function DevOpsJourneyAdminPage() {
  const [milestones, setMilestones] = useState<DevOpsMilestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] =
    useState<DevOpsMilestone | null>(null);

  const { register, handleSubmit, reset, setValue } =
    useForm<DevOpsMilestone>({
      defaultValues: {
        category: "Foundations",
        status: "Learning",
        color: "cyan",
        order: 1,
        featured: false,
      },
    });

  const fetchMilestones = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/devops-journey");
      if (res.ok) {
        const data = await res.json();
        setMilestones(data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMilestones();
  }, []);

  const onDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this roadmap milestone?")) {
      return;
    }

    const res = await fetch(`/api/devops-journey/${id}`, { method: "DELETE" });

    if (!res.ok) {
      const error = await res.json();
      alert(`Failed to delete milestone: ${error.error || "Unknown error"}`);
      return;
    }

    fetchMilestones();
  };

  const onSubmit = async (data: DevOpsMilestone) => {
    const payload = {
      ...data,
      order: Number(data.order),
    };
    const url = editingMilestone
      ? `/api/devops-journey/${editingMilestone._id}`
      : "/api/devops-journey";
    const method = editingMilestone ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.json();
      alert(`Failed to save milestone: ${error.error || "Unknown error"}`);
      return;
    }

    closeModal();
    fetchMilestones();
  };

  const openModal = (milestone?: DevOpsMilestone) => {
    if (milestone) {
      setEditingMilestone(milestone);
      setValue("title", milestone.title);
      setValue("category", milestone.category);
      setValue("summary", milestone.summary);
      setValue("status", milestone.status);
      setValue("order", milestone.order);
      setValue("color", milestone.color || "cyan");
      setValue("docsLink", milestone.docsLink);
      setValue("proofLink", milestone.proofLink);
      setValue("featured", Boolean(milestone.featured));
    } else {
      setEditingMilestone(null);
      reset({
        category: "Foundations",
        status: "Learning",
        color: "cyan",
        order: milestones.length + 1,
        featured: false,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMilestone(null);
    reset({
      category: "Foundations",
      status: "Learning",
      color: "cyan",
      order: 1,
      featured: false,
    });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">DevOps Journey</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage the planet roadmap shown on the homepage. Order controls the
            curve sequence.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex shrink-0 items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          <Plus size={18} /> Add Milestone
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="grid gap-4">
          {milestones.map((milestone) => (
            <div
              key={milestone._id}
              className="flex flex-col justify-between gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-start"
            >
              <div className="flex gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <TechIcon name={milestone.title} className="h-6 w-6" />
                </div>
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold">
                      {milestone.order}. {milestone.title}
                    </h3>
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold">
                      {milestone.category}
                    </span>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                      {milestone.status}
                    </span>
                    {milestone.featured && (
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                        Focus
                      </span>
                    )}
                  </div>
                  <p className="max-w-3xl text-sm text-muted-foreground">
                    {milestone.summary}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(milestone)}
                  className="rounded-md p-2 hover:bg-accent"
                  aria-label={`Edit ${milestone.title}`}
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => onDelete(milestone._id)}
                  className="rounded-md p-2 text-destructive hover:bg-destructive/10"
                  aria-label={`Delete ${milestone.title}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto rounded-lg bg-background shadow-lg">
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="text-xl font-bold">
                {editingMilestone ? "Edit Milestone" : "Add Milestone"}
              </h3>
              <button onClick={closeModal} aria-label="Close modal">
                <X />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Title">
                  <input
                    {...register("title", { required: true })}
                    className={inputClass}
                    placeholder="Kubernetes"
                  />
                </Field>
                <Field label="Category">
                  <input
                    {...register("category", { required: true })}
                    className={inputClass}
                    placeholder="Orchestration"
                  />
                </Field>
              </div>

              <Field label="Summary">
                <textarea
                  {...register("summary", { required: true })}
                  className={`${inputClass} h-28`}
                  placeholder="Pods, deployments, services, and cluster fundamentals."
                />
              </Field>

              <div className="grid gap-4 md:grid-cols-3">
                <Field label="Order">
                  <input
                    type="number"
                    min={1}
                    max={99}
                    {...register("order", { required: true })}
                    className={inputClass}
                  />
                </Field>
                <Field label="Status">
                  <select
                    {...register("status", { required: true })}
                    className={inputClass}
                  >
                    {STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Planet Color">
                  <select {...register("color")} className={inputClass}>
                    {COLORS.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Documentation Link">
                  <input {...register("docsLink")} className={inputClass} />
                </Field>
                <Field label="Proof Link">
                  <input {...register("proofLink")} className={inputClass} />
                </Field>
              </div>

              <label className="flex items-center gap-2 text-sm font-medium">
                <input
                  type="checkbox"
                  {...register("featured")}
                  className="h-4 w-4"
                />
                Mark as current focus
              </label>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-md px-4 py-2 hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}
