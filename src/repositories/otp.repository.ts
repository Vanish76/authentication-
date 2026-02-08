import getPool from "../config/db.js";

export const createOtpEntry = async (
  userId: number,
  otpHash: string,
  expiresAt: Date
): Promise<void> => {
  const query = `
    INSERT INTO otp_verifications (user_id, otp_hash, expires_at, attempts)
    VALUES ($1, $2, $3, 0)
  `;

  const pool = getPool();
  await pool.query(query, [userId, otpHash, expiresAt]);

};
