import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Dog } from '../../dogs/entities/dog.entity';
import { Delivery } from './delivery.entity';
import { Payment } from '../../payments/entities/payment.entity';

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pouchSize: number;

  @Column()
  pouchesPerMonth: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: 'active' })
  status: 'active' | 'paused' | 'cancelled';

  @Column({ type: 'date' })
  nextDeliveryDate: Date;

  @ManyToOne(() => User, user => user.subscriptions)
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Dog, dog => dog.subscriptions)
  dog: Dog;

  @Column()
  dogId: string;

  @OneToMany(() => Delivery, delivery => delivery.subscription)
  deliveries: Delivery[];

  @OneToMany(() => Payment, payment => payment.subscription)
  payments: Payment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}