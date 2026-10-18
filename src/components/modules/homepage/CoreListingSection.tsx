"use client";

import {
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
import { useEffect, useState } from "react";

import { type ProjectListingItem, projectsData } from "@/data/projects.data";

export default function CoreListingSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<ProjectListingItem | null>(
    null,
  );

  // Simulate initial loading so users can see the skeleton loader in action
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const handleSimulateReload = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const filteredProjects =
    selectedFilter === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === selectedFilter);

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

        {/* Desktop View: Exactly 4 cards per row (lg:grid-cols-4), same height & width */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? /* Skeleton Loader: Exactly 4 cards per row matching card height & dimensions */
              ["sk-item-1", "sk-item-2", "sk-item-3", "sk-item-4"].map(
                (skId) => (
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
                ),
              )
            : /* Rendered Project Cards: Same height, same width, 4 per row on desktop */
              filteredProjects.map((project) => (
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
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
