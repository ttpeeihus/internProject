// users.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('addUser')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')  // Chỉ admin mới có quyền xem danh sách người dùng
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')  // Chỉ admin mới có quyền xem chi tiết người dùng
  findOne(@Param('id') id: string) {
    return this.usersService.findOneUser(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')  // Chỉ admin mới có quyền cập nhật người dùng
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')  // Chỉ admin mới có quyền xóa người dùng
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('checkin')
  async checkin(@Body('username') username: string, @Body('password') password: string): Promise<{ token: string; role: string; username:string } | string> {
    return this.usersService.checkin(username, password);
  }

  @Post('repass')
  async repass(@Body('username') username: string, @Body('password') newPassword: string, @Body('email') email: string): Promise<string> {
    return this.usersService.repass(username, newPassword, email);
  }

}