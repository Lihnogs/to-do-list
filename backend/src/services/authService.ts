import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const exists = await prisma.user.findUnique({ where: { email: data.email } });

  if (exists) throw { statusCode: 400, message: "Email já registrado!" };

  const hashed = await bcrypt.hash(data.password, 10);

  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashed
    }
  });
}

export async function loginUser(data: { email: string; password: string }) {
  const user = await prisma.user.findUnique({ where: { email: data.email } });

  if (!user) throw { statusCode: 401, message: "Credenciais inválidas!" };

  const ok = await bcrypt.compare(data.password, user.password);
  if (!ok) throw { statusCode: 401, message: "Credenciais inválidas!" };

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  return {
    user: { id: user.id, name: user.name, email: user.email },
    token
  };
}