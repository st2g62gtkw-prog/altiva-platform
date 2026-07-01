import type { SupabaseClient } from "@supabase/supabase-js";

import { THESIS_FILES_BUCKET } from "@/lib/db/thesis-schema";
import type { ThesisFileMetadata, ThesisFileUploadDraft } from "@/types/thesis";

function sanitizeFileName(fileName: string) {
  return fileName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function buildThesisStoragePath(userId: string, fileName: string) {
  const safeName = sanitizeFileName(fileName) || "archivo";
  return `${userId}/${Date.now()}-${safeName}`;
}

export function prepareThesisFileMetadata(draft: ThesisFileUploadDraft): ThesisFileMetadata {
  return {
    userId: draft.userId,
    name: draft.fileName,
    category: draft.category,
    fileType: draft.fileType,
    status: draft.status || "pending",
    notes: draft.notes,
    storagePath: buildThesisStoragePath(draft.userId, draft.fileName),
    sizeBytes: draft.sizeBytes
  };
}

export function getThesisStorageBucket() {
  return THESIS_FILES_BUCKET;
}

export async function removeThesisStorageFile(supabase: SupabaseClient, storagePath: string) {
  const { error } = await supabase.storage.from(getThesisStorageBucket()).remove([storagePath]);

  if (error) {
    throw error;
  }
}
