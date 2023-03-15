import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from '../../artist/entities/artist.entity';
import { Album } from '../../album/entities/album.entity';
import { Track } from '../../track/entities/track.entity';

@Entity()
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;

  @Column({ type: 'uuid', nullable: true })
  albumId: string | null;

  @Column({ type: 'uuid', nullable: true })
  trackId: string | null;

  @OneToOne(() => Artist, { cascade: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId' })
  artist: Artist | null;

  @OneToOne(() => Album, { cascade: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'albumId' })
  album: Album | null;

  @OneToOne(() => Track, { cascade: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'trackId' })
  track: Track | null;
}
