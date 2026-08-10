import { surface, text } from "@/lib/design";
import type { CaseStudy, Metric, Project } from "@/types/content";
import { StackChips } from "./stack-chips";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`flex h-full flex-col ${surface.card}`}>
      <div className="grid gap-1 sm:grid-cols-[minmax(0,1fr)_120px] sm:items-start">
        <div>
          <h3 className="text-sm font-semibold text-[var(--foreground)]">{project.title}</h3>
          <p className="mt-1 text-[11px] leading-5 text-[var(--muted-light)]">{project.role}</p>
        </div>
        <p className="text-[11px] leading-5 text-[var(--muted-light)] sm:text-right">
          {project.period}
        </p>
      </div>
      <div>
        <p className={`mt-2 max-w-3xl ${text.smallBody}`}>{project.description}</p>
        <div className="mt-3">
          <StackChips stacks={project.stacks} />
        </div>
        <ul className="mt-3 grid gap-1.5 pl-4 text-[12px] leading-6 text-[var(--body)] marker:text-[var(--accent-dark)]">
          {project.highlights.map((highlight) => (
            <li className="list-disc" key={highlight}>
              {highlight}
            </li>
          ))}
        </ul>
      </div>
      <a
        className={`mt-auto self-end pt-3 ${text.link}`}
        href={project.href}
        target="_blank"
        rel="noreferrer"
      >
        {project.href.replace("https://", "")}
      </a>
    </article>
  );
}

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

export function CaseStudyCard({ item }: { item: CaseStudy }) {
  return (
    <article className={`flex h-full flex-col ${surface.card}`}>
      <div>
        <span className="inline-flex rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[10px] font-semibold leading-4 text-[var(--accent-dark)]">
          {item.label}
        </span>
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
      <a className={`mt-auto self-end pt-3 ${text.link}`} href={`/case-studies/${item.slug}`}>
        자세히 보기
      </a>
    </article>
  );
}
