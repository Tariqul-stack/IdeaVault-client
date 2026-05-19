"use client";

import Link from "next/link";
import {
  FaDiscord,
  FaFacebookF,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const platformLinks = [
  { label: "Browse Ideas", href: "/ideas" },
  { label: "Categories", href: "/ideas?view=categories" },
  { label: "Submit Idea", href: "/add-idea" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Trending", href: "/ideas?filter=trending" },
];

const accountLinks = [
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
  { label: "My Ideas", href: "/my-ideas" },
  { label: "My Interactions", href: "/my-interactions" },
  { label: "Profile Settings", href: "/settings" },
];

const contactLinks = [
  { label: "hello@ideavault.io", href: "mailto:hello@ideavault.io" },
  { label: "Support Center", href: "/support" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Settings", href: "/cookies" },
];

const socialLinks = [
  { label: "X", href: "https://x.com", icon: FaXTwitter, size: "text-sm" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: FaLinkedinIn,
    size: "text-xs",
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: FaFacebookF,
    size: "text-xs",
  },
  {
    label: "Discord",
    href: "https://discord.com",
    icon: FaDiscord,
    size: "text-sm",
  },
];

function FooterLinkGroup({ title, links }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-white/40">
        {title}
      </h3>
      <div className="flex flex-col gap-3">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="w-fit text-sm text-gray-500 transition-colors duration-200 hover:text-gray-900 dark:text-white/60 dark:hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative border-t border-violet-100 dark:border-white/10">
      {/* Light mode background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#f5f0ff_0%,#ede5ff_45%,#e8eaff_100%)] transition-opacity duration-300 dark:opacity-0" />

      {/* Dark mode background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#0d0b14_0%,#0B0B12_50%,#080b14_100%)] opacity-0 transition-opacity duration-300 dark:opacity-100" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-1 items-start gap-10 py-12 md:grid-cols-4 md:py-16">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600">
                <span className="font-bold text-sm text-white">IV</span>
              </div>
              <span className="font-display text-xl font-bold text-gray-900 dark:text-white">
                IdeaVault
              </span>
            </div>

            <p className="mb-6 max-w-[220px] text-sm leading-relaxed text-gray-600 dark:text-white/50">
              The home for startup ideas. Share your vision, get community
              validation, and build something extraordinary.
            </p>

            <div className="mt-2 flex items-center gap-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-200/80 bg-white/80 text-gray-600 shadow-sm transition-all duration-200 hover:border-violet-400 hover:bg-violet-50 hover:text-gray-900 dark:border-white/10 dark:bg-white/5 dark:text-white/50 dark:shadow-none dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    <Icon className={item.size} />
                  </Link>
                );
              })}
            </div>
          </div>

          <FooterLinkGroup title="PLATFORM" links={platformLinks} />
          <FooterLinkGroup title="ACCOUNT" links={accountLinks} />
          <FooterLinkGroup title="CONTACT" links={contactLinks} />
        </div>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-violet-100/90 py-6 dark:border-white/[0.06] md:flex-row">
          <p className="text-sm text-gray-500 dark:text-white/30">
            © 2026 IdeaVault. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 dark:text-white/30">
            Built for innovators, by innovators.
          </p>
        </div>
      </div>
    </footer>
  );
}
