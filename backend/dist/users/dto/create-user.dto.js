"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
var Role;
(function (Role) {
    Role["admin"] = "admin";
    Role["user"] = "user";
})(Role || (Role = {}));
class CreateUserDto {
    constructor() {
        this.Role = Role.user;
    }
}
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map