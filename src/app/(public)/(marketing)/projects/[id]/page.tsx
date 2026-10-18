import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailsView from "@/components/modules/projects/ProjectDetailsView";
import {
  getProjectById,
  getRelatedProjects,
  projectsData,
} from "@/data/projects.data";

export function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return {
      title: "Workspace Not Found | SprintFlow",
    };
  }

  return {
    title: `${project.title} | SprintFlow Workspaces`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} | SprintFlow Workspaces`,
      description: project.shortDescription,
      images: [project.image],
    },
  };
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  const related = getRelatedProjects(project);

  return (
    <main>
      <ProjectDetailsView project={project} relatedProjects={related} />
    </main>
  );
}
