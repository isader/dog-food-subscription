import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
export declare class PaymentsService {
    private paymentsRepository;
    constructor(paymentsRepository: Repository<Payment>);
    createSimulatedPayment(createPaymentDto: CreatePaymentDto): Promise<Payment>;
    findAll(): Promise<Payment[]>;
    findBySubscription(subscriptionId: string): Promise<Payment[]>;
    private validateCreditCard;
}
