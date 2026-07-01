import * as XLSX from "xlsx";

import type {
  ApuColumnKey,
  ApuColumnMapping,
  ApuPreviewItem,
  ItemizedRawRow,
  ParsedItemized
} from "@/types/apus";

const columnAliases: Record<ApuColumnKey, string[]> = {
  company: ["empresa", "constructora", "mandante"],
  project: ["proyecto"],
  code: ["codigo", "cod", "item", "n", "no", "nro", "numero"],
  activity: ["actividad", "descripcion", "partida", "nombre partida", "tarea", "glosa"],
  unit: ["unidad", "und", "um", "u m", "un"],
  quantity: ["cantidad", "cant", "cubicacion", "metrado"],
  observations: ["observacion", "observaciones", "nota", "notas"]
};

const columnPriority: ApuColumnKey[] = [
  "activity",
  "code",
  "unit",
  "quantity",
  "company",
  "project",
  "observations"
];

function normalizeText(value: unknown) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[°ºª]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function cleanCellValue(value: unknown) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
}

function getBestHeaderMatch(header: unknown): { key?: ApuColumnKey; score: number } {
  const normalizedHeader = normalizeText(header);

  if (!normalizedHeader) {
    return { score: 0 };
  }

  let bestKey: ApuColumnKey | undefined;
  let bestScore = 0;

  for (const key of columnPriority) {
    for (const alias of columnAliases[key]) {
      const normalizedAlias = normalizeText(alias);
      let score = 0;

      if (normalizedHeader === normalizedAlias) {
        score = 100;
      } else if (normalizedHeader.includes(normalizedAlias)) {
        score = 70;
      }

      if (score > bestScore) {
        bestKey = key;
        bestScore = score;
      }
    }
  }

  return { key: bestKey, score: bestScore };
}

function getHeaderRowIndex(rows: unknown[][]) {
  const candidateRows = rows.slice(0, 15);
  let bestIndex = 0;
  let bestScore = -1;

  candidateRows.forEach((row, index) => {
    const nonEmptyCells = row.filter((cell) => cleanCellValue(cell)).length;
    const matchScore = row.reduce<number>((score, cell) => score + getBestHeaderMatch(cell).score, 0);
    const totalScore = matchScore + nonEmptyCells;

    if (totalScore > bestScore) {
      bestScore = totalScore;
      bestIndex = index;
    }
  });

  if (bestScore <= 0) {
    const firstNonEmpty = rows.findIndex((row) => row.some((cell) => cleanCellValue(cell)));
    return firstNonEmpty >= 0 ? firstNonEmpty : 0;
  }

  return bestIndex;
}

function getUniqueHeaders(row: unknown[]) {
  const seen = new Map<string, number>();

  return row.map((cell, index) => {
    const baseHeader = cleanCellValue(cell) || `Columna ${index + 1}`;
    const seenCount = seen.get(baseHeader) || 0;
    seen.set(baseHeader, seenCount + 1);

    if (seenCount === 0) {
      return baseHeader;
    }

    return `${baseHeader} (${seenCount + 1})`;
  });
}

function detectColumnMapping(headers: string[]) {
  const mapping: ApuColumnMapping = {};
  const usedHeaders = new Set<string>();

  for (const header of headers) {
    const match = getBestHeaderMatch(header);

    if (!match.key || match.score === 0 || mapping[match.key]) {
      continue;
    }

    mapping[match.key] = header;
    usedHeaders.add(header);
  }

  if (mapping.code && mapping.activity && mapping.code === mapping.activity) {
    delete mapping.code;
  }

  for (const key of columnPriority) {
    if (mapping[key] && usedHeaders.has(mapping[key])) {
      continue;
    }
  }

  return mapping;
}

async function readWorkbook(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();

  if (extension === "csv") {
    const text = await file.text();
    return XLSX.read(text, { type: "string", raw: false });
  }

  const data = await file.arrayBuffer();
  return XLSX.read(data, { type: "array", cellDates: true, raw: false });
}

export async function parseItemizedFile(file: File): Promise<ParsedItemized> {
  const workbook = await readWorkbook(file);
  const sheetName = workbook.SheetNames[0];

  if (!sheetName) {
    throw new Error("No se pudo leer el itemizado.");
  }

  const worksheet = workbook.Sheets[sheetName];
  const tableRows = XLSX.utils.sheet_to_json<unknown[]>(worksheet, {
    header: 1,
    defval: "",
    blankrows: false,
    raw: false
  });

  if (tableRows.length === 0) {
    throw new Error("El itemizado no contiene filas.");
  }

  const headerRowIndex = getHeaderRowIndex(tableRows);
  const headers = getUniqueHeaders(tableRows[headerRowIndex] || []);
  const rows: ItemizedRawRow[] = tableRows
    .slice(headerRowIndex + 1)
    .map((row, index) => {
      const values: Record<string, string> = {};

      headers.forEach((header, headerIndex) => {
        values[header] = cleanCellValue(row[headerIndex]);
      });

      return {
        id: `row-${headerRowIndex + index + 2}`,
        sourceRowNumber: headerRowIndex + index + 2,
        values
      };
    })
    .filter((row) => Object.values(row.values).some(Boolean));

  const detectedMapping = detectColumnMapping(headers);
  const warnings: string[] = [];

  if (!detectedMapping.activity) {
    warnings.push("No se encontro columna de actividad automaticamente. Debes mapearla manualmente.");
  }

  return {
    fileName: file.name,
    sheetName,
    headers,
    rows,
    detectedMapping,
    warnings
  };
}

function readMappedValue(row: ItemizedRawRow, mapping: ApuColumnMapping, key: ApuColumnKey) {
  const header = mapping[key];
  return header ? row.values[header]?.trim() || "" : "";
}

export function buildApuPreviewItems(
  parsedItemized: ParsedItemized,
  mapping: ApuColumnMapping
): ApuPreviewItem[] {
  return parsedItemized.rows.map((row, index) => {
    const activity = readMappedValue(row, mapping, "activity");
    const code = readMappedValue(row, mapping, "code");

    return {
      id: row.id,
      sourceRowNumber: row.sourceRowNumber,
      number: index + 1,
      company: readMappedValue(row, mapping, "company") || undefined,
      project: readMappedValue(row, mapping, "project") || undefined,
      code: code || undefined,
      activity,
      unit: readMappedValue(row, mapping, "unit") || undefined,
      quantity: readMappedValue(row, mapping, "quantity") || undefined,
      observations: readMappedValue(row, mapping, "observations") || undefined,
      included: Boolean(activity),
      status: activity ? "Listo" : "Sin actividad"
    };
  });
}

export function validateItemizedExtension(fileName: string) {
  return /\.(xlsx|xls|csv)$/i.test(fileName);
}
