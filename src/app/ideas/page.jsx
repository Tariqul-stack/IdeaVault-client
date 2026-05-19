"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axiosInstance from "@/lib/axios";
import { Search, SlidersHorizontal, Clock, MessageSquare, ChevronDown } from "lucide-react";

const CATEGORIES = [
  "All Categories",
  "Artificial Intelligence",
  "Technology",
  "Health & Wellness",
  "Education",
  "FinTech",
  "Sustainability",
  "Social Impact",
  "E-Commerce",
  "Entertainment",
  "Other",
];

const LIMIT = 9;

export default function IdeasPage() {
  const router = useRouter();

  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchIdeas = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: LIMIT,
      };
      if (search) params.search = search;
      if (category && category !== "All Categories") {
        params.category = category;
      }

      const res = await axiosInstance.get("/api/ideas", { params });
      
      let fetchedIdeas = res.data.ideas || [];

      // Client-side sort by time
      if (sortBy === "oldest") {
        fetchedIdeas = [...fetchedIdeas].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      } else {
        // Default: newest first
        fetchedIdeas = [...fetchedIdeas].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      }

      setIdeas(fetchedIdeas);
      setTotalCount(res.data.totalCount || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Debounce search by 400ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      fetchIdeas();
    }, 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // Category and sort trigger fetch immediately
  useEffect(() => {
    setCurrentPage(1);
    fetchIdeas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, sortBy]);

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  const getCategoryColor = (cat) => {
    const colors = {
      "Artificial Intelligence": "bg-violet-500/15 text-violet-400 border-violet-500/20",
      "Technology": "bg-blue-500/15 text-blue-400 border-blue-500/20",
      "Health & Wellness": "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
      "Education": "bg-amber-500/15 text-amber-400 border-amber-500/20",
      "FinTech": "bg-green-500/15 text-green-400 border-green-500/20",
      "Sustainability": "bg-teal-500/15 text-teal-400 border-teal-500/20",
      "Social Impact": "bg-pink-500/15 text-pink-400 border-pink-500/20",
      "E-Commerce": "bg-orange-500/15 text-orange-400 border-orange-500/20",
      "Entertainment": "bg-red-500/15 text-red-400 border-red-500/20",
      "Other": "bg-gray-500/15 text-gray-400 border-gray-500/20",
    };
    return colors[cat] || "bg-purple-500/15 text-purple-400 border-purple-500/20";
  };

  const truncateCategory = (cat) => {
    if (!cat) return "";
    return cat.length > 12 ? cat.substring(0, 12) + "..." : cat;
  };

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* PAGE HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="h-[2px] w-6 rounded bg-violet-500"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-violet-500">
              ALL IDEAS
            </span>
          </div>
          <h1 className="mb-3 text-4xl font-black tracking-tight text-[var(--nav-foreground-strong)] md:text-5xl">
            Browse the Full Idea Library
          </h1>
          <p className="mb-10 text-base text-[var(--nav-foreground-muted)]">
            Search, filter, and discover every startup idea on the platform.
          </p>
        </motion.div>

        {/* SEARCH + FILTER BAR */}
        <div className="mb-8 flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--nav-foreground-muted)]" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by idea title..."
              className="w-full rounded-2xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] py-3 pl-11 pr-4 text-sm text-[var(--nav-foreground-strong)] placeholder:text-[var(--nav-foreground-muted)] transition-all duration-200 focus:border-purple-500/60 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
            />
          </div>

          <div className="relative min-w-[160px]">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full appearance-none rounded-2xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] py-3 pl-4 pr-9 text-sm text-[var(--nav-foreground-strong)] transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/40"
            >
              <option value="" disabled hidden>
                Category
              </option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--nav-foreground-muted)]" size={16} />
          </div>

          <div className="relative min-w-[130px]">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none rounded-2xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] py-3 pl-4 pr-9 text-sm text-[var(--nav-foreground-strong)] transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/40"
            >
              <option value="">All Time</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--nav-foreground-muted)]" size={16} />
          </div>

          <div className="hidden items-center md:flex ml-auto pl-4">
            <span className="text-sm text-[var(--nav-foreground-muted)]">
              Showing {ideas.length} of {totalCount}+ ideas
            </span>
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse rounded-3xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-6">
                <div className="mb-4 h-5 w-20 rounded-full bg-[var(--nav-surface-soft)]"></div>
                <div className="mb-3 h-6 w-3/4 rounded-xl bg-[var(--nav-surface-soft)]"></div>
                <div className="mb-2 h-4 w-full rounded-lg bg-[var(--nav-surface-soft)]"></div>
                <div className="mb-6 h-4 w-2/3 rounded-lg bg-[var(--nav-surface-soft)]"></div>
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-[var(--nav-surface-soft)]"></div>
                  <div className="h-4 w-24 rounded-lg bg-[var(--nav-surface-soft)]"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* IDEAS GRID */}
        {!loading && ideas.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ideas.map((idea, index) => (
              <motion.div
                key={idea._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => router.push(`/ideas/${idea._id}`)}
                className="group flex cursor-pointer flex-col gap-4 rounded-3xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-6 transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_8px_32px_rgba(139,118,255,0.12)]"
              >
                {/* CARD TOP ROW */}
                <div className="flex justify-between items-center">
                  <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${getCategoryColor(idea.category)}`}>
                    {truncateCategory(idea.category)}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock size={12} className="text-[var(--nav-foreground-muted)]" />
                    <span className="text-xs text-[var(--nav-foreground-muted)]">
                      {timeAgo(idea.createdAt)}
                    </span>
                  </div>
                </div>

                {/* CARD TITLE */}
                <h3 className="line-clamp-2 text-lg font-bold leading-snug text-[var(--nav-foreground-strong)] transition-colors duration-200 group-hover:text-purple-400">
                  {idea.title}
                </h3>

                {/* CARD DESCRIPTION */}
                <p className="line-clamp-2 text-sm leading-relaxed text-[var(--nav-foreground-muted)]">
                  {idea.shortDescription}
                </p>

                {/* CARD BOTTOM */}
                <div className="mt-auto flex items-center justify-between border-t border-[var(--nav-shell-border)] pt-4">
                  <div className="flex items-center gap-2">
                    {idea.authorImage ? (
                      <img
                        src={idea.authorImage}
                        alt={idea.authorName || "Author"}
                        className="h-7 w-7 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-xs font-bold text-white">
                        {idea.authorName ? idea.authorName[0].toUpperCase() : "U"}
                      </div>
                    )}
                    <span className="text-sm font-medium text-[var(--nav-foreground-strong)]">
                      {idea.authorName || "Anonymous"}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/ideas/${idea._id}`);
                    }}
                    className="rounded-xl border border-[var(--nav-shell-border)] bg-[var(--nav-surface-soft)] px-4 py-2 text-xs font-semibold text-[var(--nav-foreground-muted)] transition-all duration-200 hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-purple-400"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && ideas.length === 0 && (
          <div className="py-20 text-center">
            <div className="mb-4 text-5xl">💡</div>
            <h3 className="mb-2 text-xl font-bold text-[var(--nav-foreground-strong)]">
              No ideas found
            </h3>
            <p className="text-[var(--nav-foreground-muted)]">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
