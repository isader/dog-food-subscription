import { Dog } from '../../dogs/entities/dog.entity';
import { Subscription } from '../../subscriptions/entities/subscription.entity';
export declare class User {
    id: string;
    name: string;
    email: string;
    address: string;
    dogs: Dog[];
    subscriptions: Subscription[];
    createdAt: Date;
    updatedAt: Date;
}
