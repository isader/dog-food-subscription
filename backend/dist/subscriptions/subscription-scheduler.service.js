"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SubscriptionSchedulerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionSchedulerService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const subscription_entity_1 = require("./entities/subscription.entity");
const delivery_entity_1 = require("./entities/delivery.entity");
const payments_service_1 = require("../payments/payments.service");
let SubscriptionSchedulerService = SubscriptionSchedulerService_1 = class SubscriptionSchedulerService {
    subscriptionsRepository;
    deliveriesRepository;
    paymentsService;
    logger = new common_1.Logger(SubscriptionSchedulerService_1.name);
    constructor(subscriptionsRepository, deliveriesRepository, paymentsService) {
        this.subscriptionsRepository = subscriptionsRepository;
        this.deliveriesRepository = deliveriesRepository;
        this.paymentsService = paymentsService;
    }
    async handleDailySubscriptions() {
        this.logger.log('Processing daily subscriptions...');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const subscriptionsDue = await this.subscriptionsRepository.find({
            where: {
                status: 'active',
                nextDeliveryDate: (0, typeorm_2.LessThanOrEqual)(today),
            },
        });
        this.logger.log(`Found ${subscriptionsDue.length} subscriptions due for processing`);
        for (const subscription of subscriptionsDue) {
            try {
                const payment = await this.paymentsService.createSimulatedPayment({
                    subscriptionId: subscription.id,
                    amount: Number(subscription.price),
                    cardNumber: '4242424242424242',
                    expiryDate: '12/25',
                    cvv: '123',
                });
                if (payment.status === 'completed') {
                    const delivery = this.deliveriesRepository.create({
                        subscriptionId: subscription.id,
                        deliveryDate: today,
                        status: 'pending',
                        trackingNumber: this.generateTrackingNumber(),
                    });
                    await this.deliveriesRepository.save(delivery);
                    const nextDeliveryDate = new Date();
                    nextDeliveryDate.setDate(nextDeliveryDate.getDate() + 30);
                    subscription.nextDeliveryDate = nextDeliveryDate;
                    await this.subscriptionsRepository.save(subscription);
                    this.logger.log(`Processed subscription ${subscription.id} successfully`);
                }
                else {
                    this.logger.error(`Payment failed for subscription ${subscription.id}`);
                }
            }
            catch (error) {
                this.logger.error(`Error processing subscription ${subscription.id}:`, error);
            }
        }
    }
    generateTrackingNumber() {
        return `TRK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    }
};
exports.SubscriptionSchedulerService = SubscriptionSchedulerService;
__decorate([
    (0, schedule_1.Cron)('0 0 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubscriptionSchedulerService.prototype, "handleDailySubscriptions", null);
exports.SubscriptionSchedulerService = SubscriptionSchedulerService = SubscriptionSchedulerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(subscription_entity_1.Subscription)),
    __param(1, (0, typeorm_1.InjectRepository)(delivery_entity_1.Delivery)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        payments_service_1.PaymentsService])
], SubscriptionSchedulerService);
//# sourceMappingURL=subscription-scheduler.service.js.map