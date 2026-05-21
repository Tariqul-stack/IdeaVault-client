"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axiosInstance from "@/lib/axios";
import { useSession } from "@/lib/auth-client";
import {
  RiRobot2Line,
  RiHeartPulseLine,
  RiComputerLine,
  RiGraduationCapLine,
  RiLeafLine,
  RiMoneyDollarCircleLine,
  RiGroupLine,
  RiShoppingBag3Line,
  RiMovie2Line,
  RiLightbulbLine,
} from "react-icons/ri";

const CATEGORIES_CONFIG = [
  {
    name: "Artificial Intelligence",
    icon: RiRobot2Line,
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-400",
    cardBorder: "hover:border-violet-500/40",
    cardGlow: "hover:shadow-[0_8px_32px_rgba(139,92,246,0.12)]",
    gradient: "from-violet-950/80 to-violet-900/40",
  },
  {
    name: "Health & Wellness",
    icon: RiHeartPulseLine,
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
    cardBorder: "hover:border-emerald-500/40",
    cardGlow: "hover:shadow-[0_8px_32px_rgba(16,185,129,0.12)]",
    gradient: "from-emerald-950/80 to-emerald-900/40",
  },
  {
    name: "Technology",
    icon: RiComputerLine,
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
    cardBorder: "hover:border-blue-500/40",
    cardGlow: "hover:shadow-[0_8px_32px_rgba(59,130,246,0.12)]",
    gradient: "from-blue-950/80 to-blue-900/40",
  },
  {
    name: "Education",
    icon: RiGraduationCapLine,
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-400",
    cardBorder: "hover:border-amber-500/40",
    cardGlow: "hover:shadow-[0_8px_32px_rgba(245,158,11,0.12)]",
    gradient: "from-amber-950/80 to-amber-900/40",
  },
  {
    name: "Sustainability",
    icon: RiLeafLine,
    iconBg: "bg-teal-500/15",
    iconColor: "text-teal-400",
    cardBorder: "hover:border-teal-500/40",
    cardGlow: "hover:shadow-[0_8px_32px_rgba(20,184,166,0.12)]",
    gradient: "from-teal-950/80 to-teal-900/40",
  },
  {
    name: "FinTech",
    icon: RiMoneyDollarCircleLine,
    iconBg: "bg-green-500/15",
    iconColor: "text-green-400",
    cardBorder: "hover:border-green-500/40",
    cardGlow: "hover:shadow-[0_8px_32px_rgba(34,197,94,0.12)]",
    gradient: "from-green-950/80 to-green-900/40",
  },
  {
    name: "Social Impact",
    icon: RiGroupLine,
    iconBg: "bg-pink-500/15",
    iconColor: "text-pink-400",
    cardBorder: "hover:border-pink-500/40",
    cardGlow: "hover:shadow-[0_8px_32px_rgba(236,72,153,0.12)]",
    gradient: "from-pink-950/80 to-pink-900/40",
  },
  {
    name: "E-Commerce",
    icon: RiShoppingBag3Line,
    iconBg: "bg-orange-500/15",
    iconColor: "text-orange-400",
    cardBorder: "hover:border-orange-500/40",
    cardGlow: "hover:shadow-[0_8px_32px_rgba(249,115,22,0.12)]",
    gradient: "from-orange-950/80 to-orange-900/40",
  },
  {
    name: "Entertainment",
    icon: RiMovie2Line,
    iconBg: "bg-red-500/15",
    iconColor: "text-red-400",
    cardBorder: "hover:border-red-500/40",
    cardGlow: "hover:shadow-[0_8px_32px_rgba(239,68,68,0.12)]",
    gradient: "from-red-950/80 to-red-900/40",
  },
  {
    name: "Other",
    icon: RiLightbulbLine,
    iconBg: "bg-gray-500/15",
    iconColor: "text-gray-400",
    cardBorder: "hover:border-gray-500/40",
    cardGlow: "hover:shadow-[0_8px_32px_rgba(107,114,128,0.12)]",
    gradient: "from-gray-950/80 to-gray-900/40",
  },
];

export default function CategoriesSection() {
  const router = useRouter();
  const { data: session } = useSession();
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get("/api/ideas/categories/stats");
        setStats(res.data || []);
      } catch (err) {
        console.error("Failed to fetch category stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Merge config + stats
  const mergedCategories = CATEGORIES_CONFIG.map((config) => ({
    ...config,
    count: stats.find((s) => s.category === config.name)?.count || 0,
  }));

  // Filter: only show categories where count > 0.
  // Fallback: if all counts are 0, display all categories.
  const categoriesToShow = mergedCategories.some((cat) => cat.count > 0)
    ? mergedCategories.filter((cat) => cat.count > 0)
    : mergedCategories;

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="h-[2px] w-6 rounded bg-violet-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-violet-500">
              Browse by Category
            </span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-[var(--nav-foreground-strong)] md:text-4xl">
            Explore Ideas Across Every Domain
          </h2>
          <p className="mt-2 text-base text-[var(--nav-foreground-muted)]">
            Find your niche or discover something completely new.
          </p>
        </motion.div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-3xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] h-[180px]"
              />
            ))}
          </div>
        )}

        {/* Categories Grid */}
        {!loading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categoriesToShow.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.4 }}
                  onClick={() => {
                    if (!session) {
                      router.push("/login");
                      return;
                    }
                    router.push(`/ideas?category=${encodeURIComponent(cat.name)}`);
                  }}
                  className={`group flex cursor-pointer flex-col items-center rounded-3xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-6 text-center transition-all duration-300 ${cat.cardBorder} ${cat.cardGlow} hover:-translate-y-1`}
                >
                  {/* Icon Box */}
                  <div
                    className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${cat.iconBg} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon size={26} className={cat.iconColor} />
                  </div>

                  {/* Category Name */}
                  <h3 className="mb-1 text-sm font-bold leading-snug text-[var(--nav-foreground-strong)]">
                    {cat.name}
                  </h3>

                  {/* Idea Count */}
                  <p className="text-xs text-[var(--nav-foreground-muted)]">
                    {cat.count} {cat.count === 1 ? "idea" : "ideas"}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
