import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

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

    async comparePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.PasswordHash);
    }

    // Bổ sung phương thức để hash mật khẩu
    async hashPassword(password: string): Promise<void> {
        const saltRounds = 10;
        this.PasswordHash = await bcrypt.hash(password, saltRounds);
    }
}