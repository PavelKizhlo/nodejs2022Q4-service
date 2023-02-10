import { Injectable } from '@nestjs/common';
import { DbUsers } from './db/db.users';
import { DbArtists } from './db/db.artists';
import { DbTracks } from './db/db.tracks';
import { DbAlbums } from './db/db.albums';
import { DbFavorites } from './db/db.favorites';

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
