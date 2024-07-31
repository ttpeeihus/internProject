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
exports.CreateUserDto = exports.Role = void 0;
const swagger_1 = require("@nestjs/swagger");
var Role;
(function (Role) {
    Role["admin"] = "admin";
    Role["user"] = "user";
})(Role || (exports.Role = Role = {}));
class CreateUserDto {
    constructor() {
        this.Role = Role.user;
    }
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The username of the user',
        example: 'john_doe',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "Username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The hashed password of the user',
        example: 'hashed_password_string',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "PasswordHash", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The email of the user',
        example: 'john.doe@example.com',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "Email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The role of the user',
        example: Role.user,
        enum: Role,
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "Role", void 0);
//# sourceMappingURL=create-user.dto.js.map