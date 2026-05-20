"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export default function IdeaCard({ idea, index = 0 }) {
  const router = useRouter();

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      onClick={() => router.push(`/ideas/${idea._id}`)}
      className="group flex cursor-pointer flex-col gap-4 rounded-3xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-6 transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_8px_32px_rgba(139,118,255,0.12)]"
    >
      {/* CARD TOP ROW */}
      <div className="flex items-center justify-between">
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
  );
}
