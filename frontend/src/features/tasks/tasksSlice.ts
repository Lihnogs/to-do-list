// src/features/tasks/tasksSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { tasksApi, Task, TaskInput } from "../../api/tasksApi";

interface TasksState {
  items: Task[];
  filter: "all" | "pending" | "completed";
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
}

const initialState: TasksState = {
  items: [],
  filter: "all",
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
};

export const fetchTasks = createAsyncThunk<
  { tasks: Task[]; page: number; totalPages: number },
  { status?: "pending" | "completed" | undefined; page?: number; limit?: number } | undefined
>(
  "tasks/fetch",
  async (params, { rejectWithValue }) => {
    try {
      const res = await tasksApi.list({
        page: params?.page,
        limit: params?.limit,
        status: params?.status as any,
      });
      return { tasks: res.tasks, page: res.page, totalPages: res.totalPages };
    } catch (err: any) {
      return rejectWithValue(err.message || "Erro ao buscar tarefas");
    }
  }
);

export const createTask = createAsyncThunk<Task, TaskInput>(
  "tasks/create",
  async (payload, { rejectWithValue }) => {
    try {
      return await tasksApi.create(payload);
    } catch (err: any) {
      return rejectWithValue(err.message || "Erro ao criar tarefa");
    }
  }
);

export const updateTask = createAsyncThunk<Task, { id: number; data: TaskInput }>(
  "tasks/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await tasksApi.update(id, data);
    } catch (err: any) {
      return rejectWithValue(err.message || "Erro ao atualizar tarefa");
    }
  }
);

export const deleteTask = createAsyncThunk<number, number>(
  "tasks/delete",
  async (id, { rejectWithValue }) => {
    try {
      await tasksApi.remove(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.message || "Erro ao deletar tarefa");
    }
  }
);

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<TasksState["filter"]>) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchTasks.fulfilled, (s, action) => {
        s.loading = false;
        s.items = action.payload.tasks;
        s.page = action.payload.page;
        s.totalPages = action.payload.totalPages;
      })
      .addCase(fetchTasks.rejected, (s, action) => {
        s.loading = false;
        s.error = action.payload as string || "Erro";
      })

      .addCase(createTask.pending, (s) => { s.loading = true; })
      .addCase(createTask.fulfilled, (s, action) => {
        s.loading = false;
        s.items.unshift(action.payload);
      })
      .addCase(createTask.rejected, (s, action) => {
        s.loading = false;
        s.error = action.payload as string || "Erro";
      })

      .addCase(updateTask.pending, (s) => { s.loading = true; })
      .addCase(updateTask.fulfilled, (s, action) => {
        s.loading = false;
        const idx = s.items.findIndex((t) => t.id === action.payload.id);
        if (idx >= 0) s.items[idx] = action.payload;
      })
      .addCase(updateTask.rejected, (s, action) => {
        s.loading = false;
        s.error = action.payload as string || "Erro";
      })

      .addCase(deleteTask.pending, (s) => { s.loading = true; })
      .addCase(deleteTask.fulfilled, (s, action) => {
        s.loading = false;
        s.items = s.items.filter((t) => t.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (s, action) => {
        s.loading = false;
        s.error = action.payload as string || "Erro";
      });
  },
});

export const { setFilter } = slice.actions;
export default slice.reducer;