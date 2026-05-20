"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "@/lib/axios";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import {
  ArrowLeft, Clock, Tag, Users, DollarSign,
  MessageSquare, Pencil, Trash2, Send,
  Eye, Bookmark, BarChart2, X
} from "lucide-react";

export default function FullIdeaView() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");
  
  const [deleteModal, setDeleteModal] = useState({ 
    open: false, type: null, id: null, title: "" 
  });
  const [deleting, setDeleting] = useState(false);
  
  const commentInputRef = useRef(null);

  // Fetch idea
  useEffect(() => {
    const fetchIdea = async () => {
      try {
        const res = await axiosInstance.get(`/api/ideas/${id}`);
        setIdea(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchIdea();
  }, [id]);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      setCommentsLoading(true);
      try {
        const res = await axiosInstance.get(`/api/ideas/${id}/comments`);
        setComments(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setCommentsLoading(false);
      }
    };
    if (id) fetchComments();
  }, [id]);

  const handleSubmitComment = async () => {
    if (!session) {
      toast.error("Please login to comment");
      return;
    }
    if (!commentText.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    setSubmittingComment(true);
    try {
      const res = await axiosInstance.post(`/api/ideas/${id}/comments`, {
        text: commentText.trim(),
      });
      setComments((prev) => [res.data, ...prev]);
      setCommentText("");
      toast.success("Comment posted!");
    } catch (err) {
      toast.error("Failed to post comment");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleUpdateComment = async (commentId) => {
    if (!editingText.trim()) return;
    try {
      await axiosInstance.patch(`/api/ideas/${id}/comments/${commentId}`, {
        text: editingText.trim(),
      });
      setComments((prev) =>
        prev.map((c) => (c._id === commentId ? { ...c, text: editingText.trim() } : c))
      );
      setEditingCommentId(null);
      setEditingText("");
      toast.success("Comment updated!");
    } catch (err) {
      toast.error("Failed to update comment");
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      if (deleteModal.type === "idea") {
        await axiosInstance.delete(`/api/ideas/${deleteModal.id}`);
        toast.success("Idea deleted!");
        router.push("/ideas");
      } else if (deleteModal.type === "comment") {
        await axiosInstance.delete(`/api/ideas/${id}/comments/${deleteModal.id}`);
        setComments((prev) => prev.filter((c) => c._id !== deleteModal.id));
        toast.success("Comment deleted!");
      }
      setDeleteModal({ open: false, type: null, id: null, title: "" });
    } catch (err) {
      toast.error("Failed to delete");
    } finally {
      setDeleting(false);
    }
  };

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

  const isIdeaAuthor = idea && session?.user && idea.authorId === session.user.id;
  const isCommentAuthor = (comment) => session?.user && comment.userId === session.user.id;

  if (loading) {
    return (
      <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="animate-pulse space-y-8">
            <div className="h-4 w-32 rounded-full bg-[var(--nav-surface-soft)]"></div>
            <div className="h-10 w-3/4 rounded-xl bg-[var(--nav-surface-soft)] md:w-1/2"></div>
            <div className="flex flex-col gap-6 lg:flex-row">
              <div className="flex-1 space-y-6">
                <div className="h-96 rounded-3xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-8"></div>
                <div className="h-64 rounded-3xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-8"></div>
              </div>
              <div className="w-full space-y-4 lg:w-[300px]">
                <div className="h-48 rounded-3xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-6"></div>
                <div className="h-40 rounded-3xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-[var(--nav-foreground-muted)]">Idea not found.</p>
          <button
            onClick={() => router.back()}
            className="mt-4 text-sm font-semibold text-violet-400 hover:text-violet-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        
        {/* BACK BUTTON */}
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-sm text-[var(--nav-foreground-muted)] transition-colors duration-200 hover:text-[var(--nav-foreground-strong)]"
        >
          <ArrowLeft size={16} />
          Back to Ideas
        </button>

        {/* BREADCRUMB */}
        <div className="mb-8 flex items-center gap-2">
          <div className="h-[2px] w-6 rounded bg-violet-500" />
          <span className="text-xs font-bold uppercase tracking-widest text-violet-500">
            IDEA DETAIL
          </span>
          <span className="text-xs text-[var(--nav-foreground-muted)]">—</span>
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--nav-foreground-muted)]">
            PRIVATE ROUTE
          </span>
        </div>

        {/* MAIN HEADING */}
        <h1 className="mb-8 text-3xl font-black tracking-tight text-[var(--nav-foreground-strong)] md:text-4xl">
          Full Idea View
        </h1>

        {/* TWO COLUMN LAYOUT */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          
          {/* === LEFT COLUMN === */}
          <div className="flex-1 space-y-6">
            
            {/* MAIN IDEA CARD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl"
            >
              {/* Tags row */}
              {idea.tags && idea.tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {idea.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="rounded-full border border-violet-500/20 bg-violet-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h2 className="mb-4 text-3xl font-black leading-tight tracking-tight text-[var(--nav-foreground-strong)] md:text-4xl">
                {idea.title}
              </h2>

              {/* Author meta row */}
              <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-[var(--nav-foreground-muted)]">
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
                  <span className="font-medium text-[var(--nav-foreground-strong)]">
                    {idea.authorName || "Anonymous"}
                  </span>
                </div>
                <span>Posted {timeAgo(idea.createdAt)}</span>
                <span className="flex items-center gap-1">
                  <MessageSquare size={14} /> {comments.length} comments
                </span>
                {idea.estimatedBudget && (
                  <span className="flex items-center gap-1">
                    <DollarSign size={14} /> Budget: {idea.estimatedBudget}
                  </span>
                )}
              </div>

              {/* Edit/Delete buttons if Author */}
              {isIdeaAuthor && (
                <div className="mb-6 flex gap-2">
                  <button
                    onClick={() => router.push(`/ideas/${id}/edit`)}
                    className="flex items-center gap-1.5 rounded-xl border border-[var(--nav-shell-border)] bg-[var(--nav-surface-soft)] px-4 py-2 text-xs font-semibold text-[var(--nav-foreground-muted)] transition-all duration-200 hover:border-violet-500/40 hover:text-violet-400"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    onClick={() =>
                      setDeleteModal({
                        open: true,
                        type: "idea",
                        id: idea._id,
                        title: idea.title,
                      })
                    }
                    className="flex items-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2 text-xs font-semibold text-red-400 transition-all duration-200 hover:border-red-500/40 hover:bg-red-500/10"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              )}

              {/* Sections */}
              <div className="space-y-6">
                {idea.problemStatement && (
                  <div>
                    <h2 className="mb-2 text-base font-bold text-[var(--nav-foreground-strong)]">
                      Problem Statement
                    </h2>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-[var(--nav-foreground-muted)]">
                      {idea.problemStatement}
                    </p>
                  </div>
                )}
                {idea.proposedSolution && (
                  <div>
                    <h2 className="mb-2 text-base font-bold text-[var(--nav-foreground-strong)]">
                      Proposed Solution
                    </h2>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-[var(--nav-foreground-muted)]">
                      {idea.proposedSolution}
                    </p>
                  </div>
                )}
                {idea.targetAudience && (
                  <div>
                    <h2 className="mb-2 text-base font-bold text-[var(--nav-foreground-strong)]">
                      Target Audience
                    </h2>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-[var(--nav-foreground-muted)]">
                      {idea.targetAudience}
                    </p>
                  </div>
                )}
                {idea.detailedDescription && (
                  <div>
                    <h2 className="mb-2 text-base font-bold text-[var(--nav-foreground-strong)]">
                      Detailed Description
                    </h2>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-[var(--nav-foreground-muted)]">
                      {idea.detailedDescription}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* COMMENTS SECTION */}
            <div className="rounded-3xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-8 backdrop-blur-xl">
              <h2 className="mb-6 text-xl font-bold text-[var(--nav-foreground-strong)]">
                Community Discussion ({comments.length})
              </h2>

              {/* Comment Input */}
              <div className="mb-6 flex gap-3">
                <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full">
                  {session?.user?.image ? (
                    <img
                      src={session.user.image}
                      alt="User"
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : session?.user ? (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-500 to-purple-600 text-sm font-bold text-white">
                      {session.user.name ? session.user.name[0].toUpperCase() : "U"}
                    </div>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[var(--nav-surface-soft)] text-[var(--nav-foreground-muted)]">
                      <MessageSquare size={16} />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <textarea
                    ref={commentInputRef}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder={
                      session
                        ? "Share your thoughts or feedback on this idea..."
                        : "Login to join the discussion"
                    }
                    disabled={!session}
                    rows={3}
                    className="w-full resize-none rounded-2xl border border-[var(--nav-shell-border)] bg-[var(--nav-surface-soft)] px-4 py-3 text-sm text-[var(--nav-foreground-strong)] placeholder:text-[var(--nav-foreground-muted)] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 focus:border-purple-500/60 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                  />
                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={handleSubmitComment}
                      disabled={submittingComment || !session}
                      className="flex items-center gap-2 rounded-xl bg-[linear-gradient(135deg,#8b76ff_0%,#6e56ff_100%)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(112,86,255,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(112,86,255,0.4)] disabled:transform-none disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submittingComment ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      ) : (
                        <Send size={14} />
                      )}
                      Post
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              {commentsLoading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex animate-pulse gap-3">
                      <div className="h-9 w-9 shrink-0 rounded-full bg-[var(--nav-surface-soft)]"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-1/4 rounded bg-[var(--nav-surface-soft)]"></div>
                        <div className="h-3 w-full rounded bg-[var(--nav-surface-soft)]"></div>
                        <div className="h-3 w-3/4 rounded bg-[var(--nav-surface-soft)]"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {comments.map((comment) => (
                    <motion.div
                      key={comment._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3 rounded-2xl border border-[var(--nav-shell-border)] bg-[var(--nav-surface-soft)] p-4"
                    >
                      <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full">
                        {comment.userImage ? (
                          <img
                            src={comment.userImage}
                            alt={comment.userName}
                            className="h-full w-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-500 to-purple-600 text-sm font-bold text-white">
                            {comment.userName ? comment.userName[0].toUpperCase() : "U"}
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-semibold text-[var(--nav-foreground-strong)]">
                              {comment.userName}
                            </span>
                            <span className="ml-2 text-xs text-[var(--nav-foreground-muted)]">
                              {timeAgo(comment.createdAt)}
                            </span>
                          </div>

                          {isCommentAuthor(comment) && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setEditingCommentId(comment._id);
                                  setEditingText(comment.text);
                                }}
                                className="text-xs font-medium text-[var(--nav-foreground-muted)] transition-colors duration-200 hover:text-violet-400"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  setDeleteModal({
                                    open: true,
                                    type: "comment",
                                    id: comment._id,
                                    title: comment.text.substring(0, 40) + "...",
                                  })
                                }
                                className="text-xs font-medium text-[var(--nav-foreground-muted)] transition-colors duration-200 hover:text-red-400"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>

                        {editingCommentId === comment._id ? (
                          <div className="mt-2">
                            <textarea
                              value={editingText}
                              onChange={(e) => setEditingText(e.target.value)}
                              rows={2}
                              className="w-full resize-none rounded-xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] px-3 py-2 text-sm text-[var(--nav-foreground-strong)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                            />
                            <div className="mt-2 flex justify-end gap-2">
                              <button
                                onClick={() => {
                                  setEditingCommentId(null);
                                  setEditingText("");
                                }}
                                className="rounded-lg border border-[var(--nav-shell-border)] px-3 py-1.5 text-xs font-medium text-[var(--nav-foreground-muted)] transition-colors duration-200 hover:text-[var(--nav-foreground-strong)]"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleUpdateComment(comment._id)}
                                className="rounded-lg border border-violet-500/30 bg-violet-500/20 px-3 py-1.5 text-xs font-semibold text-violet-400 transition-all duration-200 hover:bg-violet-500/30"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-[var(--nav-foreground-muted)]">
                            {comment.text}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  {comments.length === 0 && !commentsLoading && (
                    <p className="text-sm text-[var(--nav-foreground-muted)] text-center py-4">
                      No comments yet. Be the first to share your thoughts!
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* === RIGHT COLUMN (sidebar) === */}
          <div className="space-y-4 lg:sticky lg:top-24 lg:w-[300px]">
            
            {/* IDEA STATS CARD */}
            <div className="rounded-3xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-6 backdrop-blur-xl">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-[var(--nav-foreground-muted)]">
                IDEA STATS
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--nav-foreground-muted)]">Views</span>
                  <span className="text-sm font-bold text-[var(--nav-foreground-strong)]">1,240</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--nav-foreground-muted)]">Comments</span>
                  <span className="text-sm font-bold text-[var(--nav-foreground-strong)]">{comments.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--nav-foreground-muted)]">Bookmarks</span>
                  <span className="text-sm font-bold text-[var(--nav-foreground-strong)]">89</span>
                </div>

                <div className="my-4 border-t border-[var(--nav-shell-border)]"></div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--nav-foreground-muted)]">Category</span>
                  <span className="text-sm font-bold text-[var(--nav-foreground-strong)]">{idea.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--nav-foreground-muted)]">Budget Est.</span>
                  <span className="text-sm font-bold text-[var(--nav-foreground-strong)]">{idea.estimatedBudget || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[var(--nav-foreground-muted)]">Tags</span>
                  <span className="text-right text-sm font-bold text-violet-400">
                    {idea.tags?.join(", ") || "—"}
                  </span>
                </div>
              </div>
            </div>

            {/* ABOUT THE AUTHOR CARD */}
            <div className="rounded-3xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-6 backdrop-blur-xl">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-[var(--nav-foreground-muted)]">
                ABOUT THE AUTHOR
              </h3>
              <div className="mb-4 flex items-center gap-3">
                {idea.authorImage ? (
                  <img
                    src={idea.authorImage}
                    alt={idea.authorName || "Author"}
                    className="h-12 w-12 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-lg font-bold text-white">
                    {idea.authorName ? idea.authorName[0].toUpperCase() : "U"}
                  </div>
                )}
                <div>
                  <p className="text-sm font-bold text-[var(--nav-foreground-strong)]">
                    {idea.authorName}
                  </p>
                  <p className="text-xs text-[var(--nav-foreground-muted)]">Innovator</p>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-[var(--nav-foreground-muted)]">
                5 ideas shared · 120 comments · Member since Jan 2024
              </p>
            </div>

            {/* ACTION BUTTONS CARD */}
            <div className="space-y-3 rounded-3xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-4 backdrop-blur-xl">
              <button
                onClick={() => commentInputRef.current?.focus()}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#8b76ff_0%,#6e56ff_100%)] py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(112,86,255,0.3)] transition-all duration-200 hover:-translate-y-0.5"
              >
                <MessageSquare size={16} />
                Join Discussion
              </button>
              <button
                onClick={() => toast.success("Bookmarked! (coming soon)")}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[var(--nav-shell-border)] bg-[var(--nav-surface-soft)] py-3 text-sm font-semibold text-[var(--nav-foreground-muted)] transition-all duration-200 hover:border-violet-500/40 hover:text-violet-400"
              >
                <Bookmark size={16} />
                Bookmark Idea
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {deleteModal.open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() =>
                !deleting && setDeleteModal({ open: false, type: null, id: null, title: "" })
              }
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
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
                Are you sure you want to delete "{deleteModal.title}"?{" "}
                {deleteModal.type === "idea"
                  ? "This action cannot be undone and all comments will be removed."
                  : "This action cannot be undone."}
              </p>
              <div className="flex gap-3">
                <button
                  disabled={deleting}
                  onClick={() =>
                    setDeleteModal({ open: false, type: null, id: null, title: "" })
                  }
                  className="flex-1 rounded-2xl border border-[var(--nav-shell-border)] bg-[var(--nav-surface-soft)] py-3 text-sm font-semibold text-[var(--nav-foreground-strong)] transition-all duration-200 hover:bg-[var(--nav-surface-soft)]/80 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
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
