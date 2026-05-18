"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";

interface MobileNavProps {
  isOpen:  boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col bg-bg-primary"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {/* Header row */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-border">
            <span className="font-semibold text-text-primary">{site.name}</span>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="p-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-1 px-4 py-6" aria-label="Mobile navigation">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="py-3 text-lg text-text-primary hover:text-accent transition-colors border-b border-border last:border-0"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="px-4 mt-auto pb-8">
            <Button
              href={site.navCta.href}
              variant="primary"
              size="lg"
              className="w-full"
              onClick={onClose}
            >
              {site.navCta.label}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
