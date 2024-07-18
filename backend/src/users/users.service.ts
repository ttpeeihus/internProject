// users.service.ts
import { Injectable, NotFoundException,  } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions } from 'typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private userRepository: Repository<Users>){}

  async create(_createUser: CreateUserDto) {
    const user = await this.userRepository.findOne({ where: { Username: _createUser.Username } });
    const email = await this.userRepository.findOne({ where: { Email: _createUser.Email } });
    if (user){
      return 'Tên người dùng đã được sử dụng';
    }
    if (email){
      return 'Emai đã được sử dụng';
    }
    try {
      // Hash mật khẩu trước khi lưu vào cơ sở dữ liệu
      const hashedPassword = await bcrypt.hash(_createUser.PasswordHash, 10); // Sử dụng bcrypt để hash mật khẩu, số 10 là số lượt lặp hash

      // Tạo một đối tượng người dùng mới với mật khẩu đã hash
      const newUser = this.userRepository.create({
        ..._createUser,
        PasswordHash: hashedPassword, // Thay đổi mật khẩu gốc thành mật khẩu đã hash
      });

      // Lưu người dùng vào cơ sở dữ liệu
      await this.userRepository.save(newUser);
      console.log(newUser);
      return 'Tạo tài khoản thành công';
    } catch (error) {
      console.error('Error creating user:', error);
      // throw new Error('Đã xảy ra lỗi khi tạo tài khoản');
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  findOneUser(UserID: number) {
    const options: FindOneOptions<Users> = {
      where: {
        UserID: UserID,
      },
    };
    return this.userRepository.findOne(options);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOneUser(id);

    if (!user) {
      return null;
    }

    if (updateUserDto.Username !== undefined) {
      user.Username = updateUserDto.Username;
    }
    if (updateUserDto.Email !== undefined) {
      user.Email = updateUserDto.Email;
    }
    if (updateUserDto.Role !== undefined) {
      user.Role = updateUserDto.Role;
    }
    if (updateUserDto.PasswordHash !== undefined) {
      const hashedPassword = await bcrypt.hash(updateUserDto.PasswordHash, 10);
      user.PasswordHash = hashedPassword;
    }

    await this.userRepository.save(user);
    return user;
  }

  async remove(id: number) {
    const user = await this.findOneUser(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.delete(id);
    return `User with ID ${id} has been successfully deleted`;
  }

  async checkin(username: string, password: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { Username: username } });
  
    if (!user) {
      // throw new NotFoundException('Người dùng không tồn tại');
      return 'Người dùng không tồn tại';
    }
  
    if (await bcrypt.compare(password, user.PasswordHash)) {
      return 'Đăng nhập thành công';
    } else {
      return 'Mật khẩu không chính xác';
    }
  }  

  async repass(username: string, newPassword: string, email: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { Username: username } });

    if (!user) {
      return 'Người dùng không tồn tại';
    }
    console.log(user.Email);
    console.log(email);
    console.log(newPassword);
    if (user.Email !== email) {
      return 'Email không khớp với người dùng';
    }

    // Generate salt and hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password hash
    user.PasswordHash = hashedPassword;
    await this.userRepository.save(user);

    return 'Đổi mật khẩu thành công';
  }

}