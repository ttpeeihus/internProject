export declare enum Role {
    admin = "admin",
    user = "user"
}
export declare class CreateUserDto {
    Username: string;
    PasswordHash: string;
    Email: string;
    Role: Role;
}
