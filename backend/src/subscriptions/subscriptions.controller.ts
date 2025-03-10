import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { Subscription } from './entities/subscription.entity';
import { Delivery } from './entities/delivery.entity';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  async create(@Body() createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
    return this.subscriptionsService.create(createSubscriptionDto);
  }

  @Get()
  async findAll(): Promise<Subscription[]> {
    return this.subscriptionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Subscription> {
    return this.subscriptionsService.findOne(id);
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string): Promise<Subscription[]> {
    return this.subscriptionsService.findByUser(userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateSubscriptionDto>,
  ): Promise<Subscription> {
    return this.subscriptionsService.update(id, updateData);
  }

  @Get(':id/deliveries')
  async getDeliveries(@Param('id') id: string): Promise<Delivery[]> {
    return this.subscriptionsService.getDeliveries(id);
  }

  @Post(':id/deliveries')
  async createDelivery(
    @Param('id') id: string,
    @Body('deliveryDate') deliveryDateStr: string,
  ): Promise<Delivery> {
    const deliveryDate = new Date(deliveryDateStr);
    return this.subscriptionsService.createDelivery(id, deliveryDate);
  }
}