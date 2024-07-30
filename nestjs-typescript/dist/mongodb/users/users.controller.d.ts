import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<"Tên người dùng đã được sử dụng" | "Email đã được sử dụng" | "Tạo tài khoản thành công" | undefined>;
    findAll(): Promise<{
        id: string;
        Email: string;
        PasswordHash: string;
        Role: string;
        Username: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        Email: string;
        PasswordHash: string;
        Role: string;
        Username: string;
    } | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        Email: string;
        PasswordHash: string;
        Role: string;
        Username: string;
    } | null>;
    remove(id: string): Promise<string>;
    checkin(username: string, password: string): Promise<{
        token: string;
        role: string;
        username: string;
    } | string>;
    repass(username: string, newPassword: string, email: string): Promise<string>;
}
