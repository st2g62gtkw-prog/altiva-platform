export type DriveDocument = {
  id: string;
  name: string;
  mimeType: string;
  projectId?: string;
  webViewLink?: string;
};

export async function listDriveDocuments(): Promise<DriveDocument[]> {
  // Future integration point: Google Drive OAuth + Drive API files.list.
  return [];
}

export async function uploadDriveDocument(): Promise<DriveDocument> {
  // Future integration point: upload file stream to Google Drive.
  throw new Error("Google Drive upload is not connected yet.");
}

export async function getDriveDocumentMetadata(id: string): Promise<DriveDocument | null> {
  // Future integration point: Drive API files.get with selected fields.
  void id;
  return null;
}

export async function attachDriveDocumentToProject(documentId: string, projectId: string) {
  // Future integration point: persist document/project relation in Supabase.
  return {
    documentId,
    projectId,
    attached: false
  };
}
