import { Router } from "express";
import { register, login } from "../controllers/authController";
import { z } from "zod";
import { validate } from "../middleware/validateMiddleware";

const router = Router();

const registerSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6)
  })
});

const loginSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string()
  })
});

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;