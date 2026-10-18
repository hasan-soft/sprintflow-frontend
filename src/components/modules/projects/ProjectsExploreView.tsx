"use client";

import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  ExternalLink,
  Filter,
  MapPin,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import SmartSearch from "@/components/modules/search/SmartSearch";
import type { ProjectListingItem } from "@/data/projects.data";

interface ProjectsExploreViewProps {
  initialProjects: ProjectListingItem[];
}

const ITEMS_PER_PAGE = 6;

// Helper to parse numeric price from string like "$38,000"
function parsePrice(priceStr: string): number {
  return Number(priceStr.replace(/[^0-9]/g, "")) || 0;
}

export default function ProjectsExploreView({
  initialProjects,
}: ProjectsExploreViewProps) {
  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("All");
  const [selectedRating, setSelectedRating] = useState<string>("All");
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [selectedDate, setSelectedDate] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("featured");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // Mobile Filter Drawer Toggle
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter & Sort Logic
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      // 1. Search Query
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesDesc = project.shortDescription
          .toLowerCase()
          .includes(query);
        const matchesTech = project.techStack.some((t) =>
          t.toLowerCase().includes(query),
        );
        const matchesCategory = project.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesTech && !matchesCategory) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory !== "All" && project.category !== selectedCategory) {
        return false;
      }

      // 3. Price / Budget Filter
      if (selectedPriceRange !== "All") {
        const priceNum = parsePrice(project.price);
        if (selectedPriceRange === "under-30k" && priceNum >= 30000)
          return false;
        if (
          selectedPriceRange === "30k-40k" &&
          (priceNum < 30000 || priceNum > 40000)
        )
          return false;
        if (selectedPriceRange === "over-40k" && priceNum <= 40000)
          return false;
      }

      // 4. Rating Filter
      if (selectedRating !== "All") {
        const minRating = Number(selectedRating);
        if (project.rating < minRating) return false;
      }

      // 5. Location / Remote Filter
      if (selectedLocation !== "All") {
        if (selectedLocation === "remote") {
          if (!project.location.toLowerCase().includes("remote")) return false;
        } else if (selectedLocation === "us") {
          if (
            !project.location.includes(", CA") &&
            !project.location.includes(", NY") &&
            !project.location.includes(", TX") &&
            !project.location.includes(", MA") &&
            !project.location.includes(", WA") &&
            !project.location.includes(", IL")
          ) {
            return false;
          }
        } else if (selectedLocation === "intl") {
          if (
            !project.location.includes("UK") &&
            !project.location.includes("Germany") &&
            !project.location.includes("Switzerland") &&
            !project.location.includes("Japan") &&
            !project.location.includes("Canada")
          ) {
            return false;
          }
        }
      }

      // 6. Target Date Filter
      if (selectedDate !== "All") {
        if (selectedDate === "2026" && !project.date.includes("2026"))
          return false;
        if (selectedDate === "2027" && !project.date.includes("2027"))
          return false;
      }

      return true;
    });
  }, [
    initialProjects,
    searchTerm,
    selectedCategory,
    selectedPriceRange,
    selectedRating,
    selectedLocation,
    selectedDate,
  ]);

  // Sort Logic
  const sortedProjects = useMemo(() => {
    const list = [...filteredProjects];
    switch (sortBy) {
      case "price-asc":
        return list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
      case "price-desc":
        return list.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
      case "rating-desc":
        return list.sort((a, b) => b.rating - a.rating);
      case "reviews-desc":
        return list.sort((a, b) => b.reviewsCount - a.reviewsCount);
      case "title-asc":
        return list.sort((a, b) => a.title.localeCompare(b.title));
      default: // "featured"
        return list;
    }
  }, [filteredProjects, sortBy]);

  // Pagination Slice
  const totalPages = Math.ceil(sortedProjects.length / ITEMS_PER_PAGE) || 1;
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedProjects, currentPage]);

  const activeFiltersCount =
    (selectedCategory !== "All" ? 1 : 0) +
    (selectedPriceRange !== "All" ? 1 : 0) +
    (selectedRating !== "All" ? 1 : 0) +
    (selectedLocation !== "All" ? 1 : 0) +
    (selectedDate !== "All" ? 1 : 0) +
    (searchTerm.trim() ? 1 : 0);

  const resetAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedPriceRange("All");
    setSelectedRating("All");
    setSelectedLocation("All");
    setSelectedDate("All");
    setSortBy("featured");
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Header Banner */}
      <div className="border-b border-border/70 bg-linear-to-b from-card to-background py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
                <Sparkles className="size-3.5" />
                <span>Sprint Workspace Catalog</span>
              </div>
              <h1 className="font-heading text-3xl font-extrabold sm:text-4xl lg:text-5xl text-foreground tracking-tight">
                Explore Sprint Workspaces
              </h1>
              <p className="max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
                Discover pre-configured agile sprints, engineering
                architectures, and delivery templates tailored for modern
                development squads.
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-xl border border-border/80 bg-background px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted transition"
            >
              <ArrowLeft className="size-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Search & Main Filter Action Bar */}
          <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center">
            {/* Smart Search Input with Auto-complete */}
            <div className="relative flex-1">
              <SmartSearch
                value={searchTerm}
                onChange={(term) => {
                  setSearchTerm(term);
                  setCurrentPage(1);
                }}
                onSelect={(term) => {
                  setSearchTerm(term);
                  setCurrentPage(1);
                }}
                placeholder="Search workspaces by name, keyword, or tech stack (e.g. Kafka, Stripe, Next.js)..."
                className="max-w-none"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:flex-initial">
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full sm:w-auto appearance-none rounded-2xl border border-border/80 bg-card py-3 pl-4 pr-10 text-xs sm:text-sm font-semibold text-foreground shadow-2xs focus:border-primary focus:outline-none cursor-pointer"
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Rating: Highest First</option>
                  <option value="reviews-desc">Most Reviews</option>
                  <option value="title-asc">Alphabetical (A - Z)</option>
                </select>
                <SlidersHorizontal className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              </div>

              {/* Mobile Filter Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden flex items-center gap-1.5 rounded-2xl border border-border/80 bg-card px-4 py-3 text-xs sm:text-sm font-semibold text-foreground shadow-2xs cursor-pointer hover:bg-muted"
              >
                <Filter className="size-4 text-primary" />
                <span>Filters ({activeFiltersCount})</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Explore Content: Sidebar Filters + Products Grid */}
      <div className="mx-auto max-w-7xl px-5 pt-8">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* DESKTOP SIDEBAR FILTERS (5 Field Filters) */}
          <aside
            className={`space-y-6 ${
              mobileFilterOpen ? "block" : "hidden lg:block"
            }`}
          >
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2 font-heading font-bold text-sm text-foreground">
                <Filter className="size-4 text-primary" />
                <span>Refine Workspaces</span>
                {activeFiltersCount > 0 && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                    {activeFiltersCount}
                  </span>
                )}
              </div>

              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline cursor-pointer"
                >
                  <RotateCcw className="size-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* 1. Category Filter */}
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Category
              </p>
              <div className="space-y-1">
                {[
                  "All",
                  "Engineering",
                  "FinTech",
                  "Cloud/DevOps",
                  "Product",
                ].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentPage(1);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <span>{cat}</span>
                    {cat === "All" && <span>{initialProjects.length}</span>}
                    {cat !== "All" && (
                      <span>
                        {
                          initialProjects.filter((p) => p.category === cat)
                            .length
                        }
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Budget / Price Range Filter */}
            <div className="space-y-2 border-t border-border/60 pt-4">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Sprint Budget
              </p>
              <div className="space-y-1">
                {[
                  { id: "All", label: "All Budgets" },
                  { id: "under-30k", label: "Under $30,000" },
                  { id: "30k-40k", label: "$30,000 – $40,000" },
                  { id: "over-40k", label: "Over $40,000" },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => {
                      setSelectedPriceRange(tier.id);
                      setCurrentPage(1);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                      selectedPriceRange === tier.id
                        ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <span>{tier.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Rating Filter */}
            <div className="space-y-2 border-t border-border/60 pt-4">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Minimum Rating
              </p>
              <div className="space-y-1">
                {[
                  { id: "All", label: "All Ratings" },
                  { id: "4.9", label: "★ 4.9 & above" },
                  { id: "4.8", label: "★ 4.8 & above" },
                  { id: "5.0", label: "★ 5.0 Perfect Score" },
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      setSelectedRating(r.id);
                      setCurrentPage(1);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                      selectedRating === r.id
                        ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <span>{r.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Location / Remote Filter */}
            <div className="space-y-2 border-t border-border/60 pt-4">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Location & Timezone
              </p>
              <div className="space-y-1">
                {[
                  { id: "All", label: "All Locations" },
                  { id: "remote", label: "Remote Global" },
                  { id: "us", label: "United States" },
                  { id: "intl", label: "Europe, UK & International" },
                ].map((loc) => (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => {
                      setSelectedLocation(loc.id);
                      setCurrentPage(1);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                      selectedLocation === loc.id
                        ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <span>{loc.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Target Release Date Filter */}
            <div className="space-y-2 border-t border-border/60 pt-4">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Target Timeline
              </p>
              <div className="space-y-1">
                {[
                  { id: "All", label: "All Target Dates" },
                  { id: "2026", label: "Q4 2026 Deliveries" },
                  { id: "2027", label: "Q1 2027 Deliveries" },
                ].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => {
                      setSelectedDate(d.id);
                      setCurrentPage(1);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
                      selectedDate === d.id
                        ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <span>{d.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN RESULTS AREA */}
          <main className="space-y-6">
            {/* Results Status Header */}
            <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border/60 pb-3">
              <p>
                Showing{" "}
                <strong className="text-foreground font-semibold">
                  {sortedProjects.length === 0
                    ? 0
                    : (currentPage - 1) * ITEMS_PER_PAGE + 1}
                  –
                  {Math.min(
                    currentPage * ITEMS_PER_PAGE,
                    sortedProjects.length,
                  )}
                </strong>{" "}
                of{" "}
                <strong className="text-foreground font-semibold">
                  {sortedProjects.length}
                </strong>{" "}
                workspaces
              </p>

              {activeFiltersCount > 0 && (
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline">Active filters:</span>
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="font-semibold text-primary hover:underline cursor-pointer"
                  >
                    Clear all ({activeFiltersCount})
                  </button>
                </div>
              )}
            </div>

            {/* CARDS GRID: 3 cards per row on desktop (in sidebar layout), same height & width */}
            {sortedProjects.length === 0 ? (
              /* Empty State */
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/80 bg-card/40 p-12 text-center space-y-4">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                  <Search className="size-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    No workspaces match your criteria
                  </h3>
                  <p className="text-xs text-muted-foreground max-w-sm">
                    Try adjusting your keyword search, broadening your budget
                    range, or clearing filters to see all available workspaces.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition shadow-sm cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {paginatedProjects.map((project) => (
                  <article
                    key={project.id}
                    className="group flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-card overflow-hidden shadow-2xs transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
                  >
                    <div>
                      {/* Card Image Area with Fixed Aspect Ratio */}
                      <Link
                        href={`/projects/${project.id}`}
                        className="relative block aspect-video w-full overflow-hidden bg-muted"
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <span className="absolute top-3 left-3 rounded-full border border-border/80 bg-background/90 px-2.5 py-0.5 text-[10px] font-semibold text-foreground backdrop-blur-md shadow-2xs">
                          {project.category}
                        </span>
                      </Link>

                      {/* Card Content Area */}
                      <div className="p-5 space-y-3">
                        <Link href={`/projects/${project.id}`}>
                          <h3 className="font-heading text-base font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                        </Link>

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
                      <Link
                        href={`/projects/${project.id}`}
                        className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-border/80 bg-muted/40 py-2.5 text-xs font-bold text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-150 cursor-pointer active:scale-98"
                      >
                        <span>View Details</span>
                        <ExternalLink className="size-3" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* FULLY FUNCTIONAL PAGINATION CONTROLS */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/60 pt-8 text-xs">
                <p className="text-muted-foreground">
                  Page{" "}
                  <strong className="text-foreground">{currentPage}</strong> of{" "}
                  <strong className="text-foreground">{totalPages}</strong>
                </p>

                <div className="flex items-center gap-1.5">
                  {/* Prev Button */}
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex size-9 items-center justify-center rounded-xl border border-border/80 bg-card text-foreground hover:bg-muted disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="size-4" />
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNumber = idx + 1;
                    const isActive = currentPage === pageNumber;
                    return (
                      <button
                        key={`page-btn-${pageNumber}`}
                        type="button"
                        onClick={() => handlePageChange(pageNumber)}
                        className={`size-9 rounded-xl text-xs font-bold transition cursor-pointer ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-xs"
                            : "border border-border/80 bg-card text-foreground hover:bg-muted"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                  {/* Next Button */}
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex size-9 items-center justify-center rounded-xl border border-border/80 bg-card text-foreground hover:bg-muted disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer"
                    aria-label="Next page"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
