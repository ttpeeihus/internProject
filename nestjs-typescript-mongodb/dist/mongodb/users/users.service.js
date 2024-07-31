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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../config/prisma/prisma.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const constants_1 = require("../../auth/constants");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        const user = await this.prisma.users.findUnique({ where: { id: createUserDto.Username } });
        const email = await this.prisma.users.findUnique({ where: { id: createUserDto.Email } });
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
        }
        catch (error) {
            console.error('Đã xảy ra lỗi khi tạo tài khoản:', error);
        }
    }
    async findAll() {
        return this.prisma.users.findMany();
    }
    async findOneUserName(username) {
        try {
            const user = await this.prisma.users.findFirst({
                where: { Username: username },
            });
            if (!user) {
                console.log(`Không tìm thấy người dùng với tên người dùng: ${username}`);
                return null;
            }
            console.log(`Lấy người dùng thành công với tên người dùng: ${username}`);
            return user;
        }
        catch (error) {
            console.error(`Lỗi khi tìm người dùng với tên người dùng: ${username}`, error);
            throw new Error(`Có lỗi xảy ra khi tìm người dùng với tên người dùng: ${username}`);
        }
    }
    async findOne(id) {
        return this.prisma.users.findUnique({ where: { id } });
    }
    async update(id, updateUserDto) {
        const user = await this.findOne(id);
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
                where: { id },
                data: user,
            });
            console.log('Người dùng với ID: ', id, ' đã được cập nhật thành công');
        }
        else {
            console.log('Không phát hiện thay đổi cho người dùng với ID: ', id);
        }
        return user;
    }
    async remove(id) {
        const user = await this.findOne(id);
        if (!user) {
            throw new common_1.NotFoundException(`Không tìm thấy người dùng với ID = ${id}`);
        }
        await this.prisma.users.delete({ where: { id } });
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
                sub: user.id,
                roles: user.Role,
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
        await this.prisma.users.update({
            where: { id: user.id },
            data: { PasswordHash: hashedPassword },
        });
        console.log('Đổi mật khẩu thành công');
        return 'Đổi mật khẩu thành công';
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map