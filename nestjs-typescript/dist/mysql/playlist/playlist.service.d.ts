import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from './entities/playlist.entity';
import { PrismaService } from 'src/config/prisma/prisma.service';
export declare class PlaylistService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    findOneVideo(id: number): Promise<{
        id: number;
        avtUser: string | null;
        src: string | null;
        name: string | null;
        author: string | null;
        watched: string | null;
        date: string | null;
    } | null>;
    update(id: number, updateVideoDto: UpdatePlaylistDto): Promise<{
        id: number;
        avtUser: string | null;
        src: string | null;
        name: string | null;
        author: string | null;
        watched: string | null;
        date: string | null;
    }>;
    remove(id: number): Promise<string>;
    incrementViews(id: number): Promise<Playlist | null>;
}
