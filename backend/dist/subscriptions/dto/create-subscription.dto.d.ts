export declare class CreateSubscriptionDto {
    pouchSize: number;
    pouchesPerMonth: number;
    price: number;
    status: 'active' | 'paused' | 'cancelled';
    nextDeliveryDate: string;
    userId: string;
    dogId: string;
}
