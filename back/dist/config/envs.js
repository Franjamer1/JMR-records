"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BCRYPT_SALT_ROUNDS = exports.JWT_EXPIRES_IN = exports.JWT_SECRET = exports.DB_NAME = exports.DB_PASS = exports.DB_USER = exports.DB_PORT = exports.DB_HOST = exports.DATABASE_URL = exports.PORT = void 0;
require("dotenv/config");
exports.PORT = process.env.PORT || 3000;
// Base de datos
exports.DATABASE_URL = process.env.DATABASE_URL;
exports.DB_HOST = process.env.DB_HOST;
exports.DB_PORT = process.env.DB_PORT;
exports.DB_USER = process.env.DB_USER;
exports.DB_PASS = process.env.DB_PASS;
exports.DB_NAME = process.env.DB_NAME;
// Entidades y seguridad
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
exports.BCRYPT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS);
