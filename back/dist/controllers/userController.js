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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
// import { createUserService, getUserService, deleteUserService } from "../services/userServices";
const userServices_1 = require("../services/userServices");
const credentialService_1 = require("../services/credentialService");
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
        const user = yield (0, userServices_1.getUserByIdService)(Number(id));
        return res.status(200).json(user);
        // res.status(200).json({ message: "Obtiene detalle de un usuario especifico" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
    ;
});
exports.getUserById = getUserById;
// POST /users/register => Registro de un nuevo usuario.
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, birthdate, nDni, username, password } = req.body;
        const newUser = yield (0, userServices_1.createUserService)({
            name, email, birthdate, nDni, username, password
        });
        res.status(201).json({ message: "Usuario creado con éxito" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
    ;
});
exports.createUser = createUser;
// POST /users/login => Login del usuario a la aplicación.
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const credential = yield (0, credentialService_1.validateCredential)({
            username, password
        });
        const user = yield (0, userServices_1.findUserByCredentialId)(credential.id);
        res.status(200).json({ loggin: true, user, message: "Usuario logueado correctamente" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
    ;
});
exports.loginUser = loginUser;
