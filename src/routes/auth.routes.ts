import { Router } from "express";
import { findUserByEmail } from "../repositories/user.repository.js";
import { comparePassword } from "../utils/password.js";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🚦 Decision point for 2FA
    if (user.is_2fa_enabled) {
      return res.json({
        otpRequired: true,
        userId: user.id
      });
    }

    // Non-2FA users (temporary success response)
    return res.json({
      otpRequired: false,
      message: "Login successful"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
