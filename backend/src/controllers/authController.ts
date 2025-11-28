import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../services/authService";

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("entrou aqueee")
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const response = await loginUser(req.body);
    res.json(response);
  } catch (err) {
    next(err);
  }
}