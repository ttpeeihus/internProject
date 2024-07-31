import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('playlist')
@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new playlist' })
  @ApiResponse({ status: 201, description: 'The playlist has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistService.create(createPlaylistDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all playlists' })
  @ApiResponse({ status: 200, description: 'Returns all playlists.' })
  findAll() {
    return this.playlistService.findAll();
  }

  @Post(':id/views')
  @ApiOperation({ summary: 'Increment the view count of a playlist' })
  @ApiParam({ name: 'id', description: 'The ID of the playlist', type: Number })
  @ApiResponse({ status: 200, description: 'The view count has been incremented.' })
  @ApiResponse({ status: 404, description: 'Playlist not found.' })
  incrementViews(@Param('id') id: string) {
    return this.playlistService.incrementViews(+id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific playlist by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the playlist', type: Number })
  @ApiResponse({ status: 200, description: 'Returns the playlist with the given ID.' })
  @ApiResponse({ status: 404, description: 'Playlist not found.' })
  findOne(@Param('id') id: string) {
    return this.playlistService.findOneVideo(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Update a playlist' })
  @ApiParam({ name: 'id', description: 'The ID of the playlist', type: Number })
  @ApiResponse({ status: 200, description: 'The playlist has been successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Playlist not found.' })
  update(@Param('id') id: string, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    return this.playlistService.update(+id, updatePlaylistDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a playlist' })
  @ApiParam({ name: 'id', description: 'The ID of the playlist', type: Number })
  @ApiResponse({ status: 200, description: 'The playlist has been successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Playlist not found.' })
  remove(@Param('id') id: string) {
    return this.playlistService.remove(+id);
  }
}
