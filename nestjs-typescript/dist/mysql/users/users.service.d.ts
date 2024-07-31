import { PrismaService } from '../../config/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<"Tên người dùng đã được sử dụng" | "Email đã được sử dụng" | "Tạo tài khoản thành công" | undefined>;
    findAll(): Promise<{
        UserID: number;
        Username: string | null;
        PasswordHash: string | null;
        Email: string | null;
        Role: import(".prisma/client").$Enums.Users_Role | null;
    }[]>;
    findOneUserName(Username: string): Promise<{
        UserID: number;
        Username: string | null;
        PasswordHash: string | null;
        Email: string | null;
        Role: import(".prisma/client").$Enums.Users_Role | null;
    } | null>;
    findOneUser(id: string): Promise<{
        UserID: number;
        Username: string | null;
        PasswordHash: string | null;
        Email: string | null;
        Role: import(".prisma/client").$Enums.Users_Role | null;
    } | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        UserID: number;
        Username: string | null;
        PasswordHash: string | null;
        Email: string | null;
        Role: import(".prisma/client").$Enums.Users_Role | null;
    } | null>;
    remove(id: string): Promise<string>;
    checkin(username: string, password: string): Promise<{
        token: string;
        role: string;
        username: string;
    } | string>;
    repass(username: string, newPassword: string, email: string): Promise<string>;
}
