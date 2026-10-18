"use client";

import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Code2,
  DollarSign,
  ExternalLink,
  MapPin,
  MessageSquare,
  Send,
  Share2,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { ProjectListingItem } from "@/data/projects.data";

interface ProjectDetailsViewProps {
  project: ProjectListingItem;
  relatedProjects: ProjectListingItem[];
}

export default function ProjectDetailsView({
  project,
  relatedProjects,
}: ProjectDetailsViewProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [userReview, setUserReview] = useState("");
  const [userName, setUserName] = useState("");
  const [userRating, setUserRating] = useState(5);
  const [reviewsList, setReviewsList] = useState(project.reviews);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const activeMedia = project.galleryImages[activeImageIndex] || {
    url: project.image,
    caption: project.title,
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userReview.trim()) return;

    const newRev = {
      id: `rev-user-${Date.now()}`,
      name: userName,
      role: "Engineering Reviewer",
      company: "Verified Evaluator",
      rating: userRating,
      date: "Just now",
      comment: userReview,
    };

    setReviewsList([newRev, ...reviewsList]);
    setReviewSubmitted(true);
    setUserReview("");
    setUserName("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="border-b border-border/70 bg-card/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-3.5 text-xs">
          <nav className="flex items-center gap-2 text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/#core-listings"
              className="hover:text-foreground transition-colors"
            >
              Projects
            </Link>
            <span>/</span>
            <span className="text-primary font-medium">{project.category}</span>
            <span>/</span>
            <span className="text-foreground font-semibold truncate max-w-[180px] sm:max-w-xs">
              {project.title}
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-background px-3 py-1.5 font-medium text-foreground hover:bg-muted transition cursor-pointer"
            >
              <Share2 className="size-3.5 text-muted-foreground" />
              <span>{copiedLink ? "Link Copied!" : "Share"}</span>
            </button>
            <Link
              href="/#core-listings"
              className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-background px-3 py-1.5 font-medium text-foreground hover:bg-muted transition"
            >
              <ArrowLeft className="size-3.5" />
              <span>All Projects</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="mx-auto max-w-7xl px-5 pt-8 sm:pt-12 space-y-14">
        {/* Header Hero Title Area */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between border-b border-border/60 pb-8">
          <div className="max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                {project.category}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="size-3.5" />
                Verified Sprint Workspace
              </span>
            </div>

            <h1 className="font-heading text-3xl font-extrabold sm:text-4xl lg:text-5xl text-foreground tracking-tight">
              {project.title}
            </h1>

            <p className="text-base text-muted-foreground leading-relaxed sm:text-lg">
              {project.shortDescription}
            </p>

            {/* Micro Highlights */}
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5 text-foreground font-semibold">
                <Star className="size-4 fill-amber-500 text-amber-500" />
                <span>{project.rating}</span>
                <span className="text-muted-foreground font-normal">
                  ({reviewsList.length} verified reviews)
                </span>
              </div>
              <div>•</div>
              <div className="flex items-center gap-1.5">
                <MapPin className="size-4 text-primary" />
                <span>{project.location}</span>
              </div>
              <div>•</div>
              <div className="flex items-center gap-1.5">
                <Users className="size-4 text-primary" />
                <span>{project.teamSize}</span>
              </div>
            </div>
          </div>

          {/* Quick Action Pricing Card */}
          <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:w-80 shrink-0 space-y-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Total Sprint Budget
              </p>
              <p className="font-heading text-3xl font-bold text-primary">
                {project.price}
              </p>
              <p className="text-[11px] text-muted-foreground">
                Target Deadline:{" "}
                <strong className="text-foreground">{project.date}</strong>
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <Link
                href="/register"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary/90 transition"
              >
                <span>Launch This Workspace</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/login"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background py-2.5 text-xs font-semibold text-foreground hover:bg-muted transition"
              >
                <span>1-Click Demo Preview</span>
              </Link>
            </div>

            <div className="border-t border-border/50 pt-3 text-[11px] text-muted-foreground space-y-1">
              <p className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-primary" />
                Full code & board template included
              </p>
              <p className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-primary" />
                No credit card required for evaluation
              </p>
            </div>
          </div>
        </div>

        {/* SECTION: MULTIPLE IMAGES / MEDIA GALLERY */}
        <section aria-label="Project Gallery" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold text-foreground">
              Workspace & Architecture Previews
            </h2>
            <span className="text-xs text-muted-foreground">
              {activeImageIndex + 1} of {project.galleryImages.length} previews
            </span>
          </div>

          {/* Main Large Image Display */}
          <div className="relative aspect-video sm:aspect-21/9 w-full overflow-hidden rounded-3xl border border-border/80 bg-muted shadow-md">
            <Image
              src={activeMedia.url}
              alt={activeMedia.caption}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover transition-all duration-300"
            />
            {/* Caption Overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-6 text-white flex items-center justify-between">
              <p className="text-xs sm:text-sm font-medium drop-shadow-md">
                {activeMedia.caption}
              </p>
              <span className="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-white">
                Live Screenshot
              </span>
            </div>
          </div>

          {/* Thumbnails Row: Click to switch media */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {project.galleryImages.map((img, idx) => (
              <button
                key={img.caption}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`relative aspect-video overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${
                  activeImageIndex === idx
                    ? "border-primary shadow-sm scale-102 ring-2 ring-primary/20"
                    : "border-border/70 opacity-70 hover:opacity-100 hover:border-primary/50"
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.caption}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </section>

        {/* SECTION 1: DESCRIPTION / OVERVIEW */}
        <section
          id="overview"
          className="space-y-6 border-t border-border/60 pt-10"
        >
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Section 1 · Scope & Execution
            </p>
            <h2 className="font-heading text-2xl font-bold sm:text-3xl text-foreground">
              Description & Project Overview
            </h2>
          </div>

          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {project.fullDescription}
              </p>

              {/* Deliverables Checklist */}
              <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-4">
                <h3 className="font-heading text-base font-bold text-foreground">
                  Committed Sprint Deliverables & Milestones
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {project.deliverables.map((del) => (
                    <div
                      key={del}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground"
                    >
                      <CheckCircle2 className="size-4.5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="rounded-2xl border border-border/80 bg-muted/30 p-6 space-y-4 h-fit">
              <div className="flex items-center gap-2">
                <Code2 className="size-4 text-primary" />
                <h3 className="font-heading text-sm font-bold text-foreground uppercase tracking-wider">
                  Technology Stack
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-border/80 bg-background px-3 py-1.5 text-xs font-semibold text-foreground shadow-2xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground pt-2 border-t border-border/60 leading-normal">
                Pre-configured with TypeScript strict mode, Biome linting, and
                automated CI test runs.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: KEY INFORMATION / SPECIFICATIONS */}
        <section
          id="specifications"
          className="space-y-6 border-t border-border/60 pt-10"
        >
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Section 2 · Technical Matrix
            </p>
            <h2 className="font-heading text-2xl font-bold sm:text-3xl text-foreground">
              Key Information & Specifications
            </h2>
            <p className="text-sm text-muted-foreground">
              Comprehensive architectural standards, infrastructure commitments,
              and SLAs.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {project.specifications.map((spec) => (
              <div
                key={spec.label}
                className="rounded-2xl border border-border/80 bg-card p-5 space-y-2 shadow-2xs hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    {spec.label}
                  </p>
                  {spec.badge && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary">
                      {spec.badge}
                    </span>
                  )}
                </div>
                <p className="font-heading text-sm sm:text-base font-bold text-foreground">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: REVIEWS / RATINGS */}
        <section
          id="reviews"
          className="space-y-8 border-t border-border/60 pt-10"
        >
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Section 3 · Peer Feedback
            </p>
            <h2 className="font-heading text-2xl font-bold sm:text-3xl text-foreground">
              Reviews & Engineering Ratings
            </h2>
            <p className="text-sm text-muted-foreground">
              Authentic reviews from engineering directors, product owners, and
              team contributors.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Rating Summary Scorecard */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-5 h-fit shadow-xs">
              <div className="text-center space-y-2 border-b border-border/60 pb-5">
                <p className="font-heading text-5xl font-extrabold text-foreground tracking-tight">
                  {project.rating}
                </p>
                <div className="flex items-center justify-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={`star-main-${project.id}-${i}`}
                      className="size-5 fill-amber-500 text-amber-500"
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Based on {reviewsList.length} verified engineering reviews
                </p>
              </div>

              {/* Rating Bars */}
              <div className="space-y-2 text-xs">
                {[
                  { stars: 5, pct: "88%" },
                  { stars: 4, pct: "10%" },
                  { stars: 3, pct: "2%" },
                  { stars: 2, pct: "0%" },
                  { stars: 1, pct: "0%" },
                ].map((bar) => (
                  <div key={bar.stars} className="flex items-center gap-2">
                    <span className="w-12 text-muted-foreground">
                      {bar.stars} stars
                    </span>
                    <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: bar.pct }}
                      />
                    </div>
                    <span className="w-8 text-right font-mono text-muted-foreground">
                      {bar.pct}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews List & Write Review Box */}
            <div className="lg:col-span-2 space-y-6">
              {/* Reviews List */}
              <div className="space-y-4">
                {reviewsList.map((rev) => (
                  <div
                    key={rev.id}
                    className="rounded-2xl border border-border/80 bg-card p-5 space-y-3 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-xl bg-primary/15 font-heading text-xs font-bold text-primary">
                          {rev.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="font-semibold text-xs text-foreground">
                            {rev.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {rev.role} · {rev.company}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-amber-500">
                        {[1, 2, 3, 4, 5].map((starNum) => (
                          <Star
                            key={`star-${rev.id}-${starNum}`}
                            className={`size-3.5 ${
                              starNum <= Math.round(rev.rating)
                                ? "fill-amber-500 text-amber-500"
                                : "text-muted-foreground/30"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed italic">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                    <p className="text-[10px] text-muted-foreground pt-1">
                      {rev.date}
                    </p>
                  </div>
                ))}
              </div>

              {/* Add Review Form */}
              <div className="rounded-2xl border border-border/80 bg-muted/20 p-5 space-y-4">
                <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
                  <MessageSquare className="size-4 text-primary" />
                  <span>Leave a Review for this Workspace</span>
                </div>

                {reviewSubmitted ? (
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                    ✓ Thank you! Your review has been added to this workspace.
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input
                        type="text"
                        placeholder="Your Name (e.g. Maya Chen)"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                        className="rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                      />
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Rating:</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setUserRating(star)}
                              className="cursor-pointer"
                            >
                              <Star
                                className={`size-4 ${
                                  star <= userRating
                                    ? "fill-amber-500 text-amber-500"
                                    : "text-muted-foreground"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <textarea
                      placeholder="Share your technical experience with this sprint workspace..."
                      value={userReview}
                      onChange={(e) => setUserReview(e.target.value)}
                      required
                      rows={3}
                      className="w-full rounded-xl border border-border bg-background p-3.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                    />

                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition cursor-pointer"
                    >
                      <span>Post Review</span>
                      <Send className="size-3" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: RELATED ITEMS */}
        <section
          id="related"
          className="space-y-6 border-t border-border/60 pt-10"
        >
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Section 4 · Explore Alternatives
              </p>
              <h2 className="font-heading text-2xl font-bold sm:text-3xl text-foreground">
                Related Sprint Workspaces
              </h2>
            </div>
            <Link
              href="/#core-listings"
              className="text-xs font-semibold text-primary hover:underline hidden sm:inline"
            >
              Browse all 8 templates →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProjects.map((rel) => (
              <article
                key={rel.id}
                className="group flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-card overflow-hidden shadow-2xs transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
              >
                <div>
                  <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    <Image
                      src={rel.image}
                      alt={rel.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 rounded-full border border-border/80 bg-background/90 px-2.5 py-0.5 text-[10px] font-semibold text-foreground backdrop-blur-md shadow-2xs">
                      {rel.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="font-heading text-base font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {rel.title}
                    </h3>

                    <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2 min-h-[36px]">
                      {rel.shortDescription}
                    </p>

                    <div className="border-t border-border/60 pt-3 grid grid-cols-2 gap-y-2 text-[11px] text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="size-3.5 text-primary" />
                        <span className="font-mono font-bold text-foreground">
                          {rel.price}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 justify-end">
                        <Calendar className="size-3.5 text-muted-foreground" />
                        <span>{rel.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Star className="size-3.5 fill-amber-500 text-amber-500" />
                        <span className="font-semibold text-foreground">
                          {rel.rating}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 justify-end">
                        <MapPin className="size-3.5 text-muted-foreground" />
                        <span className="truncate max-w-[100px]">
                          {rel.location.split("(")[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    href={`/projects/${rel.id}`}
                    className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-border/80 bg-muted/40 py-2.5 text-xs font-bold text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition cursor-pointer"
                  >
                    <span>View Details</span>
                    <ExternalLink className="size-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
