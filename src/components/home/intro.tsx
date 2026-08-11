import { text } from "@/lib/design";
import type { IntroContent } from "@/types/content";

export function Intro({ intro }: { intro: IntroContent }) {
  return (
    <section id="intro">
      <h2 className="section-heading text-lg font-bold leading-tight text-[var(--foreground)] sm:text-xl">
        {intro.title}
      </h2>
      <p className="mt-5 text-[13px] font-semibold leading-6 text-[var(--foreground)] sm:text-sm">
        {intro.headline}
      </p>
      {intro.paragraphs.map((paragraph) => (
        <p className={`mt-3 max-w-3xl ${text.body}`} key={paragraph}>
          {paragraph}
        </p>
      ))}
    </section>
  );
}
