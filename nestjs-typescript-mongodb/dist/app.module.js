"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const playlist_module_1 = require("./mongodb/playlist/playlist.module");
const users_module_1 = require("./mongodb/users/users.module");
const roles_guard_1 = require("./auth/guards/roles.guard");
const prisma_module_1 = require("./config/prisma/prisma.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: ['.mongodb.env'],
                isGlobal: true,
            }),
            prisma_module_1.PrismaModule,
            users_module_1.UsersModule,
            playlist_module_1.PlaylistModule,
            auth_module_1.AuthModule,
        ],
        providers: [roles_guard_1.RolesGuard, app_service_1.AppService, jwt_1.JwtService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map