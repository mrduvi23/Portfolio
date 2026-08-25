"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const SCRAMBLE_LETTERS_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const SCRAMBLE_LETTERS_LOWER = "abcdefghijklmnopqrstuvwxyz";
const SCRAMBLE_DIGITS = "0123456789";
const SCRAMBLE_SYMBOLS = "!@#$%^&*;:,.<>?~";

const CYCLES_PER_CHAR = 5;
const FRAME_MS = 40;

function pickRandomChar(charset: string) {
  return charset[Math.floor(Math.random() * charset.length)]!;
}

function randomScrambleCharFor(target: string) {
  if (target === " " || target === "-" || target === "·") return target;
  if (/[a-z]/.test(target)) return pickRandomChar(SCRAMBLE_LETTERS_LOWER);
  if (/[A-Z]/.test(target)) return pickRandomChar(SCRAMBLE_LETTERS_UPPER);
  if (/[0-9]/.test(target)) return pickRandomChar(SCRAMBLE_DIGITS);
  return pickRandomChar(SCRAMBLE_SYMBOLS);
}

function buildScrambleText(target: string, resolvedCount: number) {
  return target
    .split("")
    .map((char, index) => {
      if (index < resolvedCount) return char;
      return randomScrambleCharFor(char);
    })
    .join("");
}

type ScrambleAppearProps = {
  text: string;
  className?: string;
  delay?: number;
};

export function ScrambleAppear({
  text,
  className,
  delay = 0,
}: ScrambleAppearProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.85 });
  const [display, setDisplay] = useState(() => buildScrambleText(text, 0));

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(text);
      return;
    }

    if (!isInView) {
      setDisplay(buildScrambleText(text, 0));
      return;
    }

    let resolvedCount = 0;
    let cycle = 0;
    let frameId = 0;
    let lastFrame = 0;
    let delayTimeout: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    const tick = (time: number) => {
      if (cancelled) return;

      if (time - lastFrame < FRAME_MS) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      lastFrame = time;
      cycle += 1;

      if (cycle >= CYCLES_PER_CHAR) {
        cycle = 0;
        resolvedCount += 1;
      }

      if (resolvedCount >= text.length) {
        setDisplay(text);
        return;
      }

      setDisplay(buildScrambleText(text, resolvedCount));
      frameId = requestAnimationFrame(tick);
    };

    const start = () => {
      setDisplay(buildScrambleText(text, 0));
      frameId = requestAnimationFrame(tick);
    };

    if (delay > 0) {
      delayTimeout = setTimeout(start, delay);
    } else {
      start();
    }

    return () => {
      cancelled = true;
      if (delayTimeout) clearTimeout(delayTimeout);
      cancelAnimationFrame(frameId);
    };
  }, [delay, isInView, reduceMotion, text]);

  return (
    <p ref={ref} className={`relative ${className ?? ""}`} aria-label={text}>
      <span aria-hidden="true" className="invisible whitespace-nowrap">
        {text}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden whitespace-nowrap"
      >
        {display}
      </span>
    </p>
  );
}
