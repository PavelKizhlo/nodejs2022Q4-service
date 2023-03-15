import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track) private trackRepository: Repository<Track>,
  ) {}

  async getAllTracks() {
    return await this.trackRepository.find();
  }

  async getTrackById(id: string) {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundException('No tracks with such id');
    }
    return track;
  }

  async createTrack(createTrackDto: CreateTrackDto) {
    const newTrack = this.trackRepository.create(createTrackDto);
    await this.trackRepository.save(newTrack);
    return newTrack;
  }

  async updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    const trackToUpdate = await this.trackRepository.findOneBy({ id });
    if (!trackToUpdate) {
      throw new NotFoundException('No tracks with such id');
    }
    const updatedTrack = { ...trackToUpdate, ...updateTrackDto };
    await this.trackRepository.save(updatedTrack);
    return updatedTrack;
  }

  async removeTrack(id: string) {
    const trackToRemove = await this.trackRepository.findOneBy({ id });
    if (!trackToRemove) {
      throw new NotFoundException('No tracks with such id');
    }
    await this.trackRepository.remove(trackToRemove);
  }
}
