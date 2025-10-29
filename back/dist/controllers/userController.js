"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../config/index");
const credentialService_1 = require("../services/credentialService");
const userServices_1 = require("../services/userServices");
const User_1 = require("../entities/User");
// GET /users => Obtener el listado de todos los usuarios.
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userServices_1.getAllUsersService)();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
    ;
});
exports.getAllUsers = getAllUsers;
// GET /users/:id => Obtener el detalle de un usuario específico.
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, userServices_1.getUserByIdService)(Number(id), req.user);
        return res.status(200).json(user);
    }
    catch (error) {
        const status = error.message === "Unauthorized"
            ? 401
            : error.message.startsWith("Forbidden")
                ? 403
                : 400;
        res.status(status).json({ message: error.message });
    }
});
exports.getUserById = getUserById;
// POST /users/register => Registro de un nuevo usuario.
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, birthdate, nDni, username, password, role } = req.body;
        const newUser = yield (0, userServices_1.createUserService)({
            name, email, birthdate, nDni, username, password, role
        });
        res.status(201).json({ message: "Usuario creado con éxito" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
    ;
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // 1️⃣ Validamos credenciales
        const credential = yield (0, credentialService_1.validateCredential)({ username, password });
        // 2️⃣ Buscamos al usuario asociado
        const user = yield (0, userServices_1.findUserByCredentialId)(credential.id);
        if (!user)
            throw new Error("Usuario no encontrado");
        // 3️⃣ Preparamos payload del token
        const payload = {
            userId: user.id,
            role: user.role || User_1.UserRole.USER, // 👈 garantizamos que exista un rol
        };
        // 4️⃣ Configuramos opciones del token
        const options = {
            expiresIn: parseInt(index_1.JWT_EXPIRES_IN) || 3600, // 1h por defecto
        };
        // 5️⃣ Firmamos el JWT
        const token = jsonwebtoken_1.default.sign(payload, index_1.JWT_SECRET, options);
        // 6️⃣ Respondemos al cliente
        res.status(200).json({
            login: true,
            message: "Usuario logueado correctamente",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.loginUser = loginUser;
