import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import getPool from "./config/db.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    const pool = getPool();
    await pool.query("SELECT 1");
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error("Database connection failed", error);
  }
});
