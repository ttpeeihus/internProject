import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
export declare class PlaylistController {
    private readonly playlistService;
    constructor(playlistService: PlaylistService);
    create(createPlaylistDto: CreatePlaylistDto): Promise<import("./entities/playlist.entity").Playlist>;
    findAll(): Promise<import("./entities/playlist.entity").Playlist[]>;
    findOne(id: string): Promise<import("./entities/playlist.entity").Playlist | null>;
    update(id: string, updatePlaylistDto: UpdatePlaylistDto): Promise<"Video has been successfully updated" | null>;
    remove(id: string): Promise<string>;
}
