import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  async getAll() {
    return await this.favoritesService.getAllFavs();
  }

  @Post('track/:id')
  async addTrack(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: string,
  ) {
    await this.favoritesService.addFavorite('track', id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: string,
  ) {
    await this.favoritesService.removeFavorite('track', id);
  }

  @Post('album/:id')
  async addAlbum(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: string,
  ) {
    await this.favoritesService.addFavorite('album', id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: string,
  ) {
    await this.favoritesService.removeFavorite('album', id);
  }

  @Post('artist/:id')
  async addArtist(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: string,
  ) {
    await this.favoritesService.addFavorite('artist', id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: string,
  ) {
    await this.favoritesService.removeFavorite('artist', id);
  }
}
