import type { SupabaseClient } from "@supabase/supabase-js";

import { THESIS_FILES_TABLE } from "@/lib/db/thesis-schema";
import type { ThesisFileMetadata, ThesisFileRow } from "@/types/thesis";

export const thesisFileSelectColumns =
  "id,user_id,name,category,file_type,status,notes,storage_path,size_bytes,created_at,updated_at";

export function mapThesisFileRow(row: ThesisFileRow): ThesisFileMetadata {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    category: row.category,
    fileType: row.file_type,
    status: row.status,
    notes: row.notes || undefined,
    storagePath: row.storage_path,
    sizeBytes: row.size_bytes,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export async function listThesisFiles(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from(THESIS_FILES_TABLE)
    .select(thesisFileSelectColumns)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return ((data || []) as ThesisFileRow[]).map(mapThesisFileRow);
}

export async function insertThesisFileMetadata(
  supabase: SupabaseClient,
  metadata: ThesisFileMetadata
) {
  const { data, error } = await supabase
    .from(THESIS_FILES_TABLE)
    .insert({
      user_id: metadata.userId,
      name: metadata.name,
      category: metadata.category,
      file_type: metadata.fileType,
      status: metadata.status,
      notes: metadata.notes || null,
      storage_path: metadata.storagePath,
      size_bytes: metadata.sizeBytes ?? null
    })
    .select(thesisFileSelectColumns)
    .single();

  if (error) {
    throw error;
  }

  return mapThesisFileRow(data as ThesisFileRow);
}

export async function deleteThesisFileMetadata(supabase: SupabaseClient, fileId: string) {
  const { data, error } = await supabase
    .from(THESIS_FILES_TABLE)
    .delete()
    .eq("id", fileId)
    .select("id")
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error("No thesis_files row was deleted.");
  }
}
