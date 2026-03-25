// src/Layouts/Footer.tsx
import { useEffect, useMemo, useState, type JSX } from "react";

type LegalDoc = "terms" | "privacy";

function LegalModal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: JSX.Element;
}): JSX.Element | null {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative mx-auto mt-10 w-[92vw] max-w-4xl"
      >
        <div className="overflow-hidden rounded-lg bg-white text-text-dark shadow-2xl">
          <div className="flex items-center justify-between gap-4 border-b border-gray-200 px-5 py-4">
            <h2 className="text-base font-semibold">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-text-dark hover:bg-gray-100"
            >
              Close
            </button>
          </div>

          <div className="max-h-[70vh] overflow-y-auto px-5 py-4 text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Footer(): JSX.Element {
  const [openDoc, setOpenDoc] = useState<LegalDoc | null>(null);
  const [termsText, setTermsText] = useState<string>("");
  const [privacyText, setPrivacyText] = useState<string>("");
  const [loadError, setLoadError] = useState<string | null>(null);

  const modalTitle = openDoc === "privacy" ? "Privacy Notice" : "Terms and Conditions";

  useEffect(() => {
    if (openDoc === null) return;
    setLoadError(null);

    const url = openDoc === "privacy" ? "/legal/privacy.txt" : "/legal/terms.txt";
    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then(async (r) => {
        if (!r.ok) throw new Error(`Failed to load ${url}`);
        return await r.text();
      })
      .then((text) => {
        if (openDoc === "privacy") setPrivacyText(text);
        else setTermsText(text);
      })
      .catch((e: unknown) => {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setLoadError("Could not load this document. Please try again.");
      });

    return () => controller.abort();
  }, [openDoc]);

  const modalBody = useMemo(() => {
    const text = openDoc === "privacy" ? privacyText : termsText;
    return (
      <div className="whitespace-pre-wrap">
        {loadError ? (
          <p className="text-red-700">{loadError}</p>
        ) : text ? (
          text
        ) : (
          <p>Loading…</p>
        )}
      </div>
    );
  }, [loadError, openDoc, privacyText, termsText]);

  return (
    <>
      <footer className="bg-brand-dark text-white py-3">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-2 text-center md:flex-row md:gap-3">
            <p className="text-sm">Copyright {new Date().getFullYear()} | All Rights Reserved</p>

            <span className="hidden text-white/50 md:inline">|</span>

            <button
              type="button"
              onClick={() => setOpenDoc("terms")}
              className="text-sm font-medium underline underline-offset-4 hover:text-white/90"
            >
              Terms and conditions
            </button>

            <span className="hidden text-white/50 md:inline">|</span>

            <button
              type="button"
              onClick={() => setOpenDoc("privacy")}
              className="text-sm font-medium underline underline-offset-4 hover:text-white/90"
            >
              Privacy Notice
            </button>
          </div>
        </div>
      </footer>

      <LegalModal open={openDoc !== null} title={modalTitle} onClose={() => setOpenDoc(null)}>
        {modalBody}
      </LegalModal>
    </>
  );
}