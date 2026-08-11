import { surface, text } from "@/lib/design";
import type { Activity, TimelineItem } from "@/types/content";
import { StackChips } from "./stack-chips";

type InlineRecordProps = {
  meta?: string;
  title: string;
  body?: string;
  note?: string;
};

export function InlineRecord({ meta, title, body, note }: InlineRecordProps) {
  return (
    <article
      className={`grid gap-3 border-t last:border-b-0 ${surface.divider} pt-3 ${
        meta ? "grid-cols-1 sm:grid-cols-[minmax(0,1fr)_120px]" : "grid-cols-1"
      }`}
    >
      <div className="min-w-0">
        <h4 className={text.cardTitle}>{title}</h4>
        {meta ? (
          <p className="mt-1 text-[11px] leading-5 text-[var(--muted-light)] sm:hidden">
            {meta}
          </p>
        ) : null}
        {body ? <p className={`mt-1.5 ${text.smallBody}`}>{body}</p> : null}
        {note ? (
          <p className="mt-1 text-[11px] leading-5 text-[var(--muted-light)]">{note}</p>
        ) : null}
      </div>
      {meta ? (
        <p className="hidden text-[11px] leading-5 text-[var(--muted-light)] sm:block sm:text-right">
          {meta}
        </p>
      ) : null}
    </article>
  );
}

export function TimelineArticle({ item }: { item: TimelineItem }) {
  return (
    <article>
      <div className="grid gap-1 sm:grid-cols-[minmax(0,1fr)_120px] sm:items-start">
        <div>
          <h3 className={text.cardTitle}>{item.title}</h3>
          <p className={`mt-1.5 ${text.smallBody}`}>{item.body}</p>
        </div>
        <p className="text-[11px] leading-5 text-[var(--muted-light)] sm:text-right">{item.period}</p>
      </div>
      {item.stacks ? (
        <div className="mt-3">
          <StackChips stacks={item.stacks} />
        </div>
      ) : null}
      {item.details ? (
        <ul className="mt-3 grid gap-1.5 pl-4 text-[12px] leading-6 text-[var(--body)] marker:text-[var(--accent-dark)]">
          {item.details.map((detail) => (
            <li className="list-disc" key={detail}>
              {detail}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

export function ActivityRecord({ activity }: { activity: Activity }) {
  return (
    <article className={`grid gap-3 border-t ${surface.divider} pt-3 sm:grid-cols-[minmax(0,1fr)_96px]`}>
      <div className="min-w-0">
        <p className="text-[11px] leading-5 text-[var(--muted-light)]">
          {activity.category} · {activity.role}
        </p>
        <h3 className={`mt-1 ${text.cardTitle}`}>{activity.title}</h3>
        <p className="mt-1 text-[11px] leading-5 text-[var(--muted-light)] sm:hidden">
          {activity.period}
        </p>
        <ul className="mt-2 grid gap-1.5 pl-4 text-[12px] leading-6 text-[var(--body)] marker:text-[var(--accent-dark)]">
          {activity.details.map((detail) => (
            <li className="list-disc" key={detail}>
              {detail}
            </li>
          ))}
        </ul>
      </div>
      <p className="hidden text-[11px] leading-5 text-[var(--muted-light)] sm:block sm:text-right">
        {activity.period}
      </p>
    </article>
  );
}
