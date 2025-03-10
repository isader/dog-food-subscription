import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsUUID()
  subscriptionId: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  cardNumber: string;

  @IsNotEmpty()
  @IsString()
  expiryDate: string;

  @IsNotEmpty()
  @IsString()
  cvv: string;
}