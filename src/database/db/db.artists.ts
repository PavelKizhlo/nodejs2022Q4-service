import { DbEntity } from './db.entity';
import { Artist } from '../../artist/entities/artist.entity';
import { CreateArtistDto } from '../../artist/dto/create-artist.dto';
import { artists } from '../data.placeholder';

export class DbArtists extends DbEntity<
  Artist,
  CreateArtistDto,
  CreateArtistDto
> {
  entities = artists;
}
