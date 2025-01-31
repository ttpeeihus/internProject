import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
export declare class PlaylistController {
    private readonly playlistService;
    constructor(playlistService: PlaylistService);
    create(createPlaylistDto: CreatePlaylistDto): Promise<string>;
    findAll(): Promise<import("./entities/playlist.entity").Playlist[]>;
    incrementViews(id: string): Promise<import("./entities/playlist.entity").Playlist | null>;
    findOne(id: string): Promise<import("./entities/playlist.entity").Playlist | null>;
    update(id: string, updatePlaylistDto: UpdatePlaylistDto): Promise<string>;
    remove(id: string): Promise<string>;
}
