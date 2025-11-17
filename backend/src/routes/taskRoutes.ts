import { Router } from "express";
import * as controller from "../controllers/taskController";
import { authMiddleware } from "../middleware/authMiddleware";
import { z } from "zod";
import { validate } from "../middleware/validateMiddleware";

const router = Router();
router.use(authMiddleware);

const createSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string().optional(),
    completed: z.boolean().optional()
  })
});

router.get("/", controller.list);
router.post("/", validate(createSchema), controller.create);
router.get("/:id", controller.getOne);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

export default router;