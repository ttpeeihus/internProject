declare enum Role {
    admin = "admin",
    user = "user"
}
export declare class Users {
    UserID: number;
    Username: string;
    PasswordHash: string;
    Email: string;
    Role: Role;
    comparePassword(password: string): Promise<boolean>;
    hashPassword(password: string): Promise<void>;
}
export {};
