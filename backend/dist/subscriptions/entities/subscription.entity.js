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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const dog_entity_1 = require("../../dogs/entities/dog.entity");
const delivery_entity_1 = require("./delivery.entity");
const payment_entity_1 = require("../../payments/entities/payment.entity");
let Subscription = class Subscription {
    id;
    pouchSize;
    pouchesPerMonth;
    price;
    status;
    nextDeliveryDate;
    user;
    userId;
    dog;
    dogId;
    deliveries;
    payments;
    createdAt;
    updatedAt;
};
exports.Subscription = Subscription;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Subscription.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Subscription.prototype, "pouchSize", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Subscription.prototype, "pouchesPerMonth", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Subscription.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'active' }),
    __metadata("design:type", String)
], Subscription.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Subscription.prototype, "nextDeliveryDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.subscriptions),
    __metadata("design:type", user_entity_1.User)
], Subscription.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Subscription.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dog_entity_1.Dog, dog => dog.subscriptions),
    __metadata("design:type", dog_entity_1.Dog)
], Subscription.prototype, "dog", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Subscription.prototype, "dogId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => delivery_entity_1.Delivery, delivery => delivery.subscription),
    __metadata("design:type", Array)
], Subscription.prototype, "deliveries", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payment_entity_1.Payment, payment => payment.subscription),
    __metadata("design:type", Array)
], Subscription.prototype, "payments", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Subscription.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Subscription.prototype, "updatedAt", void 0);
exports.Subscription = Subscription = __decorate([
    (0, typeorm_1.Entity)('subscriptions')
], Subscription);
//# sourceMappingURL=subscription.entity.js.map