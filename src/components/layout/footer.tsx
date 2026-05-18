import { Globe, X } from "lucide-react";
import { site } from "@/content/site";

// ─── Social icon helpers ──────────────────────────────────────────────────────
// lucide-react v1.16 does not ship brand icons (Twitter, LinkedIn, YouTube,
// GitHub). We use X for Twitter/X and Globe for all other platforms.

interface SocialLinkProps {
  href:  string;
  label: string;
  icon:  React.ReactNode;
}

function SocialLink({ href, label, icon }: SocialLinkProps) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="text-text-secondary hover:text-text-primary transition-colors"
    >
      {icon}
    </a>
  );
}

function SocialIcons() {
  const { twitter, linkedin, youtube, github } = site.social;

  return (
    <div className="flex items-center gap-4">
      {twitter  && <SocialLink href={twitter}  label="Twitter / X" icon={<X        size={18} />} />}
      {linkedin && <SocialLink href={linkedin} label="LinkedIn"    icon={<Globe    size={18} />} />}
      {youtube  && <SocialLink href={youtube}  label="YouTube"     icon={<Globe    size={18} />} />}
      {github   && <SocialLink href={github}   label="GitHub"      icon={<Globe    size={18} />} />}
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg-secondary border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main zone: logo/tagline + columns */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10">

          {/* Left: logo + tagline + social */}
          <div className="flex flex-col gap-3 max-w-xs">
            <span className="font-semibold text-text-primary">{site.name}</span>
            <p className="text-sm text-text-secondary leading-relaxed">{site.tagline}</p>
            <SocialIcons />
          </div>

          {/* Right: footer columns */}
          <div className="flex flex-wrap gap-10">
            {site.footer.columns.map((col) => (
              <div key={col.heading} className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
                  {col.heading}
                </h3>
                <ul className="flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar: copyright + legal */}
        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-secondary">
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex items-center gap-4">
            {site.footer.legal.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-xs text-text-secondary hover:text-text-primary transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </footer>
  );
}
