import { Injectable } from '@nestjs/common';
import { DbUsers } from './entities/db.users';
import { DbArtists } from './entities/db.artists';
import { DbTracks } from './entities/db.tracks';
import { DbAlbums } from './entities/db.albums';
import { DbFavorites } from './entities/db.favorites';

@Injectable()
export class Database {
  public users: DbUsers;
  public artists: DbArtists;
  public tracks: DbTracks;
  public albums: DbAlbums;
  public favs: DbFavorites;
  constructor() {
    this.users = new DbUsers();
    this.artists = new DbArtists();
    this.tracks = new DbTracks();
    this.albums = new DbAlbums();
    this.favs = new DbFavorites();
  }
}
