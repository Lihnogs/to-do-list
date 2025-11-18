import { create, list, getOne, update, remove } from "../controllers/taskController";
import * as taskService from "../services/taskService";

describe("Task Controller", () => {

  const mockRequest = (data: any) => data;
  const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a task", async () => {
    jest.spyOn(taskService, "createTask").mockResolvedValue({
      id: 1,
      title: "Test",
      userId: 123
    });

    const req = mockRequest({
      userId: 123,
      body: { title: "Test" }
    });

    const res = mockResponse();

    await create(req as any, res as any, next);

    expect(taskService.createTask).toHaveBeenCalledWith(123, { title: "Test" });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      title: "Test",
      userId: 123
    });
  });

  it("should return tasks list", async () => {
    jest.spyOn(taskService, "getTasks").mockResolvedValue({
      tasks: [],
      total: 0,
      page: 1,
      totalPages: 1
    });

    const req = mockRequest({
      userId: 123,
      query: {}
    });

    const res = mockResponse();

    await list(req as any, res as any, next);

    expect(taskService.getTasks).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
  });

  it("should return one task", async () => {
    jest.spyOn(taskService, "getTaskById").mockResolvedValue({
      id: 1,
      title: "My Task",
      userId: 123
    });

    const req = mockRequest({
      userId: 123,
      params: { id: "1" }
    });

    const res = mockResponse();

    await getOne(req as any, res as any, next);

    expect(taskService.getTaskById).toHaveBeenCalledWith(123, 1);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      title: "My Task",
      userId: 123
    });
  });

  it("should update a task", async () => {
    jest.spyOn(taskService, "updateTask").mockResolvedValue({
      id: 1,
      title: "Updated"
    });

    const req = mockRequest({
      userId: 123,
      params: { id: "1" },
      body: { title: "Updated" }
    });

    const res = mockResponse();

    await update(req as any, res as any, next);

    expect(taskService.updateTask).toHaveBeenCalledWith(123, 1, { title: "Updated" });
    expect(res.json).toHaveBeenCalledWith({ id: 1, title: "Updated" });
  });

  it("should delete a task", async () => {
    jest.spyOn(taskService, "deleteTask").mockResolvedValue(undefined);

    const req = mockRequest({
      userId: 123,
      params: { id: "1" }
    });

    const res = mockResponse();

    await remove(req as any, res as any, next);

    expect(taskService.deleteTask).toHaveBeenCalledWith(123, 1);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it("should call next(err) if service throws an error", async () => {
    const error = new Error("Erro no serviço");

    jest.spyOn(taskService, "createTask").mockRejectedValue(error);

    const req = mockRequest({
      userId: 123,
      body: { title: "Test" }
    });

    const res = mockResponse();

    await create(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(error);
  });

});