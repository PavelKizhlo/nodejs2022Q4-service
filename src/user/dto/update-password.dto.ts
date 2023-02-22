import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  readonly oldPassword: string; // previous password

  @IsNotEmpty()
  @IsString()
  readonly newPassword: string; // new password
}
