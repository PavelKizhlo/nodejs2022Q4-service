import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class UpdateAlbumDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly year: number;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  readonly artistId: string | null;
}
