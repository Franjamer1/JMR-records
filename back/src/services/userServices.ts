import ICreateUserDto from "../dto/UserDto";
import Credential from "../entities/Credential";
import User, { UserRole } from "../entities/User";
import { userModel } from "../repositories";
import { createCredential } from "./credentialService";


export const getAllUsersService = async (): Promise<User[]> => {
    const allUsers: User[] = await userModel.find({ relations: { appointments: true } });
    return allUsers;
};

export const getUserByIdService = async (id: number): Promise<User> => {
    const user: User | null = await userModel.findOne({
        where: { id },
        relations: ["appointments"]
    })

    if (!user) throw new Error("Usuario no encontrado");
    return user;
};

// export const createUserService = async (createUserDto: ICreateUserDto) => {
//     //creamos usuario
//     const newUser: User = userModel.create(createUserDto);
//     await userModel.save(newUser);
//     //Creacion de la credencial
//     const newCredential: Credential = await createCredential({
//         username: createUserDto.username,
//         password: createUserDto.password,
//     });
//     //Asociacion de newUser con newCredential
//     newUser.credential = newCredential;
//     await userModel.save(newUser);

//     return newUser;
// };
export const createUserService = async (createUserDto: ICreateUserDto) => {
    //creamos credencial
    const newCredential: Credential = await createCredential({
        username: createUserDto.username,
        password: createUserDto.password,
    });

    //creacion de usuario
    const newUser: User = userModel.create({
        ...createUserDto,
        role: createUserDto.role ?? UserRole.USER, //asignamos USER si no existe role o no se especifica
        credential: newCredential,
    });

    await userModel.save(newUser);

    return newUser;
}


//servicio que retorna el usuario a partir del "username"
export const findUserByCredentialId = async (credentialId: number) => {
    const user: User | null = await userModel.findOneBy({
        credential: { id: credentialId }
    })
    //verificar si no existe el usuario
    if (!user) {
        throw new Error(`Usuario con credencial ID ${credentialId} no encontrado`);
    };
    return user;
}