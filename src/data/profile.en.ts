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
  headline:
    "Backend developer who structures problems and keeps exploring better designs after implementation.",
  paragraphs: [
    "I have designed and implemented MSA-based services and real-time data processing projects, building experience in server responsibility separation, data consistency, and deployment automation.",
    "After implementation, I continue to analyze bottlenecks and risks, document design and troubleshooting decisions, and improve system structure.",
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
      "An MSA-based integrated payment platform providing card benefits, donation funding, forest decoration, an AI recommendation chatbot, and external payment APIs.",
    visuals: [
      {
        src: projectAssets.plantifyArchitecture,
        alt: "PlantiFy architecture diagram",
        label: "System Architecture",
      },
    ],
    highlights: [
      "Built 10+ MSA services, CI/CD pipelines, and automated deployment flows",
      "Set up Grafana/Prometheus-based monitoring and standardized service-level error responses",
      "Implemented core domain APIs including Kakao social login, JWT authentication, item purchase, donation funding, and card benefit lookup",
      "Implemented B2C payment, cancellation, refund, point rewards, and B2B payment APIs for partner services",
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
      "A crypto investment analytics service that collects and processes real-time market data and indicators from multiple exchanges.",
    visuals: [
      {
        src: projectAssets.bitricsArchitecture,
        alt: "Bitrics development architecture diagram",
        label: "System Architecture",
      },
    ],
    highlights: [
      "Calculated investment indicators such as current price, daily change rate, 24-hour trading volume, and kimchi premium using multi-exchange market data APIs",
      "Implemented Kakao OAuth2 login, session persistence, and user restoration flows using Passport.js and express-session",
      "Built CI/CD pipelines with AWS EC2/RDS/S3, Nginx, CodeDeploy, and GitHub Actions",
      "Planned and designed API structures for integrated asset lookup across multiple crypto exchanges",
    ],
    stacks: ["Node.js", "Upbit API", "Kakao API", "AWS", "GitHub Actions"],
    href: "https://github.com/hk-bitrics",
  },
  {
    period: "2024.01 ~ 2024.04",
    title: "Tusori",
    role: "Backend Developer · PM",
    description:
      "A stock investment simulation platform based on real-time stock prices, financial indicators, and charts.",
    highlights: [
      "Collected index, exchange rate, stock price, and financial indicator data with pykrx and FinanceDataReader and provided chart data",
      "Implemented watchlist/holding CRUD and portfolio management with automatic profit/loss, return rate, and holding period calculations",
      "Analyzed and resolved JWT signature mismatch issues across Spring Boot and FastAPI servers",
      "Refactored duplicated calculation logic and domain structure to improve maintainability and consistency",
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
      "Designed the initial domain model, ERD, and user flow for a travel service MVP",
      "Implemented NestJS and Prisma-based APIs with standardized error handling and response formats",
      "Integrated the Next.js frontend with backend APIs and configured deployment using GitHub Actions and AWS",
    ],
  },
];

export const educationEn: TimelineItem[] = [
  {
    period: "2020.03 - 2025.02",
    title: "Seoul Women's University",
    body: "Software Convergence / Economics, double major",
    note: "Published a paper on an ingredient-based quasi-drug recommendation service for visually impaired users at the Korea Multimedia Society",
  },
  {
    period: "2024.06 ~ 2024.12",
    title: "Tech Full Stack Program",
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
      "Analyzed economic and financial issues, company cases, and market topics through regular discussions",
      "Participated in monetary policy simulation competitions, including the 2023 Monetary Policy Challenge",
    ],
  },
  {
    period: "2022.09 ~ 2023.06",
    category: "Club",
    title: "Cotato",
    role: "President",
    details: [
      "Led operations for an IT club with 40+ members",
      "Organized regular sessions, study groups, projects, and hackathons",
      "Prepared CS education sessions and IT issue briefings",
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
    project: "Ingredient-based quasi-drug recommendation service for visually impaired users",
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
  { date: "2024.09", name: "English", level: "OPIc · IM3" },
  { date: "2026.06", name: "Chinese", level: "HSK Level 4" },
];
