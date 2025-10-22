// import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
// import Credential from "./Credential";
// import Appointment from "./Appointment";


// @Entity({ name: "users" })
// class User {

//     @PrimaryGeneratedColumn()
//     id!: number;

//     @Column()
//     name!: string;

//     @Column()
//     email!: string;

//     @Column()
//     birthdate!: string;

//     @Column()
//     nDni!: string;

//     //User 1:1 Credential
//     @OneToOne(() => Credential)
//     @JoinColumn()
//     credential!: Credential;
//     //User 1:N Appointment
//     @OneToMany(
//         () => Appointment,
//         (appointment) => appointment.userId
//     )
//     appointments!: Appointment[];

// }

// export default User;

import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Credential from "./Credential";
import Appointment from "./Appointment";

export enum UserRole {
    ADMIN = "admin",
    USER = "user"
}

@Entity({ name: "users" })
class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    birthdate!: string;

    @Column()
    nDni!: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role!: UserRole;

    // User 1:1 Credential
    @OneToOne(() => Credential, { cascade: true })
    @JoinColumn()
    credential!: Credential;

    // User 1:N Appointment
    @OneToMany(() => Appointment, (appointment) => appointment.user, { cascade: true })
    appointments!: Appointment[];
}

export default User;