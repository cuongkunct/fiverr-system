import { IsString, IsEmail, IsNotEmpty, MaxLength, MinLength, IsNumber, IsPhoneNumber, IsOptional, IsDateString, IsEnum, Matches } from 'class-validator';

export class RegisterRequestDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'Name must be less than 50 characters' })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'Password must be less than 50 characters' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @IsString()
  @IsOptional()
  phone: number;

  @IsOptional()
  @Matches(/^\d{2}-\d{2}-\d{4}$/, {
    message: 'birth_day must be in format DD-MM-YYYY',
  })
  birth_day: string;


  @IsOptional()
  @IsEnum(['MALE', 'FEMALE', 'OTHER'])
  gender: string;

  @IsNotEmpty()
  @IsEnum(['ADMIN', 'USER'])
  role: string;


  @IsOptional()
  skill: string;

  @IsOptional()
  certification: string;
}

