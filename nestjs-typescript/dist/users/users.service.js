"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const constants_1 = require("../auth/constants");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(_createUser) {
        const user = await this.userRepository.findOne({ where: { Username: _createUser.Username } });
        const email = await this.userRepository.findOne({ where: { Email: _createUser.Email } });
        if (user) {
            return 'Tên người dùng đã được sử dụng';
        }
        if (email) {
            return 'Emai đã được sử dụng';
        }
        try {
            const hashedPassword = await bcrypt.hash(_createUser.PasswordHash, 10);
            const newUser = this.userRepository.create({
                ..._createUser,
                PasswordHash: hashedPassword,
            });
            await this.userRepository.save(newUser);
            console.log(newUser);
            return 'Tạo tài khoản thành công';
        }
        catch (error) {
            console.error('Đã xảy ra lỗi khi tạo tài khoản:', error);
        }
    }
    findAll() {
        return this.userRepository.find();
    }
    findOneUserName(username) {
        let user = this.userRepository.findOne({ where: { Username: username } });
        if (!user) {
            console.log(`Không tìm thấy người dùng với tên người dùng ${username}`);
            return null;
        }
        console.log("Lấy người dùng có username = " + username);
        return user;
    }
    findOneUser(UserID) {
        let user = this.userRepository.findOne({ where: { UserID: UserID } });
        if (!user) {
            console.log(`Không tìm thấy người dùng với ID = ${UserID}`);
            return null;
        }
        console.log("Lấy người dùng có ID = " + UserID);
        return user;
    }
    async update(id, updateUserDto) {
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
        }
        else {
            console.log("Không phát hiện thay đổi cho người dùng với ID: ", id);
        }
        return user;
    }
    async remove(id) {
        const user = await this.findOneUser(id);
        if (!user) {
            throw new common_1.NotFoundException(`Không tìm thấy người dùng với ID = ${id}`);
        }
        await this.userRepository.delete(id);
        console.log(`Xóa người dùng có ID = ${id} thành công`);
        return `User with ID ${id} has been successfully deleted`;
    }
    async checkin(username, password) {
        const user = await this.findOneUserName(username);
        if (!user) {
            console.log('Người dùng không tồn tại');
            return 'Người dùng không tồn tại';
        }
        if (await bcrypt.compare(password, user.PasswordHash)) {
            console.log('Đăng nhập thành công');
            const payload = {
                username: user.Username,
                sub: user.UserID,
                roles: user.Role
            };
            const token = jwt.sign(payload, constants_1.jwtConstants.secret, { expiresIn: '7d' });
            const role = String(user.Role);
            const username = String(user.Username);
            return { token, role, username };
        }
        else {
            console.log('Mật khẩu không chính xác');
            return 'Mật khẩu không chính xác';
        }
    }
    async repass(username, newPassword, email) {
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
        user.PasswordHash = hashedPassword;
        await this.userRepository.save(user);
        console.log('Đổi mật khẩu thành công');
        return 'Đổi mật khẩu thành công';
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map