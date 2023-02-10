import { Favorites } from '../../favorites/entities/favorites.entity';
import { NoRequiredEntity } from '../errors/noRequireEntity.error';

type EntityType = 'artists' | 'albums' | 'tracks';

export class DbFavorites {
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  getAll() {
    return this.favorites;
  }

  addEntity(type: EntityType, id: string) {
    this.favorites[type].push(id);
  }

  removeEntity(type: EntityType, id: string) {
    const idx = this.favorites[type].findIndex((entityId) => entityId === id);
    if (idx === -1) throw new NoRequiredEntity('removing');
    this.favorites[type].splice(idx, 1);
  }
}
