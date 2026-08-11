import type { CaseStudy, CaseStudyDetailLabels } from "@/types/content";

export const caseStudyDetailLabelsEn: CaseStudyDetailLabels = {
  backToMain: "Back to main",
  problem: "Problem",
  causes: "Root Cause",
  approach: "Approach",
  tradeoffs: "Trade-offs",
  results: "Results",
  next: "Further Work",
};

export const caseStudiesEn: CaseStudy[] = [
  {
    slug: "jwks-auth",
    label: "Authentication",
    title: "JWKS-based Local Validation and Reduced Auth Dependency",
    summary:
      "Replaced Auth API validation on every protected request with local JWT validation using JWKS.",
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
      "Each protected API request called the Auth server's /validate-token endpoint",
      "Authentication validation traffic could become concentrated on the Auth server as services scaled",
      "Auth server latency or failure could propagate to resource service authentication flows",
      "Moving to local validation with HS256 would require sharing the same secret across services",
    ],
    causes: [
      "Resource services delegated JWT validation to the Auth server instead of validating tokens locally",
      "User role information was returned from the Auth server's DB lookup instead of being included in the JWT",
      "The symmetric-key JWT structure made multiple services depend on the same shared secret",
    ],
    approach: [
      "Changed JWT signing from HS256 to RS256 in the Auth server",
      "Exposed the RSA public key through a /.well-known/jwks.json endpoint",
      "Included userId and role claims in the access token",
      "Changed resource services to validate JWTs locally using JWKS",
      "Extracted Spring Security Resource Server settings into a reusable common-auth-lib",
      "Removed duplicated JwtFilter, AuthServiceClient, and auth response DTO implementations",
    ],
    tradeoffs: [
      "Central Auth validation is simple and reflects token state changes quickly, but it makes every protected request depend on Auth availability",
      "HS256 is simpler, but RS256 keeps the private key inside Auth while allowing resource services to validate tokens with public keys",
      "Service-level JwtFilter implementations are easy at first, but shared Resource Server configuration reduced duplication as services grew",
      "In-memory RSA keys were acceptable for local refactoring tests, but production would require stable PEM keys or secret management",
    ],
    results: [
      "Reduced Auth validation API calls from 1 to 0 per protected API request",
      "Introduced RS256, a JWKS endpoint, and a reusable common-auth-lib for resource services",
      "Reduced Auth DB lookups from 1 to 0 per protected API request",
      "Observed p95 response time of 17.77ms after local validation, compared with 40.02ms for direct /validate-token calls",
      "Processed 2,380 iterations with a 0.00% failure rate in a 20 VU / 2 minute Auth outage test",
    ],
    next: [],
  },
  {
    slug: "payment-saga",
    label: "Payment",
    title: "Payment Saga Consistency in an MSA Environment",
    summary:
      "Repositioned Payment as the payment orchestrator and clarified service boundaries across Payment, Pay, and Transaction.",
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
      "A partial service failure during payment execution could leave payment state and ledger state inconsistent",
      "Users could receive a failed payment response after their balance had already been debited",
      "It was difficult to identify whether Payment, Pay, or Transaction had succeeded before failure",
    ],
    causes: [
      "Payment flow orchestration and Ledger updates were both concentrated in Pay",
      "Payment stored execution records but was not the entry point of the payment flow",
      "Ledger updates and Transaction confirmation were split across different service calls",
      "In an MSA architecture, changes across services cannot be wrapped in a single DB transaction",
    ],
    approach: [
      "Placed Payment at the front as a payment orchestrator similar to a PG role",
      "Reduced Pay's responsibility to ledger-related balance deduction, point usage, and settlement records",
      "Separated Transaction so it only managed payment state transitions",
      "Confirmed Transaction as COMPLETED only after Ledger deduction succeeded",
      "Added a credit compensation path to restore balance and points if Transaction confirmation failed",
    ],
    tradeoffs: [
      "2PC provides strong atomicity, but it couples service databases and increases latency, so it was too heavy for this payment flow",
      "Choreography Saga lowers coupling, but failure tracking and compensation ordering become harder to manage",
      "Orchestration Saga introduces a central coordinator, but it made failure stages and compensation order explicit enough for this case",
    ],
    results: [
      "Separated payment orchestration from ledger responsibility",
      "Improved the order of state transitions so transactions complete only after ledger changes succeed",
      "Added a compensation path to restore balance and points when Transaction confirmation fails",
      "Redefined Payment, Pay, and Transaction responsibilities around the payment flow",
      "Added a scheduler to mark Payments stuck in PENDING for more than 5 minutes as FAILED together with Transaction state",
      "Verified failure paths through logs by checking the payment step, compensation branch, and final Transaction state",
    ],
    next: [
      "If credit compensation also fails, recovery still depends on manual handling logs",
      "A Saga state store is not yet implemented, which limits step-level recovery after failures",
      "Outbox, Saga log, and operational alerting would be needed for stronger recovery automation",
    ],
  },
  {
    slug: "ledger-concurrency",
    label: "Ledger",
    title: "Ledger Concurrency and Idempotency Control",
    summary:
      "Prevented duplicate debits in a multi-Pod environment using userId-based ledger locks and transactionId-based idempotency checks.",
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
      "Multiple Pods could process payment requests for the same user at the same time",
      "If balance validation and deduction happened out of order, duplicate debits or negative balances could occur",
      "Network retries or duplicated requests could debit the same transaction more than once",
    ],
    causes: [
      "The concurrency control key was not aligned with the actual shared resource: user balance",
      "transactionId identifies a single payment flow, but it cannot serialize different payments by the same user",
      "Payment, Pay, and Transaction used different lock keys in v2",
      "Requests for the same user could still execute concurrently because each service had a separate lock scope",
    ],
    approach: [
      "Limited distributed locking to Pay, where actual ledger changes happen",
      "Applied a userId-based Ledger lock to serialize balance-changing requests for the same user",
      "Used transactionId to detect retries for the same debit request",
      "Added PaySettlement.transactionId unique constraints and exists checks to prevent duplicate debits",
      "Added an orderId unique constraint to block duplicate payment entry for the same order",
    ],
    tradeoffs: [
      "transactionId is useful for retry protection, but it does not prevent concurrent deductions from different payments by the same user",
      "DB locks are clear inside a single service, but they create database coupling across services in an MSA environment",
      "Redis-based distributed locks introduce infrastructure dependency, but they can coordinate balance updates across multiple Pods",
    ],
    results: [
      "Serialized balance-changing operations for the same user",
      "Prevented duplicate debit requests with transactionId checks and unique constraints",
      "Blocked duplicate payment entry for the same order",
      "In a k6 test with a 500,000 KRW balance and five concurrent 200,000 KRW payment requests, two requests succeeded and three were rejected for insufficient balance",
    ],
    next: [
      "Debit idempotency is protected by transactionId, but credit restoration still needs a clearer request identity",
      "Compensation and refund retries would require restoration history based on compensationId or transactionId",
    ],
  },
  {
    slug: "payment-events",
    label: "Event",
    title: "Event-driven Post-payment Processing",
    summary:
      "Separated payment approval responses from point reward processing through PaymentApproved events.",
    links: [
      {
        label: "Payment Refactor Repository",
        href: "https://github.com/seunzu/plantify-msa-payment-refactor",
        type: "refactor",
      },
    ],
    problem: [
      "Including point reward and settlement follow-up work in the payment response flow could increase response latency",
      "Failures in post-payment processing could propagate back to the user's payment response",
      "Payment success and point reward success had different failure and retry criteria",
    ],
    causes: [
      "Payment approval and point rewards are different flows with different retry boundaries",
      "Point rewards can be retried after successful payment approval",
      "Synchronous HTTP calls make downstream service failures affect the payment API response",
      "Event publishing and consumption failures require operational retry policies",
    ],
    approach: [
      "Published a PaymentApproved event after Payment was saved as APPROVED",
      "Let Pay consume the event and process point rewards and PaySettlement REWARDED state",
      "Separated payment approval responses and point rewards through Kafka-based asynchronous processing",
      "Skipped already REWARDED transactionIds to prevent duplicate post-payment processing",
    ],
    tradeoffs: [
      "Synchronous HTTP is simpler, but point reward failures can directly affect payment approval responses",
      "Asynchronous events require event loss and retry design, but they separate user-facing payment responses from retryable follow-up work",
    ],
    results: [
      "Separated payment approval response flow from post-payment reward processing",
      "Isolated Pay service responsibility through PaymentApproved event consumption",
      "Prevented post-payment reward failures from directly propagating to the user-facing payment API response",
      "Verified PaymentApproved event publishing, consumption, and point reward flow through k6 scenarios and application logs",
    ],
    next: [
      "Outbox and DLQ are not implemented yet",
      "Payment APPROVED persistence and event publishing are not atomic, so event loss still needs to be addressed",
      "Consumer retry handling and operational monitoring would be needed for production-grade recovery",
    ],
  },
  {
    slug: "websocket-streaming",
    label: "Streaming",
    title: "WebSocket-based AI Response Streaming",
    summary:
      "Improved AI response streaming with WebFlux WebSocket and gRPC server streaming.",
    links: [
      {
        label: "Chat Refactor Repository",
        href: "https://github.com/seunzu/plantify-msa-chat-refactor",
        type: "refactor",
      },
    ],
    problem: [
      "Frontend requests reached chat-service and the AI chatbot server, but WebSocket connections became unstable while AI inference took time",
      "The existing Spring MVC + Tomcat flow held server resources while waiting for the full AI response",
      "When users sent messages continuously, response order and connection stability could degrade",
    ],
    causes: [
      "RestTemplate-based synchronous HTTP calls occupied worker threads until AI responses completed",
      "CompletableFuture.runAsync moved work to another thread, but blocking AI calls still kept the bottleneck",
      "The system delivered responses only after receiving the full AI output, increasing perceived first-response latency",
    ],
    approach: [
      "Changed v2 to Spring WebFlux + Netty WebSocket handling and gRPC server streaming for AI communication",
      "Forwarded AI response chunks to the WebSocket as soon as they arrived",
      "Separated actual AI server dependency with a mock server in v3 to reproduce the WebSocket -> gRPC streaming -> WebSocket path",
      "Changed flatMap to concatMap to preserve response order within the same session",
      "Changed unbounded buffering into visible errors under delay conditions to expose memory accumulation risks",
    ],
    tradeoffs: [
      "CompletableFuture / @Async still occupies threads when the underlying AI call is blocking",
      "WebFlux + Netty was a better fit than Spring MVC + Tomcat for long-lived WebSocket connections and streaming delivery",
      "REST often delivers after the full response is complete, while gRPC server streaming can forward chunks immediately",
      "Kafka is useful for large-scale asynchronous messaging, but it adds broker latency and consumer management overhead for one-to-one AI chat UX",
      "SSE supports one-way streaming, but WebSocket better fits continuous user messages and AI chunks over a single connection",
    ],
    results: [
      "Improved WebSocket stability during delayed AI inference with WebFlux and gRPC streaming",
      "Added unit tests, gRPC in-process tests, WebSocket integration tests, and k6 load tests in the v3 verification repository",
      "Processed 600 sessions and 4,200 response chunks in a mock-based k6 test with 50 VUs over 20 seconds",
      "Verified 100% WebSocket connection success, 100% stream completion, and 0 gRPC errors",
      "Observed p95 first-token latency of 117.85ms and p95 stream duration of 776ms",
    ],
    next: [],
  },
];

export function getCaseStudyBySlugEn(slug: string) {
  return caseStudiesEn.find((study) => study.slug === slug);
}

export function getCaseStudyStaticParamsEn() {
  return caseStudiesEn.map((study) => ({
    slug: study.slug,
  }));
}
