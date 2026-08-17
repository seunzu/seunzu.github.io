import type {
  Activity,
  Award,
  HomeLabels,
  IntroContent,
  Metric,
  Project,
  SimpleCredential,
  TimelineItem,
} from "@/types/content";
import { projectAssets } from "./shared";

export const homeIntroEn: IntroContent = {
  title: "Intro",
  headline: "Defines problems clearly and improves system design beyond initial implementation.",
  paragraphs: [
    "Experienced in MSA-based services and real-time data processing projects, with a focus on service responsibility separation, data consistency, deployment automation, and troubleshooting-driven improvement.",
  ],
};

export const homeLabelsEn: HomeLabels = {
  stack: "Stack",
  experience: "Experience",
  selectedProjects: "Selected Projects",
  refactoringCaseStudy: "PlantiFy Refactoring Case Study",
  refactoringLead:
    "A record of improving the MSA payment platform around JWKS-based local validation, payment Saga consistency, ledger concurrency, event-driven post-payment processing, and AI response streaming.",
  education: "Education",
  activitiesAndAwards: "Activities & Awards",
  activities: "Activities",
  awards: "Awards",
  qualifications: "Certifications & Languages",
  certificates: "Certificates",
  languages: "Languages",
  viewDetails: "View details",
  backToTop: "Back to top",
  copyright: "© 2026 SeungJuSuh",
};

export const coreStacksEn = [
  "Java",
  "Spring Boot",
  "JPA",
  "MySQL",
  "FastAPI",
  "Docker",
  "AWS",
];

export const metricsEn: Metric[] = [
  ["0", "Auth validation API calls per protected API request"],
  ["17.77ms", "p95 response time after JWKS-based local validation"],
  ["100%", "WebSocket mock load test connection success rate"],
  ["10+", "MSA services with CI/CD and monitoring"],
];

export const projectsEn: Project[] = [
  {
    period: "2024.11 ~ 2024.12",
    title: "PlantiFy",
    role: "Backend Developer · PM",
    description:
      "MSA-based payment platform for card benefits, donation funding, virtual forest items, AI chatbot recommendations, and external payment APIs.",
    visuals: [
      {
        src: projectAssets.plantifyArchitecture,
        alt: "PlantiFy architecture diagram",
        label: "System Architecture",
      },
    ],
    highlights: [
      "Built 10+ MSA services and automated CI/CD deployment workflows",
      "Set up Prometheus and Grafana monitoring and standardized service-level error responses",
      "Implemented Kakao login, JWT authentication, item purchase, donation funding, and card benefit APIs",
      "Built B2C payment, cancellation, refund, point reward flows, and B2B payment APIs for partner services",
    ],
    stacks: [
      "Spring Boot",
      "WebFlux",
      "JPA",
      "Kafka",
      "Redis",
      "GraphQL",
      "gRPC",
      "FastAPI",
      "AWS EKS",
      "Docker",
      "Helm",
      "Grafana",
      "Prometheus",
    ],
    href: "https://github.com/hk-plantify",
  },
  {
    period: "2024.08 ~ 2024.09",
    title: "Bitrics",
    role: "Backend Developer · PM",
    description:
      "Crypto investment analytics service for real-time market data and multi-exchange asset tracking.",
    visuals: [
      {
        src: projectAssets.bitricsArchitecture,
        alt: "Bitrics development architecture diagram",
        label: "System Architecture",
      },
    ],
    highlights: [
      "Collected market data from multiple exchange APIs and calculated investment indicators",
      "Implemented Kakao login, session-based authentication, and user session restoration",
      "Automated deployment with AWS CodeDeploy and GitHub Actions",
    ],
    stacks: ["Node.js", "Upbit API", "Kakao API", "AWS", "GitHub Actions"],
    href: "https://github.com/hk-bitrics",
  },
  {
    period: "2024.01 ~ 2024.04",
    title: "Tusori",
    role: "Backend Developer · PM",
    description:
      "Stock investment simulation platform for real-time market data, financial indicators, charts, and buy/sell simulations.",
    highlights: [
      "Collected stock, index, exchange-rate, and financial indicator data with pykrx and FinanceDataReader",
      "Built portfolio features for watchlists, holdings, profit/loss, returns, and holding periods",
      "Resolved JWT signature mismatches between Spring Boot and FastAPI services",
    ],
    stacks: ["Spring Boot", "JPA", "FastAPI", "Kakao API", "AWS", "Nginx", "JWT"],
    href: "https://github.com/Tu-Sori",
  },
];

