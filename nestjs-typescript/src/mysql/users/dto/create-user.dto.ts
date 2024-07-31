import { ApiProperty } from '@nestjs/swagger';

export enum Role {
  admin = 'admin',
  user = 'user',
}

export class CreateUserDto {
  
  @ApiProperty({
    description: 'The username of the user',
    example: 'john_doe',
  })
  Username: string;

  @ApiProperty({
    description: 'The hashed password of the user',
    example: 'hashed_password_string',
  })
  PasswordHash: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  Email: string;
  
  @ApiProperty({
    description: 'The role of the user',
    example: Role.user,
    enum: Role,
  })
  Role: Role = Role.user;
}
