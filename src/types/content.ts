export type Locale = "ko" | "en";

export type IntroContent = {
  title: string;
  headline: string;
  paragraphs: string[];
};

export type HomeLabels = {
  stack: string;
  experience: string;
  selectedProjects: string;
  refactoringCaseStudy: string;
  refactoringLead: string;
  education: string;
  activitiesAndAwards: string;
  activities: string;
  awards: string;
  qualifications: string;
  certificates: string;
  languages: string;
  viewDetails: string;
  backToTop: string;
  copyright: string;
};

export type CaseStudyDetailLabels = {
  backToMain: string;
  problem: string;
  causes: string;
  approach: string;
  tradeoffs: string;
  results: string;
  next: string;
};

export type Project = {
  period: string;
  title: string;
  role: string;
  description: string;
  highlights: string[];
  stacks: string[];
  href: string;
  visuals?: ProjectVisual[];
};

export type ProjectVisual = {
  src: string;
  alt: string;
  label: string;
};

export type TimelineItem = {
  period: string;
  title: string;
  body: string;
  note?: string;
  stacks?: string[];
  details?: string[];
};

export type Award = {
  date: string;
  award: string;
  event: string;
  project: string;
  organizer: string;
};

export type SimpleCredential = {
  date?: string;
  name: string;
  issuer?: string;
  level?: string;
};

export type Activity = {
  period: string;
  category: string;
  title: string;
  role: string;
  details: string[];
};

export type CaseStudy = {
  slug: string;
  label: string;
  title: string;
  summary: string;
  links?: CaseStudyLink[];
  problem: string[];
  causes: string[];
  approach: string[];
  tradeoffs: string[];
  results: string[];
  next: string[];
};

export type CaseStudyLink = {
  label: string;
  href: string;
  type: "refactor" | "blog";
};

export type Metric = readonly [value: string, label: string];
