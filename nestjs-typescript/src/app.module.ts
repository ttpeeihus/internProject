import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PlaylistModule } from './playlist/playlist.module';
import { databaseConfig } from './config/database.config';
import { RolesGuard } from './auth/guards/roles.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(databaseConfig),
    UsersModule,
    PlaylistModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [RolesGuard, AppService, JwtService],
  
})
export class AppModule {}