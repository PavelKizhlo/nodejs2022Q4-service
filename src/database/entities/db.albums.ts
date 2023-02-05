import { DbEntity } from './db.entity';
import { Album } from '../../album/interfaces/album.interface';
import { CreateAlbumDto } from '../../album/dto/create-album.dto';
import { albums } from '../data.placeholder';

export class DbAlbums extends DbEntity<Album, CreateAlbumDto, CreateAlbumDto> {
  entities = albums;
}
