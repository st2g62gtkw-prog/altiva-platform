type ProgressBarProps = {
  value: number;
  label?: string;
};

export function ProgressBar({ value, label }: ProgressBarProps) {
  const safeValue = Math.max(0, Math.min(value, 100));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-zinc-700">{label || "Avance"}</span>
        <span className="font-semibold text-zinc-950">{safeValue}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-zinc-200">
        <div className="h-full rounded-full bg-teal-700" style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}
