import { IsNotEmpty, IsNumber, IsString, IsUUID, Min, Max } from 'class-validator';

export class CreateDogDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.1)
  @Max(20)
  age: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.5)
  @Max(100)
  weight: number;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}