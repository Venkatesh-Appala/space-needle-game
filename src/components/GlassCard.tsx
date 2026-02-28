"use client";

import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div
      className={
        "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg shadow-black/20 transition-colors duration-500 " +
        className
      }
      style={{
        borderColor: "var(--glass-border)",
        backgroundColor: "var(--glass-bg)",
      }}
    >
      {children}
    </div>
  );
}