export const experienceEn: TimelineItem[] = [
  {
    period: "2025.01 ~ 2025.04",
    title: "Hwiya",
    body: "Software Engineer · Freelance",
    stacks: [
      "Next.js",
      "TypeScript",
      "React Query",
      "Tailwind CSS",
      "NestJS",
      "Prisma",
      "AWS",
      "GitHub Actions",
    ],
    details: [
      "Designed the initial domain model, ERD, and user flows for the MVP",
      "Built NestJS and Prisma APIs with standardized error handling and response formats",
      "Integrated backend APIs with the Next.js frontend and configured AWS deployment via GitHub Actions",
    ],
  },
];

export const educationEn: TimelineItem[] = [
  {
    period: "2020.03 - 2025.02",
    title: "Seoul Women's University",
    body: "B.S. in Software Convergence; Double Major in Economics",
    note: "Published in the Korea Multimedia Society Fall Conference Proceedings · Ingredient-Based Recommendation Service for Daily Health Products for Visually Impaired Users",
  },
  {
    period: "2024.06 ~ 2024.12",
    title: "K-Digital Training Full-Stack Developer Program",
    note: "The Korea Economic Daily · Toss Bank",
    body: "Studied full-stack development across modern web technologies, backend development, cloud services, databases, and deployment operations",
  },
  {
    period: "2025.07 ~ 2025.08",
    title: "LG Aimers / Data Intelligence",
    note: "LG AI Research",
    body: "Studied data analysis and machine learning-based problem solving; participated in a demand forecasting hackathon",
  },
];

export const activitiesEn: Activity[] = [
  {
    period: "2022.03 ~ 2023.05",
    category: "Academic Society",
    title: "E-PLE",
    role: "Member",
    details: [
      "Analyzed economic, financial, and market issues through company research and discussions",
      "Participated in the 2023 Monetary Policy Challenge",
    ],
  },
  {
    period: "2022.09 ~ 2023.06",
    category: "Club",
    title: "Cotato",
    role: "President",
    details: [
      "Led operations for a 40+ member student IT organization",
      "Organized sessions, study groups, projects, hackathons, CS education, and IT issue briefings",
    ],
  },
];

export const awardsEn: Award[] = [
  {
    date: "2024.12",
    award: "Excellence Award",
    event: "Project Competition",
    project: "PlantiFy",
    organizer: "The Korea Economic Daily · Toss Bank",
  },
  {
    date: "2024.09",
    award: "Grand Prize",
    event: "Project Competition",
    project: "Bitrics",
    organizer: "The Korea Economic Daily · Toss Bank",
  },
  {
    date: "2023.12",
    award: "Bronze Prize",
    event: "Capstone Design Competition",
    project: "Ingredient-Based Recommendation Service for Daily Health Products for Visually Impaired Users",
    organizer: "Seoul Women's University",
  },
];

export const certificatesEn: SimpleCredential[] = [
  { date: "2022.12", name: "SQL Developer (SQLD)", issuer: "Korea Data Agency" },
  {
    date: "2023.11",
    name: "Advanced Data Analytics Semi-Professional (ADsP)",
    issuer: "Korea Data Agency",
  },
  {
    date: "2024.06",
    name: "Engineer Information Processing",
    issuer: "Human Resources Development Service of Korea",
  },
  { date: "2024.07", name: "Big Data Analysis Engineer", issuer: "Korea Data Agency" },
];

export const languagesEn: SimpleCredential[] = [
  { name: "Korean", level: "Native" },
  { date: "2024.09", name: "English", level: "OPIc · IM3" },
  { date: "2026.06", name: "Chinese", level: "HSK Level 4" },
];
