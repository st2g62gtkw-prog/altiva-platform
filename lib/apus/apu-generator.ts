import * as XLSX from "xlsx";

import type { ApuGenerationInput, ApuGenerationResult, ApuPreviewItem } from "@/types/apus";
import { apuPlaceholders } from "@/types/apus";

const xlsxMimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

function padApuNumber(index: number) {
  return String(index + 1).padStart(3, "0");
}

function getTodayLabel() {
  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(new Date());
}

function getDisplayValue(value?: string) {
  return value?.trim() || "No informado";
}

function getPlaceholderValues(item: ApuPreviewItem, index: number) {
  const number = padApuNumber(index);

  return {
    "{{EMPRESA}}": getDisplayValue(item.company),
    "{{PROYECTO}}": getDisplayValue(item.project),
    "{{CODIGO}}": getDisplayValue(item.code),
    "{{ITEM}}": getDisplayValue(item.code),
    "{{ACTIVIDAD}}": getDisplayValue(item.activity),
    "{{UNIDAD}}": getDisplayValue(item.unit),
    "{{CANTIDAD}}": getDisplayValue(item.quantity),
    "{{OBSERVACIONES}}": getDisplayValue(item.observations),
    "{{FECHA}}": getTodayLabel(),
    "{{NUMERO_APU}}": number
  };
}

function replacePlaceholders(value: string, replacements: Record<string, string>) {
  return apuPlaceholders.reduce(
    (currentValue, placeholder) => currentValue.split(placeholder).join(replacements[placeholder]),
    value
  );
}

function sheetContainsPlaceholders(sheet: XLSX.WorkSheet) {
  return Object.keys(sheet).some((cellAddress) => {
    if (cellAddress.startsWith("!")) {
      return false;
    }

    const cell = sheet[cellAddress] as XLSX.CellObject | undefined;
    const cellValue = cell?.v;
    return typeof cellValue === "string" && apuPlaceholders.some((placeholder) => cellValue.includes(placeholder));
  });
}

function replaceSheetPlaceholders(sheet: XLSX.WorkSheet, item: ApuPreviewItem, index: number) {
  const replacements = getPlaceholderValues(item, index);

  Object.keys(sheet).forEach((cellAddress) => {
    if (cellAddress.startsWith("!")) {
      return;
    }

    const cell = sheet[cellAddress] as XLSX.CellObject | undefined;

    if (!cell || typeof cell.v !== "string") {
      return;
    }

    const nextValue = replacePlaceholders(cell.v, replacements);

    if (nextValue !== cell.v) {
      cell.v = nextValue;
      cell.w = nextValue;
      cell.t = "s";
    }
  });

  return sheet;
}

function cloneSheet(sheet: XLSX.WorkSheet) {
  return JSON.parse(JSON.stringify(sheet)) as XLSX.WorkSheet;
}

function buildSummarySheet(items: ApuPreviewItem[]) {
  const rows = [
    ["Numero APU", "Codigo / item", "Actividad", "Unidad", "Cantidad", "Estado"],
    ...items.map((item, index) => [
      padApuNumber(index),
      item.code || "",
      item.activity,
      item.unit || "",
      item.quantity || "",
      "Base sin recursos"
    ])
  ];

  const sheet = XLSX.utils.aoa_to_sheet(rows);
  sheet["!cols"] = [
    { wch: 12 },
    { wch: 18 },
    { wch: 48 },
    { wch: 12 },
    { wch: 14 },
    { wch: 22 }
  ];

  return sheet;
}

function buildBaseApuSheet(item: ApuPreviewItem, index: number) {
  const rows = [
    ["Analisis de Precio Unitario - Base"],
    [],
    ["Numero APU", padApuNumber(index)],
    ["Empresa", getDisplayValue(item.company)],
    ["Proyecto", getDisplayValue(item.project)],
    ["Codigo / item", getDisplayValue(item.code)],
    ["Actividad", getDisplayValue(item.activity)],
    ["Unidad", getDisplayValue(item.unit)],
    ["Cantidad", getDisplayValue(item.quantity)],
    ["Observaciones", getDisplayValue(item.observations)],
    ["Estado", "APU base generado desde itemizado. Sin recursos, rendimientos ni precios."],
    ["Fecha de generacion", getTodayLabel()],
    [],
    ["Recursos"],
    ["Tipo", "Descripcion", "Unidad", "Cantidad", "Rendimiento", "Precio unitario", "Total"],
    ["", "Sin recursos en esta version", "", "", "", "", ""]
  ];

  const sheet = XLSX.utils.aoa_to_sheet(rows);
  sheet["!cols"] = [
    { wch: 22 },
    { wch: 46 },
    { wch: 14 },
    { wch: 14 },
    { wch: 16 },
    { wch: 18 },
    { wch: 14 }
  ];

  return sheet;
}

async function readTemplateWorkbook(file: File) {
  const data = await file.arrayBuffer();
  return XLSX.read(data, { type: "array", cellDates: true, raw: false });
}

function findTemplateSheet(workbook: XLSX.WorkBook) {
  const sheetNameWithPlaceholders = workbook.SheetNames.find((sheetName) =>
    sheetContainsPlaceholders(workbook.Sheets[sheetName])
  );

  if (!sheetNameWithPlaceholders) {
    return null;
  }

  return workbook.Sheets[sheetNameWithPlaceholders];
}

function appendApuSheetsFromTemplate(
  workbook: XLSX.WorkBook,
  items: ApuPreviewItem[],
  templateSheet: XLSX.WorkSheet
) {
  items.forEach((item, index) => {
    const sheet = replaceSheetPlaceholders(cloneSheet(templateSheet), item, index);
    XLSX.utils.book_append_sheet(workbook, sheet, `APU ${padApuNumber(index)}`);
  });
}

function appendBaseApuSheets(workbook: XLSX.WorkBook, items: ApuPreviewItem[]) {
  items.forEach((item, index) => {
    XLSX.utils.book_append_sheet(workbook, buildBaseApuSheet(item, index), `APU ${padApuNumber(index)}`);
  });
}

export async function generateApuWorkbook({
  items,
  templateFile
}: ApuGenerationInput): Promise<ApuGenerationResult> {
  if (items.length === 0) {
    throw new Error("No hay filas validas para generar APUs.");
  }

  const workbook = XLSX.utils.book_new();
  const warnings: string[] = [];

  XLSX.utils.book_append_sheet(workbook, buildSummarySheet(items), "Resumen");

  if (templateFile) {
    const templateWorkbook = await readTemplateWorkbook(templateFile);
    const templateSheet = findTemplateSheet(templateWorkbook);

    if (templateSheet) {
      appendApuSheetsFromTemplate(workbook, items, templateSheet);
    } else {
      warnings.push(
        "El formato APU no contiene placeholders. Se generaran APUs con formato base interno."
      );
      appendBaseApuSheets(workbook, items);
    }
  } else {
    warnings.push("No se subio formato APU. Se generaran APUs con formato base interno.");
    appendBaseApuSheets(workbook, items);
  }

  const workbookArray = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array"
  }) as ArrayBuffer;

  return {
    blob: new Blob([workbookArray], { type: xlsxMimeType }),
    fileName: "APUs_generados.xlsx",
    generatedCount: items.length,
    warnings
  };
}

export function validateApuTemplateExtension(fileName: string) {
  return /\.xlsx$/i.test(fileName);
}
