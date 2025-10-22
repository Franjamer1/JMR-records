// import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import User from "./User";

// @Entity({ name: "appointments" })
// class Appointment {
//     @PrimaryGeneratedColumn()
//     id!: number;

//     @Column()
//     date!: Date;//o string

//     @Column()
//     time!: string;

//     @Column()
//     userId!: number;

//     @Column({
//         default: "active",
//     })
//     status!: string;

//     //Appointment N:1 User
//     @ManyToOne(() => User, (user) => user.appointments)
//     @JoinColumn({ name: "userId" })
//     user!: User;
// }

// export default Appointment;
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";

@Entity({ name: "appointments" })
class Appointment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    date!: Date; // o string

    @Column()
    time!: string;

    @Column()
    userId!: number;

    @Column({
        default: "active",
    })
    status!: string;

    // Appointment N:1 User
    @ManyToOne(() => User, (user) => user.appointments)
    @JoinColumn({ name: "userId" })
    user!: User;
}

export default Appointment;