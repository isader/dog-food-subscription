import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
  ) {}

  async createSimulatedPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    // Simulate card validation
    const isCardValid = this.validateCreditCard(createPaymentDto.cardNumber);
    
    // Create payment record
    const payment = this.paymentsRepository.create({
      subscriptionId: createPaymentDto.subscriptionId,
      amount: createPaymentDto.amount,
      status: isCardValid ? 'completed' : 'failed',
    });
    
    return await this.paymentsRepository.save(payment);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentsRepository.find();
  }

  async findBySubscription(subscriptionId: string): Promise<Payment[]> {
    return this.paymentsRepository.find({ 
      where: { subscriptionId },
      order: { paymentDate: 'DESC' },
    });
  }

  // Simple validation - in a real app, you'd use a payment processor
  private validateCreditCard(cardNumber: string): boolean {
    // For this simulation, let's consider all cards valid except those ending in '0000'
    return !cardNumber.endsWith('0000');
  }
}