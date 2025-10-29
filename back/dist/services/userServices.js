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
exports.findUserByCredentialId = exports.createUserService = exports.getUserByIdService = exports.getAllUsersService = void 0;
const User_1 = require("../entities/User");
const repositories_1 = require("../repositories");
const credentialService_1 = require("./credentialService");
const getAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield repositories_1.userModel.find({ relations: { appointments: true } });
    return allUsers;
});
exports.getAllUsersService = getAllUsersService;
const getUserByIdService = (id, requestinUser) => __awaiter(void 0, void 0, void 0, function* () {
    //si no hay usuario autenticado
    if (!requestinUser)
        throw new Error("Unautorized");
    //si el user aut, no es admin y quiere ver otro user
    if (requestinUser.role !== User_1.UserRole.ADMIN && requestinUser.userId !== id) {
        throw new Error("Forbidden - no tienes permiso para ver este usuario");
    }
    //Buscar el usuario solicitado
    const user = yield repositories_1.userModel.findOne({
        where: { id },
        relations: ["appointments"],
    });
    if (!user)
        throw new Error("Usuario no encontrado");
    return user;
});
exports.getUserByIdService = getUserByIdService;
const createUserService = (createUserDto) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    //creamos credencial
    const newCredential = yield (0, credentialService_1.createCredential)({
        username: createUserDto.username,
        password: createUserDto.password,
    });
    //creacion de usuario
    const newUser = repositories_1.userModel.create(Object.assign(Object.assign({}, createUserDto), { role: (_a = createUserDto.role) !== null && _a !== void 0 ? _a : User_1.UserRole.USER, credential: newCredential }));
    yield repositories_1.userModel.save(newUser);
    return newUser;
});
exports.createUserService = createUserService;
//servicio que retorna el usuario a partir del "username"
const findUserByCredentialId = (credentialId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield repositories_1.userModel.findOneBy({
        credential: { id: credentialId }
    });
    //verificar si no existe el usuario
    if (!user) {
        throw new Error(`Usuario con credencial ID ${credentialId} no encontrado`);
    }
    ;
    return user;
});
exports.findUserByCredentialId = findUserByCredentialId;
