import { IsNotEmpty, IsNumber, IsString, IsUUID, IsEnum, IsDateString } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNotEmpty()
  @IsNumber()
  pouchSize: number;

  @IsNotEmpty()
  @IsNumber()
  pouchesPerMonth: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsEnum(['active', 'paused', 'cancelled'])
  status: 'active' | 'paused' | 'cancelled' = 'active';

  @IsNotEmpty()
  @IsDateString()
  nextDeliveryDate: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  dogId: string;
}