import { client } from "./client";

export interface UserRegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface UserLoginInput {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export const authApi = {
  register: (payload: UserRegisterInput) =>
    client("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  login: (payload: UserLoginInput) =>
    client("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }) as Promise<LoginResponse>,
};