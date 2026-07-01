"use client";

import type { ApuPreviewItem } from "@/types/apus";

type ApuPreviewTableProps = {
  items: ApuPreviewItem[];
  onToggleItem: (itemId: string, included: boolean) => void;
  onToggleAll: (included: boolean) => void;
};

export function ApuPreviewTable({ items, onToggleItem, onToggleAll }: ApuPreviewTableProps) {
  const validItems = items.filter((item) => item.activity);
  const selectedItems = validItems.filter((item) => item.included);
  const allSelected = validItems.length > 0 && selectedItems.length === validItems.length;

  if (items.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-zinc-300 bg-white/70 p-5 text-sm text-zinc-600">
        Lee un itemizado para ver la vista previa.
      </p>
    );
  }

  return (
    <section className="altiva-surface rounded-2xl p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-700">
            Revision previa
          </p>
          <h2 className="text-lg font-semibold text-zinc-950">Vista previa</h2>
          <p className="mt-1 text-sm leading-6 text-zinc-600">
            Desmarca filas que sean titulos, subtitulos o partidas que no requieren APU.
          </p>
        </div>
        <label className="flex w-fit items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={(event) => onToggleAll(event.target.checked)}
            className="h-4 w-4 accent-teal-700"
          />
          Incluir validas
        </label>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-[780px] w-full border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-[0.08em] text-zinc-500">
              <th className="border-b border-zinc-200 bg-zinc-50 py-3 pl-3 pr-3 font-semibold">Incluir</th>
              <th className="border-b border-zinc-200 bg-zinc-50 py-3 pr-3 font-semibold">N</th>
              <th className="border-b border-zinc-200 bg-zinc-50 py-3 pr-3 font-semibold">Codigo / item</th>
              <th className="border-b border-zinc-200 bg-zinc-50 py-3 pr-3 font-semibold">Actividad</th>
              <th className="border-b border-zinc-200 bg-zinc-50 py-3 pr-3 font-semibold">Unidad</th>
              <th className="border-b border-zinc-200 bg-zinc-50 py-3 pr-3 font-semibold">Cantidad</th>
              <th className="border-b border-zinc-200 bg-zinc-50 py-3 pr-3 font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="align-top transition hover:bg-teal-50/40">
                <td className="border-b border-zinc-100 py-3 pl-3 pr-3">
                  <input
                    type="checkbox"
                    checked={item.included}
                    disabled={!item.activity}
                    onChange={(event) => onToggleItem(item.id, event.target.checked)}
                    className="h-4 w-4 accent-teal-700 disabled:cursor-not-allowed"
                  />
                </td>
                <td className="border-b border-zinc-100 py-3 pr-3 text-zinc-500">{item.number}</td>
                <td className="border-b border-zinc-100 py-3 pr-3 text-zinc-700">{item.code || "-"}</td>
                <td className="max-w-[320px] border-b border-zinc-100 py-3 pr-3 font-medium text-zinc-950">
                  <span className="line-clamp-3">{item.activity || "Sin actividad mapeada"}</span>
                </td>
                <td className="border-b border-zinc-100 py-3 pr-3 text-zinc-700">{item.unit || "-"}</td>
                <td className="border-b border-zinc-100 py-3 pr-3 text-zinc-700">{item.quantity || "-"}</td>
                <td className="border-b border-zinc-100 py-3 pr-3">
                  <span
                    className={
                      item.status === "Listo"
                        ? "rounded-full border border-teal-200 bg-teal-50 px-2 py-1 text-xs font-semibold text-teal-800"
                        : "rounded-full border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-800"
                    }
                  >
                    {item.included ? item.status : "Excluido"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-zinc-600">
        {selectedItems.length} APUs seleccionados de {validItems.length} filas validas.
      </p>
    </section>
  );
}
