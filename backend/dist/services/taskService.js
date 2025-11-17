"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = createTask;
exports.getTasks = getTasks;
exports.getTaskById = getTaskById;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;
const prisma_1 = __importDefault(require("../config/prisma"));
async function createTask(userId, data) {
    return prisma_1.default.task.create({
        data: { ...data, userId }
    });
}
async function getTasks(userId, query) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const where = { userId };
    if (query.status === "pending")
        where.completed = false;
    if (query.status === "completed")
        where.completed = true;
    const tasks = await prisma_1.default.task.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { id: "desc" }
    });
    const total = await prisma_1.default.task.count({ where });
    return {
        tasks,
        total,
        page,
        totalPages: Math.ceil(total / limit)
    };
}
async function getTaskById(userId, id) {
    const task = await prisma_1.default.task.findFirst({
        where: { id, userId }
    });
    if (!task)
        throw { statusCode: 404, message: "Tarefa não encontrada" };
    return task;
}
async function updateTask(userId, id, data) {
    await getTaskById(userId, id);
    return prisma_1.default.task.update({
        where: { id },
        data
    });
}
async function deleteTask(userId, id) {
    await getTaskById(userId, id);
    return prisma_1.default.task.delete({ where: { id } });
}
