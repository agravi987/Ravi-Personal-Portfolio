"use client";

import type { IconType } from "react-icons";
import {
  SiCloudinary,
  SiDocker,
  SiExpress,
  SiGithub,
  SiGithubactions,
  SiJavascript,
  SiKubernetes,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiTerraform,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { Code2, Database, Network, Server, Wrench } from "lucide-react";

const techIconMap: Array<[string, IconType]> = [
  ["javascript", SiJavascript],
  ["typescript", SiTypescript],
  ["python", SiPython],
  ["next", SiNextdotjs],
  ["react", SiReact],
  ["node", SiNodedotjs],
  ["express", SiExpress],
  ["mongo", SiMongodb],
  ["mysql", SiMysql],
  ["docker", SiDocker],
  ["github actions", SiGithubactions],
  ["github", SiGithub],
  ["kubernetes", SiKubernetes],
  ["terraform", SiTerraform],
  ["linux", SiLinux],
  ["vercel", SiVercel],
  ["cloudinary", SiCloudinary],
  ["nginx", SiNginx],
];

export function TechIcon({
  name,
  className = "h-3.5 w-3.5",
}: {
  name: string;
  className?: string;
}) {
  const normalized = name.toLowerCase();
  const match = techIconMap.find(([keyword]) => normalized.includes(keyword));

  if (match) {
    const Icon = match[1];
    return <Icon className={className} aria-hidden="true" />;
  }

  if (normalized.includes("database") || normalized.includes("data")) {
    return <Database className={className} aria-hidden="true" />;
  }

  if (normalized.includes("network")) {
    return <Network className={className} aria-hidden="true" />;
  }

  if (normalized.includes("api") || normalized.includes("backend")) {
    return <Server className={className} aria-hidden="true" />;
  }

  if (normalized.includes("program") || normalized.includes("code")) {
    return <Code2 className={className} aria-hidden="true" />;
  }

  return <Wrench className={className} aria-hidden="true" />;
}
