import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  IconButton,
  Stack,
  TextField,
  Typography,
  Snackbar,
  Divider,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchTasks, createTask, updateTask, deleteTask, setFilter } from "../features/tasks/tasksSlice";
import { logout } from "../features/auth/authSlice";
import Loader from "../components/Loader";
import type { Task } from "../api/tasksApi";

export default function Home() {
  const dispatch = useAppDispatch();
  const tasksState = useAppSelector((s) => s.tasks);
  const auth = useAppSelector((s) => s.auth);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editing, setEditing] = useState<Task | null>(null);
  const [snack, setSnack] = useState<{ open: boolean; message: string; severity?: "success" | "error" }>({ open: false, message: "" });

  useEffect(() => {
    const status = tasksState.filter === "pending" ? "pending" : tasksState.filter === "completed" ? "completed" : undefined;
    dispatch(fetchTasks({ status }));
  }, [dispatch, tasksState.filter]);

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setSnack({ open: true, message: "Título obrigatório", severity: "error" });
      return;
    }
    try {
      if (editing) {
        await dispatch(updateTask({ id: editing.id, data: { title, description, completed: editing.completed } })).unwrap();
        setSnack({ open: true, message: "Tarefa atualizada", severity: "success" });
        setEditing(null);
      } else {
        await dispatch(createTask({ title, description })).unwrap();
        setSnack({ open: true, message: "Tarefa criada", severity: "success" });
      }
      setTitle("");
      setDescription("");
      dispatch(fetchTasks({ status: tasksState.filter === "pending" ? "pending" : tasksState.filter === "completed" ? "completed" : undefined }));
    } catch (err: any) {
      setSnack({ open: true, message: err?.message || "Erro", severity: "error" });
    }
  };

  const handleToggle = async (t: Task) => {
    try {
      await dispatch(updateTask({ id: t.id, data: { title: t.title, description: t.description || "", completed: !t.completed } })).unwrap();
      setSnack({ open: true, message: t.completed ? "Tarefa marcada como pendente" : "Tarefa concluída", severity: "success" });
      dispatch(fetchTasks({ status: tasksState.filter === "pending" ? "pending" : tasksState.filter === "completed" ? "completed" : undefined }));
    } catch (err: any) {
      setSnack({ open: true, message: err?.message || "Erro", severity: "error" });
    }
  };

  const handleEdit = (t: Task) => {
    setEditing(t);
    setTitle(t.title);
    setDescription(t.description || "");
  };

  const handleDelete = async (t: Task) => {
    try {
      await dispatch(deleteTask(t.id)).unwrap();
      setSnack({ open: true, message: "Tarefa excluída", severity: "success" });
      dispatch(fetchTasks({ status: tasksState.filter === "pending" ? "pending" : tasksState.filter === "completed" ? "completed" : undefined }));
    } catch (err: any) {
      setSnack({ open: true, message: err?.message || "Erro", severity: "error" });
    }
  };

  const handleFilter = (filter: "all" | "pending" | "completed") => {
    dispatch(setFilter(filter));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleCancel = () => {
    setEditing(null);
    setTitle("");
    setDescription("");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#050a18",
        backgroundImage:
          "radial-gradient(circle at top, rgba(32,112,244,0.18), transparent 40%), radial-gradient(circle at 20% 20%, rgba(0,212,255,0.12), transparent 35%), radial-gradient(circle at 80% 0%, rgba(255,0,92,0.1), transparent 45%)",
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Box sx={{ maxWidth: 1000, mx: "auto" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#f8fbff",
              fontSize: { xs: "1.75rem", md: "2.125rem" },
            }}
          >
            Minhas Tarefas
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography sx={{ color: "rgba(248,251,255,0.8)", fontSize: "0.875rem" }}>
              {auth.user?.name}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                borderRadius: 2,
                borderColor: "rgba(255,255,255,0.35)",
                color: "#f7fbff",
                textTransform: "uppercase",
                letterSpacing: "0.1rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                "&:hover": {
                  borderColor: "#6fe1ff",
                  color: "#6fe1ff",
                },
              }}
            >
              Sair
            </Button>
          </Stack>
        </Box>

        <Card
          sx={{
            borderRadius: 4,
            bgcolor: "rgba(8,14,28,0.92)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 20px 60px rgba(3,8,20,0.85)",
            mb: 4,
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                color: "#f8fbff",
                fontWeight: 600,
              }}
            >
              {editing ? "Editar Tarefa" : "Nova Tarefa"}
            </Typography>
            <Box component="form" onSubmit={handleCreate}>
              <Stack spacing={3}>
                <TextField
                  label="Título"
                  required
                  variant="filled"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  InputLabelProps={{ sx: { color: "rgba(255,255,255,0.7)" } }}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      color: "#fff",
                      borderRadius: 2,
                      backgroundColor: "rgba(255,255,255,0.06)",
                    },
                  }}
                />
                <TextField
                  label="Descrição"
                  variant="filled"
                  multiline
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  InputLabelProps={{ sx: { color: "rgba(255,255,255,0.7)" } }}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      color: "#fff",
                      borderRadius: 2,
                      backgroundColor: "rgba(255,255,255,0.06)",
                    },
                  }}
                />
                <Stack direction="row" spacing={2}>
                  <Button
                    type="submit"
                    disabled={tasksState.loading}
                    sx={{
                      flex: 1,
                      py: 1.5,
                      borderRadius: 2,
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      letterSpacing: "0.1rem",
                      textTransform: "uppercase",
                      background: "linear-gradient(90deg, #38e0ff, #3d74ff 50%, #6240ff)",
                      boxShadow: "0 10px 30px rgba(61,116,255,0.35)",
                      color: "#050b12",
                      "&:hover": {
                        opacity: 0.9,
                        background: "linear-gradient(90deg, #38e0ff, #3d74ff 50%, #6240ff)",
                      },
                    }}
                  >
                    {editing
                      ? tasksState.loading
                        ? "Salvando..."
                        : "Salvar"
                      : tasksState.loading
                      ? "Criando..."
                      : "Criar"}
                  </Button>
                  {editing && (
                    <Button
                      variant="outlined"
                      onClick={handleCancel}
                      sx={{
                        borderRadius: 2,
                        borderColor: "rgba(255,255,255,0.35)",
                        color: "#f7fbff",
                        textTransform: "uppercase",
                        letterSpacing: "0.1rem",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        "&:hover": {
                          borderColor: "#6fe1ff",
                          color: "#6fe1ff",
                        },
                      }}
                    >
                      Cancelar
                    </Button>
                  )}
                </Stack>
              </Stack>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Stack direction="row" spacing={1}>
            <Chip
              label="Todas"
              onClick={() => handleFilter("all")}
              sx={{
                bgcolor: tasksState.filter === "all" ? "rgba(56,224,255,0.2)" : "rgba(255,255,255,0.08)",
                color: tasksState.filter === "all" ? "#6de3ff" : "rgba(248,251,255,0.8)",
                border: tasksState.filter === "all" ? "1px solid rgba(56,224,255,0.4)" : "1px solid rgba(255,255,255,0.1)",
                cursor: "pointer",
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "rgba(56,224,255,0.15)",
                },
              }}
            />
            <Chip
              label="Pendentes"
              onClick={() => handleFilter("pending")}
              sx={{
                bgcolor: tasksState.filter === "pending" ? "rgba(56,224,255,0.2)" : "rgba(255,255,255,0.08)",
                color: tasksState.filter === "pending" ? "#6de3ff" : "rgba(248,251,255,0.8)",
                border: tasksState.filter === "pending" ? "1px solid rgba(56,224,255,0.4)" : "1px solid rgba(255,255,255,0.1)",
                cursor: "pointer",
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "rgba(56,224,255,0.15)",
                },
              }}
            />
            <Chip
              label="Concluídas"
              onClick={() => handleFilter("completed")}
              sx={{
                bgcolor: tasksState.filter === "completed" ? "rgba(56,224,255,0.2)" : "rgba(255,255,255,0.08)",
                color: tasksState.filter === "completed" ? "#6de3ff" : "rgba(248,251,255,0.8)",
                border: tasksState.filter === "completed" ? "1px solid rgba(56,224,255,0.4)" : "1px solid rgba(255,255,255,0.1)",
                cursor: "pointer",
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "rgba(56,224,255,0.15)",
                },
              }}
            />
          </Stack>
          <Typography sx={{ color: "rgba(248,251,255,0.8)", fontSize: "0.875rem", fontWeight: 600 }}>
            Total: {tasksState.items.length}
          </Typography>
        </Box>

        <Card
          sx={{
            borderRadius: 4,
            bgcolor: "rgba(8,14,28,0.92)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 20px 60px rgba(3,8,20,0.85)",
            minHeight: 200,
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            {tasksState.loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <Loader />
              </Box>
            ) : tasksState.items.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Typography sx={{ color: "rgba(248,251,255,0.6)", fontSize: "1rem" }}>
                  Nenhuma tarefa encontrada
                </Typography>
              </Box>
            ) : (
              <Stack spacing={2}>
                {tasksState.items.map((task, index) => (
                  <Box key={task.id}>
                    <Paper
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        bgcolor: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        "&:hover": {
                          bgcolor: "rgba(255,255,255,0.08)",
                          borderColor: "rgba(56,224,255,0.3)",
                        },
                      }}
                    >
                      <Stack direction="row" spacing={2} alignItems="flex-start">
                        <Checkbox
                          checked={task.completed}
                          onChange={() => handleToggle(task)}
                          sx={{
                            color: "#6de3ff",
                            "&.Mui-checked": {
                              color: "#6de3ff",
                            },
                          }}
                        />
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              color: task.completed ? "rgba(248,251,255,0.5)" : "#f8fbff",
                              textDecoration: task.completed ? "line-through" : "none",
                              fontWeight: 600,
                              mb: 0.5,
                            }}
                          >
                            {task.title}
                          </Typography>
                          {task.description && (
                            <Typography
                              variant="body2"
                              sx={{
                                color: task.completed ? "rgba(248,251,255,0.4)" : "rgba(248,251,255,0.7)",
                                textDecoration: task.completed ? "line-through" : "none",
                              }}
                            >
                              {task.description}
                            </Typography>
                          )}
                          <Chip
                            label={task.completed ? "Concluída" : "Pendente"}
                            size="small"
                            sx={{
                              mt: 1.5,
                              bgcolor: task.completed ? "rgba(56,224,255,0.2)" : "rgba(255,255,255,0.1)",
                              color: task.completed ? "#6de3ff" : "rgba(248,251,255,0.8)",
                              fontSize: "0.7rem",
                              height: 24,
                            }}
                          />
                        </Box>
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(task)}
                            sx={{
                              color: "rgba(248,251,255,0.7)",
                              "&:hover": {
                                color: "#6de3ff",
                                bgcolor: "rgba(56,224,255,0.1)",
                              },
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(task)}
                            sx={{
                              color: "rgba(248,251,255,0.7)",
                              "&:hover": {
                                color: "#ff6b6b",
                                bgcolor: "rgba(255,107,107,0.1)",
                              },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      </Stack>
                    </Paper>
                    {index < tasksState.items.length - 1 && (
                      <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.08)" }} />
                    )}
                  </Box>
                ))}
              </Stack>
            )}
          </CardContent>
        </Card>
      </Box>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={snack.severity || "success"}
          onClose={() => setSnack({ ...snack, open: false })}
          sx={{
            borderRadius: 2,
            bgcolor: snack.severity === "error" ? "rgba(244,67,54,0.9)" : "rgba(76,175,80,0.9)",
          }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}