import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { Delivery } from './entities/delivery.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,
    @InjectRepository(Delivery)
    private deliveriesRepository: Repository<Delivery>,
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
    const subscription = this.subscriptionsRepository.create({
      ...createSubscriptionDto,
      nextDeliveryDate: new Date(createSubscriptionDto.nextDeliveryDate),
    });
    
    return this.subscriptionsRepository.save(subscription);
  }

  async findAll(): Promise<Subscription[]> {
    return this.subscriptionsRepository.find();
  }

  async findOne(id: string): Promise<Subscription> {
    const subscription = await this.subscriptionsRepository.findOne({ where: { id } });
    if (!subscription) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }
    return subscription;
  }

  async findByUser(userId: string): Promise<Subscription[]> {
    return this.subscriptionsRepository.find({ 
      where: { userId },
      relations: ['dog'],
    });
  }

  async update(id: string, updateData: Partial<CreateSubscriptionDto>): Promise<Subscription> {
    const subscription = await this.findOne(id);
    this.subscriptionsRepository.merge(subscription, updateData);
    return this.subscriptionsRepository.save(subscription);
  }

  async getDeliveries(subscriptionId: string): Promise<Delivery[]> {
    // Ensure subscription exists
    await this.findOne(subscriptionId);
    
    return this.deliveriesRepository.find({
      where: { subscriptionId },
      order: { deliveryDate: 'DESC' },
    });
  }

  async createDelivery(subscriptionId: string, deliveryDate: Date): Promise<Delivery> {
    // Ensure subscription exists
    await this.findOne(subscriptionId);
    
    const delivery = this.deliveriesRepository.create({
      subscriptionId,
      deliveryDate,
      status: 'pending',
      trackingNumber: this.generateTrackingNumber(),
    });
    
    return this.deliveriesRepository.save(delivery);
  }

  private generateTrackingNumber(): string {
    return `TRK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
  }
}