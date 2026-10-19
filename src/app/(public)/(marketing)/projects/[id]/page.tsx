import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailsView from "@/components/modules/projects/ProjectDetailsView";
import {
  getProjectById,
  getRelatedProjects,
  type ProjectListingItem,
  projectsData,
} from "@/data/projects.data";

export const dynamicParams = true;

export function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id,
  }));
}

async function resolveProject(id: string): Promise<ProjectListingItem | null> {
  const staticProj = getProjectById(id);
  if (staticProj) return staticProj;

  try {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
    const res = await fetch(`${backendUrl}/projects/public/${id}`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const json = await res.json();
      const bp = json?.data;
      if (bp) {
        let category: ProjectListingItem["category"] = "Engineering";
        const text = `${bp.name} ${bp.description || ""}`.toLowerCase();
        if (
          text.includes("fintech") ||
          text.includes("payment") ||
          text.includes("wallet")
        ) {
          category = "FinTech";
        } else if (
          text.includes("cloud") ||
          text.includes("mesh") ||
          text.includes("devops") ||
          text.includes("infra")
        ) {
          category = "Cloud/DevOps";
        } else if (
          text.includes("design") ||
          text.includes("ux") ||
          text.includes("product") ||
          text.includes("app")
        ) {
          category = "Product";
        }
        const fallback = projectsData[0];
        return {
          id: bp.id,
          title: bp.name,
          shortDescription: bp.description || fallback.shortDescription,
          fullDescription: bp.description
            ? `${bp.description} Backed by SprintFlow production database records with live sprint and backlog synchronization.`
            : fallback.fullDescription,
          category,
          price: fallback.price,
          date: bp.createdAt
            ? new Date(bp.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : fallback.date,
          rating: 4.9,
          reviewsCount: 38,
          location: "Remote / Hybrid",
          teamSize: `${Math.max(4, bp.tasks?.length || 6)} Specialists (SprintFlow Verified)`,
          sprintVelocity: "50 SP / sprint",
          image: fallback.image,
          galleryImages: fallback.galleryImages,
          specifications: [
            {
              label: "Active Sprints",
              value: String(bp.sprints?.length || 1),
              badge: "Live DB",
            },
            {
              label: "Backlog Tasks",
              value: String(bp.tasks?.length || 8),
              badge: "Synced",
            },
            { label: "Status", value: bp.status || "ACTIVE" },
            { label: "Architecture", value: "Next.js 15 & PostgreSQL" },
          ],
          deliverables: fallback.deliverables,
          techStack: fallback.techStack,
          reviews: fallback.reviews,
          relatedProjectIds: projectsData.slice(0, 3).map((p) => p.id),
        };
      }
    }
  } catch {
    // Ignore and fallback to null
  }

  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = await resolveProject(id);

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
  const project = await resolveProject(id);

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
