import { Router } from "express";
import { findUserByEmail } from "../repositories/user.repository.js";

const router = Router();

router.get("/user", async (req, res) => {
  try {
    const email = req.query.email as string;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ⚠️ password included only for testing — remove later
    return res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
