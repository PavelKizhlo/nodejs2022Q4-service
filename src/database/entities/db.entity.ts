import { v4 as uuidv4 } from 'uuid';
import { NoRequiredEntity } from '../errors/noRequireEntity.error';

export abstract class DbEntity<
  Entity extends { id: string },
  ChangeDto,
  CreateDto,
> {
  protected entities: Entity[];

  create(createDto: CreateDto): Entity {
    const created = {
      ...createDto,
      id: uuidv4(),
    } as unknown as Entity;
    this.entities.push(created);
    return created;
  }

  getById(id: string): Entity | null {
    const entity = this.entities.find((entity) => entity.id === id);
    return entity ?? null;
  }

  getAll(): Entity[] {
    return this.entities;
  }

  remove(id: string): void {
    const idx = this.entities.findIndex((entity) => entity.id === id);
    if (idx === -1) throw new NoRequiredEntity('removing');
    this.entities.splice(idx, 1);
  }

  update(id: string, changeDto: ChangeDto): Entity {
    const idx = this.entities.findIndex((entity) => entity.id === id);
    if (idx === -1) throw new NoRequiredEntity('updating');
    const updated = { ...this.entities[idx], ...changeDto };
    this.entities.splice(idx, 1, updated);
    return updated;
  }
}
