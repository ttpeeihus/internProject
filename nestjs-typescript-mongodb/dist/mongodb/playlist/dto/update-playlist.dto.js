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
exports.UpdatePlaylistDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_playlist_dto_1 = require("./create-playlist.dto");
const swagger_1 = require("@nestjs/swagger");
class UpdatePlaylistDto extends (0, mapped_types_1.PartialType)(create_playlist_dto_1.CreatePlaylistDto) {
}
exports.UpdatePlaylistDto = UpdatePlaylistDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Avatar of the user',
        example: 'https://example.com/new-avatar.jpg',
        required: false,
    }),
    __metadata("design:type", String)
], UpdatePlaylistDto.prototype, "avtUser", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Source of the playlist',
        example: 'https://example.com/new-source',
        required: false,
    }),
    __metadata("design:type", String)
], UpdatePlaylistDto.prototype, "src", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the playlist',
        example: 'Updated Playlist Name',
        required: false,
    }),
    __metadata("design:type", String)
], UpdatePlaylistDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Author of the playlist',
        example: 'Jane Doe',
        required: false,
    }),
    __metadata("design:type", String)
], UpdatePlaylistDto.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of times the playlist has been watched',
        example: '5678',
        required: false,
    }),
    __metadata("design:type", String)
], UpdatePlaylistDto.prototype, "watched", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date of creation or update',
        example: '2024-08-01',
        required: false,
    }),
    __metadata("design:type", String)
], UpdatePlaylistDto.prototype, "date", void 0);
//# sourceMappingURL=update-playlist.dto.js.map