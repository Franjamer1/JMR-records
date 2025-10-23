import { Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/index";
import { validateCredential } from "../services/credentialService";
import { createUserService, findUserByCredentialId, getAllUsersService, getUserByIdService } from "../services/userServices";
import ICreateCredentialDto from "../dto/CredentialDto";
import ICredential from "../interfaces/ICredential";
import ICreateUserDto from "../dto/userDto";
import User from "../entities/User";
import { UserRole } from "../entities/User";
import { AuthRequest } from "../middlewares/authMiddleware";

// GET /users => Obtener el listado de todos los usuarios.
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users: User[] = await getAllUsersService();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    };
};

// GET /users/:id => Obtener el detalle de un usuario específico.
export const getUserById = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const user: User = await getUserByIdService(Number(id), req.user!);

        return res.status(200).json(user);
    } catch (error: any) {
        const status =
            error.message === "Unauthorized"
                ? 401
                : error.message.startsWith("Forbidden")
                    ? 403
                    : 400;

        res.status(status).json({ message: error.message });
    }
}



// POST /users/register => Registro de un nuevo usuario.
export const createUser = async (req: Request<{}, {}, ICreateUserDto>, res: Response) => {
    try {
        const { name, email, birthdate, nDni, username, password, role } = req.body;
        const newUser: User = await createUserService({
            name, email, birthdate, nDni, username, password, role
        });
        res.status(201).json({ message: "Usuario creado con éxito" });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    };
};

export const loginUser = async (req: Request<{}, {}, ICreateCredentialDto>, res: Response) => {
    try {
        const { username, password } = req.body;

        // 1️⃣ Validamos credenciales
        const credential: ICredential = await validateCredential({ username, password });

        // 2️⃣ Buscamos al usuario asociado
        const user: User | null = await findUserByCredentialId(credential.id);
        if (!user) throw new Error("Usuario no encontrado");

        // 3️⃣ Preparamos payload del token
        const payload = {
            userId: user.id,
            role: user.role || UserRole.USER, // 👈 garantizamos que exista un rol
        };

        // 4️⃣ Configuramos opciones del token
        const options: SignOptions = {
            expiresIn: parseInt(JWT_EXPIRES_IN) || 3600, // 1h por defecto
        };

        // 5️⃣ Firmamos el JWT
        const token = jwt.sign(payload, JWT_SECRET as string, options);

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

    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};








