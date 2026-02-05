import { Expose } from 'class-transformer';

export class RegisterResponseDto {
  // @Expose() >> Lấy ra những field cơ bản trong DB

  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  role: string;
}