import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Delivery } from './entities/delivery.entity';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionSchedulerService } from './subscription-scheduler.service';
import { PaymentsModule } from '../payments/payments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription, Delivery]),
    PaymentsModule,
  ],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, SubscriptionSchedulerService],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}