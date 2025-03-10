import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { Delivery } from './entities/delivery.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
export declare class SubscriptionsService {
    private subscriptionsRepository;
    private deliveriesRepository;
    constructor(subscriptionsRepository: Repository<Subscription>, deliveriesRepository: Repository<Delivery>);
    create(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription>;
    findAll(): Promise<Subscription[]>;
    findOne(id: string): Promise<Subscription>;
    findByUser(userId: string): Promise<Subscription[]>;
    update(id: string, updateData: Partial<CreateSubscriptionDto>): Promise<Subscription>;
    getDeliveries(subscriptionId: string): Promise<Delivery[]>;
    createDelivery(subscriptionId: string, deliveryDate: Date): Promise<Delivery>;
    private generateTrackingNumber;
}
