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
exports.PlaylistController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const playlist_service_1 = require("./playlist.service");
const create_playlist_dto_1 = require("./dto/create-playlist.dto");
const update_playlist_dto_1 = require("./dto/update-playlist.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const roles_guard_1 = require("../../auth/guards/roles.guard");
let PlaylistController = class PlaylistController {
    constructor(playlistService) {
        this.playlistService = playlistService;
    }
    create(createPlaylistDto) {
        return this.playlistService.create(createPlaylistDto);
    }
    findAll() {
        return this.playlistService.findAll();
    }
    incrementViews(id) {
        return this.playlistService.incrementViews(id.toString());
    }
    findOne(id) {
        return this.playlistService.findOneVideo(id.toString());
    }
    update(id, updatePlaylistDto) {
        return this.playlistService.update(id.toString(), updatePlaylistDto);
    }
    remove(id) {
        return this.playlistService.remove(id.toString());
    }
};
exports.PlaylistController = PlaylistController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new playlist' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The playlist has been successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request.' }),
    (0, swagger_1.ApiBody)({ type: create_playlist_dto_1.CreatePlaylistDto }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_playlist_dto_1.CreatePlaylistDto]),
    __metadata("design:returntype", void 0)
], PlaylistController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all playlists' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all playlists.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlaylistController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(':id/views'),
    (0, swagger_1.ApiOperation)({ summary: 'Increment views of a playlist by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Views incremented successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Playlist not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlaylistController.prototype, "incrementViews", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a playlist by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Playlist details.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Playlist not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlaylistController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a playlist by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Playlist updated successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Playlist not found.' }),
    (0, swagger_1.ApiBody)({ type: update_playlist_dto_1.UpdatePlaylistDto }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_playlist_dto_1.UpdatePlaylistDto]),
    __metadata("design:returntype", void 0)
], PlaylistController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a playlist by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Playlist removed successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Playlist not found.' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlaylistController.prototype, "remove", null);
exports.PlaylistController = PlaylistController = __decorate([
    (0, swagger_1.ApiTags)('playlist'),
    (0, common_1.Controller)('playlist'),
    __metadata("design:paramtypes", [playlist_service_1.PlaylistService])
], PlaylistController);
//# sourceMappingURL=playlist.controller.js.map