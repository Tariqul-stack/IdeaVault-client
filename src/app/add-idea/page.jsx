"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSession } from "@/lib/auth-client";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
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
  RiArrowDownSLine,
  RiSendPlaneLine,
} from "react-icons/ri";

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

export default function AddIdeaPage() {
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

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
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
        tags: formData.tags || "",
      };

      await axiosInstance.post("/api/ideas", payload);
      toast.success("Idea submitted successfully! 🚀");
      router.push("/ideas");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit idea. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex animate-pulse flex-col items-center">
          <div className="mb-4 h-4 w-40 rounded-full bg-[var(--nav-surface-soft)]"></div>
          <div className="mb-3 h-10 w-64 rounded-xl bg-[var(--nav-surface-soft)] sm:w-96"></div>
          <div className="h-6 w-80 rounded-xl bg-[var(--nav-surface-soft)] sm:w-[32rem]"></div>
        </div>
        <div className="animate-pulse rounded-3xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-8 md:p-10">
          <div className="mb-8 h-8 w-24 rounded-full bg-[var(--nav-surface-soft)]"></div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="h-16 rounded-xl bg-[var(--nav-surface-soft)]"></div>
            <div className="h-16 rounded-xl bg-[var(--nav-surface-soft)]"></div>
          </div>
          <div className="mt-6 h-16 w-full rounded-xl bg-[var(--nav-surface-soft)]"></div>
          <div className="mt-6 h-32 w-full rounded-xl bg-[var(--nav-surface-soft)]"></div>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="h-28 rounded-xl bg-[var(--nav-surface-soft)]"></div>
            <div className="h-28 rounded-xl bg-[var(--nav-surface-soft)]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect in useEffect
  }

  const fieldStyles =
    "w-full rounded-xl border border-[var(--nav-shell-border)] bg-[var(--nav-surface-soft)] px-4 py-3 text-sm text-[var(--nav-foreground-strong)] placeholder:text-[var(--nav-foreground-muted)] focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/60 transition-all duration-200 dark:bg-[var(--nav-surface-soft)]";

  const Label = ({ icon: Icon, children, required }) => (
    <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-[var(--nav-foreground-strong)]">
      <Icon className="text-purple-400" size={15} />
      {children}
      {required && <span className="text-red-400"> *</span>}
    </label>
  );

  const ErrorMsg = ({ error }) =>
    error ? <p className="mt-1 text-xs text-red-400">{error}</p> : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Top Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-10 flex flex-col items-center text-center"
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="h-[2px] w-8 rounded-full bg-[var(--nav-brand)]/60"></div>
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--nav-brand)]">
            SUBMIT YOUR VISION
          </span>
          <div className="h-[2px] w-8 rounded-full bg-[var(--nav-brand)]/60"></div>
        </div>
        <h1 className="mb-3 text-4xl font-black tracking-tight text-[var(--nav-foreground-strong)] sm:text-5xl">
          Add a New Idea
        </h1>
        <p className="max-w-xl text-lg font-light text-[var(--nav-foreground-muted)]">
          Fill in the details to share your startup concept with the community.
        </p>
      </motion.div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        className="relative overflow-hidden rounded-3xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-8 shadow-2xl backdrop-blur-xl md:p-10"
      >
        <div className="absolute right-8 top-8 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs uppercase tracking-widest text-purple-400">
          PRIVATE ROUTE
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Row 1 */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label icon={RiLightbulbLine} required>
                Idea Title
              </Label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={fieldStyles}
                placeholder="Name your idea"
              />
              <ErrorMsg error={errors.title} />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label icon={RiApps2Line} required>
                Category
              </Label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`${fieldStyles} appearance-none pr-10`}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[var(--nav-foreground-muted)]">
                  <RiArrowDownSLine size={20} />
                </div>
              </div>
              <ErrorMsg error={errors.category} />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col gap-1.5">
            <Label icon={RiFileTextLine} required>
              Short Description
            </Label>
            <input
              type="text"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              className={fieldStyles}
              placeholder="One sentence that captures your idea"
            />
            <ErrorMsg error={errors.shortDescription} />
          </div>

          {/* Row 3 */}
          <div className="flex flex-col gap-1.5">
            <Label icon={RiArticleLine} required>
              Detailed Description
            </Label>
            <textarea
              name="detailedDescription"
              value={formData.detailedDescription}
              onChange={handleChange}
              className={`${fieldStyles} min-h-[120px] resize-y`}
              placeholder="Describe your idea in depth..."
            />
            <ErrorMsg error={errors.detailedDescription} />
          </div>

          {/* Row 4 */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label icon={RiQuestionLine} required>
                Problem Statement
              </Label>
              <textarea
                name="problemStatement"
                value={formData.problemStatement}
                onChange={handleChange}
                className={`${fieldStyles} min-h-[100px] resize-y`}
                placeholder="What problem are you solving?"
              />
              <ErrorMsg error={errors.problemStatement} />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label icon={RiCheckboxCircleLine} required>
                Proposed Solution
              </Label>
              <textarea
                name="proposedSolution"
                value={formData.proposedSolution}
                onChange={handleChange}
                className={`${fieldStyles} min-h-[100px] resize-y`}
                placeholder="How does your idea solve it?"
              />
              <ErrorMsg error={errors.proposedSolution} />
            </div>
          </div>

          {/* Row 5 */}
          <div className="flex flex-col gap-1.5">
            <Label icon={RiGroupLine} required>
              Target Audience
            </Label>
            <input
              type="text"
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleChange}
              className={fieldStyles}
              placeholder="Who is this for?"
            />
            <ErrorMsg error={errors.targetAudience} />
          </div>

          {/* Row 6 */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label icon={RiMoneyDollarCircleLine}>Estimated Budget</Label>
              <input
                type="text"
                name="estimatedBudget"
                value={formData.estimatedBudget}
                onChange={handleChange}
                className={fieldStyles}
                placeholder="e.g. $50,000 – $200,000"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label icon={RiImageLine}>Cover Image URL</Label>
              <input
                type="text"
                name="coverImageUrl"
                value={formData.coverImageUrl}
                onChange={handleChange}
                className={fieldStyles}
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Row 7 */}
          <div className="flex flex-col gap-1.5">
            <Label icon={RiPriceTag3Line}>Tags</Label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className={fieldStyles}
              placeholder="AI, healthcare, B2C (comma-separated)"
            />
            <p className="text-xs text-[var(--nav-foreground-muted)]">
              Separate tags with commas
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#8b76ff_0%,#6e56ff_100%)] py-3.5 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(112,86,255,0.38)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(112,86,255,0.48)] disabled:transform-none disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <RiSendPlaneLine size={18} />
                  <span>Submit Idea &rarr;</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
