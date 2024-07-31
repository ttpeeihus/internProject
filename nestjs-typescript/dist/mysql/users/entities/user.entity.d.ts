declare enum Role {
    admin = "admin",
    user = "user"
}
export declare class Users {
    UserID: string;
    Username: string;
    PasswordHash: string;
    Email: string;
    Role: Role;
}
export {};
