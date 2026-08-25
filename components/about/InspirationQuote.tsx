"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const INSPIRATION_QUOTE_SPRING = {
  type: "spring" as const,
  stiffness: 500,
  damping: 60,
  mass: 1,
};

const INSPIRATION_QUOTE_VISIBLE = {
  y: 0,
  scale: 1,
  opacity: 1,
};

const INSPIRATION_QUOTE_HIDDEN = {
  y: 200,
  scale: 0.5,
  opacity: 0.1,
};

type InspirationQuoteProps = {
  children: ReactNode;
};

export function InspirationQuote({ children }: InspirationQuoteProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.h2
      className="col-span-2 type-h2 w-full origin-center text-pretty text-[var(--color-primitives-white)] min-[764px]:col-span-8 min-[764px]:col-start-3"
      initial={reduceMotion ? INSPIRATION_QUOTE_VISIBLE : INSPIRATION_QUOTE_HIDDEN}
      whileInView={INSPIRATION_QUOTE_VISIBLE}
      viewport={{ once: true, amount: 0.35 }}
      transition={INSPIRATION_QUOTE_SPRING}
    >
      {children}
    </motion.h2>
  );
}
