import { useEffect, useState } from "react";
import api from "../api/api";
import { Button, Card, Checkbox, IconButton, TextField, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");

  async function loadTasks() {
    const status =
      filter === "pending" ? "pending" :
      filter === "completed" ? "completed" :
      undefined;

    const { data } = await api.get("/tasks", { params: { status } });
    setTasks(data.tasks);
  }

  useEffect(() => {
    loadTasks();
  }, [filter]);

  async function handleCreate() {
    await api.post("/tasks", { title });
    setTitle("");
    loadTasks();
  }

  async function toggleCompleted(task: Task) {
    await api.put(`/tasks/${task.id}`, { completed: !task.completed });
    loadTasks();
  }

  async function deleteTask(id: number) {
    await api.delete(`/tasks/${id}`);
    loadTasks();
  }

  return (
    <div style={{ maxWidth: 600, margin: "30px auto" }}>
      <h2>Minhas Tarefas</h2>

      {/* Criar tarefa */}
      <div style={{ display: "flex", gap: 10 }}>
        <TextField
          fullWidth
          label="Nova tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button variant="contained" onClick={handleCreate}>Criar</Button>
      </div>

      {/* Filtro */}
      <TextField
        select
        label="Filtrar"
        value={filter}
        sx={{ mt: 2 }}
        onChange={(e) => setFilter(e.target.value)}
        fullWidth
      >
        <MenuItem value="all">Todas</MenuItem>
        <MenuItem value="pending">Pendentes</MenuItem>
        <MenuItem value="completed">Concluídas</MenuItem>
      </TextField>

      {/* Lista */}
      <div style={{ marginTop: 20 }}>
        {tasks.map((task) => (
          <Card key={task.id} sx={{ p: 2, mb: 1, display: "flex", alignItems: "center" }}>
            <Checkbox checked={task.completed} onChange={() => toggleCompleted(task)} />

            <div style={{ flex: 1 }}>
              <strong>{task.title}</strong>
              {task.description && <p>{task.description}</p>}
            </div>

            <IconButton color="error" onClick={() => deleteTask(task.id)}>
              <DeleteIcon />
            </IconButton>
          </Card>
        ))}
      </div>
    </div>
  );
}