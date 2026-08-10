import { text } from "@/lib/design";

export function Intro() {
  return (
    <section id="intro">
      <h2 className="section-heading text-lg font-bold leading-tight text-[var(--foreground)] sm:text-xl">
        Intro
      </h2>
      <p className="mt-5 text-[13px] font-semibold leading-6 text-[var(--foreground)] sm:text-sm">
        문제를 구조적으로 정의하고 끝까지 개선하는 개발자 서승주입니다.
      </p>
      <p className={`mt-3 max-w-3xl ${text.body}`}>
        가상화폐 투자 분석 서비스와 MSA 기반 결제 플랫폼을 단독으로 설계 및 구축하며
        동시성 환경에서의 트랜잭션 정합성과 처리 성능을 함께 다루는 경험을 쌓았습니다.
      </p>
      <p className={`mt-3 max-w-3xl ${text.body}`}>
        v1에서 멈추지 않고 성능 병목을 추적하고 안정성을 반복적으로 개선합니다.
      </p>
      <p className={`mt-3 max-w-3xl ${text.body}`}>
        도전적인 환경을 선호하며, 협업 과정에서 동료의 피드백을 빠르게 수용해 함께
        성장합니다. 설계와 트러블슈팅 경험을 블로그에 꾸준히 기록하며 학습을 축적하고
        있습니다.
      </p>
    </section>
  );
}
