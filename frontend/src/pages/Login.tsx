import { useState } from "react";
import { useDispatch } from "react-redux";
import api from "../api/api";
import { loginSuccess } from "../context/authSlice";
import { Button, TextField, Card, CardContent, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", { email, password });
      dispatch(loginSuccess(data));
      navigate("/");
    } catch (err) {
      alert("Credenciais inválidas");
    }
  }

  return (
    <Card sx={{ maxWidth: 400, mx: "auto", mt: 10 }}>
      <CardContent>
        <Typography variant="h5" mb={2}>Login</Typography>

        <form onSubmit={handleLogin}>
          <TextField fullWidth label="Email" margin="normal" onChange={(e) => setEmail(e.target.value)} />
          <TextField fullWidth label="Senha" type="password" margin="normal" onChange={(e) => setPassword(e.target.value)} />

          <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">Entrar</Button>
        </form>

        <Typography mt={2}>
          Não tem conta? <Link to="/register">Cadastrar</Link>
        </Typography>
      </CardContent>
    </Card>
  );
}