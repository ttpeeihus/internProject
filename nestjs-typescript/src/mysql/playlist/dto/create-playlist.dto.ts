import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaylistDto {
  @ApiProperty({
    description: 'The avatar URL of the user',
    example: 'https://example.com/avatar.jpg',
  })
  avtUser: string;

  @ApiProperty({
    description: 'The source URL of the playlist',
    example: 'https://example.com/playlist.mp3',
  })
  src: string;

  @ApiProperty({
    description: 'The name of the playlist',
    example: 'My Favorite Playlist',
  })
  name: string;

  @ApiProperty({
    description: 'The author of the playlist',
    example: 'John Doe',
  })
  author: string;

  @ApiProperty({
    description: 'The number of times the playlist has been watched',
    example: '1000',
  })
  watched: string;

  @ApiProperty({
    description: 'The creation date of the playlist',
    example: '2024-07-31T12:00:00Z',
  })
  date: string;
}
