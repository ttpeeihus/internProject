import { Injectable } from '@nestjs/common';
import { UsersService } from '../mongodb/users/users.service';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneUserName(username);
    if (user && user.PasswordHash === pass) {
      const { PasswordHash, ...result } = user;
      return result;
    }
    return null;
  }
}
