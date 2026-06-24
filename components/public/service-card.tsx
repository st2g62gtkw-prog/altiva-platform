import type { ReactNode } from "react";

type ServiceCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  items: string[];
};

export function ServiceCard({ title, description, icon, items }: ServiceCardProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-teal-50 text-teal-800">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-zinc-950">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-600">{description}</p>
      <ul className="mt-5 space-y-2 text-sm text-zinc-700">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-700" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
