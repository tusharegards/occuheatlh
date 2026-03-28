import type { JSX } from "react";
import { Link, useNavigate } from "react-router-dom";

import termsText from "../OccuHealth - Website Terms and Conditions (GT 3_13_2026)(718959929.6).txt?raw";
import privacyText from "../OccuHealth - Privacy Notice (GT 3_13_2025)(720308547.2).txt?raw";

type Variant = "terms" | "privacy";

const bodyByVariant: Record<Variant, string> = {
  terms: termsText,
  privacy: privacyText,
};

type Props = { variant: Variant };

export default function LegalDocument({ variant }: Props): JSX.Element {
  const navigate = useNavigate();
  const text = bodyByVariant[variant];

  const handleProceed = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white text-text-dark">
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 lg:px-8">
          <Link to="/" className="text-lg font-semibold text-brand hover:opacity-90">
            OccuHealth
          </Link>
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-brand">
            Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
        {/* Full document text exactly as in the source files; line breaks and spacing preserved */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div
            className="whitespace-pre-wrap font-serif text-[15px] leading-relaxed text-gray-900"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {text}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 border-t border-gray-200 pt-8">
          <button
            type="button"
            onClick={handleProceed}
            className="rounded-md bg-brand px-10 py-3 text-base font-semibold text-white shadow hover:bg-brand-dark"
          >
            Proceed
          </button>
          <p className="max-w-xl text-center text-xs text-gray-500">
            By clicking Proceed you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </main>
    </div>
  );
}
