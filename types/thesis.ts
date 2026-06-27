export type ThesisFileMetadata = {
  id?: string;
  userId: string;
  name: string;
  category: string;
  fileType: string;
  status: string;
  notes?: string;
  storagePath: string;
  sizeBytes?: number | null;
  createdAt?: string;
  updatedAt?: string;
};

export type ThesisFileRow = {
  id: string;
  user_id: string;
  name: string;
  category: string;
  file_type: string;
  status: string;
  notes: string | null;
  storage_path: string;
  size_bytes: number | null;
  created_at: string;
  updated_at: string;
};

export type ThesisSourceMetadata = {
  id?: string;
  userId: string;
  title: string;
  sourceType: string;
  status: string;
  expectedUse?: string;
  relatedDeliverable?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ThesisFileUploadDraft = {
  userId: string;
  fileName: string;
  category: string;
  fileType: string;
  status?: string;
  notes?: string;
  sizeBytes?: number;
};
