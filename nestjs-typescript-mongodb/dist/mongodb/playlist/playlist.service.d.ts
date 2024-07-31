import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from './entities/playlist.entity';
import { PrismaService } from 'src/config/prisma/prisma.service';
export declare class PlaylistService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Playlist[]>;
    create(createVideoDto: CreatePlaylistDto): Promise<string>;
    findOneVideo(id: string): Promise<Playlist | null>;
    update(id: string, updateVideoDto: UpdatePlaylistDto): Promise<string>;
    remove(id: string): Promise<string>;
    incrementViews(id: string): Promise<Playlist | null>;
}
