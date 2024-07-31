import { CreateUserDto } from './create-user.dto';
import { Role } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    Username?: string;
    PasswordHash?: string;
    Email?: string;
    Role?: Role;
}
export {};
