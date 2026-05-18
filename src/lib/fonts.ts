import { Inter, JetBrains_Mono } from "next/font/google";

// Primary font — body + UI
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Monospace — code blocks, stats, numbers
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "700"],
});

// To add a display/heading font, import it here and add the variable
// to the <html> className in layout.tsx and --font-display in globals.css.
// Example: League Gothic, Big Shoulders Display, Barlow Condensed
