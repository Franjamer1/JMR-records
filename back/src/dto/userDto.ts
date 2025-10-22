import { UserRole } from "../entities/User";

interface ICreateUserDto {
    name: string,
    email: string,
    birthdate: string,
    nDni: string,
    username: string,
    password: string,
    role?: UserRole;
};

export default ICreateUserDto;