import { useState } from "react";
import api from "../api/api";
import { Button, TextField, Card, CardContent, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    try {
      await api.post("/auth/register", { name, email, password });
      alert("Cadastro realizado!");
      navigate("/login");
    } catch (err) {
      alert("Erro ao registrar");
    }
  }

  return (
    <Card sx={{ maxWidth: 400, mx: "auto", mt: 10 }}>
      <CardContent>
        <Typography variant="h5" mb={2}>Cadastro</Typography>

        <form onSubmit={handleRegister}>
          <TextField fullWidth label="Nome" margin="normal" onChange={(e) => setName(e.target.value)} />
          <TextField fullWidth label="Email" margin="normal" onChange={(e) => setEmail(e.target.value)} />
          <TextField fullWidth label="Senha" type="password" margin="normal" onChange={(e) => setPassword(e.target.value)} />

          <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">Cadastrar</Button>
        </form>

        <Typography mt={2}>
          Já possui conta? <Link to="/login">Login</Link>
        </Typography>
      </CardContent>
    </Card>
  );
}