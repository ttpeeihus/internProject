import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { RolesGuard } from './auth/guards/roles.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { Roles } from './auth/decorators/roles.decorator';
import { Request as ExpressRequest } from 'express'; // Import Request từ Express

@Controller('api')
export class AppController {

  @Get('user')
  @Roles('user') 
  @UseGuards(JwtAuthGuard, RolesGuard)
  getUser(@Request() req: ExpressRequest) { // Đặt kiểu dữ liệu cho req là ExpressRequest
    
    console.log(req.user); // In ra thông tin của người dùng từ JWT
    console.log("Xac thuc Thành công");
  }
}
