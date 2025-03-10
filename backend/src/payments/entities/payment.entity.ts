import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Subscription } from '../../subscriptions/entities/subscription.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Subscription, subscription => subscription.payments)
  subscription: Subscription;

  @Column()
  subscriptionId: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ default: 'pending' })
  status: 'pending' | 'completed' | 'failed';

  @CreateDateColumn()
  paymentDate: Date;
}