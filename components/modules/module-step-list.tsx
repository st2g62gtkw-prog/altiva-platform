import type { ModuleStep } from "@/types/modules";

type ModuleStepListProps = {
  steps: ModuleStep[];
};

export function ModuleStepList({ steps }: ModuleStepListProps) {
  return (
    <ol className="space-y-3">
      {steps.map((step, index) => (
        <li key={step.title} className="flex gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-xs font-semibold text-white">
            {index + 1}
          </span>
          <span>
            <span className="block font-medium text-zinc-900">{step.title}</span>
            {step.description ? (
              <span className="mt-1 block text-sm leading-6 text-zinc-600">{step.description}</span>
            ) : null}
          </span>
        </li>
      ))}
    </ol>
  );
}
