import { Injectable, NotFoundException } from '@nestjs/common';
import { Database } from '../database/database';
import { NoRequiredEntity } from '../database/errors/noRequireEntity.error';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()
export class TrackService {
  constructor(private db: Database) {}

  getAllTracks() {
    return this.db.tracks.getAll();
  }

  getTrackById(id: string) {
    return this.db.tracks.getById(id);
  }

  createTrack(createTrackDto: CreateTrackDto) {
    return this.db.tracks.create(createTrackDto);
  }

  updateTrack(id: string, updateTrackDto: CreateTrackDto) {
    try {
      return this.db.tracks.update(id, updateTrackDto);
    } catch (err) {
      throw err instanceof NoRequiredEntity
        ? new NotFoundException('No tracks with such id')
        : err;
    }
  }

  removeTrack(id: string) {
    try {
      this.db.tracks.remove(id);
    } catch (err) {
      throw err instanceof NoRequiredEntity
        ? new NotFoundException('No tracks with such id')
        : err;
    }
  }
}
