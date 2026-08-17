import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";
import { caseStudiesEn } from "@/data/case-studies.en";
import {
  activitiesEn,
  awardsEn,
  certificatesEn,
  coreStacksEn,
  educationEn,
  experienceEn,
  homeIntroEn,
  homeLabelsEn,
  languagesEn,
  metricsEn,
  projectsEn,
} from "@/data/profile.en";

export const metadata: Metadata = {
  title: "SeungJuSuh | Software Engineer",
  description:
    "English portfolio of SeungJuSuh, a software engineer focused on structuring problems and improving system design after implementation.",
};

export default function EnglishHome() {
  return (
    <HomePage
      locale="en"
      intro={homeIntroEn}
      labels={homeLabelsEn}
      caseStudies={caseStudiesEn}
      activities={activitiesEn}
      awards={awardsEn}
      certificates={certificatesEn}
      coreStacks={coreStacksEn}
      education={educationEn}
      experience={experienceEn}
      languages={languagesEn}
      metrics={metricsEn}
      projects={projectsEn}
    />
  );
}
