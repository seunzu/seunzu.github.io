import { caseStudies } from "@/data/case-studies";
import { HomePage } from "@/components/home/home-page";
import {
  activities,
  awards,
  certificates,
  coreStacks,
  education,
  experience,
  homeIntro,
  homeLabels,
  languages,
  metrics,
  projects,
} from "@/data/profile";

export default function Home() {
  return (
    <HomePage
      locale="ko"
      intro={homeIntro}
      labels={homeLabels}
      caseStudies={caseStudies}
      activities={activities}
      awards={awards}
      certificates={certificates}
      coreStacks={coreStacks}
      education={education}
      experience={experience}
      languages={languages}
      metrics={metrics}
      projects={projects}
    />
  );
}
