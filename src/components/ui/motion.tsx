"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface FadeInProps {
  children:          ReactNode;
  className?:        string;
  /** Set to true from hero/LCP contexts to skip animation and protect LCP score. */
  disableAnimation?: boolean;
}

export function FadeIn({ children, className, disableAnimation = false }: FadeInProps) {
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-50px" });

  // When animation is disabled, render a plain wrapper with no motion overhead.
  if (disableAnimation) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
