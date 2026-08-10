import { notFound } from "next/navigation";
import { caseStudies } from "@/data/case-studies";
import { layout, text } from "@/lib/design";

export function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

type CaseStudyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${study.title} | 서승주`,
    description: study.summary,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) {
    notFound();
  }

  return (
    <main className={layout.page}>
      <article className="mx-auto max-w-3xl px-5 py-8 sm:px-7 md:py-10">
        <a className={text.link} href="/#work">
          메인으로 돌아가기
        </a>

        <header className="mt-6 border-b border-[var(--line)] pb-5">
          <p className="inline-flex rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[10px] font-semibold leading-4 text-[var(--accent-dark)]">
            {study.label}
          </p>
          <h1 className="mt-2.5 text-xl font-extrabold leading-tight text-[var(--foreground)] sm:text-2xl">
            {study.title}
          </h1>
          <p className="mt-4 text-[12px] leading-6 text-[var(--body)]">{study.summary}</p>
          {study.links && study.links.length > 0 ? <StudyLinks links={study.links} /> : null}
        </header>

        <DetailSection title="문제 상황">
          <List items={study.problem} />
        </DetailSection>

        <DetailSection title="원인">
          <List items={study.causes} />
        </DetailSection>

        <DetailSection title="해결">
          <List items={study.approach} />
        </DetailSection>

        <DetailSection title="트레이드오프">
          <List items={study.tradeoffs} />
        </DetailSection>

        <DetailSection title="성과">
          <List items={study.results} />
        </DetailSection>

        {study.next.length > 0 ? (
          <DetailSection title="추가 고민">
            <List items={study.next} />
          </DetailSection>
        ) : null}
      </article>
    </main>
  );
}

function StudyLinks({
  links,
}: {
  links: NonNullable<(typeof caseStudies)[number]["links"]>;
}) {
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
