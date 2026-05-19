"use client";

import { motion } from "framer-motion";

export default function AuthInput({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  rightLabel,
  rightLabelAction,
  icon,
  endAdornment,
  autoComplete,
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <label
          htmlFor={id}
          className="text-sm font-semibold text-[var(--auth-label)] sm:text-[0.95rem]"
        >
          {label}
        </label>
        {rightLabel ? (
          <button
            type="button"
            onClick={rightLabelAction}
            className="text-sm font-semibold text-[var(--auth-accent)] transition-colors duration-300 hover:text-[var(--auth-accent-strong)]"
          >
            {rightLabel}
          </button>
        ) : null}
      </div>

      <motion.div
        whileFocusWithin={{
          scale: 1.01,
          boxShadow: "0 0 0 1px rgba(139,92,246,0.38), 0 0 0 8px rgba(139,92,246,0.08)",
        }}
        transition={{ duration: 0.2 }}
        className="flex h-14 items-center gap-3 rounded-2xl border border-[var(--auth-input-border)] bg-[var(--auth-input-bg)] px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-all duration-300"
      >
        {icon ? (
          <span className="text-[var(--auth-muted)]">{icon}</span>
        ) : null}

        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full bg-transparent text-[15px] text-[var(--auth-foreground)] placeholder:text-[var(--auth-placeholder)] focus:outline-none"
        />

        {endAdornment ? (
          <div className="shrink-0 text-[var(--auth-muted)]">{endAdornment}</div>
        ) : null}
      </motion.div>
    </div>
  );
}
