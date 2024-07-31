import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaylistDto } from './create-playlist.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePlaylistDto extends PartialType(CreatePlaylistDto) {
  @ApiPropertyOptional({
    description: 'The avatar URL of the user',
    example: 'https://example.com/new-avatar.jpg',
  })
  avtUser?: string;

  @ApiPropertyOptional({
    description: 'The source URL of the playlist',
    example: 'https://example.com/new-playlist.mp3',
  })
  src?: string;

  @ApiPropertyOptional({
    description: 'The name of the playlist',
    example: 'Updated Playlist Name',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'The author of the playlist',
    example: 'Jane Doe',
  })
  author?: string;

  @ApiPropertyOptional({
    description: 'The number of times the playlist has been watched',
    example: '2000',
  })
  watched?: string;

  @ApiPropertyOptional({
    description: 'The creation date of the playlist',
    example: '2024-08-01T12:00:00Z',
  })
  date?: string;
}
