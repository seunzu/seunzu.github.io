import type { CaseStudy, CaseStudyDetailLabels } from "@/types/content";

export const caseStudyDetailLabels: CaseStudyDetailLabels = {
  backToMain: "메인으로 돌아가기",
  problem: "문제 상황",
  causes: "원인",
  approach: "해결",
  tradeoffs: "트레이드오프",
  results: "성과",
  next: "추가 고민",
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "jwks-auth",
    label: "Authentication",
    title: "JWKS 기반 로컬 검증 전환과 Auth 의존성 완화",
    summary:
      "보호 API 요청마다 발생하던 Auth 검증 API 호출을 JWKS 기반 로컬 검증으로 전환",
    links: [
      {
        label: "Auth Refactor Repository",
        href: "https://github.com/seunzu/plantify-msa-auth-refactor",
        type: "refactor",
      },
      {
        label: "Related Blog",
        href: "https://debug.tistory.com/564",
        type: "blog",
      },
    ],
    problem: [
      "기존 구조는 보호 API 요청마다 Auth 서버의 /validate-token을 호출하는 방식",
      "인증 검증 요청이 Auth 서버로 집중되어 서비스 확장 시 병목 가능성 존재",
      "Auth 서버 지연/장애가 각 리소스 서비스의 인증 흐름에 전파될 수 있음",
      "HS256 기반 구조를 로컬 검증으로 확장하려면 서비스 간 secret 공유 필요",
    ],
    causes: [
      "리소스 서비스가 JWT를 직접 검증하지 않고 Auth 서버에 검증을 위임",
      "사용자 권한(role)을 JWT가 아닌 Auth 서버의 DB 조회 결과로 전달",
      "대칭키 기반 JWT 구조로 여러 서비스가 동일한 secret에 의존",
    ],
    approach: [
      "Auth 서버의 JWT 서명 방식을 HS256에서 RS256으로 전환",
      "RSA public key를 /.well-known/jwks.json 엔드포인트로 노출",
      "Access Token에 userId와 role 클레임 포함",
      "리소스 서비스가 JWKS 기반으로 JWT를 로컬 검증하도록 변경",
      "Spring Security Resource Server 설정을 common-auth-lib로 분리",
      "JwtFilter, AuthServiceClient, 인증 응답 DTO 중복 구현 제거",
    ],
    tradeoffs: [
      "인증 검증 위치: Auth 중앙 검증은 구현이 단순하고 토큰 상태 변경을 즉시 반영하기 쉽지만 보호 API 요청마다 Auth 서버에 의존해 각 서비스 로컬 검증으로 전환",
      "JWT 서명 방식: HS256은 단순하지만 여러 서비스가 동일 secret을 공유해야 해 private key를 Auth 서버에만 둘 수 있는 RS256 방식 선택",
      "공통 인증 설정: 서비스별 JwtFilter 구현은 서비스가 늘어날수록 중복이 커져 Resource Server 설정과 role 매핑을 common-auth-lib로 공통화",
      "키 관리 방식: 로컬 실험에서는 인메모리 RSA 키를 허용했지만 운영 환경에서는 안정적인 PEM key 또는 Secret 기반 관리 필요",
    ],
    results: [
      "보호 API 요청마다 발생하던 Auth 검증 API 호출을 JWKS 기반 로컬 검증으로 전환",
      "RS256 전환, JWKS 엔드포인트 제공, common-auth-lib 분리를 통해 리소스 서비스 인증 설정 재사용 구조 마련",
      "보호 API 요청당 Auth 검증 API 호출 1회 -> 0회, Auth DB 조회 1회 -> 0회로 감소",
      "main 기준 /validate-token 직접 호출 p95 40.02ms, refactor 기준 /api/demo/me p95 17.77ms 기록",
      "Auth 중단 테스트에서 20 VU / 2분 기준 2,380 iterations 처리, 실패율 0.00% 확인",
    ],
    next: [],
  },
  {
    slug: "payment-saga",
    label: "Payment",
    title: "MSA 환경에서 결제 Saga 정합성 확보",
    summary: "Payment를 자체 PG 역할의 결제 Orchestrator로 전면 배치하고 책임 경계 재정의",
    links: [
      {
        label: "Payment Refactor Repository",
        href: "https://github.com/seunzu/plantify-msa-payment-refactor",
        type: "refactor",
      },
      {
        label: "Related Blog",
        href: "https://debug.tistory.com/515",
        type: "blog",
      },
    ],
    problem: [
      "결제 실행 중 일부 서비스 호출 실패 시 결제 상태와 금전 원장이 불일치할 수 있음",
      "사용자는 결제 실패 응답을 받았지만 잔액은 이미 차감된 상태가 될 수 있음",
      "Payment, Pay, Transaction 중 어느 단계까지 성공했는지 추적하기 어려움",
    ],
    causes: [
      "결제 흐름 조율 책임과 Ledger 변경 책임이 Pay에 함께 존재",
      "Payment는 결제 실행 기록을 관리했지만 결제 흐름의 진입점은 아니었음",
      "Ledger 변경과 Transaction 확정이 서로 다른 서비스 호출로 분리되어 부분 실패 가능성 존재",
      "MSA 구조상 각 서버의 변경을 하나의 DB 트랜잭션으로 묶을 수 없음",
    ],
    approach: [
      "Payment를 자체 PG 역할의 결제 Orchestrator로 전면 배치",
      "Pay는 잔액 차감, 포인트 사용, 정산 기록을 담당하는 Ledger 책임으로 축소",
      "Transaction은 결제 진행 상태 전이만 담당하도록 분리",
      "Ledger 차감이 완료된 경우에만 Transaction을 COMPLETED 상태로 확정",
      "Transaction 확정 실패 시 credit 보상 처리로 잔액과 포인트 복원 시도",
    ],
    tradeoffs: [
      "분산 트랜잭션: 2PC는 강한 원자성을 제공하지만 서비스 간 DB 결합과 전체 지연이 커져 결제 흐름에는 과하다고 판단",
      "사가 방식: Choreography Saga는 서비스 간 결합은 낮지만 실패 지점 추적과 보상 흐름 관리가 복잡해 제외",
      "조율 방식: Orchestration Saga는 중앙 조율자에 의존하지만 결제 실패 단계와 보상 순서를 명확히 제어할 수 있어 Payment 중심 구조로 선택",
    ],
    results: [
      "Pay에 집중되어 있던 결제 조율 책임과 Ledger 책임 분리",
      "금전 변경 성공 이후에만 거래 완료 상태로 전이되도록 처리 순서 개선",
      "Transaction 확정 실패 시 credit 보상 경로를 추가해 상태 불일치 복구 가능성 향상",
      "Payment, Pay, Transaction의 책임 경계를 결제 흐름 기준으로 재정의",
      "5분 이상 PENDING 상태가 유지된 Payment를 Scheduler가 Transaction과 함께 FAILED 상태로 정리",
    ],
    next: [
      "credit 보상까지 실패할 경우 자동 복구가 아닌 수동 처리 로그에 의존",
      "Saga 상태 저장소가 없어 장애 복구 시 단계별 추적이 제한적",
      "Outbox, Saga Log, 운영 알림 기반의 자동 복구 체계 추가 필요",
    ],
  },
  {
    slug: "ledger-concurrency",
    label: "Ledger",
    title: "금전 원장 동시성 및 멱등성 확보",
    summary: "userId 기준 Ledger 락과 transactionId 기반 중복 방어로 다중 Pod 환경의 중복 차감 방지",
    links: [
      {
        label: "Payment Refactor Repository",
        href: "https://github.com/seunzu/plantify-msa-payment-refactor",
        type: "refactor",
      },
      {
        label: "Related Blog",
        href: "https://debug.tistory.com/515",
        type: "blog",
      },
    ],
    problem: [
      "동일 사용자의 결제 요청이 여러 Pod에서 동시에 처리될 수 있음",
      "잔액 검증과 차감 시점이 어긋나면 중복 차감 또는 음수 잔액이 발생할 수 있음",
      "네트워크 재시도나 중복 요청으로 동일 거래가 여러 번 debit될 수 있음",
    ],
    causes: [
      "동시성 제어 기준이 실제 공유 자원인 사용자 잔액에 맞춰져 있지 않았음",
      "transactionId는 하나의 결제 흐름을 식별하는 거래 ID라 서로 다른 결제 간 동시 차감을 막지 못함",
      "v2에서는 Payment, Pay, Transaction이 각각 다른 락 키를 사용",
      "같은 userId 요청이라도 서비스별 락 영역이 달라 동시에 처리될 수 있었음",
    ],
    approach: [
      "분산 락 적용 범위를 실제 금전 변경이 발생하는 Pay(Ledger)로 한정",
      "userId 기준 Ledger 락을 적용해 동일 사용자의 잔액 변경 요청을 순차 처리",
      "transactionId는 동일 debit 요청의 재시도 여부를 판단하는 기준으로 사용",
      "PaySettlement.transactionId unique 제약과 exists check로 중복 debit 방지",
      "orderId unique 제약을 추가해 동일 주문의 중복 결제 진입 방어",
    ],
    tradeoffs: [
      "락 기준: transactionId는 동일 요청 재시도 방어에는 적합하지만 서로 다른 결제의 동시 차감을 막기 어려워 Ledger 락 기준에서 제외",
      "DB 락: 단일 서비스 내부에서는 명확하지만 MSA 환경에서는 DB 공유 결합이 생겨 서비스 간 동시성 제어 수단으로는 제외",
      "분산 락: Redis 기반 락은 외부 인프라 의존성이 있지만 다중 Pod 환경에서 동일 사용자 잔액 변경을 제어할 수 있어 선택",
    ],
    results: [
      "동일 사용자 동시 결제 요청에서 잔액 변경 구간 직렬화",
      "transactionId 기반 exists check와 unique 제약으로 중복 debit 방지",
      "동일 주문 중복 결제 진입 차단",
      "k6 테스트에서 잔액 500,000원 기준 200,000원 결제 5건 동시 요청 시 2건 성공, 3건 잔액 부족 처리 확인",
    ],
    next: [
      "debit은 transactionId 기반으로 중복 처리를 방어했지만 credit은 복원 요청 식별 키가 부족",
      "보상/환불 재시도까지 안전하게 처리하려면 compensationId 또는 transactionId 기반 복원 이력 필요",
    ],
  },
  {
    slug: "payment-events",
    label: "Event",
    title: "이벤트 기반 결제 후속 처리 분리",
    summary: "PaymentApproved 이벤트 기반으로 결제 승인 응답과 포인트 적립 후속 처리 분리",
    links: [
      {
        label: "Payment Refactor Repository",
        href: "https://github.com/seunzu/plantify-msa-payment-refactor",
        type: "refactor",
      },
    ],
    problem: [
      "포인트 적립과 정산 후속 처리가 결제 응답 흐름에 포함되면 응답 지연과 장애 전파 가능성 발생",
      "후속 처리 실패가 사용자 결제 응답에 영향을 줄 수 있음",
      "결제 성공 여부와 포인트 적립 성공 여부의 실패 기준이 다름",
    ],
    causes: [
      "결제 승인과 포인트 적립은 실패 기준과 재처리 기준이 다른 흐름",
      "포인트 적립은 결제 성공 이후 재처리 가능한 후속 작업",
      "동기 HTTP 호출로 후속 처리를 연결하면 후속 서비스 장애가 결제 API 응답에 전파됨",
      "이벤트 발행 실패와 소비 실패에 대한 운영 재처리 기준 필요",
    ],
    approach: [
      "Payment가 APPROVED 상태로 저장된 이후 PaymentApproved 이벤트 발행",
      "Pay는 이벤트를 소비해 포인트 적립과 PaySettlement REWARDED 처리를 수행",
      "결제 승인 응답과 포인트 적립 처리를 Kafka 기반 비동기 흐름으로 분리",
      "이미 REWARDED 처리된 transactionId는 skip해 중복 후속 처리 방지",
    ],
    tradeoffs: [
      "동기 HTTP: 흐름은 단순하지만 포인트 적립 실패가 결제 승인 응답에 직접 영향을 줄 수 있어 후속 처리 방식에서 제외",
      "비동기 이벤트: Kafka는 이벤트 유실과 재처리 설계가 필요하지만 결제 승인 응답과 포인트 적립을 분리할 수 있어 선택",
    ],
    results: [
      "결제 승인 응답과 포인트 적립 후속 처리 분리",
      "PaymentApproved 이벤트 기반으로 Pay의 후속 처리 책임 격리",
      "결제 성공 이후 포인트 적립 실패가 결제 API 응답에 직접 전파되지 않는 구조로 개선",
      "k6 및 로그 검증으로 이벤트 발행, 소비, 포인트 적립 흐름 확인",
    ],
    next: [
      "Outbox와 DLQ는 아직 미구현",
      "Payment APPROVED 저장과 이벤트 발행이 원자적으로 묶이지 않아 이벤트 유실 가능성 존재",
      "consumer 처리 실패에 대한 자동 재처리와 운영 모니터링 체계 필요",
    ],
  },
  {
    slug: "websocket-streaming",
    label: "Streaming",
    title: "WebSocket 기반 AI 응답 스트리밍 개선",
    summary: "WebFlux WebSocket과 gRPC server streaming 기반 AI 응답 chunk 즉시 전달 구조 개선",
    links: [
      {
        label: "Chat Refactor Repository",
        href: "https://github.com/seunzu/plantify-msa-chat-refactor",
        type: "refactor",
      },
    ],
    problem: [
      "프론트 요청은 chat-service를 거쳐 AI chatbot 서버까지 정상 전달됐지만 AI 추론 시간이 길어지는 동안 WebSocket 연결이 끊기거나 응답 대기가 길어짐",
      "기존 Spring MVC + Tomcat 구조에서 AI 응답 완료 전까지 서버 요청 흐름이 오래 점유됨",
      "사용자가 연속으로 메시지를 보낼 경우 응답 순서가 섞이거나 연결 안정성이 떨어질 수 있었음",
    ],
    causes: [
      "RestTemplate 기반 동기 HTTP 호출로 AI 응답 완료까지 worker thread 점유",
      "CompletableFuture.runAsync를 사용해도 내부 AI 호출이 blocking이면 병목이 유지됨",
      "응답 전체를 받은 뒤 전달하는 구조라 첫 응답까지 체감 지연이 큼",
    ],
    approach: [
      "v2에서 Spring WebFlux + Netty 기반 WebSocket 처리로 전환하고 AI 서버 통신을 gRPC server streaming으로 변경",
      "AI 응답 chunk가 도착하는 즉시 WebSocket으로 전달해 전체 응답 완료 대기 구조 개선",
      "v3에서 실제 AI 서버 의존성을 mock 서버로 분리해 WebSocket -> gRPC streaming -> WebSocket 경로를 재현 가능하게 구성",
      "flatMap -> concatMap으로 동일 세션 내 응답 순서를 보장",
      "무제한 버퍼링 대신 지연 상황을 에러로 드러내도록 변경해 메모리 누적 리스크 관측 가능",
    ],
    tradeoffs: [
      "비동기 처리: CompletableFuture / @Async는 blocking 호출을 별도 thread로 옮길 뿐 AI 추론 대기 중 thread 점유 문제를 근본적으로 해결하지 못해 제외",
      "서버 런타임: 기존 Spring MVC + Tomcat 구조보다 WebSocket 연결 유지와 gRPC streaming 응답 전달에 적합한 WebFlux + Netty 선택",
      "AI 서버 통신: REST는 응답 전체 완료 후 전달되는 구조가 되기 쉬워, 토큰 단위 응답을 즉시 전달할 수 있는 gRPC server streaming 선택",
      "메시징 구조: Kafka는 대규모 비동기 메시징에는 적합하지만, 1:1 AI 채팅의 즉각적인 요청-응답 UX에는 broker 경유 지연과 consumer 관리 부담이 커 제외",
      "실시간 통신: SSE도 단방향 스트리밍에는 적합하지만, 사용자의 연속 메시지와 AI 응답 chunk를 하나의 연결에서 처리하기 위해 WebSocket 유지",
    ],
    results: [
      "실제 chatbot 연동 환경에서 AI 추론 지연 중 발생하던 WebSocket 연결 불안정 문제를 WebFlux + gRPC streaming 구조로 개선",
      "v3 검증 repo에서 단위 테스트, gRPC in-process 테스트, WebSocket 통합 테스트, k6 부하 테스트 추가",
      "mock 기반 k6 테스트에서 VU 50 / 20초 기준 600 sessions, 4,200 response chunks 처리",
      "WebSocket connection success 100%, stream completed 100%, gRPC error 0건 확인",
      "first-token latency p95 117.85ms, stream duration p95 776ms 관측",
    ],
    next: [],
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export function getCaseStudyStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}
