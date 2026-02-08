import express, { Application } from "express";
import cors from "cors";
import testRoutes from "./routes/test.js";
import authRoutes from "./routes/auth.routes.js";



const app: Application = express();

app.use(cors());
app.use(express.json());

app.use((req, _res, next) => {
  console.log("🌍 SERVER RECEIVED:", req.method, req.url);
  next();
});


// app.get("/", (_req, res) => {
//   res.send("Backend running (TypeScript)");
// });

app.use("/test", testRoutes);
app.use("/auth", authRoutes);

export default app;
