import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { Delivery } from './entities/delivery.entity';
import { PaymentsService } from '../payments/payments.service';
export declare class SubscriptionSchedulerService {
    private subscriptionsRepository;
    private deliveriesRepository;
    private paymentsService;
    private readonly logger;
    constructor(subscriptionsRepository: Repository<Subscription>, deliveriesRepository: Repository<Delivery>, paymentsService: PaymentsService);
    handleDailySubscriptions(): Promise<void>;
    private generateTrackingNumber;
}
