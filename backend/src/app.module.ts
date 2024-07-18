// import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
// import { PlaylistModule } from './playlist/playlist.module';
// import { CatsModule } from './cats/cats.module';
// import { SignupModule } from './signup/signup.module';
// import { SigninModule } from './signin/signin.module';
// import { SignoutModule } from './signout/signout.module';

// @Module({
//   imports: [ UsersModule, PlaylistModule, CatsModule, SignupModule, SigninModule, SignoutModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './playlist/entities/playlist.entity';
import { Users } from './users/entities/user.entity';
import { PlaylistModule } from './playlist/playlist.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}