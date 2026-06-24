export type ProjectStatus = "planning" | "active" | "paused" | "closed";

export type PublicProject = {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  summary: string;
  description: string;
  metrics: Array<{ label: string; value: string }>;
  services: string[];
};

export type InternalProject = {
  id: string;
  name: string;
  client: string;
  location: string;
  status: ProjectStatus;
  progress: number;
  budget: number;
  spent: number;
  nextMilestone: string;
  riskLevel: "low" | "medium" | "high";
};

export type Budget = {
  id: string;
  projectId: string;
  name: string;
  amount: number;
  status: "draft" | "review" | "approved";
  updatedAt: string;
};

export type DocumentRecord = {
  id: string;
  projectId: string;
  name: string;
  type: "contract" | "plan" | "permit" | "report" | "technical";
  status: "pending" | "reviewed" | "approved";
  source: "mock" | "drive";
  updatedAt: string;
};

export type Report = {
  id: string;
  projectId: string;
  title: string;
  period: string;
  status: "draft" | "ready" | "sent";
  highlights: string[];
};

export type Task = {
  id: string;
  projectId: string;
  title: string;
  owner: string;
  dueDate: string;
  status: "pending" | "in_progress" | "done";
};

export type Alert = {
  id: string;
  title: string;
  description: string;
  severity: "info" | "warning" | "critical";
};
