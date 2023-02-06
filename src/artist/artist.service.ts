import { Injectable, NotFoundException } from '@nestjs/common';
import { Database } from '../database/database';
import { NoRequiredEntity } from '../database/errors/noRequireEntity.error';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private db: Database) {}

  getAllArtists() {
    return this.db.artists.getAll();
  }

  getArtistById(id: string) {
    return this.db.artists.getById(id);
  }

  createArtist(createArtistDto: CreateArtistDto) {
    return this.db.artists.create(createArtistDto);
  }

  updateArtist(id: string, updateArtistDto: CreateArtistDto) {
    try {
      return this.db.artists.update(id, updateArtistDto);
    } catch (err) {
      throw err instanceof NoRequiredEntity
        ? new NotFoundException('No artists with such id')
        : err;
    }
  }

  removeArtist(id: string) {
    try {
      this.db.artists.remove(id);
      const artistTracks = this.db.tracks.getTracksByEntityId(id, 'artistId');
      const artistAlbums = this.db.albums.getAlbumsByArtistId(id);
      artistTracks.forEach((track) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...trackDto } = track;
        trackDto.artistId = null;
        this.db.tracks.update(track.id, trackDto);
      });
      artistAlbums.forEach((album) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...albumDto } = album;
        albumDto.artistId = null;
        this.db.albums.update(album.id, albumDto);
      });
    } catch (err) {
      throw err instanceof NoRequiredEntity
        ? new NotFoundException('No artists with such id')
        : err;
    }
  }
}
