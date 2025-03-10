import { User } from '../../users/entities/user.entity';
import { Dog } from '../../dogs/entities/dog.entity';
import { Delivery } from './delivery.entity';
import { Payment } from '../../payments/entities/payment.entity';
export declare class Subscription {
    id: string;
    pouchSize: number;
    pouchesPerMonth: number;
    price: number;
    status: 'active' | 'paused' | 'cancelled';
    nextDeliveryDate: Date;
    user: User;
    userId: string;
    dog: Dog;
    dogId: string;
    deliveries: Delivery[];
    payments: Payment[];
    createdAt: Date;
    updatedAt: Date;
}
