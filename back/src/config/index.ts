import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_should_not_be_used";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "8h";
export const BCRYPT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS || 10);
