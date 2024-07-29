import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from './entities/playlist.entity';

@Injectable()
export class PlaylistService {

  constructor(@InjectRepository(Playlist) private videoRepository: Repository<Playlist>){}

  create(_createPlaylistDto: CreatePlaylistDto) {
    const newVideo = this.videoRepository.create({ ..._createPlaylistDto })
    console.log("Tạo video thành công " + newVideo);
    return this.videoRepository.save(newVideo);
  }

  findAll() {
    return this.videoRepository.find();
  }

  findOneVideo(id: number) {
    let vid = this.videoRepository.findOne({where: {id: id}});
    if (!vid) {
      console.log(`Không tìm thấy video có ID = ${id}`);
      return null;
    }
    console.log(`Lấy video có id = ${id} thành công`);
    return vid;
  }

  async update(id: number, updateVideoDto: UpdatePlaylistDto) {
    const vid = await this.findOneVideo(id);

    if (!vid) {
      console.log(`Không tìm thấy video có ID = ${id}`);
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
    console.log(`Cập nhật video có id = ${id} thành công`);
    return 'Video has been successfully updated';
  }

  async remove(id: number) {
    const vid = await this.findOneVideo(id);

    if (!vid) {
      console.log(`Không tìm thấy video có ID = ${id}`);
        throw new NotFoundException(`Không tìm thấy video có ID = ${id}`);
    }

    await this.videoRepository.delete(id);
    console.log(`Xóa video có id = ${id} thành công`);
    return `Video with ID ${id} has been successfully deleted`;
  }

  async incrementViews(id: number): Promise<Playlist | null> {
    const video = await this.findOneVideo(id);
    if (video) {
      video.watched = String(Number(video.watched) + 1);
      console.log("Tăng views thành công video có id = "+ id);
      await this.videoRepository.save(video);
    }
    return video;
  }
}
