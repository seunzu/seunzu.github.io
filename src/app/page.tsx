import { caseStudies } from "@/data/case-studies";
import {
  ActivityRecord,
  CaseStudyCard,
  CompactSection,
  ContentSection,
  HomeHeader,
  InlineRecord,
  Intro,
  MetricsGrid,
  ProjectCard,
  StackChips,
  TimelineArticle,
} from "@/components/home";
import {
  activities,
  awards,
  certificates,
  coreStacks,
  education,
  experience,
  languages,
  metrics,
  projects,
} from "@/data/profile";
import { layout } from "@/lib/design";

export default function Home() {
  return (
    <main className={layout.page}>
      <div className="mx-auto max-w-4xl px-5 py-10 sm:px-7 md:py-14 lg:px-8">
        <HomeHeader />

        <section className="grid gap-9 border-b border-[var(--line-strong)] py-12">
          <div className="grid min-w-0 content-start gap-8">
            <Intro />

            <CompactSection id="stacks" title="Stack">
              <div className="mt-3.5">
                <StackChips stacks={coreStacks} />
              </div>
            </CompactSection>
          </div>
        </section>

        <ContentSection id="experience" title="Experience">
          <div className="mt-7 grid gap-5">
            {experience.map((item) => (
              <TimelineArticle item={item} key={item.title} />
            ))}
          </div>
        </ContentSection>

        <ContentSection id="projects" title="Selected Projects">
          <div className="mt-7 grid gap-5">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </ContentSection>

        <ContentSection id="work" title="Plantify Refactoring Case Study">
          <p className="section-lead mt-5">
            인증 로컬화, 결제 Saga 정합성, 금전 원장 동시성, 이벤트 후속 처리,
            AI 스트리밍을 중심으로 MSA 결제 플랫폼 구조 개선
          </p>
          <MetricsGrid metrics={metrics} />
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {caseStudies.map((item) => (
              <CaseStudyCard item={item} key={item.title} />
            ))}
          </div>
        </ContentSection>

        <ContentSection id="education" title="Education">
          <div className="mt-7 grid gap-4">
            {education.map((item) => (
              <InlineRecord
                key={item.title}
                meta={item.period}
                title={item.title}
                body={item.body}
                note={item.note}
              />
            ))}
          </div>
        </ContentSection>

        <ContentSection id="activities" title="Activities & Awards">
          <div className="mt-7 grid gap-9">
            <div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">Activities</h3>
              <div className="mt-3.5 grid gap-3">
                {activities.map((activity) => (
                  <ActivityRecord activity={activity} key={activity.title} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">Awards</h3>
              <div className="mt-3.5 grid gap-3">
                {awards.map((item) => (
                  <InlineRecord
                    key={`${item.date}-${item.award}`}
                    meta={item.date}
                    title={item.award}
                    body={`${item.event} · ${item.project}`}
                    note={item.organizer}
                  />
                ))}
              </div>
            </div>
          </div>
        </ContentSection>

        <ContentSection id="qualifications" title="Certifications & Languages">
          <div className="mt-7 grid gap-9">
            <div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">Certificates</h3>
              <div className="mt-3.5 grid gap-3 sm:grid-cols-2">
                {certificates.map((item) => (
                  <InlineRecord
                    key={item.name}
                    meta={item.date}
                    title={item.name}
                    body={item.issuer}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">Languages</h3>
              <div className="mt-3.5 grid gap-3 sm:grid-cols-2">
                {languages.map((item) => (
                  <InlineRecord
                    key={item.name}
                    meta={item.date}
                    title={item.name}
                    body={item.level}
                  />
                ))}
              </div>
            </div>
          </div>
        </ContentSection>

      </div>

      <footer id="contact" className="border-t border-[var(--line)] bg-white px-5 py-7 text-[var(--muted-light)] sm:px-7 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 text-[10.5px]">
          <span>© 2026 SeungJuSuh</span>
          <a className="underline" href="#">
            Back to top
          </a>
        </div>
      </footer>
    </main>
  );
}
