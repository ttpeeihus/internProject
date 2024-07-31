import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum Role {
    admin = 'admin',
    user = 'user',
}

@Entity({name: 'Users'})
export class Users{
    @PrimaryGeneratedColumn()
    UserID : string;

    @Column({unique: true})
    Username : string;

    @Column()
    PasswordHash : string;

    @Column({unique: true})
    Email: string;

    @Column({default: Role.user})
    Role: Role;

}