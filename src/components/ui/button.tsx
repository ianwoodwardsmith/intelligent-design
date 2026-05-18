import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Variant = "primary" | "secondary" | "outline";
type Size    = "sm" | "md" | "lg";

interface BaseProps {
  variant?:  Variant;
  size?:     Size;
  className?: string;
  children:  ReactNode;
}

// Discriminated union: href present → renders <a>, absent → renders <button>
type ButtonProps =
  | (BaseProps & { href: string }  & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps | "href">)
  | (BaseProps & { href?: never  } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>);

// ─── Style Maps ───────────────────────────────────────────────────────────────

const variantClasses: Record<Variant, string> = {
  primary:   "bg-accent text-white hover:bg-accent-hover",
  secondary: "bg-bg-secondary text-text-primary border border-border hover:bg-bg-card",
  outline:   "bg-transparent text-text-primary border border-border hover:bg-bg-secondary",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm rounded-md",
  md: "px-5 py-2.5 text-sm rounded-lg",
  lg: "px-7 py-3 text-base rounded-lg",
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Button({ variant = "primary", size = "md", className = "", children, href, ...rest }: ButtonProps) {
  const base = "inline-flex items-center justify-center font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";
  const classes = [base, variantClasses[variant], sizeClasses[size], className].join(" ");

  if (href !== undefined) {
    return (
      <a href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
