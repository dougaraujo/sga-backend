import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserRole } from 'src/types';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  public password: string;

  @IsString()
  @MinLength(2)
  public firstName?: string;

  @IsString()
  @MinLength(2)
  public lastName?: string;

  @IsString()
  public role?: UserRole;
}
