export type ThesisFileMetadata = {
  id?: string;
  userId: string;
  name: string;
  category: string;
  fileType: string;
  status: string;
  notes?: string;
  storagePath: string;
  createdAt?: string;
  updatedAt?: string;
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
};
