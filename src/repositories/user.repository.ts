import getPool from "../config/db.js";
import { User } from "../types/user.js";

export const findUserByEmail = async (
  email: string
): Promise<User | null> => {
  const query = `
    SELECT id, name, email, password, is_2fa_enabled, created_at
    FROM users
    WHERE email = $1
    LIMIT 1
  `;

  const pool = getPool();
  const result = await pool.query(query, [email]);

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
};
