import ICreateCredentialDto from "../dto/CredentialDto";
import Credential from "../entities/Credential";
import { credentialModel } from "../repositories";
import IValidateCredentialDto from "../dto/IValidateCredentialDto";


//servicio para crear nueva credencial
export const createCredential = async (createCredentialDto: ICreateCredentialDto): Promise<Credential> => {
    //falta hacer la verificacion de que no exista el email
    //crear credencial
    const newCredential: Credential = credentialModel.create(createCredentialDto);
    //grabar BDD
    await credentialModel.save(newCredential);

    return newCredential;
};

//servicio para validar credencial al loguear
export const validateCredential = async (validateCredentialDto: IValidateCredentialDto): Promise<Credential> => {
    const { username, password } = validateCredentialDto;
    const foundCredential: Credential | null = await credentialModel.findOneBy({ username })
    if (!foundCredential) throw Error("Credenciales incorrectas");
    if (password !== foundCredential?.password) throw Error("Credenciales incorrectas");
    return foundCredential;//hay que retornar el id en realidad
};

