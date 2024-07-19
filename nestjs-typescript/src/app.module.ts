import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './playlist/entities/playlist.entity';
import { Users } from './users/entities/user.entity';
import { PlaylistModule } from './playlist/playlist.module';
// import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'phuoctt',
      password: 'phuoctt',
      database: 'youtube',
      entities: [Users ,Playlist],
      // synchronize: true,
    }),
    UsersModule,
    PlaylistModule,
    // AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}