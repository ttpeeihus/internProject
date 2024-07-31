import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PlaylistModule } from './mongodb/playlist/playlist.module';
import { UsersModule } from './mongodb/users/users.module';
import { RolesGuard } from './auth/guards/roles.guard';
import { PrismaModule } from './config/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.mongodb.env'],
      isGlobal: true, 
    }),
    PrismaModule,
    UsersModule,
    PlaylistModule,
    AuthModule,
  ],
  // controllers: [AppController],
  providers: [RolesGuard, AppService, JwtService],
  
})
export class AppModule {}