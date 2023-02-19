import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
  ) {}

  async getAllArtists() {
    return await this.artistRepository.find();
  }

  async getArtistById(id: string) {
    const artist = await this.artistRepository.findOne({
      where: { id },
    });
    if (!artist) {
      throw new NotFoundException('No artists with such id');
    }
    return artist;
  }

  async createArtist(createArtistDto: CreateArtistDto) {
    const newArtist = this.artistRepository.create(createArtistDto);
    await this.artistRepository.save(newArtist);
    return newArtist;
  }

  async updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    const artistToUpdate = await this.artistRepository.findOne({
      where: { id },
    });
    if (!artistToUpdate) {
      throw new NotFoundException('No artists with such id');
    }
    const updatedArtist = { ...artistToUpdate, ...updateArtistDto };
    await this.artistRepository.save(updatedArtist);
    return updatedArtist;
  }

  async removeArtist(id: string) {
    const artistToRemove = await this.artistRepository.findOne({
      where: { id },
    });
    if (!artistToRemove) {
      throw new NotFoundException('No artists with such id');
    }
    await this.artistRepository.remove(artistToRemove);
  }
}
