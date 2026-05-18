import type { ReactNode } from "react";

interface SectionProps {
  dark?:      boolean;
  className?: string;
  children:   ReactNode;
  id?:        string;
}

export function Section({ dark = false, className = "", children, id }: SectionProps) {
  return (
    <section
      id={id}
      className={`${dark ? "bg-bg-secondary" : "bg-bg-primary"} ${className}`}
    >
      {children}
    </section>
  );
}
