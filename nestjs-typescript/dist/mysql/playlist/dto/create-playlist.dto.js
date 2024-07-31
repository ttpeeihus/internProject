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
exports.CreatePlaylistDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreatePlaylistDto {
}
exports.CreatePlaylistDto = CreatePlaylistDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The avatar URL of the user',
        example: 'https://example.com/avatar.jpg',
    }),
    __metadata("design:type", String)
], CreatePlaylistDto.prototype, "avtUser", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The source URL of the playlist',
        example: 'https://example.com/playlist.mp3',
    }),
    __metadata("design:type", String)
], CreatePlaylistDto.prototype, "src", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The name of the playlist',
        example: 'My Favorite Playlist',
    }),
    __metadata("design:type", String)
], CreatePlaylistDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The author of the playlist',
        example: 'John Doe',
    }),
    __metadata("design:type", String)
], CreatePlaylistDto.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The number of times the playlist has been watched',
        example: '1000',
    }),
    __metadata("design:type", String)
], CreatePlaylistDto.prototype, "watched", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The creation date of the playlist',
        example: '2024-07-31T12:00:00Z',
    }),
    __metadata("design:type", String)
], CreatePlaylistDto.prototype, "date", void 0);
//# sourceMappingURL=create-playlist.dto.js.map