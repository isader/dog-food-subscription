import { Subscription } from './subscription.entity';
export declare class Delivery {
    id: string;
    subscription: Subscription;
    subscriptionId: string;
    deliveryDate: Date;
    status: 'pending' | 'shipped' | 'delivered';
    trackingNumber: string;
    createdAt: Date;
}
