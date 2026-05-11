import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .url("Enter a valid URL")
  .or(z.literal(""))
  .optional()
  .transform((value) => value || undefined);

const pathOrUrl = z
  .string()
  .trim()
  .refine(
    (value) => value.startsWith("/") || z.string().url().safeParse(value).success,
    "Enter a valid URL or public path"
  );

const optionalPathOrUrl = pathOrUrl
  .or(z.literal(""))
  .optional()
  .transform((value) => value || undefined);

const cleanText = (min = 1, max = 500) =>
  z.string().trim().min(min).max(max);

const optionalText = (max = 500) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => value || undefined);

export const projectSchema = z.object({
  title: cleanText(1, 120),
  description: cleanText(1, 1600),
  technologies: z.array(cleanText(1, 40)).min(1).max(20),
  liveLink: optionalUrl,
  repoLink: optionalUrl,
  documentationLink: optionalUrl,
  architectureLink: optionalUrl,
  image: optionalUrl,
  featured: z.boolean().optional().default(false),
  category: cleanText(1, 80).optional().default("Full Stack"),
  status: cleanText(1, 40).optional().default("Live"),
  highlights: z.array(cleanText(1, 180)).max(12).optional().default([]),
});

export const skillSchema = z.object({
  name: cleanText(1, 80),
  category: cleanText(1, 80),
  level: z.coerce.number().min(0).max(100).optional(),
  icon: optionalText(120),
  note: optionalText(300),
  docsLink: optionalUrl,
  proofLink: optionalUrl,
  featured: z.boolean().optional().default(false),
});

export const knowledgeSchema = z.object({
  title: cleanText(1, 140),
  category: cleanText(1, 80),
  summary: cleanText(1, 900),
  topics: z.array(cleanText(1, 60)).min(1).max(20),
  documentationLink: optionalUrl,
  proofLink: optionalUrl,
  featured: z.boolean().optional().default(false),
});

export const experienceSchema = z.object({
  role: cleanText(1, 120),
  company: cleanText(1, 120),
  duration: cleanText(1, 80),
  description: optionalText(900),
  type: cleanText(1, 60).optional().default("Full-time"),
});

export const achievementSchema = z.object({
  title: cleanText(1, 140),
  description: cleanText(1, 900),
  date: z.coerce.date().optional(),
  organization: optionalText(120),
  credentialLink: optionalUrl,
  certificateImage: optionalUrl,
});

export const contactSchema = z.object({
  name: cleanText(1, 100),
  email: z.string().trim().email().max(180),
  subject: z.string().trim().max(140).optional().default(""),
  message: cleanText(1, 2000),
  company: z.string().max(0).optional(),
});

export const profileSchema = z.object({
  fullName: cleanText(1, 120),
  role: cleanText(1, 160),
  shortTitle: cleanText(1, 120),
  heroBadge: cleanText(1, 140),
  heroHeadline: cleanText(1, 220),
  heroDescription: cleanText(1, 900),
  aboutHeading: cleanText(1, 220),
  aboutIntro: cleanText(1, 1000),
  aboutDetails: cleanText(1, 1400),
  email: z.string().trim().email().max(180),
  location: cleanText(1, 180),
  githubUsername: cleanText(1, 80),
  linkedinUsername: cleanText(1, 120),
  profileImage: optionalPathOrUrl,
  resumeUrl: pathOrUrl.default("/resume.pdf"),
});

export function validationError(error: z.ZodError) {
  return {
    error: "Invalid request data",
    details: error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    })),
  };
}
