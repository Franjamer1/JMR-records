import { UserRole } from "../entities/User";

interface IUser {
    id: number,
    name: string,
    email: string,
    // birthdate: string,
    // nDni: string,
    credentialsId: number,
    role: UserRole,
};

export default IUser;