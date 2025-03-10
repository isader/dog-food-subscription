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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const subscription_entity_1 = require("./entities/subscription.entity");
const delivery_entity_1 = require("./entities/delivery.entity");
let SubscriptionsService = class SubscriptionsService {
    subscriptionsRepository;
    deliveriesRepository;
    constructor(subscriptionsRepository, deliveriesRepository) {
        this.subscriptionsRepository = subscriptionsRepository;
        this.deliveriesRepository = deliveriesRepository;
    }
    async create(createSubscriptionDto) {
        const subscription = this.subscriptionsRepository.create({
            ...createSubscriptionDto,
            nextDeliveryDate: new Date(createSubscriptionDto.nextDeliveryDate),
        });
        return this.subscriptionsRepository.save(subscription);
    }
    async findAll() {
        return this.subscriptionsRepository.find();
    }
    async findOne(id) {
        const subscription = await this.subscriptionsRepository.findOne({ where: { id } });
        if (!subscription) {
            throw new common_1.NotFoundException(`Subscription with ID ${id} not found`);
        }
        return subscription;
    }
    async findByUser(userId) {
        return this.subscriptionsRepository.find({
            where: { userId },
            relations: ['dog'],
        });
    }
    async update(id, updateData) {
        const subscription = await this.findOne(id);
        this.subscriptionsRepository.merge(subscription, updateData);
        return this.subscriptionsRepository.save(subscription);
    }
    async getDeliveries(subscriptionId) {
        await this.findOne(subscriptionId);
        return this.deliveriesRepository.find({
            where: { subscriptionId },
            order: { deliveryDate: 'DESC' },
        });
    }
    async createDelivery(subscriptionId, deliveryDate) {
        await this.findOne(subscriptionId);
        const delivery = this.deliveriesRepository.create({
            subscriptionId,
            deliveryDate,
            status: 'pending',
            trackingNumber: this.generateTrackingNumber(),
        });
        return this.deliveriesRepository.save(delivery);
    }
    generateTrackingNumber() {
        return `TRK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    }
};
exports.SubscriptionsService = SubscriptionsService;
exports.SubscriptionsService = SubscriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(subscription_entity_1.Subscription)),
    __param(1, (0, typeorm_1.InjectRepository)(delivery_entity_1.Delivery)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SubscriptionsService);
//# sourceMappingURL=subscriptions.service.js.map