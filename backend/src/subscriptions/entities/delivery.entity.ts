import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Subscription } from './subscription.entity';

@Entity('deliveries')
export class Delivery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Subscription, subscription => subscription.deliveries)
  subscription: Subscription;

  @Column()
  subscriptionId: string;

  @Column({ type: 'date' })
  deliveryDate: Date;

  @Column({ default: 'pending' })
  status: 'pending' | 'shipped' | 'delivered';

  @Column({ nullable: true })
  trackingNumber: string;

  @CreateDateColumn()
  createdAt: Date;
}