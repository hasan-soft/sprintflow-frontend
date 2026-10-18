import type { Metadata } from "next";
import ProjectsExploreView from "@/components/modules/projects/ProjectsExploreView";
import { projectsData } from "@/data/projects.data";

export const metadata: Metadata = {
  title: "Explore Sprint Workspaces & Projects | SprintFlow",
  description:
    "Browse, filter, and search battle-tested sprint workspaces, engineering templates, and agile delivery blueprints.",
  openGraph: {
    title: "Explore Sprint Workspaces & Projects | SprintFlow",
    description:
      "Browse, filter, and search battle-tested sprint workspaces, engineering templates, and agile delivery blueprints.",
    url: "/projects",
  },
};

export default function ProjectsListingPage() {
  return (
    <main>
      <ProjectsExploreView initialProjects={projectsData} />
    </main>
  );
}
