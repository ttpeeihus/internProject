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
    console.log(this.videoRepository.find());
    return this.videoRepository.find();
  }

  findOneVideo(id: number) {
    const options: FindOneOptions<Playlist> = {
        where: {
            id: id,
        },
    };
    console.log(this.videoRepository.findOne(options));
    return this.videoRepository.findOne(options);
  }

  async update(id: number, updateVideoDto: UpdatePlaylistDto) {
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

  async remove(id: number) {
    const vid = await this.findOneVideo(id);

    if (!vid) {
      console.log(`Video with ID ${id} not found`);
        throw new NotFoundException(`Video with ID ${id} not found`);
    }

    await this.videoRepository.delete(id);
    console.log(`delete ${vid}`);
    return `Video with ID ${id} has been successfully deleted`;
  }
}
