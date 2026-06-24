import { AlertTriangle, Info } from "lucide-react";

import { alerts } from "@/data/mock";
import { cn } from "@/lib/utils/cn";

const severityStyles = {
  info: "border-sky-200 bg-sky-50 text-sky-900",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  critical: "border-red-200 bg-red-50 text-red-900"
};

export function AlertList() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5">
      <h2 className="text-lg font-semibold text-zinc-950">Alertas operativas</h2>
      <div className="mt-4 space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={cn(
              "rounded-md border p-4",
              severityStyles[alert.severity]
            )}
          >
            <div className="flex gap-3">
              {alert.severity === "info" ? (
                <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              ) : (
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              )}
              <div>
                <p className="font-semibold">{alert.title}</p>
                <p className="mt-1 text-sm leading-6">{alert.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
