"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/ideas", label: "Ideas" },
  { href: "/add-idea", label: "Add Idea", showDot: true },
  { href: "/my-ideas", label: "My Ideas", showDot: true },
  { href: "/my-interactions", label: "My Interactions", showDot: true },
];

function getIsActive(pathname, href) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export default function NavLinks({ mobile = false, onNavigate }) {
  const pathname = usePathname();

  return (
    <div
      className={
        mobile
          ? "flex flex-col gap-2"
          : "hidden items-center gap-2 lg:flex"
      }
    >
      {navItems.map((item, index) => {
        const isActive = getIsActive(pathname, item.href);

        return (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: mobile ? 4 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * index, duration: 0.35 }}
          >
            <Link
              href={item.href}
              onClick={onNavigate}
              className={[
                "group relative flex items-center gap-2 rounded-full border text-sm font-medium transition-all duration-300",
                mobile
                  ? "w-full justify-between border-transparent px-4 py-3"
                  : "border-transparent px-4 py-2.5",
                isActive
                  ? "bg-[var(--nav-pill-active)] text-[var(--nav-foreground-strong)] shadow-[0_12px_35px_rgba(124,92,255,0.18)]"
                  : "text-[var(--nav-foreground-muted)] hover:border-[var(--nav-border)] hover:bg-[var(--nav-pill)] hover:text-[var(--nav-foreground-strong)]",
              ].join(" ")}
            >
              <span>{item.label}</span>
              {item.showDot ? (
                <span
                  className={[
                    "h-2.5 w-2.5 rounded-full bg-[var(--nav-accent)] transition-transform duration-300",
                    isActive ? "scale-110" : "opacity-90 group-hover:scale-110",
                  ].join(" ")}
                />
              ) : null}

              {isActive ? (
                <motion.span
                  layoutId={mobile ? "mobile-active-pill" : "desktop-active-pill"}
                  className="absolute inset-0 -z-10 rounded-full border border-[var(--nav-border-strong)] bg-[linear-gradient(135deg,rgba(124,92,255,0.18),rgba(124,92,255,0.06))]"
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                />
              ) : null}
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
