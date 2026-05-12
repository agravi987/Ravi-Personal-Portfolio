export interface PortfolioProject {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  liveLink?: string;
  repoLink?: string;
  documentationLink?: string;
  architectureLink?: string;
  image?: string;
  featured?: boolean;
  category?: string;
  status?: string;
  highlights?: string[];
}

export interface PortfolioSkill {
  _id: string;
  name: string;
  category: string;
  level?: number;
  note?: string;
  docsLink?: string;
  proofLink?: string;
  featured?: boolean;
}

export interface PortfolioKnowledge {
  _id: string;
  title: string;
  category: string;
  summary: string;
  topics: string[];
  documentationLink?: string;
  proofLink?: string;
  featured?: boolean;
}

export interface PortfolioDevOpsMilestone {
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

export interface PortfolioExperience {
  _id: string;
  role: string;
  company: string;
  duration: string;
  description?: string;
  type: string;
}

export interface PortfolioAchievement {
  _id: string;
  title: string;
  description: string;
  certificateImage?: string;
}

export interface PortfolioProfile {
  _id?: string;
  fullName: string;
  role: string;
  shortTitle: string;
  heroBadge: string;
  heroHeadline: string;
  heroDescription: string;
  aboutHeading: string;
  aboutIntro: string;
  aboutDetails: string;
  email: string;
  location: string;
  githubUsername: string;
  linkedinUsername: string;
  profileImage?: string;
  resumeUrl: string;
}

export const fallbackProjects: PortfolioProject[] = [
  {
    _id: "fallback-platform",
    title: "Cloud Portfolio Control Plane",
    description:
      "A portfolio platform with dynamic content, admin workflows, image pipelines, resilient fallbacks, and deploy-ready architecture for cloud-focused storytelling.",
    technologies: ["Next.js", "MongoDB", "App Router", "Cloudinary", "SSR"],
    featured: true,
    category: "Cloud Platform",
    status: "Live",
    highlights: [
      "Dynamic content with admin-managed profile, skills, and projects",
      "Fallback-safe homepage that still works when live data is unavailable",
      "Reusable pages for focused views like projects, stack, and contact",
    ],
  },
  {
    _id: "fallback-pipeline",
    title: "Container Delivery Pipeline Lab",
    description:
      "A deployment-focused lab for packaging applications, shipping updates, and documenting release flow with versioned source control practices.",
    technologies: ["Docker", "GitHub Actions", "Node.js", "Nginx", "Linux"],
    featured: true,
    category: "DevOps",
    status: "In Progress",
    highlights: [
      "Container-first build strategy for consistent local and hosted environments",
      "Release flow designed around CI checks and repeatable deployment steps",
      "Operational documentation prepared alongside implementation work",
    ],
  },
  {
    _id: "fallback-portfolio",
    title: "Observability-Ready Admin Dashboard",
    description:
      "A full-stack dashboard experience that combines UI workflows, API design, database persistence, and cloud-minded operational thinking.",
    technologies: ["React", "REST APIs", "MongoDB", "Monitoring", "Vercel"],
    featured: true,
    category: "Full Stack",
    status: "Live",
    highlights: [
      "Admin-friendly workflows with clean CRUD patterns",
      "Deployment-aware frontend and backend integration",
      "Structure prepared for metrics, logging, and service expansion",
    ],
  },
];

export const fallbackSkills: PortfolioSkill[] = [
  {
    _id: "skill-js",
    name: "JavaScript",
    category: "Programming",
    level: 95,
    note: "Application logic, browser behavior, and service-side scripting.",
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    _id: "skill-ts",
    name: "TypeScript",
    category: "Programming",
    level: 88,
    note: "Typed frontend and backend code for safer refactors.",
    docsLink: "https://www.typescriptlang.org/docs/",
  },
  {
    _id: "skill-python",
    name: "Python",
    category: "Automation",
    level: 85,
    note: "Scripting, utilities, and problem-solving workflows.",
    docsLink: "https://docs.python.org/3/",
  },
  {
    _id: "skill-react",
    name: "React",
    category: "Frontend",
    level: 94,
    note: "Interactive interfaces and reusable UI systems.",
    docsLink: "https://react.dev/",
  },
  {
    _id: "skill-next",
    name: "Next.js",
    category: "Frontend",
    level: 92,
    note: "App Router, SSR, API routes, and production-ready UX.",
    docsLink: "https://nextjs.org/docs",
    featured: true,
  },
  {
    _id: "skill-node",
    name: "Node.js",
    category: "Backend",
    level: 86,
    note: "Backend routes, runtime tooling, and services.",
    docsLink: "https://nodejs.org/en/docs",
  },
  {
    _id: "skill-api",
    name: "REST APIs",
    category: "Backend",
    level: 88,
    note: "Structured endpoints for apps, admin flows, and integrations.",
  },
  {
    _id: "skill-mongo",
    name: "MongoDB",
    category: "Data",
    level: 86,
    note: "Document modeling and persistence for product workflows.",
    docsLink: "https://www.mongodb.com/docs/",
  },
  {
    _id: "skill-docker",
    name: "Docker",
    category: "Cloud & DevOps",
    level: 84,
    note: "Packaging services for reproducible environments.",
    docsLink: "https://docs.docker.com/",
    featured: true,
  },
  {
    _id: "skill-github-actions",
    name: "GitHub Actions",
    category: "Cloud & DevOps",
    level: 80,
    note: "Automating checks, builds, and release steps.",
    docsLink: "https://docs.github.com/actions",
    featured: true,
  },
  {
    _id: "skill-linux",
    name: "Linux",
    category: "Cloud & DevOps",
    level: 82,
    note: "Shell workflows, server setup, and operational basics.",
  },
  {
    _id: "skill-git",
    name: "Git / GitHub",
    category: "Cloud & DevOps",
    level: 90,
    note: "Version control, collaboration, and release hygiene.",
    docsLink: "https://docs.github.com/",
  },
  {
    _id: "skill-vercel",
    name: "Vercel Deployments",
    category: "Cloud & DevOps",
    level: 86,
    note: "Fast deployment loops for Next.js applications.",
    docsLink: "https://vercel.com/docs",
  },
];

export const fallbackKnowledge: PortfolioKnowledge[] = [
  {
    _id: "knowledge-cicd",
    title: "CI/CD Thinking",
    category: "Delivery",
    summary:
      "I care about repeatable shipping: checks before release, predictable builds, and cleaner handoff from code to deployment.",
    topics: ["Build pipelines", "Release checks", "Environment parity", "Rollback awareness"],
    documentationLink: "https://docs.github.com/actions",
    featured: true,
  },
  {
    _id: "knowledge-containers",
    title: "Containers and Runtime Consistency",
    category: "Containers",
    summary:
      "I use container concepts to keep development and deployment environments closer together and easier to reproduce.",
    topics: ["Docker images", "Compose workflows", "Service boundaries", "Runtime dependencies"],
    documentationLink: "https://docs.docker.com/",
    featured: true,
  },
  {
    _id: "knowledge-cloud",
    title: "Cloud Deployment Foundations",
    category: "Cloud",
    summary:
      "My portfolio direction is moving toward hosting, deployment flow, infrastructure awareness, and cloud-native delivery habits.",
    topics: ["Hosting", "Environment variables", "Storage choices", "Deployment targets"],
    documentationLink: "https://aws.amazon.com/getting-started/",
  },
  {
    _id: "knowledge-monitoring",
    title: "Observability Basics",
    category: "Monitoring",
    summary:
      "I think about what happens after launch too: visibility, failure signals, and enough telemetry to debug real issues.",
    topics: ["Logs", "Health checks", "Metrics", "Incident debugging"],
    documentationLink: "https://prometheus.io/docs/introduction/overview/",
  },
];

export const fallbackDevOpsJourney: PortfolioDevOpsMilestone[] = [
  {
    _id: "devops-python",
    title: "Python",
    category: "Automation",
    summary: "Scripting, CLI utilities, API automation, and repeatable ops tasks.",
    status: "Practicing",
    order: 1,
    color: "sky",
    docsLink: "https://docs.python.org/3/",
    featured: true,
  },
  {
    _id: "devops-networking",
    title: "Networking",
    category: "Foundations",
    summary: "HTTP, DNS, ports, routing basics, and debugging service connectivity.",
    status: "Learning",
    order: 2,
    color: "emerald",
    featured: true,
  },
  {
    _id: "devops-linux",
    title: "Linux",
    category: "Systems",
    summary: "Shell workflows, permissions, processes, services, logs, and server basics.",
    status: "Practicing",
    order: 3,
    color: "amber",
    docsLink: "https://www.kernel.org/doc/html/latest/",
    featured: true,
  },
  {
    _id: "devops-git",
    title: "Git & GitHub",
    category: "Source Control",
    summary: "Branching, pull requests, releases, and collaboration hygiene.",
    status: "Confident",
    order: 4,
    color: "slate",
    docsLink: "https://docs.github.com/",
  },
  {
    _id: "devops-docker",
    title: "Docker",
    category: "Containers",
    summary: "Images, Dockerfiles, Compose labs, and reproducible app environments.",
    status: "Practicing",
    order: 5,
    color: "cyan",
    docsLink: "https://docs.docker.com/",
    featured: true,
  },
  {
    _id: "devops-github-actions",
    title: "GitHub Actions",
    category: "CI/CD",
    summary: "Automated checks, build workflows, environment variables, and deployment gates.",
    status: "Practicing",
    order: 6,
    color: "violet",
    docsLink: "https://docs.github.com/actions",
    featured: true,
  },
  {
    _id: "devops-kubernetes",
    title: "Kubernetes",
    category: "Orchestration",
    summary: "Pods, deployments, services, config, scaling, and cluster mental models.",
    status: "Learning",
    order: 7,
    color: "blue",
    docsLink: "https://kubernetes.io/docs/home/",
  },
  {
    _id: "devops-terraform",
    title: "Terraform",
    category: "Infrastructure as Code",
    summary: "Declaring cloud resources, state awareness, modules, and reviewable infra changes.",
    status: "Planned",
    order: 8,
    color: "purple",
    docsLink: "https://developer.hashicorp.com/terraform/docs",
  },
  {
    _id: "devops-monitoring",
    title: "Monitoring",
    category: "Operations",
    summary: "Logs, metrics, health checks, alerts, and post-deploy visibility.",
    status: "Planned",
    order: 9,
    color: "rose",
    docsLink: "https://prometheus.io/docs/introduction/overview/",
  },
];

export const fallbackExperience: PortfolioExperience[] = [
  {
    _id: "exp-techvanch",
    role: "Modern Full Stack (Next.js) Intern",
    company: "TECHVANCH",
    duration: "July 2025",
    type: "Internship",
    description:
      "Built production-style Next.js features with reusable UI, API routes, database integration, and deployment-aware thinking.",
  },
  {
    _id: "exp-consensus",
    role: "MERN Stack Intern",
    company: "Consensus Academy",
    duration: "Jan 2025",
    type: "Internship",
    description:
      "Developed MERN applications with authentication, dashboard workflows, data models, and clean backend routes.",
  },
  {
    _id: "exp-degree",
    role: "Computer Science Engineering",
    company: "Sri Eshwar College of Engineering",
    duration: "2023 - 2027",
    type: "Education",
    description:
      "Maintaining a 9.01 CGPA while building full-stack systems, hackathon projects, and competitive programming foundations.",
  },
];

export const fallbackAchievements: PortfolioAchievement[] = [
  {
    _id: "ach-hackathons",
    title: "Hackathon Wins",
    description:
      "Winner across multiple build sprints, turning problem statements into working, demo-ready products.",
  },
  {
    _id: "ach-coding",
    title: "Competitive Coding",
    description:
      "Active problem solver across LeetCode, CodeChef, and HackerRank with strong algorithmic fundamentals.",
  },
  {
    _id: "ach-delivery",
    title: "Production Mindset",
    description:
      "Comfortable moving from UI polish to APIs, database models, auth flows, uploads, and deployment details.",
  },
];

export const fallbackProfile: PortfolioProfile = {
  fullName: "Ravi Agrahari",
  role: "Cloud and DevOps focused full-stack developer",
  shortTitle: "Cloud & DevOps Engineer",
  heroBadge: "Cloud, DevOps, and Full-Stack Delivery",
  heroHeadline: "I build apps, automate delivery, and prepare systems to ship well.",
  heroDescription:
    "My work sits at the point where product development meets deployment thinking: full-stack apps, admin systems, automation, documentation, and cloud-ready architecture.",
  aboutHeading:
    "A developer moving deeper into cloud and DevOps without losing the full-stack edge.",
  aboutIntro:
    "I am a Computer Science Engineering student (2023 - 2027) at Sri Eshwar College of Engineering, Coimbatore, with a CGPA of 9.01. My strongest zone is turning practical product ideas into working full-stack applications.",
  aboutDetails:
    "I enjoy the complete path: polished UI, data models, API routes, upload pipelines, admin workflows, deployment details, and the operational layer around release quality. That full journey is what makes a portfolio feel professional instead of decorative.",
  email: "hello@ravi.dev",
  location: "India, available for remote-first teams",
  githubUsername: "raviagrahari",
  linkedinUsername: "ravi-agrahari",
  profileImage: "/images/ravi-profile.jpg",
  resumeUrl: "/resume.pdf",
};
