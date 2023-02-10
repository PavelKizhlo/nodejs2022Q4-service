import { DbEntity } from './db.entity';
import { Album } from '../../album/entities/album.entity';
import { CreateAlbumDto } from '../../album/dto/create-album.dto';
import { albums } from '../data.placeholder';

export class DbAlbums extends DbEntity<Album, CreateAlbumDto, CreateAlbumDto> {
  entities = albums;

  getAlbumsByArtistId(artistId: string): Album[] {
    return this.entities.filter((album) => album.artistId === artistId);
  }
}
