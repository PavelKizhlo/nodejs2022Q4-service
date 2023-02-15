import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null; // refers to Artist

  @Column({ type: 'uuid', nullable: true })
  albumId: string | null; // refers to Album

  @Column()
  duration: number; // integer number
}
