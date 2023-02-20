import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorites } from './entities/favorites.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private favoritesRepository: Repository<Favorites>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async getAllFavs() {
    const [artists, albums, tracks] = await Promise.all([
      this.favoritesRepository
        .find({
          select: { artistId: true },
          relations: { artist: true },
        })
        .then((favs) => favs.map((fav) => fav.artist)),
      this.favoritesRepository
        .find({
          select: { albumId: true },
          relations: { album: true },
        })
        .then((favs) => favs.map((fav) => fav.album)),
      this.favoritesRepository
        .find({
          select: { trackId: true },
          relations: { track: true },
        })
        .then((favs) => favs.map((fav) => fav.track)),
    ]);

    return { artists, albums, tracks };
  }

  async addFavorite(entityType: 'artist' | 'album' | 'track', id: string) {
    const favorite = new Favorites();

    switch (entityType) {
      case 'artist':
        const artist = await this.artistRepository.findOneBy({ id });
        if (!artist) {
          throw new UnprocessableEntityException('No artists with such id');
        }
        favorite.artist = artist;
        break;
      case 'album':
        const album = await this.albumRepository.findOneBy({ id });
        if (!album) {
          throw new UnprocessableEntityException('No albums with such id');
        }
        favorite.album = album;
        break;
      case 'track':
        const track = await this.trackRepository.findOneBy({ id });
        if (!track) {
          throw new UnprocessableEntityException('No tracks with such id');
        }
        favorite.track = track;
        break;
      default:
        throw new UnprocessableEntityException('Invalid entity type');
    }

    await this.favoritesRepository.save(favorite);
  }

  async removeFavorite(entityType: 'artist' | 'album' | 'track', id: string) {
    const favorite = await this.favoritesRepository.findOneBy({
      [entityType]: { id },
    });
    if (!favorite) {
      throw new UnprocessableEntityException('Invalid entity type or id');
    }
    await this.favoritesRepository.remove(favorite);
  }
}
