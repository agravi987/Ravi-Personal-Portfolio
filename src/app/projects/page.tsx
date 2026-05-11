import { PageFrame } from "@/components/PageFrame";
import { Projects } from "@/components/Projects";
import { GitHubProjectsExplorer } from "@/components/GitHubProjectsExplorer";
import { getPortfolioData } from "@/lib/portfolio-service";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const { data } = await getPortfolioData();

  return (
    <PageFrame profile={data.profile}>
      <Projects projects={data.projects} />
      <GitHubProjectsExplorer />
    </PageFrame>
  );
}
