import { Router } from "express";
import { findUserByEmail } from "../repositories/user.repository.js";
import { comparePassword } from "../utils/password.js";
import { generateOtp, hashOtp } from "../utils/otp.js";
import { createOtpEntry } from "../repositories/otp.repository.js";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🌍 SERVER RECEIVED LOGIN:", req.method, req.url);


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

    console.log("2FA FLAG FROM DB:", user.is_2fa_enabled, typeof user.is_2fa_enabled);

    // 🚦 Decision point for 2FA
  if (user.is_2fa_enabled) {
  const otp = generateOtp();
  const otpHash = await hashOtp(otp);

  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min

  await createOtpEntry(user.id, otpHash, expiresAt);

  // TEMP: log OTP for POC (REMOVE LATER)
  console.log("OTP for testing:", otp);

  return res.json({
    otpRequired: true,
    message: "OTP generated"
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
