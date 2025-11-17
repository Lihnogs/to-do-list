import { Request, Response, NextFunction } from "express";
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from "../services/taskService";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await createTask(req.userId!, req.body);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await getTasks(req.userId!, req.query);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await getTaskById(req.userId!, Number(req.params.id));
    res.json(task);
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await updateTask(req.userId!, Number(req.params.id), req.body);
    res.json(task);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteTask(req.userId!, Number(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};