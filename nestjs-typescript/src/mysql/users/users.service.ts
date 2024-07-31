import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service'; 
import { CreateUserDto} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../../auth/constants'; 

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.users.findFirst({ where: { Username: createUserDto.Username } });
    const email = await this.prisma.users.findFirst({ where: { Email: createUserDto.Email } });

    if (user) {
      return 'Tên người dùng đã được sử dụng';
    }
    if (email) {
      return 'Email đã được sử dụng';
    }

    try {
      const hashedPassword = await bcrypt.hash(createUserDto.PasswordHash, 10);

      const newUser = await this.prisma.users.create({
        data: {
          ...createUserDto,
          PasswordHash: hashedPassword,        
        },
      });

      console.log(newUser);
      return 'Tạo tài khoản thành công';
    } catch (error) {
      console.error('Đã xảy ra lỗi khi tạo tài khoản:', error);
    }
  }

  async findAll() {
    return this.prisma.users.findMany();
  }

  async findOneUserName(Username: string) {
    const user = await this.prisma.users.findFirst({ where: { Username } });
    if (!user) {
      console.log(`Không tìm thấy người dùng với tên người dùng ${Username}`);
      return null;
    }
    console.log('Lấy người dùng có Username = ' + Username);
    return user;
  }

  async findOneUser(id: string) {
    const user = await this.prisma.users.findFirst({ where: { UserID: Number(id) } });
    if (!user) {
      console.log(`Không tìm thấy người dùng với ID = ${id}`);
      return null;
    }
    console.log('Lấy người dùng có ID = ' + id);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOneUser(id);

    if (!user) {
      console.log(`Không tìm thấy người dùng với ID = ${id}`);
      return null;
    }

    let updated = false;

    if (updateUserDto.Username !== undefined && updateUserDto.Username !== user.Username) {
      user.Username = updateUserDto.Username;
      updated = true;
    }
    if (updateUserDto.Email !== undefined && updateUserDto.Email !== user.Email) {
      user.Email = updateUserDto.Email;
      updated = true;
    }
    if (updateUserDto.Role !== undefined && updateUserDto.Role !== user.Role) {
      user.Role = updateUserDto.Role;
      updated = true;
    }
    if (updateUserDto.PasswordHash !== undefined && updateUserDto.PasswordHash !== user.PasswordHash) {
      const hashedPassword = await bcrypt.hash(updateUserDto.PasswordHash, 10);
      user.PasswordHash = hashedPassword;
      updated = true;
    }

    if (updated) {
      await this.prisma.users.update({
        where: { UserID: Number(id) },
        data: user,
      });
      console.log('Người dùng với ID: ', id, ' đã được cập nhật thành công');
    } else {
      console.log('Không phát hiện thay đổi cho người dùng với ID: ', id);
    }

    return user;
  }

  async remove(id: string) {
    const user = await this.findOneUser(id);

    if (!user) {
      throw new NotFoundException(`Không tìm thấy người dùng với ID = ${id}`);
    }

    await this.prisma.users.delete({ where: { UserID: Number(id) } });
    console.log(`Xóa người dùng có ID = ${id} thành công`);
    return `User with ID ${id} has been successfully deleted`;
  }

  async checkin(username: string, password: string): Promise<{ token: string; role: string; username: string } | string> {
    const user = await this.findOneUserName(username);

    if (!user) {
      console.log('Người dùng không tồn tại');
      return 'Người dùng không tồn tại';
    }

    if (await bcrypt.compare(password, String(user.PasswordHash))) {
      console.log('Đăng nhập thành công');

      const payload = {
        username: user.Username,
        sub: user.UserID,
        roles: user.Role,
      };
      const token = jwt.sign(payload, jwtConstants.secret, { expiresIn: '7d' });
      const role = String(user.Role);
      const username = String(user.Username);

      return { token, role, username };
    } else {
      console.log('Mật khẩu không chính xác');
      return 'Mật khẩu không chính xác';
    }
  }

  async repass(username: string, newPassword: string, email: string): Promise<string> {
    const user = await this.findOneUserName(username);

    if (!user) {
      console.log('Người dùng không tồn tại');
      return 'Người dùng không tồn tại';
    }
    console.log(user.Email);
    console.log(email);
    console.log(newPassword);
    if (user.Email !== email) {
      console.log('Email không khớp với người dùng');
      return 'Email không khớp với người dùng';
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.users.update({
      where: { UserID: user.UserID },
      data: { PasswordHash: hashedPassword },
    });
    console.log('Đổi mật khẩu thành công');
    return 'Đổi mật khẩu thành công';
  }
}
