import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  
  @ApiPropertyOptional({
    description: 'The username of the user',
    example: 'john_doe_updated',
  })
  Username?: string;

  @ApiPropertyOptional({
    description: 'The hashed password of the user',
    example: 'new_hashed_password_string',
  })
  PasswordHash?: string;

  @ApiPropertyOptional({
    description: 'The email of the user',
    example: 'john.doe.updated@example.com',
  })
  Email?: string;
  
  @ApiPropertyOptional({
    description: 'The role of the user',
    example: 'user',
    enum: ['admin', 'user'],
  })
  Role?: Role;
}
