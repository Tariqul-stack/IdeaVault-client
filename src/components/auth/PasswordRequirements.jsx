"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";

const requirements = [
  {
    key: "length",
    label: "Minimum 6 characters",
    test: (password) => password.length >= 6,
  },
  {
    key: "uppercase",
    label: "Must include uppercase letter",
    test: (password) => /[A-Z]/.test(password),
  },
  {
    key: "lowercase",
    label: "Must include lowercase letter",
    test: (password) => /[a-z]/.test(password),
  },
];

export default function PasswordRequirements({ password }) {
  return (
    <div className="space-y-2 pt-1">
      {requirements.map((requirement, index) => {
        const isValid = requirement.test(password);

        return (
          <motion.div
            key={requirement.key}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.24 }}
            className="flex items-center gap-2.5 text-sm"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isValid ? "valid" : "invalid"}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.16 }}
                className={
                  isValid
                    ? "text-emerald-400"
                    : "text-[var(--auth-placeholder)]"
                }
              >
                {isValid ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Circle className="h-4 w-4 fill-current stroke-none opacity-70" />
                )}
              </motion.span>
            </AnimatePresence>

            <motion.span
              animate={{
                color: isValid ? "rgb(74 222 128)" : "var(--auth-muted)",
              }}
              transition={{ duration: 0.2 }}
            >
              {requirement.label}
            </motion.span>
          </motion.div>
        );
      })}
    </div>
  );
}
