"use client";

import { motion } from "framer-motion";

interface SpaceNeedleProps {
  /** 0–100 charge level for game progress (optional) */
  charge?: number;
}

/**
 * Space Needle SVG – 3-legged tripod base and flying-saucer observation deck.
 * Styled for the game with CSS variables; charge drives glow and scale.
 */
export function SpaceNeedle({ charge = 0 }: SpaceNeedleProps) {
  const glowIntensity = 0.5 + (charge / 100) * 0.65;
  const pulseScale = 1 + (charge / 100) * 0.08;
  const fillOpacity = 0.06 + (charge / 100) * 0.12;

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="relative"
        animate={{
          filter: [
            `drop-shadow(0 0 ${12 * glowIntensity}px var(--accent-emerald)) brightness(${1 + (glowIntensity - 0.5) * 0.5})`,
            `drop-shadow(0 0 ${28 * glowIntensity}px var(--accent-emerald)) brightness(${1.1 + (glowIntensity - 0.5) * 0.4})`,
            `drop-shadow(0 0 ${12 * glowIntensity}px var(--accent-emerald)) brightness(${1 + (glowIntensity - 0.5) * 0.5})`,
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transform: `scale(${pulseScale})` }}
      >
        {/* Space Needle – 3-legged tripod, flying-saucer deck, spire */}
        <svg
          viewBox="0 0 120 220"
          className="h-48 w-24 md:h-64 md:w-32"
          fill="none"
          stroke="var(--accent-emerald)"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          {/* Left leg (tripod) */}
          <path
            d="M60 108 Q20 160 18 200 L22 200 Q24 162 60 108"
            fill={`rgba(0, 255, 136, ${fillOpacity})`}
            stroke="var(--accent-cyan)"
          />
          {/* Right leg */}
          <path
            d="M60 108 Q100 160 102 200 L98 200 Q96 162 60 108"
            fill={`rgba(0, 255, 136, ${fillOpacity})`}
            stroke="var(--accent-cyan)"
          />
          {/* Center leg (front) */}
          <path
            d="M60 108 L58 200 L62 200 Z"
            fill={`rgba(0, 212, 255, ${fillOpacity * 0.8})`}
            stroke="var(--accent-cyan)"
          />
          {/* Central shaft */}
          <line
            x1="60"
            y1="108"
            x2="60"
            y2="38"
            stroke="var(--accent-emerald)"
            strokeWidth="1.5"
          />
          {/* Flying-saucer observation deck */}
          <ellipse
            cx="60"
            cy="38"
            rx="24"
            ry="7"
            fill={`rgba(0, 212, 255, ${0.08 + fillOpacity})`}
            stroke="var(--accent-emerald)"
          />
          {/* Spire */}
          <line
            x1="60"
            y1="38"
            x2="60"
            y2="10"
            stroke="var(--accent-emerald)"
            strokeWidth="1.5"
          />
          <circle
            cx="60"
            cy="10"
            r="3"
            fill="var(--accent-emerald)"
            stroke="var(--accent-cyan)"
            strokeWidth="0.5"
          />
        </svg>
      </motion.div>
      <motion.p
        className="mt-4 text-sm font-medium tracking-wider text-white/80"
        style={{ color: "var(--text-muted)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        EMERALD CITY
      </motion.p>
    </motion.div>
  );
}
