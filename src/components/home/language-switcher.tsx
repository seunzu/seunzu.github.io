import type { Locale } from "@/types/content";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const linkClass = (targetLocale: Locale) =>
    targetLocale === locale
      ? "rounded-full bg-white px-2 py-0.5 text-[var(--foreground)] shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
      : "rounded-full px-2 py-0.5 text-[var(--muted)] transition-colors hover:text-[var(--accent-dark)]";

  return (
    <nav
      aria-label="Language"
      className="inline-flex shrink-0 rounded-full border border-[var(--line)] bg-[var(--surface-soft)] p-0.5 text-[10px] font-semibold leading-4"
    >
      <a
        aria-current={locale === "ko" ? "page" : undefined}
        className={linkClass("ko")}
        href="/"
      >
        KOR
      </a>
      <a
        aria-current={locale === "en" ? "page" : undefined}
        className={linkClass("en")}
        href="/en"
      >
        ENG
      </a>
    </nav>
  );
}
