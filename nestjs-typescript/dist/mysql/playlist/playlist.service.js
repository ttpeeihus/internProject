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
exports.PlaylistService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../config/prisma/prisma.service");
let PlaylistService = class PlaylistService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPlaylistDto) {
        const newVideo = await this.prisma.playlist.create({
            data: createPlaylistDto,
        });
        console.log('Tạo video thành công:', newVideo);
        return newVideo;
    }
    async findAll() {
        return this.prisma.playlist.findMany();
    }
    async findOneVideo(id) {
        const video = await this.prisma.playlist.findUnique({
            where: { id: id },
        });
        if (!video) {
            console.log(`Không tìm thấy video có ID = ${id}`);
            return null;
        }
        console.log(`Lấy video có id = ${id} thành công`);
        return video;
    }
    async update(id, updateVideoDto) {
        const video = await this.prisma.playlist.findUnique({
            where: { id: id },
        });
        if (!video) {
            console.log(`Không tìm thấy video có ID = ${id}`);
            throw new common_1.NotFoundException(`Không tìm thấy video có ID = ${id}`);
        }
        const updatedVideo = await this.prisma.playlist.update({
            where: { id: id },
            data: updateVideoDto,
        });
        console.log(`Cập nhật video có id = ${id} thành công`);
        return updatedVideo;
    }
    async remove(id) {
        const video = await this.prisma.playlist.findUnique({
            where: { id: id },
        });
        if (!video) {
            console.log(`Không tìm thấy video có ID = ${id}`);
            throw new common_1.NotFoundException(`Không tìm thấy video có ID = ${id}`);
        }
        await this.prisma.playlist.delete({
            where: { id: id },
        });
        console.log(`Xóa video có id = ${id} thành công`);
        return `Video có ID ${id} đã được xóa thành công`;
    }
    async incrementViews(id) {
        const video = await this.prisma.playlist.findUnique({
            where: { id: id },
        });
        if (!video) {
            console.log(`Không tìm thấy video có ID = ${id}`);
            return null;
        }
        const updatedVideo = await this.prisma.playlist.update({
            where: { id: id },
            data: {
                watched: String(Number(video.watched) + 1),
            },
        });
        console.log('Tăng views thành công video có id =', id);
        return {
            ...updatedVideo,
            id: updatedVideo.id,
            avtUser: updatedVideo.avtUser || '',
            src: updatedVideo.src ?? '',
            name: updatedVideo.name ?? '',
            author: updatedVideo.author ?? '',
            watched: updatedVideo.watched ?? '',
            date: updatedVideo.date ?? '',
        };
    }
};
exports.PlaylistService = PlaylistService;
exports.PlaylistService = PlaylistService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PlaylistService);
//# sourceMappingURL=playlist.service.js.map