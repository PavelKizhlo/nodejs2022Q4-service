import { Injectable, NotFoundException } from '@nestjs/common';
import { Database } from '../database/database';
import { NoRequiredEntity } from '../database/errors/noRequireEntity.error';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumService {
  constructor(private db: Database) {}

  getAllAlbums() {
    return this.db.albums.getAll();
  }

  getAlbumById(id: string) {
    return this.db.albums.getById(id);
  }

  createAlbum(createAlbumDto: CreateAlbumDto) {
    return this.db.albums.create(createAlbumDto);
  }

  updateAlbum(id: string, updateAlbumDto: CreateAlbumDto) {
    try {
      return this.db.albums.update(id, updateAlbumDto);
    } catch (err) {
      throw err instanceof NoRequiredEntity
        ? new NotFoundException('No albums with such id')
        : err;
    }
  }

  removeAlbum(id: string) {
    try {
      this.db.albums.remove(id);
      const tracksInAlbum = this.db.tracks.getTracksByEntityId(id, 'albumId');
      tracksInAlbum.forEach((track) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...trackDto } = track;
        trackDto.albumId = null;
        this.db.tracks.update(track.id, trackDto);
      });
    } catch (err) {
      throw err instanceof NoRequiredEntity
        ? new NotFoundException('No albums with such id')
        : err;
    }
  }
}
