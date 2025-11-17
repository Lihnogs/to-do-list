"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getOne = exports.list = exports.create = void 0;
const taskService_1 = require("../services/taskService");
const create = async (req, res, next) => {
    try {
        const task = await (0, taskService_1.createTask)(req.userId, req.body);
        res.status(201).json(task);
    }
    catch (err) {
        next(err);
    }
};
exports.create = create;
const list = async (req, res, next) => {
    try {
        const tasks = await (0, taskService_1.getTasks)(req.userId, req.query);
        res.json(tasks);
    }
    catch (err) {
        next(err);
    }
};
exports.list = list;
const getOne = async (req, res, next) => {
    try {
        const task = await (0, taskService_1.getTaskById)(req.userId, Number(req.params.id));
        res.json(task);
    }
    catch (err) {
        next(err);
    }
};
exports.getOne = getOne;
const update = async (req, res, next) => {
    try {
        const task = await (0, taskService_1.updateTask)(req.userId, Number(req.params.id), req.body);
        res.json(task);
    }
    catch (err) {
        next(err);
    }
};
exports.update = update;
const remove = async (req, res, next) => {
    try {
        await (0, taskService_1.deleteTask)(req.userId, Number(req.params.id));
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
};
exports.remove = remove;
