import { DbEntity } from './db.entity';
import { Track } from '../../track/interfaces/track.interface';
import { CreateTrackDto } from '../../track/dto/create-track.dto';
import { tracks } from '../data.placeholder';

export class DbTracks extends DbEntity<Track, CreateTrackDto, CreateTrackDto> {
  protected entities = tracks;

  getTracksByEntityId(entityId: string, prop: 'artistId' | 'albumId'): Track[] {
    return this.entities.filter((track) => track[prop] === entityId);
  }
}