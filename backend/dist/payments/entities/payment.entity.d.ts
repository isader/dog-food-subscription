import { Subscription } from '../../subscriptions/entities/subscription.entity';
export declare class Payment {
    id: string;
    subscription: Subscription;
    subscriptionId: string;
    amount: number;
    status: 'pending' | 'completed' | 'failed';
    paymentDate: Date;
}
