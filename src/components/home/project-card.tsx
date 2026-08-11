"use client";

import { useId, useRef, useState } from "react";
import { surface, text } from "@/lib/design";
import type { Project, ProjectVisual } from "@/types/content";
import { StackChips } from "./stack-chips";

export function ProjectCard({ project }: { project: Project }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogTitleId = useId();
  const [activeVisual, setActiveVisual] = useState<ProjectVisual | null>(null);

  const openVisual = (visual: ProjectVisual) => {
    setActiveVisual(visual);
    dialogRef.current?.showModal();
  };

  return (
    <article className={`flex h-full flex-col ${surface.card}`}>
      <div className="grid gap-1 sm:grid-cols-[minmax(0,1fr)_120px] sm:items-start">
        <div>
          <span className={surface.labelChip}>{project.role}</span>
          <h3 className="mt-2.5 text-sm font-semibold text-[var(--foreground)]">
            {project.title}
          </h3>
        </div>
        <p className="text-[11px] leading-5 text-[var(--muted-light)] sm:text-right">
          {project.period}
        </p>
      </div>
      <div>
        <p className={`mt-2 max-w-3xl ${text.smallBody}`}>{project.description}</p>
        <div className="mt-3">
          <StackChips stacks={project.stacks} />
        </div>
        <ul className="mt-3 grid gap-1.5 pl-4 text-[12px] leading-6 text-[var(--body)] marker:text-[var(--accent-dark)]">
          {project.highlights.map((highlight) => (
            <li className="list-disc" key={highlight}>
              {highlight}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto flex flex-wrap justify-end gap-x-4 gap-y-2 pt-3">
        {project.visuals?.map((visual) => (
          <button
            className={text.link}
            key={visual.src}
            type="button"
            onClick={() => openVisual(visual)}
          >
            {visual.label}
          </button>
        ))}
        <a className={text.link} href={project.href} target="_blank" rel="noreferrer">
          {project.href.replace("https://", "")}
        </a>
      </div>

      {project.visuals?.length ? (
        <dialog
          aria-labelledby={dialogTitleId}
          className="fixed inset-0 m-auto max-h-[74vh] w-[min(680px,calc(100vw-40px))] max-w-none rounded-lg border border-[var(--line)] bg-white p-0 text-[var(--foreground)] shadow-[0_24px_80px_rgba(15,23,42,0.18)] backdrop:bg-black/35"
          onClose={() => setActiveVisual(null)}
          ref={dialogRef}
        >
          <div className="flex items-center justify-between gap-4 border-b border-[var(--line)] px-4 py-3">
            <h4 className="text-[13px] font-semibold" id={dialogTitleId}>
              {activeVisual ? `${project.title} · ${activeVisual.label}` : project.title}
            </h4>
            <button
              className="text-[11px] font-medium text-[var(--muted)] transition-colors hover:text-[var(--accent-dark)]"
              type="button"
              onClick={() => dialogRef.current?.close()}
            >
              Close
            </button>
          </div>
          <div className="max-h-[64vh] overflow-auto bg-[var(--surface-soft)] p-3">
            {activeVisual ? (
              <img
                className="mx-auto block max-h-[58vh] w-auto max-w-full"
                src={activeVisual.src}
                alt={activeVisual.alt}
              />
            ) : null}
          </div>
        </dialog>
      ) : null}
    </article>
  );
}
