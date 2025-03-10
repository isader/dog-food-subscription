import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './entities/payment.entity';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentsService.createSimulatedPayment(createPaymentDto);
  }

  @Get()
  async findAll(): Promise<Payment[]> {
    return this.paymentsService.findAll();
  }

  @Get('subscription/:id')
  async findBySubscription(@Param('id') id: string): Promise<Payment[]> {
    return this.paymentsService.findBySubscription(id);
  }
}