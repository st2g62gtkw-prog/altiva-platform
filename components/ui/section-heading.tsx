import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  actions,
  as = "h2"
}: SectionHeadingProps) {
  const HeadingTag = as;

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-teal-700">
            {eyebrow}
          </p>
        ) : null}
        <HeadingTag className="text-3xl font-semibold text-zinc-950 md:text-4xl">
          {title}
        </HeadingTag>
        {description ? (
          <p className="mt-4 text-base leading-7 text-zinc-600 md:text-lg">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  );
}
