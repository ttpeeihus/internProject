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
    async findAll() {
        return this.prisma.playlist.findMany();
    }
    async create(createVideoDto) {
        const playlist = await this.prisma.playlist.create({
            data: {
                avtUser: createVideoDto.avtUser,
                src: createVideoDto.src,
                name: createVideoDto.name,
                author: createVideoDto.author,
                watched: createVideoDto.watched,
                date: createVideoDto.date,
            },
        });
        console.log(`Tạo playlist thành công: ${playlist}`);
        return 'Tạo video thành công';
    }
    async findOneVideo(id) {
        const video = await this.prisma.playlist.findUnique({
            where: { id },
        });
        if (!video) {
            console.log(`Không tìm thấy video có ID = ${id}`);
        }
        else {
            console.log(`Lấy video có id = ${id} thành công`);
        }
        return video;
    }
    async update(id, updateVideoDto) {
        const vid = await this.findOneVideo(id);
        if (!vid) {
            console.log(`Không tìm thấy video có ID = ${id}`);
            return 'Không tìm thấy video';
        }
        await this.prisma.playlist.update({
            where: { id },
            data: {
                ...(updateVideoDto.avtUser !== undefined && { avtUser: updateVideoDto.avtUser }),
                ...(updateVideoDto.src !== undefined && { src: updateVideoDto.src }),
                ...(updateVideoDto.name !== undefined && { name: updateVideoDto.name }),
                ...(updateVideoDto.author !== undefined && { author: updateVideoDto.author }),
                ...(updateVideoDto.watched !== undefined && { watched: updateVideoDto.watched }),
            },
        });
        console.log(`Cập nhật video có id = ${id} thành công`);
        return 'Video đã được cập nhật thành công';
    }
    async remove(id) {
        const vid = await this.findOneVideo(id);
        if (!vid) {
            console.log(`Không tìm thấy video có ID = ${id}`);
            throw new common_1.NotFoundException(`Không tìm thấy video có ID = ${id}`);
        }
        await this.prisma.playlist.delete({
            where: { id },
        });
        console.log(`Xóa video có id = ${id} thành công`);
        return `Video có ID ${id} đã được xóa thành công`;
    }
    async incrementViews(id) {
        const video = await this.findOneVideo(id);
        if (video) {
            const newViews = Number(video.watched) + 1;
            await this.prisma.playlist.update({
                where: { id },
                data: {
                    watched: newViews.toString(),
                },
            });
            console.log(`Tăng views thành công video có id = ${id}`);
        }
        return video;
    }
};
exports.PlaylistService = PlaylistService;
exports.PlaylistService = PlaylistService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PlaylistService);
//# sourceMappingURL=playlist.service.js.map