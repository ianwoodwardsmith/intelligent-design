import type { ReactNode } from "react";

interface BadgeProps {
  children:   ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`bg-bg-card border border-border text-text-secondary text-xs px-3 py-1 rounded-full ${className}`}
    >
      {children}
    </span>
  );
}
