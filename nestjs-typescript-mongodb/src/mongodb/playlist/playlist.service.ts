import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from './entities/playlist.entity';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class PlaylistService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Playlist[]> {
    return this.prisma.playlist.findMany();
  }

  async create(createVideoDto: CreatePlaylistDto): Promise<string> {
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

  async findOneVideo(id: string): Promise<Playlist | null> {
    const video = await this.prisma.playlist.findFirst({
      where: { id },
    });
    if (!video) {
      console.log(`Không tìm thấy video có ID = ${id}`);
    } else {
      console.log(`Lấy video có id = ${id} thành công`);
    }
    return video;
  }

  async update(id: string, updateVideoDto: UpdatePlaylistDto): Promise<string> {
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

  async remove(id: string): Promise<string> {
    const vid = await this.findOneVideo(id);
    if (!vid) {
      console.log(`Không tìm thấy video có ID = ${id}`);
      throw new NotFoundException(`Không tìm thấy video có ID = ${id}`);
    }
    await this.prisma.playlist.delete({
      where: { id },
    });
    console.log(`Xóa video có id = ${id} thành công`);
    return `Video có ID ${id} đã được xóa thành công`;
  }

  async incrementViews(id: string): Promise<Playlist | null> {
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
}
