import type { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: string;
  description?: string;
  icon?: ReactNode;
};

export function StatCard({ label, value, description, icon }: StatCardProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-zinc-500">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-zinc-950">{value}</p>
        </div>
        {icon ? <div className="rounded-md bg-teal-50 p-2 text-teal-800">{icon}</div> : null}
      </div>
      {description ? <p className="mt-3 text-sm leading-6 text-zinc-600">{description}</p> : null}
    </div>
  );
}
