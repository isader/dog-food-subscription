import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { Subscription } from './entities/subscription.entity';
import { Delivery } from './entities/delivery.entity';
export declare class SubscriptionsController {
    private readonly subscriptionsService;
    constructor(subscriptionsService: SubscriptionsService);
    create(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription>;
    findAll(): Promise<Subscription[]>;
    findOne(id: string): Promise<Subscription>;
    findByUser(userId: string): Promise<Subscription[]>;
    update(id: string, updateData: Partial<CreateSubscriptionDto>): Promise<Subscription>;
    getDeliveries(id: string): Promise<Delivery[]>;
    createDelivery(id: string, deliveryDateStr: string): Promise<Delivery>;
}
