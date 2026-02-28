"use client";

import { CloudRain } from "lucide-react";
import { GlassCard } from "./GlassCard";

const SEATTLE_STATUS = "Misty";

function RainOverlay() {
  const streaks = Array.from({ length: 30 }, (_, i) => (
    <div
      key={i}
      className="rain-streak"
      style={{
        left: `${(i / 30) * 100}%`,
        animationDelay: `${i * 0.05}s`,
      }}
    />
  ));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
      {streaks}
    </div>
  );
}

export function WeatherCard() {
  const isRaining = SEATTLE_STATUS.toLowerCase() === "misty";

  return (
    <GlassCard className="relative overflow-hidden p-6">
      {isRaining && <RainOverlay />}
      <div className="relative z-10 flex items-center gap-3">
        <CloudRain
          className="h-8 w-8 shrink-0"
          style={{ color: "var(--accent-cyan)" }}
        />
        <div>
          <p className="text-xs font-medium tracking-wider opacity-70">
            SEATTLE STATUS
          </p>
          <p
            className="text-xl font-semibold tracking-wide"
            style={{ color: "var(--accent-emerald)" }}
          >
            {SEATTLE_STATUS}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
