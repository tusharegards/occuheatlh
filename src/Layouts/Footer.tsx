// src/Layouts/Footer.tsx
import type { JSX } from "react";

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-brand-dark text-white py-3">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-2 text-center md:flex-row md:gap-3">
          <p className="text-sm">Copyright {new Date().getFullYear()} | All Rights Reserved</p>

          <span className="hidden text-white/50 md:inline">|</span>

          <a
            href="/legal/terms.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium underline underline-offset-4 hover:text-white/90"
          >
            Terms and conditions
          </a>

          <span className="hidden text-white/50 md:inline">|</span>

          <a
            href="/legal/privacy.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium underline underline-offset-4 hover:text-white/90"
          >
            Privacy Notice
          </a>
        </div>
      </div>
    </footer>
  );
}
