"use client";

import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  DollarSign,
  ExternalLink,
  Layers,
  MapPin,
  RefreshCw,
  Star,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { type ProjectListingItem, projectsData } from "@/data/projects.data";
import { usePublicProjects } from "@/hooks";
import type { WorkspaceProject } from "@/types";

export default function CoreListingSection() {
  const publicProjectsQuery = usePublicProjects();
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<ProjectListingItem | null>(
    null,
  );

  const isLoading = publicProjectsQuery.isLoading || isSimulating;

  const handleSimulateReload = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 800);
  };

  const allProjects = useMemo(() => {
    const raw = publicProjectsQuery.data?.data;
    if (Array.isArray(raw) && raw.length > 0) {
      const mapped = raw.map((bp: WorkspaceProject, idx: number) => {
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

        const fallbackItem =
          projectsData[idx % projectsData.length] || projectsData[0];

        return {
          id: bp.id,
          title: bp.name,
          shortDescription: bp.description || fallbackItem.shortDescription,
          fullDescription: bp.description
            ? `${bp.description} Backed by SprintFlow production database records with live sprint and backlog synchronization.`
            : fallbackItem.fullDescription,
          category,
          price: fallbackItem.price,
          date: bp.createdAt
            ? new Date(bp.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : fallbackItem.date,
          rating: Number((4.8 + (idx % 3) * 0.1).toFixed(1)),
          reviewsCount: 32 + idx * 7,
          location: "Remote / Hybrid",
          teamSize: `${Math.max(4, bp.tasks?.length || 6)} Specialists (SprintFlow Verified)`,
          sprintVelocity: `${45 + idx * 5} SP / sprint`,
          image: fallbackItem.image,
          galleryImages: fallbackItem.galleryImages,
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
          deliverables: fallbackItem.deliverables,
          techStack: fallbackItem.techStack,
          reviews: fallbackItem.reviews,
          relatedProjectIds: projectsData.slice(0, 3).map((p) => p.id),
        } as ProjectListingItem;
      });

      const dbIds = new Set(mapped.map((m) => m.id));
      const remaining = projectsData.filter((p) => !dbIds.has(p.id));
      return [...mapped, ...remaining];
    }
    return projectsData;
  }, [publicProjectsQuery.data]);

  const filteredProjects = useMemo(() => {
    return selectedFilter === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === selectedFilter);
  }, [allProjects, selectedFilter]);

  const displayedProjects = useMemo(() => {
    return filteredProjects.slice(0, 6);
  }, [filteredProjects]);

  return (
    <section
      id="core-listings"
      className="border-b bg-card/25 py-20 scroll-mt-16"
    >
      <div className="mx-auto max-w-7xl px-5">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
              <Layers className="size-3.5" />
              <span>Core Workspace Catalog</span>
            </div>
            <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl text-foreground tracking-tight">
              Featured Sprint Workspaces & Projects
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Explore battle-tested sprint workspaces ready to deploy for
              engineering, fintech, cloud, and product initiatives.
            </p>
          </div>

          {/* Filter Pills & Simulator Toggle */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            {["All", "Engineering", "FinTech", "Cloud/DevOps", "Product"].map(
              (filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setSelectedFilter(filter)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                    selectedFilter === filter
                      ? "bg-primary text-primary-foreground shadow-2xs"
                      : "border border-border/80 bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {filter}
                </button>
              ),
            )}

            {/* Skeleton Simulation Refresh Button */}
            <button
              type="button"
              onClick={handleSimulateReload}
              title="Test Skeleton Loading State"
              className="flex items-center gap-1 rounded-xl border border-border/80 bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition cursor-pointer"
            >
              <RefreshCw
                className={`size-3.5 ${isLoading ? "animate-spin text-primary" : ""}`}
              />
              <span className="hidden sm:inline">Simulate Load</span>
            </button>
          </div>
        </div>

        {/* Desktop View: Exactly 3 cards per row (lg:grid-cols-3, 2 rows = 6 cards) */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? /* Skeleton Loader: 6 cards matching 2 rows of 3 */
              [
                "sk-item-1",
                "sk-item-2",
                "sk-item-3",
                "sk-item-4",
                "sk-item-5",
                "sk-item-6",
              ].map((skId) => (
                <div
                  key={skId}
                  className="flex h-full flex-col justify-between rounded-2xl border border-border/60 bg-card overflow-hidden shadow-2xs animate-pulse"
                >
                  <div>
                    {/* Skeleton Image Area */}
                    <div className="relative aspect-video w-full bg-muted/80" />

                    <div className="p-5 space-y-3">
                      {/* Category tag skeleton */}
                      <div className="h-4 w-20 rounded-md bg-muted" />

                      {/* Title skeleton */}
                      <div className="h-5 w-3/4 rounded-md bg-muted" />

                      {/* Description skeletons */}
                      <div className="space-y-1.5">
                        <div className="h-3.5 w-full rounded-md bg-muted/70" />
                        <div className="h-3.5 w-4/5 rounded-md bg-muted/70" />
                      </div>

                      {/* Meta info grid skeleton */}
                      <div className="border-t border-border/40 pt-3 grid grid-cols-2 gap-2">
                        <div className="h-3.5 w-16 rounded bg-muted/60" />
                        <div className="h-3.5 w-20 rounded bg-muted/60 justify-self-end" />
                        <div className="h-3.5 w-14 rounded bg-muted/60" />
                        <div className="h-3.5 w-24 rounded bg-muted/60 justify-self-end" />
                      </div>
                    </div>
                  </div>

                  {/* Button skeleton */}
                  <div className="p-5 pt-0">
                    <div className="h-9 w-full rounded-xl bg-muted" />
                  </div>
                </div>
              ))
            : /* Rendered Project Cards: 3 per row on desktop (2 rows of 3 = 6 cards) */
              displayedProjects.map((project) => (
                <article
                  key={project.id}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-card overflow-hidden shadow-2xs transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
                >
                  <div>
                    {/* Card Image Area with Fixed Aspect Ratio */}
                    <div className="relative aspect-video w-full overflow-hidden bg-muted">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* Category Tag Overlay */}
                      <span className="absolute top-3 left-3 rounded-full border border-border/80 bg-background/90 px-2.5 py-0.5 text-[10px] font-semibold text-foreground backdrop-blur-md shadow-2xs">
                        {project.category}
                      </span>
                    </div>

                    {/* Card Content Area */}
                    <div className="p-5 space-y-3">
                      {/* Card Title */}
                      <h3 className="font-heading text-base font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2 min-h-[36px]">
                        {project.shortDescription}
                      </p>

                      {/* Meta Info Grid: Price, Date, Rating, Location */}
                      <div className="border-t border-border/60 pt-3 grid grid-cols-2 gap-y-2 gap-x-1 text-[11px] text-muted-foreground">
                        {/* Price */}
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="size-3.5 text-primary shrink-0" />
                          <span className="font-mono font-bold text-foreground">
                            {project.price}
                          </span>
                        </div>

                        {/* Date */}
                        <div className="flex items-center gap-1.5 justify-end">
                          <Calendar className="size-3.5 text-muted-foreground shrink-0" />
                          <span className="truncate">{project.date}</span>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1.5">
                          <Star className="size-3.5 fill-amber-500 text-amber-500 shrink-0" />
                          <span className="font-semibold text-foreground">
                            {project.rating}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            ({project.reviewsCount})
                          </span>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-1.5 justify-end">
                          <MapPin className="size-3.5 text-muted-foreground shrink-0" />
                          <span
                            className="truncate max-w-[110px]"
                            title={project.location}
                          >
                            {project.location.split("(")[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* "View Details" Button */}
                  <div className="p-5 pt-0">
                    <button
                      type="button"
                      onClick={() => setActiveProject(project)}
                      className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-border/80 bg-muted/40 py-2.5 text-xs font-bold text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-150 cursor-pointer active:scale-98"
                    >
                      <span>View Details</span>
                      <ExternalLink className="size-3" />
                    </button>
                  </div>
                </article>
              ))}
        </div>

        {/* Explore All Workspaces CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2.5 rounded-2xl border border-border/80 bg-background px-7 py-3.5 text-sm font-semibold text-foreground shadow-2xs hover:border-primary/50 hover:bg-muted/60 transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Explore All Workspaces ({allProjects.length})</span>
            <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Modal: Comprehensive Project Details */}
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border bg-card p-6 shadow-2xl sm:p-8 space-y-5">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="absolute right-5 top-5 flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition cursor-pointer"
                aria-label="Close project modal"
              >
                <X className="size-4" />
              </button>

              {/* Modal Image */}
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-muted">
                <Image
                  src={activeProject.image}
                  alt={activeProject.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute bottom-3 left-3 rounded-full border border-border/80 bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-md">
                  {activeProject.category}
                </span>
              </div>

              {/* Title & Scope */}
              <div className="space-y-2">
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  {activeProject.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {activeProject.shortDescription}
                </p>
              </div>

              {/* Comprehensive Meta Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-2xl border border-border/70 bg-muted/30 p-4 text-xs">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-medium">
                    Budget
                  </p>
                  <p className="mt-0.5 font-heading text-base font-bold text-primary">
                    {activeProject.price}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-medium">
                    Deadline
                  </p>
                  <p className="mt-0.5 font-semibold text-foreground">
                    {activeProject.date}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-medium">
                    Customer Rating
                  </p>
                  <div className="mt-0.5 flex items-center gap-1 font-semibold text-foreground">
                    <Star className="size-3.5 fill-amber-500 text-amber-500" />
                    <span>
                      {activeProject.rating} ({activeProject.reviewsCount})
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-medium">
                    Team & Velocity
                  </p>
                  <p className="mt-0.5 font-semibold text-foreground">
                    {activeProject.sprintVelocity}
                  </p>
                </div>
              </div>

              {/* Location & Team Squad info */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-y border-border/60 py-3">
                <div className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-primary" />
                  <span>{activeProject.location}</span>
                </div>
                <div>•</div>
                <div className="flex items-center gap-1.5">
                  <Users className="size-3.5 text-primary" />
                  <span>{activeProject.teamSize}</span>
                </div>
              </div>

              {/* Deliverables Checklist */}
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Sprint Deliverables & Milestones
                </p>
                <div className="space-y-1.5">
                  {activeProject.deliverables.map((del) => (
                    <div
                      key={del}
                      className="flex items-center gap-2 text-xs text-foreground"
                    >
                      <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted transition cursor-pointer"
                >
                  Close
                </button>
                <Link
                  href={`/projects/${activeProject.id}`}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition"
                >
                  <span>Full Details Page</span>
                  <ExternalLink className="size-3" />
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition shadow-sm"
                >
                  <span>Launch Workspace</span>
                  <ExternalLink className="size-3" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
