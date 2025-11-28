import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { login, clearError } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/login-bg.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error, token } = useAppSelector((s) => s.auth);

  const handleLogin = async () => {
    await dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const highlights = [
    { title: "Painel de tarefas", subtitle: "Suas tarefas organizadas." },
    { title: "Gestão de tarefas", subtitle: "Crie, altere, delete suas tarefas quando quiser." },
    { title: "Segurança garantida", subtitle: "Autenticação com tokens." },
  ];

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleLogin();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, md: 6 },
        py: { xs: 4, md: 6 },
        bgcolor: "#050a18",
        backgroundImage:
          "radial-gradient(circle at top, rgba(32,112,244,0.18), transparent 40%), radial-gradient(circle at 20% 20%, rgba(0,212,255,0.12), transparent 35%), radial-gradient(circle at 80% 0%, rgba(255,0,92,0.1), transparent 45%)",
      }}
    >
      <Card
      sx={{
        width: "100%",
        maxWidth: 1200,
        borderRadius: "32px",
        bgcolor: "rgba(8,14,28,0.92)",
        color: "#f8fbff",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 35px 90px rgba(3,8,20,0.85)",
      }}
      >
        <Stack direction={{ xs: "column", md: "row" }}>
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              position: "relative",
              flex: "1 1 50%",
              minHeight: 520,
              bgcolor: "#071024",
            }}
          >
            <Box
              component="img"
              src={bgImage}
              alt="Painel de produtividade"
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(5,10,24,0.05) 0%, rgba(5,10,24,0.9) 100%)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: 5,
              }}
            >
              <Typography
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: "0.5rem",
                  fontSize: "0.75rem",
                  color: "#6de3ff",
                }}
              >
                todo.list
              </Typography>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 4, maxWidth: 420 }}>
                  Organize e acompanhe suas tarefas diárias
                </Typography>
                <Stack spacing={2}>
                  {highlights.map((item) => (
                    <Box
                      key={item.title}
                      sx={{
                        borderRadius: 3,
                        border: "1px solid rgba(255,255,255,0.1)",
                        backgroundColor: "rgba(255,255,255,0.08)",
                        p: 2,
                      }}
                    >
                      <Typography sx={{ fontWeight: 600, color: "#87e1ff" }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "rgba(248,251,255,0.85)" }}>
                        {item.subtitle}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Box>
          </Box>

          <Box sx={{ flex: "1 1 50%", minWidth: 0, width: { xs: "100%", md: "50%" } }}>
            <CardContent sx={{ px: { xs: 4, md: 6 }, py: { xs: 5, md: 6 } }}>
              <Typography
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: "0.4rem",
                  fontSize: "0.75rem",
                  color: "#68d9ff",
                }}
              >
                Bem-vindo
              </Typography>
              <Typography variant="h4" sx={{ mt: 2, fontWeight: 600 }}>
                Acesse suas tarefas
              </Typography>
              <Typography sx={{ mt: 1.5, color: "rgba(248,251,255,0.75)" }}>
                Continue de onde parou e mantenha o foco nas entregas do dia a dia.
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mt: 3, borderRadius: 3 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={onSubmit} sx={{ mt: 4, display: "grid", gap: 3 }}>
                <TextField
                  label="Email"
                  type="email"
                  required
                  variant="filled"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputLabelProps={{ sx: { color: "rgba(255,255,255,0.7)" } }}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      color: "#fff",
                      borderRadius: 3,
                      backgroundColor: "rgba(255,255,255,0.06)",
                    },
                  }}
                />

                <TextField
                  label="Senha"
                  type="password"
                  required
                  variant="filled"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputLabelProps={{ sx: { color: "rgba(255,255,255,0.7)" } }}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      color: "#fff",
                      borderRadius: 3,
                      backgroundColor: "rgba(255,255,255,0.06)",
                    },
                  }}
                  helperText={
                    <Button
                      size="small"
                      sx={{
                        color: "#66deff",
                        px: 0,
                        textTransform: "uppercase",
                        letterSpacing: "0.2rem",
                      }}
                    >
                      Esqueci a senha
                    </Button>
                  }
                  FormHelperTextProps={{ sx: { mt: 1 } }}
                />

                <Button
                  type="submit"
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    fontSize: "1rem",
                    fontWeight: 600,
                    letterSpacing: "0.1rem",
                    textTransform: "uppercase",
                    background:
                      "linear-gradient(90deg, #38e0ff, #3d74ff 50%, #6240ff)",
                    boxShadow: "0 20px 40px rgba(61,116,255,0.35)",
                    color: "#050b12",
                    "&:hover": {
                      opacity: 0.9,
                      background:
                        "linear-gradient(90deg, #38e0ff, #3d74ff 50%, #6240ff)",
                    },
                  }}
                >
                  {loading ? "Validando acesso..." : "Entrar"}
                </Button>
              </Box>

              <Stack alignItems="center" spacing={1.5} sx={{ mt: 5 }}>
                <Typography variant="body2" sx={{ color: "rgba(248,251,255,0.8)" }}>
                  Não possui uma conta?
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/register")}
                  sx={{
                    borderRadius: 3,
                    borderColor: "rgba(255,255,255,0.35)",
                    color: "#f7fbff",
                    px: 4,
                    py: 1,
                    fontWeight: 600,
                    "&:hover": {
                      borderColor: "#6fe1ff",
                      color: "#6fe1ff",
                    },
                  }}
                >
                  Criar conta agora
                </Button>
              </Stack>
            </CardContent>
          </Box>
        </Stack>
      </Card>
    </Box>
  );
}