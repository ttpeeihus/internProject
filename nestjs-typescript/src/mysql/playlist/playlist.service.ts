import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from './entities/playlist.entity';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class PlaylistService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPlaylistDto: CreatePlaylistDto) {
    const newVideo = await this.prisma.playlist.create({
      data: createPlaylistDto,
    });
    console.log('Tạo video thành công:', newVideo);
    return newVideo;
  }

  async findAll() {
    return this.prisma.playlist.findMany();
  }

  async findOneVideo(id: number) {
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

  async update(id: number, updateVideoDto: UpdatePlaylistDto) {
    const video = await this.prisma.playlist.findUnique({
      where: { id: id },
    });

    if (!video) {
      console.log(`Không tìm thấy video có ID = ${id}`);
      throw new NotFoundException(`Không tìm thấy video có ID = ${id}`);
    }

    const updatedVideo = await this.prisma.playlist.update({
      where: { id: id },
      data: updateVideoDto,
    });

    console.log(`Cập nhật video có id = ${id} thành công`);
    return updatedVideo;
  }

  async remove(id: number) {
    const video = await this.prisma.playlist.findUnique({
      where: { id: id },
    });

    if (!video) {
      console.log(`Không tìm thấy video có ID = ${id}`);
      throw new NotFoundException(`Không tìm thấy video có ID = ${id}`);
    }

    await this.prisma.playlist.delete({
      where: { id: id },
    });

    console.log(`Xóa video có id = ${id} thành công`);
    return `Video có ID ${id} đã được xóa thành công`;
  }

  async incrementViews(id: number): Promise<Playlist | null> {
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
      avtUser: updatedVideo.avtUser || '', // Ensure avtUser is always a string
      src: updatedVideo.src ?? '', // Ensure src is always a string
      name: updatedVideo.name ?? '', // Ensure name is always a string
      author: updatedVideo.author ?? '', // Ensure author is always a string
      watched: updatedVideo.watched ?? '', // Ensure watched is always a string
      date: updatedVideo.date ?? '', // Ensure date is always a string
    };
  }
}
