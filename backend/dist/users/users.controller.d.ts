import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUser: CreateUserDto): Promise<"Tên người dùng đã được sử dụng" | "Emai đã được sử dụng" | "Tạo tài khoản thành công" | undefined>;
    findAll(): Promise<import("./entities/user.entity").Users[]>;
    findOne(id: string): Promise<import("./entities/user.entity").Users | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").Users | null>;
    remove(id: string): Promise<string>;
    checkin(username: string, password: string): Promise<string>;
    repass(username: string, newPassword: string, email: string): Promise<string>;
}
