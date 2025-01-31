import { CreatePlaylistDto } from './create-playlist.dto';
declare const UpdatePlaylistDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreatePlaylistDto>>;
export declare class UpdatePlaylistDto extends UpdatePlaylistDto_base {
    avtUser?: string;
    src?: string;
    name?: string;
    author?: string;
    watched?: string;
    date?: string;
}
export {};
