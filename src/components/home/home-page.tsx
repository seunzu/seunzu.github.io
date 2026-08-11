import type {
  Activity,
  Award,
  CaseStudy,
  HomeLabels,
  IntroContent,
  Locale,
  Metric,
  Project,
  SimpleCredential,
  TimelineItem,
} from "@/types/content";
import { layout } from "@/lib/design";
import { CaseStudyCard, MetricsGrid } from "./cards";
import { HomeHeader } from "./header";
import { Intro } from "./intro";
import { ProjectCard } from "./project-card";
import { ActivityRecord, InlineRecord, TimelineArticle } from "./records";
import { CompactSection, ContentSection } from "./section-shell";
import { StackChips } from "./stack-chips";

type HomePageProps = {
  locale: Locale;
  intro: IntroContent;
  labels: HomeLabels;
  caseStudies: CaseStudy[];
  activities: Activity[];
  awards: Award[];
  certificates: SimpleCredential[];
  coreStacks: string[];
  education: TimelineItem[];
  experience: TimelineItem[];
  languages: SimpleCredential[];
  metrics: Metric[];
  projects: Project[];
};

export function HomePage({
  locale,
  intro,
  labels,
  caseStudies,
  activities,
  awards,
  certificates,
  coreStacks,
  education,
  experience,
  languages,
  metrics,
  projects,
}: HomePageProps) {
  return (
    <main className={layout.page}>
      <div className="mx-auto max-w-4xl px-5 py-10 sm:px-7 md:py-14 lg:px-8">
        <HomeHeader locale={locale} />

        <section className="grid gap-9 border-b border-[var(--line-strong)] py-12">
          <div className="grid min-w-0 content-start gap-8">
            <Intro intro={intro} />

            <CompactSection id="stacks" title={labels.stack}>
              <div className="mt-3.5">
                <StackChips stacks={coreStacks} />
              </div>
            </CompactSection>
          </div>
        </section>

        <ContentSection id="experience" title={labels.experience}>
          <div className="mt-7 grid gap-5">
            {experience.map((item) => (
              <TimelineArticle item={item} key={item.title} />
            ))}
          </div>
        </ContentSection>

        <ContentSection id="projects" title={labels.selectedProjects}>
          <div className="mt-7 grid gap-5">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </ContentSection>

        <ContentSection id="work" title={labels.refactoringCaseStudy}>
          <p className="section-lead mt-5">{labels.refactoringLead}</p>
          <MetricsGrid metrics={metrics} />
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {caseStudies.map((item) => (
              <CaseStudyCard
                item={item}
                key={item.title}
                locale={locale}
                viewDetailsLabel={labels.viewDetails}
              />
            ))}
          </div>
        </ContentSection>

        <ContentSection id="education" title={labels.education}>
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

        <ContentSection id="activities" title={labels.activitiesAndAwards}>
          <div className="mt-7 grid gap-9">
            <div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">
                {labels.activities}
              </h3>
              <div className="mt-3.5 grid gap-3">
                {activities.map((activity) => (
                  <ActivityRecord activity={activity} key={activity.title} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">{labels.awards}</h3>
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

        <ContentSection id="qualifications" title={labels.qualifications}>
          <div className="mt-7 grid gap-9">
            <div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">
                {labels.certificates}
              </h3>
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
              <h3 className="text-sm font-bold text-[var(--foreground)]">{labels.languages}</h3>
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

      <footer
        id="contact"
        className="border-t border-[var(--line)] bg-white px-5 py-7 text-[var(--muted-light)] sm:px-7 lg:px-8"
      >
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 text-[10.5px]">
          <span>{labels.copyright}</span>
          <a className="underline" href="#">
            {labels.backToTop}
          </a>
        </div>
      </footer>
    </main>
  );
}
