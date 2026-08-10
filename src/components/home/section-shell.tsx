import type { ReactNode } from "react";
import { surface } from "@/lib/design";

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

export function ContentSection({ id, title, children }: SectionProps) {
  return (
    <section
      id={id}
      className={`reveal-section scroll-mt-8 ${
        id === "qualifications" ? "" : "border-b"
      } ${surface.divider} py-12`}
    >
      <h2 className="section-heading text-lg font-bold leading-tight text-[var(--foreground)] sm:text-xl">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function CompactSection({ id, title, children }: SectionProps) {
  return (
    <section id={id}>
      <h2 className="section-heading text-lg font-bold leading-tight text-[var(--foreground)] sm:text-xl">
        {title}
      </h2>
      {children}
    </section>
  );
}
