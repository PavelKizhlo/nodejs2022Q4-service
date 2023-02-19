import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album) private albumRepository: Repository<Album>,
  ) {}

  async getAllAlbums() {
    return await this.albumRepository.find();
  }

  async getAlbumById(id: string) {
    const album = await this.albumRepository.findOne({
      where: { id },
    });
    if (!album) {
      throw new NotFoundException('No albums with such id');
    }
    return album;
  }

  async createAlbum(createAlbumDto: CreateAlbumDto) {
    const newAlbum = this.albumRepository.create(createAlbumDto);
    await this.albumRepository.save(newAlbum);
    return newAlbum;
  }

  async updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albumToUpdate = await this.albumRepository.findOne({
      where: { id },
    });
    if (!albumToUpdate) {
      throw new NotFoundException('No albums with such id');
    }
    const updatedAlbum = { ...albumToUpdate, ...updateAlbumDto };
    await this.albumRepository.save(updatedAlbum);
    return updatedAlbum;
  }

  async removeAlbum(id: string) {
    const albumToRemove = await this.albumRepository.findOne({
      where: { id },
    });
    if (!albumToRemove) {
      throw new NotFoundException('No albums with such id');
    }
    await this.albumRepository.remove(albumToRemove);
  }
}
