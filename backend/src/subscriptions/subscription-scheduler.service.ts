import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { Delivery } from './entities/delivery.entity';
import { PaymentsService } from '../payments/payments.service';

@Injectable()
export class SubscriptionSchedulerService {
  private readonly logger = new Logger(SubscriptionSchedulerService.name);

  constructor(
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,
    @InjectRepository(Delivery)
    private deliveriesRepository: Repository<Delivery>,
    private paymentsService: PaymentsService,
  ) {}

  // Run every day at midnight
  @Cron('0 0 * * *')
  async handleDailySubscriptions() {
    this.logger.log('Processing daily subscriptions...');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find active subscriptions due for processing today
    const subscriptionsDue = await this.subscriptionsRepository.find({
      where: {
        status: 'active',
        nextDeliveryDate: LessThanOrEqual(today),
      },
    });

    this.logger.log(`Found ${subscriptionsDue.length} subscriptions due for processing`);

    for (const subscription of subscriptionsDue) {
      try {
        // Simulate payment processing
        const payment = await this.paymentsService.createSimulatedPayment({
          subscriptionId: subscription.id,
          amount: Number(subscription.price),
          cardNumber: '4242424242424242', // Simulated
          expiryDate: '12/25', // Simulated
          cvv: '123', // Simulated
        });

        if (payment.status === 'completed') {
          // Create delivery record
          const delivery = this.deliveriesRepository.create({
            subscriptionId: subscription.id,
            deliveryDate: today,
            status: 'pending',
            trackingNumber: this.generateTrackingNumber(),
          });
          await this.deliveriesRepository.save(delivery);

          // Update next delivery date (30 days from now)
          const nextDeliveryDate = new Date();
          nextDeliveryDate.setDate(nextDeliveryDate.getDate() + 30);
          
          subscription.nextDeliveryDate = nextDeliveryDate;
          await this.subscriptionsRepository.save(subscription);

          this.logger.log(`Processed subscription ${subscription.id} successfully`);
        } else {
          this.logger.error(`Payment failed for subscription ${subscription.id}`);
          // In a real system, you might want to notify the customer or retry
        }
      } catch (error) {
        this.logger.error(`Error processing subscription ${subscription.id}:`, error);
      }
    }
  }

  private generateTrackingNumber(): string {
    return `TRK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
  }
}