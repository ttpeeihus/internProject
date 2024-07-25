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
exports.PlaylistService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const playlist_entity_1 = require("./entities/playlist.entity");
let PlaylistService = class PlaylistService {
    constructor(videoRepository) {
        this.videoRepository = videoRepository;
    }
    create(_createPlaylistDto) {
        const newVideo = this.videoRepository.create({ ..._createPlaylistDto });
        console.log("Tạo video thành công " + newVideo);
        return this.videoRepository.save(newVideo);
    }
    findAll() {
        console.log("Lấy danh sách video thành công");
        return this.videoRepository.find();
    }
    findOneVideo(id) {
        const options = {
            where: {
                id: id,
            },
        };
        let vid = this.videoRepository.findOne(options);
        if (!vid) {
            console.log(`Video with ID ${id} not found`);
            return null;
        }
        console.log("Lấy video có id =" + id + " " + vid);
        return vid;
    }
    async update(id, updateVideoDto) {
        const vid = await this.findOneVideo(id);
        if (!vid) {
            console.log(`Video with ID ${id} not found`);
            return null;
        }
        if (updateVideoDto.avtUser !== undefined) {
            vid.avtUser = updateVideoDto.avtUser;
        }
        if (updateVideoDto.src !== undefined) {
            vid.src = updateVideoDto.src;
        }
        if (updateVideoDto.name !== undefined) {
            vid.name = updateVideoDto.name;
        }
        if (updateVideoDto.author !== undefined) {
            vid.author = updateVideoDto.author;
        }
        if (updateVideoDto.watched !== undefined) {
            vid.watched = updateVideoDto.watched;
        }
        await this.videoRepository.save(vid);
        console.log(vid);
        return 'Video has been successfully updated';
    }
    async remove(id) {
        const vid = await this.findOneVideo(id);
        if (!vid) {
            console.log(`Video with ID ${id} not found`);
            throw new common_2.NotFoundException(`Video with ID ${id} not found`);
        }
        await this.videoRepository.delete(id);
        console.log(`delete ${vid}`);
        return `Video with ID ${id} has been successfully deleted`;
    }
};
exports.PlaylistService = PlaylistService;
exports.PlaylistService = PlaylistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(playlist_entity_1.Playlist)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PlaylistService);
//# sourceMappingURL=playlist.service.js.map