import express, { Application } from "express";
import cors from "cors";
import testRoutes from "./routes/test.js";
import authRoutes from "./routes/auth.routes.js";



const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/test", testRoutes);
app.use("/auth", authRoutes);

app.get("/", (_req, res) => {
  res.send("Backend running (TypeScript)");
});

export default app;
