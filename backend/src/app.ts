import express from "express";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import { errorMiddleware } from "./middleware/errorMiddleware";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const app = express();
const swaggerDocument = YAML.load("./src/swagger.yaml");

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use(errorMiddleware);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;