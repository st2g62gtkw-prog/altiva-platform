import { ModuleActionCard } from "@/components/modules/module-action-card";
import type { ProjectModule } from "@/types/modules";

type ModuleGridProps = {
  modules: ProjectModule[];
};

export function ModuleGrid({ modules }: ModuleGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {modules.map((module) => (
        <ModuleActionCard key={module.id} module={module} />
      ))}
    </div>
  );
}
