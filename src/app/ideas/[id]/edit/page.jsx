"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import {
  RiLightbulbLine,
  RiApps2Line,
  RiFileTextLine,
  RiArticleLine,
  RiQuestionLine,
  RiCheckboxCircleLine,
  RiGroupLine,
  RiMoneyDollarCircleLine,
  RiImageLine,
  RiPriceTag3Line,
  RiSendPlaneLine,
  RiArrowDownSLine,
} from "react-icons/ri";
import { useSession } from "@/lib/auth-client";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

const CATEGORIES = [
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

export default function EditIdeaPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    shortDescription: "",
    detailedDescription: "",
    problemStatement: "",
    proposedSolution: "",
    targetAudience: "",
    estimatedBudget: "",
    coverImageUrl: "",
    tags: "",
  });

  const [ideaLoading, setIdeaLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [fetchError, setFetchError] = useState(null);

  // Authentication Redirect
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  // Fetch Idea Details & Verify Ownership
  useEffect(() => {
    const fetchIdea = async () => {
      try {
        setIdeaLoading(true);
        setFetchError(null);
        const res = await axiosInstance.get(`/api/ideas/${id}`);
        const idea = res.data;

        if (session && idea.authorId !== session.user.id) {
          toast.error("Not authorized");
          router.push("/my-ideas");
          return;
        }

        setFormData({
          title: idea.title || "",
          category: idea.category || "",
          shortDescription: idea.shortDescription || "",
          detailedDescription: idea.detailedDescription || "",
          problemStatement: idea.problemStatement || "",
          proposedSolution: idea.proposedSolution || "",
          targetAudience: idea.targetAudience || "",
          estimatedBudget: idea.estimatedBudget || "",
          coverImageUrl: idea.coverImageUrl || "",
          tags: Array.isArray(idea.tags) ? idea.tags.join(", ") : idea.tags || "",
        });
      } catch (err) {
        console.error(err);
        setFetchError("Idea not found or failed to load.");
      } finally {
        setIdeaLoading(false);
      }
    };

    if (id && session) {
      fetchIdea();
    }
  }, [id, session, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const requiredFields = [
      "title",
      "category",
      "shortDescription",
      "detailedDescription",
      "problemStatement",
      "proposedSolution",
      "targetAudience",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field] || !formData[field].trim()) {
        newErrors[field] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        title: formData.title.trim(),
        category: formData.category,
        shortDescription: formData.shortDescription.trim(),
        detailedDescription: formData.detailedDescription.trim(),
        problemStatement: formData.problemStatement.trim(),
        proposedSolution: formData.proposedSolution.trim(),
        targetAudience: formData.targetAudience.trim(),
        estimatedBudget: formData.estimatedBudget.trim() || null,
        coverImageUrl: formData.coverImageUrl.trim() || null,
        tags: formData.tags,
      };

      await axiosInstance.patch(`/api/ideas/${id}`, payload);
      toast.success("Idea updated successfully!");
      router.push(`/ideas/${id}`);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 403) {
        toast.error("Not authorized to edit this idea");
      } else {
        toast.error("Failed to update idea. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // SKELETON LOADING STATE
  if (isPending || (ideaLoading && !fetchError)) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Back button skeleton */}
        <div className="mb-6 h-4 w-20 rounded bg-[var(--nav-surface-soft)] animate-pulse"></div>

        {/* Header skeleton */}
        <div className="mb-10 animate-pulse space-y-3">
          <div className="h-4 w-24 rounded bg-[var(--nav-surface-soft)]"></div>
          <div className="h-8 w-64 rounded-xl bg-[var(--nav-surface-soft)]"></div>
          <div className="h-4 w-96 rounded bg-[var(--nav-surface-soft)]"></div>
        </div>

        {/* Form card skeleton */}
        <div className="rounded-3xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-8 md:p-10 animate-pulse space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="h-10 rounded-xl bg-[var(--nav-surface-soft)]"></div>
            <div className="h-10 rounded-xl bg-[var(--nav-surface-soft)]"></div>
          </div>
          <div className="h-10 rounded-xl bg-[var(--nav-surface-soft)]"></div>
          <div className="h-24 rounded-xl bg-[var(--nav-surface-soft)]"></div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="h-20 rounded-xl bg-[var(--nav-surface-soft)]"></div>
            <div className="h-20 rounded-xl bg-[var(--nav-surface-soft)]"></div>
          </div>
          <div className="h-10 rounded-xl bg-[var(--nav-surface-soft)]"></div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="h-10 rounded-xl bg-[var(--nav-surface-soft)]"></div>
            <div className="h-10 rounded-xl bg-[var(--nav-surface-soft)]"></div>
          </div>
          <div className="h-10 rounded-xl bg-[var(--nav-surface-soft)]"></div>
        </div>
      </div>
    );
  }

  // FETCH ERROR STATE
  if (fetchError) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-[var(--nav-foreground-muted)]">{fetchError}</p>
        <button
          onClick={() => router.push("/my-ideas")}
          className="mt-4 text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors"
        >
          ← Back to My Ideas
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      {/* BACK BUTTON */}
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-sm text-[var(--nav-foreground-muted)] transition-colors duration-200 hover:text-[var(--nav-foreground-strong)]"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* TOP HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="mb-3 flex items-center gap-3">
          <div className="h-[2px] w-6 bg-violet-500 rounded" />
          <span className="text-xs font-bold uppercase tracking-widest text-violet-500">
            EDIT IDEA
          </span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-[var(--nav-foreground-strong)] md:text-4xl">
          Update Your Idea
        </h1>
        <p className="mt-2 text-base text-[var(--nav-foreground-muted)]">
          Refine your concept based on community feedback.
        </p>
      </motion.div>

      {/* FORM CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative overflow-hidden rounded-3xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-8 md:p-10 backdrop-blur-xl shadow-xl"
      >
        <div className="absolute top-4 right-4 text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
          Private Route
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Title and Category */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-[var(--nav-foreground-strong)] mb-1.5">
                <RiLightbulbLine className="text-purple-400" size={15} />
                Idea Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter idea title"
                className="w-full rounded-xl border border-[var(--nav-shell-border)] bg-[var(--nav-surface-soft)] px-4 py-3 text-sm text-[var(--nav-foreground-strong)] placeholder:text-[var(--nav-foreground-muted)] focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/60 transition-all duration-200"
              />
              {errors.title && (
                <p className="mt-1 text-xs text-red-400">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-[var(--nav-foreground-strong)] mb-1.5">
                <RiApps2Line className="text-purple-400" size={15} />
                Category <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-xl border border-[var(--nav-shell-border)] bg-[var(--nav-surface-soft)] px-4 py-3 pr-10 text-sm text-[var(--nav-foreground-strong)] focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/60 transition-all duration-200"
                >
                  <option value="" disabled hidden>
                    Select a category
                  </option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <RiArrowDownSLine className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--nav-foreground-muted)]" size={18} />
              </div>
              {errors.category && (
                <p className="mt-1 text-xs text-red-400">{errors.category}</p>
              )}
            </div>
          </div>

          {/* Row 2: Short Description */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-[var(--nav-foreground-strong)] mb-1.5">
              <RiFileTextLine className="text-purple-400" size={15} />
              Short Description <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="Provide a brief summary of your idea"
              className="w-full rounded-xl border border-[var(--nav-shell-border)] bg-[var(--nav-surface-soft)] px-4 py-3 text-sm text-[var(--nav-foreground-strong)] placeholder:text-[var(--nav-foreground-muted)] focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/60 transition-all duration-200"
            />
            {errors.shortDescription && (
              <p className="mt-1 text-xs text-red-400">{errors.shortDescription}</p>
            )}
          </div>

          {/* Row 3: Detailed Description */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-[var(--nav-foreground-strong)] mb-1.5">
              <RiArticleLine className="text-purple-400" size={15} />
              Detailed Description <span className="text-red-400">*</span>
            </label>
            <textarea
              name="detailedDescription"
              value={formData.detailedDescription}
              onChange={handleChange}
              placeholder="Deep dive into your startup concept"
              className="w-full min-h-[120px] rounded-xl border border-[var(--nav-shell-border)] bg-[var(--nav-surface-soft)] px-4 py-3 text-sm text-[var(--nav-foreground-strong)] placeholder:text-[var(--nav-foreground-muted)] focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/60 transition-all duration-200 resize-y"
            />
            {errors.detailedDescription && (
              <p className="mt-1 text-xs text-red-400">{errors.detailedDescription}</p>
            )}
          </div>

          {/* Row 4: Problem Statement and Proposed Solution */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-[var(--nav-foreground-strong)] mb-1.5">
                <RiQuestionLine className="text-purple-400" size={15} />
                Problem Statement <span className="text-red-400">*</span>
              </label>
              <textarea
                name="problemStatement"
                value={formData.problemStatement}
                onChange={handleChange}
                placeholder="What problem does your idea address?"
                className="w-full min-h-[100px] rounded-xl border border-[var(--nav-shell-border)] bg-[var(--nav-surface-soft)] px-4 py-3 text-sm text-[var(--nav-foreground-strong)] placeholder:text-[var(--nav-foreground-muted)] focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/60 transition-all duration-200 resize-y"
              />
              {errors.problemStatement && (
                <p className="mt-1 text-xs text-red-400">{errors.problemStatement}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-[var(--nav-foreground-strong)] mb-1.5">
                <RiCheckboxCircleLine className="text-purple-400" size={15} />
                Proposed Solution <span className="text-red-400">*</span>
              </label>
              <textarea
                name="proposedSolution"
                value={formData.proposedSolution}
                onChange={handleChange}
                placeholder="How does your idea solve the problem?"
                className="w-full min-h-[100px] rounded-xl border border-[var(--nav-shell-border)] bg-[var(--nav-surface-soft)] px-4 py-3 text-sm text-[var(--nav-foreground-strong)] placeholder:text-[var(--nav-foreground-muted)] focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/60 transition-all duration-200 resize-y"
              />
              {errors.proposedSolution && (
                <p className="mt-1 text-xs text-red-400">{errors.proposedSolution}</p>
              )}
            </div>
          </div>

          {/* Row 5: Target Audience */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-[var(--nav-foreground-strong)] mb-1.5">
              <RiGroupLine className="text-purple-400" size={15} />
              Target Audience <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleChange}
              placeholder="Who are the primary users or customers?"
              className="w-full rounded-xl border border-[var(--nav-shell-border)] bg-[var(--nav-surface-soft)] px-4 py-3 text-sm text-[var(--nav-foreground-strong)] placeholder:text-[var(--nav-foreground-muted)] focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/60 transition-all duration-200"
            />
            {errors.targetAudience && (
              <p className="mt-1 text-xs text-red-400">{errors.targetAudience}</p>
            )}
          </div>

          {/* Row 6: Estimated Budget and Cover Image URL */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-[var(--nav-foreground-strong)] mb-1.5">
                <RiMoneyDollarCircleLine className="text-purple-400" size={15} />
                Estimated Budget
              </label>
              <input
                type="text"
                name="estimatedBudget"
                value={formData.estimatedBudget}
                onChange={handleChange}
                placeholder="e.g. $5,000 - $10,000 (optional)"
                className="w-full rounded-xl border border-[var(--nav-shell-border)] bg-[var(--nav-surface-soft)] px-4 py-3 text-sm text-[var(--nav-foreground-strong)] placeholder:text-[var(--nav-foreground-muted)] focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/60 transition-all duration-200"
              />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-[var(--nav-foreground-strong)] mb-1.5">
                <RiImageLine className="text-purple-400" size={15} />
                Cover Image URL
              </label>
              <input
                type="text"
                name="coverImageUrl"
                value={formData.coverImageUrl}
                onChange={handleChange}
                placeholder="Paste an image URL (optional)"
                className="w-full rounded-xl border border-[var(--nav-shell-border)] bg-[var(--nav-surface-soft)] px-4 py-3 text-sm text-[var(--nav-foreground-strong)] placeholder:text-[var(--nav-foreground-muted)] focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/60 transition-all duration-200"
              />
            </div>
          </div>

          {/* Row 7: Tags */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-[var(--nav-foreground-strong)] mb-1.5">
              <RiPriceTag3Line className="text-purple-400" size={15} />
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g. AI, SaaS, Health"
              className="w-full rounded-xl border border-[var(--nav-shell-border)] bg-[var(--nav-surface-soft)] px-4 py-3 text-sm text-[var(--nav-foreground-strong)] placeholder:text-[var(--nav-foreground-muted)] focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/60 transition-all duration-200"
            />
            <p className="mt-1.5 text-xs text-[var(--nav-foreground-muted)]">
              Separate tags with commas
            </p>
          </div>

          {/* Submit buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 rounded-2xl border border-[var(--nav-shell-border)] bg-[var(--nav-surface-soft)] py-3.5 text-sm font-semibold text-[var(--nav-foreground-muted)] transition-all duration-200 hover:text-[var(--nav-foreground-strong)]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-2xl bg-[linear-gradient(135deg,#8b76ff_0%,#6e56ff_100%)] py-3.5 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(112,86,255,0.38)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(112,86,255,0.48)] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="border-2 border-white/30 border-t-white rounded-full w-4 h-4 animate-spin" />
              ) : (
                <RiSendPlaneLine size={16} />
              )}
              {isSubmitting ? "Updating..." : "Update Idea"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
