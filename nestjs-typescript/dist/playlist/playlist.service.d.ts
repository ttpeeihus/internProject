import { Repository } from 'typeorm';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from './entities/playlist.entity';
export declare class PlaylistService {
    private videoRepository;
    constructor(videoRepository: Repository<Playlist>);
    create(_createPlaylistDto: CreatePlaylistDto): Promise<Playlist>;
    findAll(): Promise<Playlist[]>;
    findOneVideo(id: number): Promise<Playlist | null> | null;
    update(id: number, updateVideoDto: UpdatePlaylistDto): Promise<"Video has been successfully updated" | null>;
    remove(id: number): Promise<string>;
    incrementViews(id: number): Promise<Playlist | null>;
}
