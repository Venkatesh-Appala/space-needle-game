"use client";

import { motion } from "framer-motion";
import { Moon, Zap } from "lucide-react";

export type VibeMode = "lowfi" | "cyber";

interface VibeToggleProps {
  vibe: VibeMode;
  onVibeChange: (vibe: VibeMode) => void;
}

export function VibeToggle({ vibe, onVibeChange }: VibeToggleProps) {
  const isCyber = vibe === "cyber";

  return (
    <div
      className="flex items-center gap-3 rounded-xl border p-1 backdrop-blur-xl"
      style={{
        borderColor: "var(--glass-border)",
        backgroundColor: "var(--glass-bg)",
      }}
    >
      <span className="pl-2 text-xs opacity-70">City Mood</span>
      <div className="relative flex rounded-lg">
        <button
          type="button"
          onClick={() => onVibeChange("lowfi")}
          className="relative z-10 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
          aria-pressed={!isCyber}
        >
          {!isCyber && (
            <motion.div
              layoutId="vibe-thumb"
              className="absolute inset-0 rounded-lg"
              style={{
                backgroundColor: "rgba(255,255,255,0.08)",
                border: "1px solid var(--glass-border)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <Moon
            className="relative z-10 h-4 w-4"
            style={{ color: "var(--accent-emerald)" }}
          />
          <span className="relative z-10">Low-fi</span>
        </button>
        <button
          type="button"
          onClick={() => onVibeChange("cyber")}
          className="relative z-10 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
          aria-pressed={isCyber}
        >
          {isCyber && (
            <motion.div
              layoutId="vibe-thumb"
              className="absolute inset-0 rounded-lg"
              style={{
                backgroundColor: "rgba(255,255,255,0.08)",
                border: "1px solid var(--glass-border)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <Zap
            className="relative z-10 h-4 w-4"
            style={{ color: "var(--accent-cyan)" }}
          />
          <span className="relative z-10">Cyber</span>
        </button>
      </div>
    </div>
  );
}
