// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UsersService } from '../users/users.service'; // Import UsersService
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthService {
//   constructor(
//     private usersService: UsersService,
//     private jwtService: JwtService,
//   ) {}

//   async signIn(username: string, pass: string): Promise<{ access_token: string }> {
//     const user = await this.usersService.findOneUserName(username);
//     if (!user || user.PasswordHash !== pass) {
//       throw new UnauthorizedException('Invalid credentials');
//     }
//     const payload = { sub: user.UserID, username: user.Username };
//     return {
//       access_token: await this.jwtService.signAsync(payload),
//     };
//   }
// }
