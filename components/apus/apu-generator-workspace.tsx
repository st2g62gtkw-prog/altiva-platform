"use client";

import { AlertTriangle, ArrowLeft, CheckCircle2, Download } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { ApuFileUpload } from "@/components/apus/apu-file-upload";
import { ApuPreviewTable } from "@/components/apus/apu-preview-table";
import { generateApuWorkbook, validateApuTemplateExtension } from "@/lib/apus/apu-generator";
import {
  buildApuPreviewItems,
  parseItemizedFile,
  validateItemizedExtension
} from "@/lib/apus/itemized-parser";
import type { ApuColumnKey, ApuColumnMapping, ApuPreviewItem, ParsedItemized } from "@/types/apus";
import { apuColumnLabels, apuPlaceholders } from "@/types/apus";

const mappingFields: Array<{ key: ApuColumnKey; required?: boolean; hint: string }> = [
  { key: "activity", required: true, hint: "Obligatoria para crear APUs." },
  { key: "unit", hint: "Recomendable para identificar la unidad de pago." },
  { key: "code", hint: "Opcional. Puede venir como codigo, item o numero." },
  { key: "quantity", hint: "Opcional. Se copia sin calcular totales." },
  { key: "company", hint: "Opcional. Se copia al APU si existe." },
  { key: "project", hint: "Opcional. Se copia al APU si existe." },
  { key: "observations", hint: "Opcional. Se copia como nota base." }
];

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function ApuGeneratorWorkspace() {
  const [itemizedFile, setItemizedFile] = useState<File | null>(null);
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [parsedItemized, setParsedItemized] = useState<ParsedItemized | null>(null);
  const [mapping, setMapping] = useState<ApuColumnMapping>({});
  const [previewItems, setPreviewItems] = useState<ApuPreviewItem[]>([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"info" | "success" | "error">("info");
  const [warnings, setWarnings] = useState<string[]>([]);
  const [isReading, setIsReading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  function showMessage(text: string, type: "info" | "success" | "error" = "info") {
    setMessage(text);
    setMessageType(type);
  }

  async function handleItemizedSelected(file: File) {
    setMessage("");
    setWarnings([]);

    if (!validateItemizedExtension(file.name)) {
      showMessage("El itemizado debe ser .xlsx, .xls o .csv.", "error");
      return;
    }

    setItemizedFile(file);
    setIsReading(true);

    try {
      const parsed = await parseItemizedFile(file);
      const nextMapping = parsed.detectedMapping;
      setParsedItemized(parsed);
      setMapping(nextMapping);
      setPreviewItems(buildApuPreviewItems(parsed, nextMapping));
      setWarnings(parsed.warnings);

      if (!nextMapping.activity) {
        showMessage("Debes mapear la columna de actividad antes de generar APUs.", "error");
      }
    } catch {
      setParsedItemized(null);
      setPreviewItems([]);
      showMessage("No se pudo leer el itemizado. Revisa el archivo y sus encabezados.", "error");
    } finally {
      setIsReading(false);
    }
  }

  function handleTemplateSelected(file: File) {
    setMessage("");

    if (!validateApuTemplateExtension(file.name)) {
      showMessage("El formato APU debe ser un archivo .xlsx.", "error");
      return;
    }

    setTemplateFile(file);
  }

  function updateMapping(key: ApuColumnKey, header: string) {
    if (!parsedItemized) {
      return;
    }

    const nextMapping: ApuColumnMapping = { ...mapping };

    if (header) {
      nextMapping[key] = header;
    } else {
      delete nextMapping[key];
    }

    setMapping(nextMapping);
    setPreviewItems(buildApuPreviewItems(parsedItemized, nextMapping));

    if (!nextMapping.activity) {
      showMessage("Debes mapear la columna de actividad antes de generar APUs.", "error");
    } else {
      setMessage("");
    }
  }

  function toggleItem(itemId: string, included: boolean) {
    setPreviewItems((current) =>
      current.map((item) => (item.id === itemId ? { ...item, included } : item))
    );
  }

  function toggleAll(included: boolean) {
    setPreviewItems((current) =>
      current.map((item) => (item.activity ? { ...item, included } : item))
    );
  }

  async function handleGenerate() {
    setMessage("");
    setWarnings([]);

    if (!mapping.activity) {
      showMessage("Debes mapear la columna de actividad.", "error");
      return;
    }

    const itemsToGenerate = previewItems.filter((item) => item.included && item.activity.trim());

    if (itemsToGenerate.length === 0) {
      showMessage("No hay filas validas para generar APUs.", "error");
      return;
    }

    setIsGenerating(true);

    try {
      const result = await generateApuWorkbook({
        items: itemsToGenerate,
        templateFile
      });

      downloadBlob(result.blob, result.fileName);
      setWarnings(result.warnings);
      showMessage(`Excel generado: ${result.generatedCount} APUs base.`, "success");
    } catch {
      showMessage("No se pudo generar el Excel.", "error");
    } finally {
      setIsGenerating(false);
    }
  }

  const validIncludedCount = previewItems.filter((item) => item.included && item.activity).length;

  return (
    <main className="altiva-page min-h-screen pb-16">
      <header className="altiva-hero border-b border-white/10">
        <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm font-semibold text-zinc-200 hover:bg-white/15 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Volver a Proyecto de Titulo
          </Link>
          <div className="mt-7 max-w-3xl">
            <span className="w-fit rounded-full border border-teal-300/30 bg-teal-300/10 px-3 py-1 text-xs font-semibold text-teal-100">
              APUs V1 deterministicos
            </span>
            <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
              Generar APUs con Itemizado
            </h1>
            <p className="mt-3 text-base leading-7 text-zinc-300">
              Sube un itemizado y un formato de APU. Altiva generara un APU por cada actividad
              detectada. Esta version solo crea APUs base, sin recursos ni precios.
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        <section className="min-w-0 space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <ApuFileUpload
              title="Paso 1: subir itemizado"
              description="Acepta .xlsx, .xls o .csv. Se detectan columnas comunes y luego puedes ajustar el mapeo."
              accept=".xlsx,.xls,.csv"
              file={itemizedFile}
              disabled={isReading || isGenerating}
              onFileSelected={handleItemizedSelected}
            />
            <ApuFileUpload
              title="Paso 2: subir formato APU"
              description="Usa un .xlsx con placeholders. Si no los tiene, se genera un formato base interno."
              accept=".xlsx"
              file={templateFile}
              disabled={isGenerating}
              onFileSelected={handleTemplateSelected}
            />
          </div>

          {parsedItemized ? (
            <section className="altiva-surface rounded-2xl p-5 sm:p-6">
              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-700">
                  Control de datos
                </p>
                <h2 className="text-lg font-semibold text-zinc-950">Paso 3: mapear columnas</h2>
                <p className="text-sm leading-6 text-zinc-600">
                  Hoja leida: {parsedItemized.sheetName}. Actividad es obligatoria; las demas
                  columnas son recomendadas u opcionales.
                </p>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {mappingFields.map((field) => (
                  <label key={field.key} className="block">
                    <span className="text-sm font-semibold text-zinc-700">
                      {apuColumnLabels[field.key]}
                      {field.required ? " *" : ""}
                    </span>
                    <select
                      value={mapping[field.key] || ""}
                      onChange={(event) => updateMapping(field.key, event.target.value)}
                      className="mt-2 min-h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-700 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
                    >
                      <option value="">No usar</option>
                      {parsedItemized.headers.map((header) => (
                        <option key={`${field.key}-${header}`} value={header}>
                          {header}
                        </option>
                      ))}
                    </select>
                    <span className="mt-1 block text-xs leading-5 text-zinc-500">{field.hint}</span>
                  </label>
                ))}
              </div>
            </section>
          ) : null}

          <ApuPreviewTable items={previewItems} onToggleItem={toggleItem} onToggleAll={toggleAll} />
        </section>

        <aside className="space-y-5">
          <section className="rounded-2xl border border-teal-200/80 bg-white p-5 shadow-[0_18px_50px_rgba(15,118,110,0.12)]">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-700">
              Salida
            </p>
            <h2 className="font-semibold text-zinc-950">Paso 4: generar Excel</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              El archivo tendra una hoja Resumen y una hoja por cada APU seleccionado.
            </p>
            <button
              type="button"
              disabled={isGenerating || isReading || validIncludedCount === 0}
              onClick={() => {
                void handleGenerate();
              }}
              className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 text-sm font-semibold text-white shadow-lg shadow-teal-900/10 hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-600 disabled:shadow-none"
            >
              <Download className="h-4 w-4" aria-hidden />
              {isGenerating ? "Generando..." : "Generar APUs"}
            </button>
            <p className="mt-3 text-xs leading-5 text-zinc-500">
              {validIncludedCount} APUs listos para generar.
            </p>
          </section>

          <section className="altiva-surface-soft rounded-2xl p-5">
            <h2 className="font-semibold text-zinc-950">Placeholders soportados</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {apuPlaceholders.map((placeholder) => (
                <span
                  key={placeholder}
                  className="rounded-lg border border-cyan-200 bg-cyan-50 px-2 py-1 text-xs font-semibold text-cyan-800"
                >
                  {placeholder}
                </span>
              ))}
            </div>
          </section>

          <section className="altiva-surface-soft rounded-2xl p-5">
            <h2 className="font-semibold text-zinc-950">Limites de V1</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-600">
              <li>No usa IA.</li>
              <li>No completa recursos.</li>
              <li>No inventa precios ni rendimientos.</li>
              <li>No calcula totales.</li>
              <li>No sube archivos a Supabase.</li>
            </ul>
          </section>

          {isReading ? (
            <p className="rounded-xl border border-zinc-200 bg-white/90 p-4 text-sm text-zinc-600 shadow-sm">
              Leyendo itemizado...
            </p>
          ) : null}

          {message ? (
            <p
              className={
                messageType === "error"
                  ? "flex gap-2 rounded-md border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800"
                  : "flex gap-2 rounded-xl border border-zinc-200 bg-white p-4 text-sm leading-6 text-zinc-700 shadow-sm"
              }
            >
              {messageType === "error" ? (
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              ) : (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" aria-hidden />
              )}
              <span>{message}</span>
            </p>
          ) : null}

          {warnings.length > 0 ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900 shadow-[0_12px_35px_rgba(180,83,9,0.10)]">
              <div className="flex gap-2 font-semibold">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                Advertencias
              </div>
              <ul className="mt-2 space-y-1">
                {warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </div>
    </main>
  );
}
