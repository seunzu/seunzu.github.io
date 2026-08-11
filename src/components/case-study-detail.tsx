import { layout, surface, text } from "@/lib/design";
import type { CaseStudy, CaseStudyDetailLabels, CaseStudyLink } from "@/types/content";

type CaseStudyDetailProps = {
  backHref: string;
  labels: CaseStudyDetailLabels;
  study: CaseStudy;
};

export function CaseStudyDetail({ backHref, labels, study }: CaseStudyDetailProps) {
  return (
    <main className={layout.page}>
      <article className="mx-auto max-w-3xl px-5 py-8 sm:px-7 md:py-10">
        <a className={text.link} href={backHref}>
          {labels.backToMain}
        </a>

        <header className="mt-6 border-b border-[var(--line)] pb-5">
          <p className={surface.labelChip}>{study.label}</p>
          <h1 className="mt-2.5 text-xl font-extrabold leading-tight text-[var(--foreground)] sm:text-2xl">
            {study.title}
          </h1>
          <p className="mt-4 text-[12px] leading-6 text-[var(--body)]">{study.summary}</p>
          {study.links && study.links.length > 0 ? <StudyLinks links={study.links} /> : null}
        </header>

        <DetailSection title={labels.problem}>
          <List items={study.problem} />
        </DetailSection>

        <DetailSection title={labels.causes}>
          <List items={study.causes} />
        </DetailSection>

        <DetailSection title={labels.approach}>
          <List items={study.approach} />
        </DetailSection>

        <DetailSection title={labels.tradeoffs}>
          <List items={study.tradeoffs} />
        </DetailSection>

        <DetailSection title={labels.results}>
          <List items={study.results} />
        </DetailSection>

        {study.next.length > 0 ? (
          <DetailSection title={labels.next}>
            <List items={study.next} />
          </DetailSection>
        ) : null}
      </article>
    </main>
  );
}

function StudyLinks({ links }: { links: CaseStudyLink[] }) {
  return (
    <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
      {links.map((link) => (
        <a
          className={text.link}
          href={link.href}
          key={link.href}
          target="_blank"
          rel="noreferrer"
        >
          {link.href.replace("https://", "")}
        </a>
      ))}
    </div>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-[var(--line)] py-5">
      <h2 className="section-heading text-sm font-extrabold text-[var(--foreground)]">{title}</h2>
      <div className="mt-3 text-[12px] leading-6 text-[var(--body)]">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-1.5 pl-4 marker:text-[var(--accent-dark)]">
      {items.map((item) => (
        <li className="list-disc" key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}
