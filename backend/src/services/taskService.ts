import prisma from "../config/prisma";

export async function createTask(userId: number, data: {
  title: string;
  description?: string;
  completed?: boolean;
}) {
  return prisma.task.create({
    data: { ...data, userId }
  });
}

export async function getTasks(userId: number, query: any) {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const where: any = { userId };

  if (query.status === "pending") where.completed = false;
  if (query.status === "completed") where.completed = true;

  const tasks = await prisma.task.findMany({
    where,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { id: "desc" }
  });

  const total = await prisma.task.count({ where });

  return {
    tasks,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  };
}

export async function getTaskById(userId: number, id: number) {
  const task = await prisma.task.findFirst({
    where: { id, userId }
  });

  if (!task) throw { statusCode: 404, message: "Tarefa não encontrada" };

  return task;
}

export async function updateTask(userId: number, id: number, data: any) {
  await getTaskById(userId, id);

  return prisma.task.update({
    where: { id },
    data
  });
}

export async function deleteTask(userId: number, id: number) {
  await getTaskById(userId, id);

  return prisma.task.delete({ where: { id } });
}