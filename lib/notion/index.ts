export type NotionTask = {
  id: string;
  title: string;
  status: "pending" | "in_progress" | "done";
  projectId?: string;
};

export async function listNotionTasks(): Promise<NotionTask[]> {
  // Future integration point: Notion database query.
  return [];
}

export async function createNotionTask(input: Omit<NotionTask, "id">): Promise<NotionTask> {
  // Future integration point: Notion pages.create.
  return {
    id: "pending-notion-task",
    ...input
  };
}

export async function syncProjectWithNotion(projectId: string) {
  // Future integration point: map Supabase project fields to Notion properties.
  return {
    projectId,
    synced: false
  };
}

export async function readNotionDatabase(databaseId = process.env.NOTION_DATABASE_ID) {
  // Future integration point: Notion databases.retrieve + query.
  return {
    databaseId,
    connected: false,
    records: []
  };
}
