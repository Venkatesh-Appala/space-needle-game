"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SpaceNeedle } from "@/components/SpaceNeedle";
import { GlassCard } from "@/components/GlassCard";
import { Zap, Trophy, RotateCcw } from "lucide-react";

const STORAGE_KEY = "space-needle-best-clicks";
const MIN_CHARGE_PER_CLICK = 2;
const MAX_CHARGE_PER_CLICK = 5;
const TARGET_CHARGE = 100;

type GamePhase = "start" | "playing" | "won";

function getRandomCharge() {
  return MIN_CHARGE_PER_CLICK + Math.floor(Math.random() * (MAX_CHARGE_PER_CLICK - MIN_CHARGE_PER_CLICK + 1));
}

function getBestScore(): number | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === null) return null;
  const n = parseInt(raw, 10);
  return Number.isFinite(n) ? n : null;
}

function setBestScore(clicks: number) {
  if (typeof window === "undefined") return;
  const current = getBestScore();
  if (current === null || clicks < current) {
    localStorage.setItem(STORAGE_KEY, String(clicks));
  }
}

export default function Home() {
  const [phase, setPhase] = useState<GamePhase>("start");
  const [progress, setProgress] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [bestClicks, setBestClicks] = useState<number | null>(null);
  const [isNewBest, setIsNewBest] = useState(false);
  const [clickBurst, setClickBurst] = useState(0);

  useEffect(() => {
    setBestClicks(getBestScore());
  }, []);

  const handleCharge = useCallback(() => {
    if (phase !== "playing") return;
    const add = getRandomCharge();
    setProgress((p) => Math.min(TARGET_CHARGE, p + add));
    setClicks((c) => c + 1);
    setClickBurst(add);
  }, [phase]);

  useEffect(() => {
    if (phase === "playing" && progress >= TARGET_CHARGE) {
      const previousBest = getBestScore();
      setBestScore(clicks);
      const newBest = getBestScore();
      setBestClicks(newBest);
      setIsNewBest(previousBest === null || clicks < previousBest);
      setPhase("won");
    }
  }, [phase, progress, clicks]);

  const startGame = useCallback(() => {
    setPhase("playing");
    setProgress(0);
    setClicks(0);
    setClickBurst(0);
  }, []);

  const playAgain = useCallback(() => {
    setBestClicks(getBestScore());
    setIsNewBest(false);
    startGame();
  }, [startGame]);

  return (
    <div className="min-h-screen bg-midnight transition-colors duration-700 vibe-cyber">
      <div className="fixed inset-0 bg-cyber-gradient -z-10" aria-hidden />

      <div className="relative mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-12">
        <AnimatePresence mode="wait">
          {phase === "start" && (
            <motion.section
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex w-full flex-col items-center text-center"
            >
              <h1
                className="text-3xl font-bold tracking-wide md:text-4xl"
                style={{ color: "var(--text-primary)", letterSpacing: "0.15em" }}
              >
                REACH THE NEEDLE
              </h1>
              <p
                className="mt-3 text-sm tracking-wider opacity-80"
                style={{ color: "var(--text-muted)" }}
              >
                Tap to charge the Space Needle. Reach the observation deck.
              </p>
              <motion.button
                type="button"
                onClick={startGame}
                className="mt-10 flex items-center gap-2 rounded-xl border px-8 py-4 text-lg font-semibold transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/40"
                style={{
                  borderColor: "var(--glass-border)",
                  backgroundColor: "var(--glass-bg)",
                  color: "var(--accent-emerald)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Zap className="h-5 w-5" />
                Start
              </motion.button>
              {bestClicks !== null && (
                <p className="mt-6 flex items-center gap-2 text-xs opacity-70" style={{ color: "var(--text-muted)" }}>
                  <Trophy className="h-4 w-4" style={{ color: "var(--accent-emerald)" }} />
                  Best: {bestClicks} taps
                </p>
              )}
            </motion.section>
          )}

          {phase === "playing" && (
            <motion.section
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex w-full flex-col items-center"
            >
              <GlassCard className="mb-6 w-full max-w-sm px-4 py-3">
                <div className="flex items-center justify-between text-xs">
                  <span style={{ color: "var(--text-muted)" }}>OBSERVATION DECK</span>
                  <span style={{ color: "var(--accent-emerald)" }}>{clicks} taps</span>
                </div>
                <div
                  className="mt-2 h-2 w-full overflow-hidden rounded-full"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: "var(--accent-emerald)" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, progress)}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                </div>
                <p className="mt-1 text-right text-xs opacity-60" style={{ color: "var(--text-muted)" }}>
                  {Math.min(100, Math.round(progress))}%
                </p>
              </GlassCard>

              <button
                type="button"
                onClick={handleCharge}
                className="group relative flex flex-col items-center focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-4 focus:ring-offset-[var(--bg-midnight)]"
                aria-label="Charge the needle"
              >
                <motion.div
                  animate={clickBurst > 0 ? { scale: [1, 1.15, 1] } : {}}
                  transition={{ duration: 0.2 }}
                  onAnimationComplete={() => setClickBurst(0)}
                >
                  <SpaceNeedle charge={progress} />
                </motion.div>
                {clickBurst > 0 && (
                  <motion.span
                    key={clickBurst}
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 0, y: -20 }}
                    className="absolute top-1/2 text-lg font-bold"
                    style={{ color: "var(--accent-emerald)" }}
                  >
                    +{clickBurst}
                  </motion.span>
                )}
                <span
                  className="mt-4 text-xs tracking-widest opacity-60"
                  style={{ color: "var(--text-muted)" }}
                >
                  TAP TO CHARGE
                </span>
              </button>
            </motion.section>
          )}

          {phase === "won" && (
            <motion.section
              key="won"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex w-full flex-col items-center text-center"
            >
              <SpaceNeedle charge={100} />
              <h2
                className="mt-6 text-2xl font-bold tracking-wide md:text-3xl"
                style={{ color: "var(--accent-emerald)" }}
              >
                YOU REACHED THE TOP
              </h2>
              <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
                Observation deck unlocked in <strong style={{ color: "var(--text-primary)" }}>{clicks}</strong> taps.
              </p>
              {bestClicks !== null && isNewBest && (
                <p className="mt-2 flex items-center justify-center gap-2 text-xs" style={{ color: "var(--accent-cyan)" }}>
                  <Trophy className="h-4 w-4" /> New best!
                </p>
              )}
              {bestClicks !== null && (
                <p className="mt-1 text-xs opacity-70" style={{ color: "var(--text-muted)" }}>
                  Best score: {bestClicks} taps
                </p>
              )}
              <motion.button
                type="button"
                onClick={playAgain}
                className="mt-10 flex items-center gap-2 rounded-xl border px-8 py-4 text-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-white/40"
                style={{
                  borderColor: "var(--glass-border)",
                  backgroundColor: "var(--glass-bg)",
                  color: "var(--accent-emerald)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <RotateCcw className="h-5 w-5" />
                Play Again
              </motion.button>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
