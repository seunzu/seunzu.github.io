"use client";

import { useEffect, useState } from "react";

const fallbackTranslateHref =
  "https://translate.google.com/translate?sl=ko&tl=en&u=https%3A%2F%2Fseunzu.github.io%2F";

export function LanguageSwitcher() {
  const [translatedHref, setTranslatedHref] = useState(fallbackTranslateHref);

  useEffect(() => {
    const currentUrl = window.location.href;
    setTranslatedHref(
      `https://translate.google.com/translate?sl=ko&tl=en&u=${encodeURIComponent(currentUrl)}`,
    );
  }, []);

  return (
    <nav
      aria-label="Language"
      className="inline-flex shrink-0 rounded-full border border-[var(--line)] bg-[var(--surface-soft)] p-0.5 text-[10px] font-semibold leading-4"
    >
      <a
        aria-current="page"
        className="rounded-full bg-white px-2 py-0.5 text-[var(--foreground)] shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
        href="/"
      >
        KOR
      </a>
      <a
        className="rounded-full px-2 py-0.5 text-[var(--muted)] transition-colors hover:text-[var(--accent-dark)]"
        href={translatedHref}
        rel="noreferrer"
        target="_blank"
      >
        ENG
      </a>
    </nav>
  );
}
