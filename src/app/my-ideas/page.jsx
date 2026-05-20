"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb,
  Calendar,
  LayoutGrid,
  Clock,
  Tag,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

function MyIdeaCard({ idea, index, onDelete }) {
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
      className="group flex flex-col gap-4 rounded-3xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-6 transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_8px_32px_rgba(139,118,255,0.12)]"
    >
      {/* Card TOP ROW */}
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

      {/* Card COVER IMAGE */}
      {idea.coverImageUrl && (
        <img
          src={idea.coverImageUrl}
          className="h-40 w-full rounded-2xl object-cover"
          alt={idea.title}
          referrerPolicy="no-referrer"
        />
      )}

      {/* Card TITLE */}
      <h3
        onClick={() => router.push(`/ideas/${idea._id}`)}
        className="line-clamp-2 cursor-pointer text-lg font-bold leading-snug text-[var(--nav-foreground-strong)] transition-colors hover:text-purple-400"
      >
        {idea.title}
      </h3>

      {/* Card SHORT DESCRIPTION */}
      <p className="line-clamp-2 text-sm leading-relaxed text-[var(--nav-foreground-muted)]">
        {idea.shortDescription}
      </p>

      {/* Card META ROW */}
      <div className="flex gap-4 text-xs text-[var(--nav-foreground-muted)]">
        <div className="flex items-center gap-1">
          <Calendar size={13} />
          <span>{new Date(idea.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <Tag size={13} />
          <span>{idea.tags?.length || 0} tags</span>
        </div>
      </div>

      {/* Card ACTIONS ROW */}
      <div className="mt-auto flex items-center justify-between border-t border-[var(--nav-shell-border)] pt-4">
        {/* Left: View button */}
        <button
          onClick={() => router.push(`/ideas/${idea._id}`)}
          className="flex items-center gap-1.5 rounded-xl border border-[var(--nav-shell-border)] bg-[var(--nav-surface-soft)] px-4 py-2 text-xs font-semibold text-[var(--nav-foreground-muted)] transition-all duration-200 hover:border-violet-500/40 hover:text-violet-400"
        >
          <Eye size={13} /> View
        </button>

        {/* Right: Edit & Delete buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/ideas/${idea._id}/edit`)}
            className="flex items-center gap-1.5 rounded-xl border border-[var(--nav-shell-border)] bg-[var(--nav-surface-soft)] px-4 py-2 text-xs font-semibold text-[var(--nav-foreground-muted)] transition-all duration-200 hover:border-violet-500/40 hover:text-violet-400"
          >
            <Pencil size={13} /> Edit
          </button>
          <button
            onClick={() => onDelete(idea)}
            className="flex items-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2 text-xs font-semibold text-red-400 transition-all duration-200 hover:border-red-500/40 hover:bg-red-500/10"
          >
            <Trash2 size={13} /> Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function MyIdeasPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    ideaId: null,
    title: "",
  });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (!session) return;
    const fetchMyIdeas = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axiosInstance.get("/api/ideas/my-ideas");
        setIdeas(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch your ideas. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchMyIdeas();
  }, [session]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axiosInstance.delete(`/api/ideas/${deleteModal.ideaId}`);
      setIdeas((prev) => prev.filter((i) => i._id !== deleteModal.ideaId));
      setDeleteModal({ open: false, ideaId: null, title: "" });
      toast.success("Idea deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete idea");
    } finally {
      setDeleting(false);
    }
  };

  if (isPending || loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="mb-10 animate-pulse space-y-3">
          <div className="h-4 w-24 rounded bg-[var(--nav-surface-soft)]"></div>
          <div className="h-8 w-64 rounded-xl bg-[var(--nav-surface-soft)]"></div>
          <div className="h-4 w-96 rounded bg-[var(--nav-surface-soft)]"></div>
        </div>

        {/* Stats skeleton */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-[var(--nav-surface-soft)]"></div>
          ))}
        </div>

        {/* Cards skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-[280px] animate-pulse rounded-3xl bg-[var(--nav-surface-soft)]"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* HEADER SECTION */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="h-[2px] w-6 bg-violet-500 rounded"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-violet-500">
              MY IDEAS
            </span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-[var(--nav-foreground-strong)] md:text-4xl">
            My Idea Dashboard
          </h1>
          <p className="mt-2 text-sm text-[var(--nav-foreground-muted)]">
            Manage and track all the startup ideas you've shared with the community.
          </p>
        </motion.div>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onClick={() => router.push("/add-idea")}
          className="self-start inline-flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#8b76ff_0%,#6e56ff_100%)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(112,86,255,0.38)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(112,86,255,0.48)] md:self-auto"
        >
          + Add New Idea
        </motion.button>
      </div>

      {/* STATS ROW */}
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Total Ideas */}
        <div className="rounded-2xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-5 text-center">
          <div className="mx-auto mb-3 w-fit rounded-xl bg-violet-500/10 p-2 text-violet-400">
            <Lightbulb size={20} />
          </div>
          <p className="text-sm font-medium text-[var(--nav-foreground-muted)]">Total Ideas</p>
          <p className="mt-1 text-3xl font-black tracking-tight text-[var(--nav-foreground-strong)]">
            {ideas.length}
          </p>
        </div>

        {/* This Month */}
        <div className="rounded-2xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-5 text-center">
          <div className="mx-auto mb-3 w-fit rounded-xl bg-violet-500/10 p-2 text-violet-400">
            <Calendar size={20} />
          </div>
          <p className="text-sm font-medium text-[var(--nav-foreground-muted)]">This Month</p>
          <p className="mt-1 text-3xl font-black tracking-tight text-[var(--nav-foreground-strong)]">
            {ideas.filter((idea) => {
              const ideaDate = new Date(idea.createdAt);
              const now = new Date();
              return (
                ideaDate.getMonth() === now.getMonth() &&
                ideaDate.getFullYear() === now.getFullYear()
              );
            }).length}
          </p>
        </div>

        {/* Categories Used */}
        <div className="rounded-2xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-5 text-center">
          <div className="mx-auto mb-3 w-fit rounded-xl bg-violet-500/10 p-2 text-violet-400">
            <LayoutGrid size={20} />
          </div>
          <p className="text-sm font-medium text-[var(--nav-foreground-muted)]">Categories Used</p>
          <p className="mt-1 text-3xl font-black tracking-tight text-[var(--nav-foreground-strong)]">
            {new Set(ideas.map((idea) => idea.category)).size}
          </p>
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="mb-10 text-center text-red-500">
          <p>{error}</p>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && ideas.length === 0 && (
        <div className="py-20 text-center">
          <div className="mb-4 text-5xl">💡</div>
          <h3 className="mb-2 text-xl font-bold text-[var(--nav-foreground-strong)]">
            No ideas yet
          </h3>
          <p className="mb-6 text-[var(--nav-foreground-muted)]">
            Start sharing your startup concepts with the community.
          </p>
          <button
            onClick={() => router.push("/add-idea")}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#8b76ff_0%,#6e56ff_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(112,86,255,0.38)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(112,86,255,0.48)]"
          >
            + Add Your First Idea
          </button>
        </div>
      )}

      {/* IDEAS GRID */}
      {!loading && ideas.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ideas.map((idea, index) => (
            <MyIdeaCard
              key={idea._id}
              idea={idea}
              index={index}
              onDelete={(targetIdea) =>
                setDeleteModal({
                  open: true,
                  ideaId: targetIdea._id,
                  title: targetIdea.title,
                })
              }
            />
          ))}
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {deleteModal.open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() =>
                !deleting && setDeleteModal({ open: false, ideaId: null, title: "" })
              }
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed left-1/2 top-1/2 z-[51] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-8 shadow-[0_32px_80px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
            >
              <h2 className="mb-3 text-xl font-black text-[var(--nav-foreground-strong)]">
                Confirm Deletion
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-[var(--nav-foreground-muted)]">
                Are you sure you want to delete "{deleteModal.title}"? This action cannot be undone
                and all comments will be removed.
              </p>
              <div className="flex gap-3">
                <button
                  disabled={deleting}
                  onClick={() => setDeleteModal({ open: false, ideaId: null, title: "" })}
                  className="flex-1 rounded-2xl border border-[var(--nav-shell-border)] bg-[var(--nav-surface-soft)] py-3 text-sm font-semibold text-[var(--nav-foreground-strong)] transition-all duration-200 hover:bg-[var(--nav-surface-soft)]/80 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  disabled={deleting}
                  onClick={handleDelete}
                  className="flex-1 rounded-2xl border border-red-500/30 bg-red-500/10 py-3 text-sm font-semibold text-red-400 transition-all duration-200 hover:border-red-500/50 hover:bg-red-500/15 disabled:opacity-50"
                >
                  {deleting ? "Deleting..." : "Yes, Delete"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
