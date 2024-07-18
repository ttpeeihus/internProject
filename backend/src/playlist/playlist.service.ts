import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from './entities/playlist.entity';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class PlaylistService {

  constructor(@InjectRepository(Playlist) private videoRepository: Repository<Playlist>){}

  create(_createPlaylistDto: CreatePlaylistDto) {
    const newVideo = this.videoRepository.create({ ..._createPlaylistDto })
    console.log(newVideo);
    return this.videoRepository.save(newVideo);
  }

  findAll() {
    return this.videoRepository.find();
  }

  findOneVideo(id: number) {
    const options: FindOneOptions<Playlist> = {
        where: {
            id: id,
        },
    };
    return this.videoRepository.findOne(options);
  }

  async update(id: number, updateVideoDto: UpdatePlaylistDto) {
    const vid = await this.findOneVideo(id);

    if (!vid) {
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
    return vid;
  }

  async remove(id: number) {
    const vid = await this.findOneVideo(id);

    if (!vid) {
        throw new NotFoundException(`Video with ID ${id} not found`);
    }

    await this.videoRepository.delete(id);
    return `Video with ID ${id} has been successfully deleted`;
  }
}
