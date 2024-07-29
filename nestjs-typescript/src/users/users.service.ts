// users.service.ts
import { Injectable, NotFoundException,  } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../auth/constants';

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
      console.error('Đã xảy ra lỗi khi tạo tài khoản:', error);
      // throw new Error('Đã xảy ra lỗi khi tạo tài khoản');
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  findOneUserName(username: string) {
    let user = this.userRepository.findOne({where: {Username: username}});
    if (!user) {
      console.log(`Không tìm thấy người dùng với tên người dùng ${username}`);
      return null;
    }
    console.log("Lấy người dùng có username = "+ username);
    return user;
  }

  findOneUser(UserID: number) {
    let user = this.userRepository.findOne({where: {UserID: UserID}});
    if (!user) {
      console.log(`Không tìm thấy người dùng với ID = ${UserID}`);
      return null;
    }
    console.log("Lấy người dùng có ID = "+ UserID);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
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
        await this.userRepository.save(user);
        console.log("Người dùng với ID: ", id, " đã được cập nhật thành công");
    } else {
        console.log("Không phát hiện thay đổi cho người dùng với ID: ", id);
    }

    return user;
}

  async remove(id: number) {
    const user = await this.findOneUser(id);

    if (!user) {
      throw new NotFoundException(`Không tìm thấy người dùng với ID = ${id}`);
    }

    await this.userRepository.delete(id);
    console.log(`Xóa người dùng có ID = ${id} thành công`);
    return `User with ID ${id} has been successfully deleted`;
  }

  async checkin(username: string, password: string): Promise<{ token: string; role: string; username:string } | string> {
    const user = await this.findOneUserName(username);

    if (!user) {
      console.log('Người dùng không tồn tại');
      return 'Người dùng không tồn tại';
    }

    if (await bcrypt.compare(password, user.PasswordHash)) {
      console.log('Đăng nhập thành công');
      
      // Tạo JWT token
      const payload = {
        username: user.Username,
        sub: user.UserID,
        roles: user.Role
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

    // Generate salt and hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password hash
    user.PasswordHash = hashedPassword;
    await this.userRepository.save(user);
    console.log('Đổi mật khẩu thành công');
    return 'Đổi mật khẩu thành công';
  }

}
