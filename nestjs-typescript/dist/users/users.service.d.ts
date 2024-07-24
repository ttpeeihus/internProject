import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<Users>);
    create(_createUser: CreateUserDto): Promise<"Tên người dùng đã được sử dụng" | "Emai đã được sử dụng" | "Tạo tài khoản thành công" | undefined>;
    findAll(): Promise<Users[]>;
    findOneUserName(username: string): Promise<Users | null> | null;
    findOneUser(UserID: number): Promise<Users | null> | null;
    update(id: number, updateUserDto: UpdateUserDto): Promise<Users | null>;
    remove(id: number): Promise<string>;
    checkin(username: string, password: string): Promise<{
        token: string;
        role: string;
        username: string;
    } | string>;
    repass(username: string, newPassword: string, email: string): Promise<string>;
}
