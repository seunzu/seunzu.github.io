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

export const homeIntro: IntroContent = {
  title: "Intro",
  headline: "문제를 구조적으로 정의하고 구현 이후에도 더 나은 구조를 탐색하는 개발자 서승주입니다.",
  paragraphs: [
    "MSA 기반 서비스와 실시간 데이터 처리 프로젝트를 설계하고 구현하며 서버 책임 분리, 데이터 정합성, 배포 자동화 경험을 쌓았습니다.",
    "구현 이후에도 병목과 리스크를 분석하고 설계와 트러블슈팅을 기록하며 구조를 개선해왔습니다.",
  ],
};

export const homeLabels: HomeLabels = {
  stack: "Stack",
  experience: "Experience",
  selectedProjects: "Selected Projects",
  refactoringCaseStudy: "PlantiFy Refactoring Case Study",
  refactoringLead:
    "JWKS 기반 로컬 검증 전환, 결제 Saga 정합성, 금전 원장 동시성, 이벤트 후속 처리, AI 스트리밍을 중심으로 MSA 결제 플랫폼 구조 개선",
  education: "Education",
  activitiesAndAwards: "Activities & Awards",
  activities: "Activities",
  awards: "Awards",
  qualifications: "Certifications & Languages",
  certificates: "Certificates",
  languages: "Languages",
  viewDetails: "자세히 보기",
  backToTop: "Back to top",
  copyright: "© 2026 SeungJuSuh",
};

export const coreStacks = [
  "Java",
  "Spring Boot",
  "JPA",
  "MySQL",
  "FastAPI",
  "Docker",
  "AWS",
];

export const metrics: Metric[] = [
  ["0회", "보호 API 요청당 Auth 검증 API 호출"],
  ["17.77ms", "JWKS 기반 로컬 검증 전환 후 p95 응답"],
  ["100%", "WebSocket mock 부하 테스트 연결 성공"],
  ["10+", "MSA 서비스와 CI/CD, 모니터링 구성"],
];

export const projects: Project[] = [
  {
    period: "2024.11 ~ 2024.12",
    title: "가치있는 결제의 시작, 플랜티파이(PlantiFy)",
    role: "Backend Developer · PM",
    description:
      "카드 혜택, 펀딩형 기부, 숲 꾸미기, AI 추천 챗봇, 외부 결제 API를 제공하는 MSA 기반 통합 페이 결제 플랫폼",
    visuals: [
      {
        src: projectAssets.plantifyArchitecture,
        alt: "PlantiFy 아키텍처 구조도",
        label: "System Architecture",
      },
    ],
    highlights: [
      "10개 이상 MSA 서비스 구성, CI/CD 파이프라인 구축 및 배포 자동화",
      "Grafana, Prometheus 기반 모니터링 체계와 서비스별 에러 응답 표준화 구성",
      "카카오 소셜 로그인, JWT 인증, 아이템 구매, 펀딩형 기부, 카드 혜택 조회 등 주요 도메인 API 구현",
      "B2C 자체 결제, 취소, 환불, 포인트 적립 및 B2B 제휴 서비스용 결제 API 구현",
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
    title: "나의 첫 가상화폐 웹 애플리케이션, 비트릭스(Bitrics)",
    role: "Backend Developer · PM",
    description:
      "실시간 가상화폐 시세와 지표를 수집, 가공해 여러 거래소 자산을 한 곳에서 분석하는 투자 분석 서비스",
    visuals: [
      {
        src: projectAssets.bitricsArchitecture,
        alt: "Bitrics 개발 구조도",
        label: "System Architecture",
      },
    ],
    highlights: [
      "다중 거래소 시세 API 기반 현재가, 전일대비 변화율, 24시간 거래대금, 김치 프리미엄 등 투자 지표 계산",
      "Passport.js와 express-session 기반 카카오 OAuth2 로그인, 세션 유지, 사용자 정보 복원 흐름 구현",
      "AWS EC2/RDS/S3, Nginx, CodeDeploy, GitHub Actions 기반 CI/CD 파이프라인 구축",
      "다중 거래소 투자 내역 통합 자산 조회 기능을 기획하고 API 구조 설계",
    ],
    stacks: ["Node.js", "Upbit API", "Kakao API", "AWS", "GitHub Actions"],
    href: "https://github.com/hk-bitrics",
  },
  {
    period: "2024.01 ~ 2024.04",
    title: "투자 기초 설명서, 투설이(Tusori)",
    role: "Backend Developer · PM",
    description:
      "실시간 주식 시세, 재무지표, 차트를 기반으로 매수, 매도 시뮬레이션을 제공하는 주식 모의투자 플랫폼",
    highlights: [
      "pykrx와 FinanceDataReader 기반 지수, 환율, 주가, 재무지표 데이터 수집 및 차트 데이터 제공",
      "관심/보유 주식 CRUD와 평가손익, 손익률, 보유일 자동 계산 기반 포트폴리오 관리 기능 구현",
      "Spring Boot와 FastAPI 다중 서버 환경의 JWT 서명 불일치 문제 분석 및 인증 오류 제거",
      "중복 계산 로직 제거와 도메인 구조 리팩토링으로 유지보수성과 로직 일관성 개선",
    ],
    stacks: ["Spring Boot", "JPA", "FastAPI", "Kakao API", "AWS", "Nginx", "JWT"],
    href: "https://github.com/Tu-Sori",
  },
];

export const experience: TimelineItem[] = [
  {
    period: "2025.01 ~ 2025.04",
    title: "(주)휘야",
    body: "Software Engineer · 프리랜서",
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
      "여행 서비스 MVP의 도메인 모델링, ERD, 사용자 플로우 초기 설계",
      "NestJS와 Prisma 기반 API 구현, 공통 예외 처리와 응답 포맷 표준화",
      "Next.js 프론트엔드 연동, GitHub Actions와 AWS 기반 배포 환경 구성",
    ],
  },
];

