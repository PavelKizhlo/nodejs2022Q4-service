import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Database } from '../database/database';
import { NoRequiredEntity } from '../database/errors/noRequireEntity.error';
import { FavoritesResponse } from './interfaces/favorites-response.interface';

@Injectable()
export class FavoritesService {
  constructor(private db: Database) {}

  getAllFavs(): FavoritesResponse {
    const favorites = this.db.favs.getAll();
    return {
      artists: this.db.artists.getByIdsArray(favorites.artists),
      albums: this.db.albums.getByIdsArray(favorites.albums),
      tracks: this.db.tracks.getByIdsArray(favorites.tracks),
    };
  }

  addTrack(id: string) {
    const track = this.db.tracks.getById(id);
    if (!track) {
      throw new UnprocessableEntityException("This track doesn't exist");
    }
    this.db.favs.addEntity('tracks', id);
  }

  removeTrack(id: string) {
    try {
      this.db.favs.removeEntity('tracks', id);
    } catch (err) {
      throw err instanceof NoRequiredEntity
        ? new NotFoundException('No tracks with such id in favorites')
        : err;
    }
  }

  addAlbum(id: string) {
    const album = this.db.albums.getById(id);
    if (!album) {
      throw new UnprocessableEntityException("This album doesn't exist");
    }
    this.db.favs.addEntity('albums', id);
  }

  removeAlbum(id: string) {
    try {
      this.db.favs.removeEntity('albums', id);
    } catch (err) {
      throw err instanceof NoRequiredEntity
        ? new NotFoundException('No albums with such id in favorites')
        : err;
    }
  }

  addArtist(id: string) {
    const artist = this.db.artists.getById(id);
    if (!artist) {
      throw new UnprocessableEntityException("This artist doesn't exist");
    }
    this.db.favs.addEntity('artists', id);
  }

  removeArtist(id: string) {
    try {
      this.db.favs.removeEntity('artists', id);
    } catch (err) {
      throw err instanceof NoRequiredEntity
        ? new NotFoundException('No artists with such id in favorites')
        : err;
    }
  }
}
