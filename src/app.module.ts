import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';
import { dataSourceOptions } from './dataSource';
import { LoggingModule } from './logging/logging.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    LoggingModule,
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoritesModule,
    AuthModule,
    ConfigModule.forRoot({ envFilePath: './.env', isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
  ],
})
export class AppModule {}
