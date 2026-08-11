import { externalLinks } from "@/data/profile";
import { LanguageSwitcher } from "./language-switcher";

export function HomeHeader() {
  return (
    <header className="border-b border-[var(--line-strong)] pb-6">
      <div className="mb-5 flex justify-end">
        <LanguageSwitcher />
      </div>

      <div>
        <h1 className="text-3xl font-extrabold leading-tight tracking-normal">
          SeungJuSuh(서승주)
        </h1>
        <p className="mt-2 text-base leading-6 text-[var(--foreground)]">Software Engineer</p>
      </div>

      <ContactList />
    </header>
  );
}

function ContactList() {
  const contactLinks = [
    ["Email", "0123suh@gmail.com", externalLinks.email],
    ["GitHub", "seunzu", externalLinks.github],
    ["Tistory", "debug.tistory.com", externalLinks.blog],
  ];

  return (
    <dl className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] leading-4 text-[var(--foreground)]">
      {contactLinks.map(([label, value, href]) => (
        <div className="flex min-w-0 items-center gap-1.5" key={label}>
          <dt className="shrink-0 text-[var(--muted)]">{label}</dt>
          <dd className="min-w-0">
            <a
              className="inline-flex min-w-0 items-center underline decoration-[var(--line-strong)] underline-offset-2"
              href={href}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              target={href.startsWith("http") ? "_blank" : undefined}
            >
              <span className="truncate">{value}</span>
            </a>
          </dd>
        </div>
      ))}
    </dl>
  );
}