export const education: TimelineItem[] = [
  {
    period: "2020.03 - 2025.02",
    title: "서울여자대학교",
    body: "소프트웨어융합학과 / 경제학과 복수전공",
    note: "한국멀티미디어학회 · 성분 기반 의약외품 추천 서비스 논문 등재",
  },
  {
    period: "2024.06 ~ 2024.12",
    title: "Tech 우수인재 양성을 위한 Full stack 과정",
    note: "한국경제신문 · 토스뱅크",
    body: "최신 웹 기술, 백엔드 개발, 클라우드 서비스, DB, 배포 관리 중심의 풀스택 개발 역량 학습",
  },
  {
    period: "2025.07 ~ 2025.08",
    title: "LG Aimers / Data Intelligence",
    note: "LG AI 연구원",
    body: "데이터 분석 및 머신러닝 기반 문제 해결 과정 학습, 해커톤(식음업장 메뉴 수요 예측) 참여",
  },
];

export const activities: Activity[] = [
  {
    period: "2022.03 ~ 2023.05",
    category: "학회",
    title: "이플(E-PLE)",
    role: "학회원",
    details: [
      "경제·금융 이슈 기반 신문 분석, 기업 분석 및 토론",
      "모의통화경시대회, 2023 통화정책 경시대회 참가",
    ],
  },
  {
    period: "2022.09 ~ 2023.06",
    category: "동아리",
    title: "Cotato(코테이토)",
    role: "회장",
    details: [
      "40명 이상 규모 IT 연합 동아리 운영 총괄",
      "정기 세션·스터디·프로젝트·해커톤 기획 및 진행",
      "CS 교육 및 IT 이슈 소개",
    ],
  },
];

export const awards: Award[] = [
  {
    date: "2024.12",
    award: "우수상",
    event: "프로젝트 경진대회",
    project: "가치있는 결제의 시작, 플랜티파이",
    organizer: "한국경제신문 · 토스뱅크",
  },
  {
    date: "2024.09",
    award: "대상",
    event: "프로젝트 경진대회",
    project: "나의 첫 가상화폐 웹 애플리케이션, 비트릭스",
    organizer: "한국경제신문 · 토스뱅크",
  },
  {
    date: "2023.12",
    award: "동상",
    event: "캡스톤디자인 경진대회",
    project: "시각 장애인 대상 성분 기반 의약외품 추천 서비스",
    organizer: "서울여자대학교",
  },
];

export const certificates: SimpleCredential[] = [
  { date: "2022.12", name: "SQL 개발자(SQLD)", issuer: "한국데이터산업진흥원" },
  {
    date: "2023.11",
    name: "데이터분석준전문가(ADsP)",
    issuer: "한국데이터산업진흥원",
  },
  { date: "2024.06", name: "정보처리기사", issuer: "한국산업인력공단" },
  { date: "2024.07", name: "빅데이터분석기사", issuer: "한국데이터산업진흥원" },
];

export const languages: SimpleCredential[] = [
  { date: "2024.09", name: "영어", level: "OPIc · IM3" },
  { date: "2026.06", name: "중국어", level: "HSK 4급" },
];
