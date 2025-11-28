import { client } from "./client";

export interface TaskInput {
  title: string;
  description?: string;
  completed?: boolean;
}

export interface Task {
  id: number;
  title: string;
  description?: string | null;
  completed: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface TaskListResponse {
  tasks: Task[];
  total: number;
  page: number;
  totalPages: number;
}

export const tasksApi = {
  list: (params?: { page?: number; limit?: number; status?: "pending" | "completed" }) => {
    const qs = new URLSearchParams();
    if (params?.page) qs.set("page", String(params.page));
    if (params?.limit) qs.set("limit", String(params.limit));
    if (params?.status) qs.set("status", params.status);
    const query = qs.toString() ? `?${qs.toString()}` : "";
    return client(`/tasks${query}`) as Promise<TaskListResponse>;
  },
  create: (payload: TaskInput) =>
    client("/tasks", {
      method: "POST",
      body: JSON.stringify(payload),
    }) as Promise<Task>,
  update: (id: number, payload: TaskInput) =>
    client(`/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }) as Promise<Task>,
  remove: (id: number) =>
    client(`/tasks/${id}`, {
      method: "DELETE",
    }),
  get: (id: number) => client(`/tasks/${id}`) as Promise<Task>,
};