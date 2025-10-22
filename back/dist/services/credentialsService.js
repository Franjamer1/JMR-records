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
exports.validateCredentials = exports.createCredentials = void 0;
//simulacion DB
const credentials = [];
//
let credentialId = 1;
const createCredentials = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const newCredential = {
        id: credentialId++,
        username: username,
        password: password
    };
    credentials.push(newCredential);
    return newCredential.id;
});
exports.createCredentials = createCredentials;
const validateCredentials = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const foundCredentials = credentials.find((credentials) => {
        credentials.username === username;
    });
    if (foundCredentials && foundCredentials.username !== username && foundCredentials.password !== password) {
        throw Error("Credenciales incorrectas");
    }
    else if (!foundCredentials) {
        throw Error("Credenciales no encontradas");
    }
    else {
        return foundCredentials.id;
    }
});
exports.validateCredentials = validateCredentials;
