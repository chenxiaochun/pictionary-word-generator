"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import type { GameSettings } from "@/types/game";
import { SetupModal } from "@/components/setup/SetupModal";

interface SeoLandingShellProps {
  title: string;
  lead: string;
  ctaLabel: string;
  initialSettings?: Partial<GameSettings>;
  children: ReactNode;
  footerCtaLabel?: string;
}

export function SeoLandingShell({
  title,
  lead,
  ctaLabel,
  initialSettings,
  children,
  footerCtaLabel,
}: SeoLandingShellProps) {
  const [showSetup, setShowSetup] = useState(false);

  return (
    <>
      <article className="seo-page">
        <nav className="seo-breadcrumb">
          <Link href="/">← Pictionary Word Generator</Link>
        </nav>

        <header>
          <h1>{title}</h1>
          <p className="seo-lead">{lead}</p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => setShowSetup(true)}
          >
            {ctaLabel}
          </button>
        </header>

        {children}

        <footer className="seo-footer">
          <button
            type="button"
            className="btn-primary"
            onClick={() => setShowSetup(true)}
          >
            {footerCtaLabel ?? ctaLabel}
          </button>
        </footer>
      </article>

      {showSetup && (
        <SetupModal
          initialSettings={initialSettings}
          onClose={() => setShowSetup(false)}
          onComplete={() => setShowSetup(false)}
        />
      )}
    </>
  );
}

/** Shared section styles for SEO landing pages */
export function SeoSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="seo-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
