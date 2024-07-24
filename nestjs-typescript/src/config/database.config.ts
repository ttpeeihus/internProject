import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Playlist } from '../playlist/entities/playlist.entity';
import { Users } from '../users/entities/user.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'phuoctt',
  password: 'phuoctt',
  database: 'youtube',
  entities: [Users ,Playlist],
};
