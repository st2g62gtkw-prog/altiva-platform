export const futureTables = [
  "users",
  "thesis_files",
  "thesis_sources",
  "thesis_deliverables",
  "ai_messages"
] as const;

export type FutureTableName = (typeof futureTables)[number];

export type DatabaseStatus = {
  provider: "supabase";
  connected: boolean;
  tables: readonly FutureTableName[];
};

export const databaseStatus: DatabaseStatus = {
  provider: "supabase",
  connected: false,
  tables: futureTables
};
