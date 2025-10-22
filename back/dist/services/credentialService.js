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
exports.validateCredential = exports.createCredential = void 0;
const repositories_1 = require("../repositories");
//servicio para crear nueva credencial
const createCredential = (createCredentialDto) => __awaiter(void 0, void 0, void 0, function* () {
    //falta hacer la verificacion de que no exista el email
    //crear credencial
    const newCredential = repositories_1.credentialModel.create(createCredentialDto);
    //grabar BDD
    yield repositories_1.credentialModel.save(newCredential);
    return newCredential;
});
exports.createCredential = createCredential;
//servicio para validar credencial al loguear
const validateCredential = (validateCredentialDto) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = validateCredentialDto;
    const foundCredential = yield repositories_1.credentialModel.findOneBy({ username });
    if (!foundCredential)
        throw Error("Credenciales incorrectas");
    if (password !== (foundCredential === null || foundCredential === void 0 ? void 0 : foundCredential.password))
        throw Error("Credenciales incorrectas");
    return foundCredential; //hay que retornar el id en realidad
});
exports.validateCredential = validateCredential;
