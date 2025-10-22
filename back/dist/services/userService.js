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
exports.loginUserService = exports.createUserService = exports.getUserByidService = exports.getUsersService = void 0;
//simulacion DB
const users = [];
let userId = 0;
const getUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = users; //aqui luego deberiamos hacer el llamado a la DB
    return users;
});
exports.getUsersService = getUsersService;
const getUserByidService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = users.find((user) => user.id === id);
    if (!foundUser) {
        throw Error("Usuario no encontrado");
    }
    return foundUser;
});
exports.getUserByidService = getUserByidService;
const createUserService = (createUserDto) => __awaiter(void 0, void 0, void 0, function* () {
    //creamos usuario
    const newUser = userModel.create(createUserDto);
    yield userModel.save(newUser);
    //Creacion de la credencial
    const newCredential = yield createCredential({
        username: createUserDto.username,
        password: createUserDto.password,
    });
    //Asociacion de newUser con newCredential
    newUser.credential = newCredential;
    yield userModel.save(newUser);
    return newUser;
});
exports.createUserService = createUserService;
const loginUserService = () => __awaiter(void 0, void 0, void 0, function* () {
});
exports.loginUserService = loginUserService;
// id: number,
// name: string,
// email: string,
// birthdate: string,
// nDni: number,
// credentialsId: number,
// active: boolean
