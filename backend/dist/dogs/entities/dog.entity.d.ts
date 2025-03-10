import { User } from '../../users/entities/user.entity';
import { Subscription } from '../../subscriptions/entities/subscription.entity';
export declare class Dog {
    id: string;
    name: string;
    age: number;
    weight: number;
    user: User;
    userId: string;
    subscriptions: Subscription[];
    createdAt: Date;
    updatedAt: Date;
}
