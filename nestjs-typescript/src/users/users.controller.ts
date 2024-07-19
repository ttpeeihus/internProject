// users.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('addUser')
  create(@Body() createUser: CreateUserDto) {
    return this.usersService.create(createUser);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneUser(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('checkin')
  async checkin(@Body('username') username: string, @Body('password') password: string): Promise<{ token: string; role: string } | string> {
    return this.usersService.checkin(username, password);
  }

  @Post('repass')
  async repass(@Body('username') username: string, @Body('password') newPassword: string, @Body('email') email: string): Promise<string> {
    return this.usersService.repass(username, newPassword, email);
  }

}