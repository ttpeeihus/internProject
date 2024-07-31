import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
export declare class PlaylistController {
    private readonly playlistService;
    constructor(playlistService: PlaylistService);
    create(createPlaylistDto: CreatePlaylistDto): Promise<{
        id: number;
        avtUser: string | null;
        src: string | null;
        name: string | null;
        author: string | null;
        watched: string | null;
        date: string | null;
    }>;
    findAll(): Promise<{
        id: number;
        avtUser: string | null;
        src: string | null;
        name: string | null;
        author: string | null;
        watched: string | null;
        date: string | null;
    }[]>;
    incrementViews(id: string): Promise<import("./entities/playlist.entity").Playlist | null>;
    findOne(id: string): Promise<{
        id: number;
        avtUser: string | null;
        src: string | null;
        name: string | null;
        author: string | null;
        watched: string | null;
        date: string | null;
    } | null>;
    update(id: string, updatePlaylistDto: UpdatePlaylistDto): Promise<{
        id: number;
        avtUser: string | null;
        src: string | null;
        name: string | null;
        author: string | null;
        watched: string | null;
        date: string | null;
    }>;
    remove(id: string): Promise<string>;
}
