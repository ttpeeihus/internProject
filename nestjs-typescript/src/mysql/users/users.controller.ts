import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('addUser')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('checkin')
  @ApiOperation({ summary: 'User check-in' })
  @ApiResponse({
    status: 200,
    description: 'Successful login, returns token and user details.',
    schema: {
      example: {
        token: 'jwt-token',
        role: 'user',
        username: 'user1'
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async checkin(@Body('username') username: string, @Body('password') password: string): Promise<{ token: string; role: string; username: string } | string> {
    return this.usersService.checkin(username, password);
  }

  @Post('repass')
  @ApiOperation({ summary: 'Change user password' })
  @ApiResponse({ status: 200, description: 'Password has been successfully changed.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async repass(@Body('username') username: string, @Body('password') newPassword: string, @Body('email') email: string): Promise<string> {
    return this.usersService.repass(username, newPassword, email);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Returns all users.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the user', type: String })
  @ApiResponse({ status: 200, description: 'Returns the user with the given ID.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOneUser(id.toString());
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', description: 'The ID of the user', type: String })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id.toString(), updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', description: 'The ID of the user', type: String })
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id.toString());
  }
}
