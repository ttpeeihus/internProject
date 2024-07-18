enum Role {
    admin = 'admin',
    user = 'user',
}

export class CreateUserDto {

    Username: string;

    PasswordHash: string;

    Email: string;
    
    Role: Role = Role.user;
}
