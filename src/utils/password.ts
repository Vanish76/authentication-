import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
