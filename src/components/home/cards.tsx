import { surface, text } from "@/lib/design";
import type { CaseStudy, Locale, Metric } from "@/types/content";

export function MetricsGrid({ metrics }: { metrics: Metric[] }) {
  return (
    <div className={`mt-7 grid grid-cols-1 border-y ${surface.divider} sm:grid-cols-2 lg:grid-cols-4`}>
      {metrics.map(([value, label]) => (
        <article
          className={`border-b ${surface.divider} py-4 sm:px-4 lg:border-b-0 lg:border-r lg:last:border-r-0`}
          key={label}
        >
          <strong className="block text-base font-semibold text-[var(--accent-dark)]">{value}</strong>
          <span className="mt-1 block text-[10.5px] leading-4 text-[var(--muted)]">{label}</span>
        </article>
      ))}
    </div>
  );
}

export function CaseStudyCard({
  item,
  locale,
  viewDetailsLabel,
}: {
  item: CaseStudy;
  locale: Locale;
  viewDetailsLabel: string;
}) {
  const detailHref =
    locale === "en" ? `/en/case-studies/${item.slug}` : `/case-studies/${item.slug}`;

  return (
    <article className={`flex h-full flex-col ${surface.card}`}>
      <div>
        <span className={surface.labelChip}>{item.label}</span>
        <h3 className="mt-2.5 text-sm font-semibold leading-snug text-[var(--foreground)]">
          {item.title}
        </h3>
        <p className={`mt-3 ${text.smallBody}`}>{item.summary}</p>
        <ul className="mt-3 grid gap-1.5 pl-4 text-[12px] leading-6 text-[var(--foreground)] marker:text-[var(--accent-dark)]">
          {item.results.slice(0, 2).map((result) => (
            <li className="list-disc" key={result}>
              {result}
            </li>
          ))}
        </ul>
      </div>
      <a className={`mt-auto self-end pt-3 ${text.link}`} href={detailHref}>
        {viewDetailsLabel}
      </a>
    </article>
  );
}
