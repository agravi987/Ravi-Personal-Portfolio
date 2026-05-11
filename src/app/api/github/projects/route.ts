import { NextResponse } from "next/server";

const GITHUB_USERNAME = "agravi987";

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  pushed_at: string;
  archived: boolean;
  fork: boolean;
  visibility: string;
}

export async function GET() {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&type=owner`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      next: { revalidate: 60 * 30 },
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch GitHub projects" },
      { status: response.status }
    );
  }

  const repos = (await response.json()) as GitHubRepo[];

  return NextResponse.json(
    repos
      .filter((repo) => !repo.fork)
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        url: repo.html_url,
        description: repo.description || "No description added yet.",
        homepage: repo.homepage || undefined,
        language: repo.language || "Other",
        topics: repo.topics || [],
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
        pushedAt: repo.pushed_at,
        archived: repo.archived,
        visibility: repo.visibility,
      }))
  );
}
