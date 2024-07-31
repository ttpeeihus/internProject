import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';

@ApiTags('playlist')  // Tag cho nhóm các endpoint của playlist
@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  @ApiBearerAuth()  // Đánh dấu yêu cầu xác thực Bearer Token
  @ApiOperation({ summary: 'Create a new playlist' })
  @ApiResponse({ status: 201, description: 'The playlist has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreatePlaylistDto })  // Đưa vào thông tin body của request
  @UseGuards(JwtAuthGuard)
  create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistService.create(createPlaylistDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all playlists' })
  @ApiResponse({ status: 200, description: 'List of all playlists.' })
  findAll() {
    return this.playlistService.findAll();
  }

  @Post(':id/views')
  @ApiOperation({ summary: 'Increment views of a playlist by ID' })
  @ApiResponse({ status: 200, description: 'Views incremented successfully.' })
  @ApiResponse({ status: 404, description: 'Playlist not found.' })
  incrementViews(@Param('id') id: string) {
    return this.playlistService.incrementViews(id.toString());
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a playlist by ID' })
  @ApiResponse({ status: 200, description: 'Playlist details.' })
  @ApiResponse({ status: 404, description: 'Playlist not found.' })
  findOne(@Param('id') id: string) {
    return this.playlistService.findOneVideo(id.toString());
  }

  @Patch(':id')
  @ApiBearerAuth()  // Đánh dấu yêu cầu xác thực Bearer Token
  @ApiOperation({ summary: 'Update a playlist by ID' })
  @ApiResponse({ status: 200, description: 'Playlist updated successfully.' })
  @ApiResponse({ status: 404, description: 'Playlist not found.' })
  @ApiBody({ type: UpdatePlaylistDto })  // Đưa vào thông tin body của request
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  update(@Param('id') id: string, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    return this.playlistService.update(id.toString(), updatePlaylistDto);
  }

  @Delete(':id')
  @ApiBearerAuth()  // Đánh dấu yêu cầu xác thực Bearer Token
  @ApiOperation({ summary: 'Delete a playlist by ID' })
  @ApiResponse({ status: 200, description: 'Playlist removed successfully.' })
  @ApiResponse({ status: 404, description: 'Playlist not found.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.playlistService.remove(id.toString());
  }
}
