import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Subscription } from '../../subscriptions/entities/subscription.entity';

@Entity('dogs')
export class Dog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('float')
  age: number;

  @Column('float')
  weight: number;

  @ManyToOne(() => User, user => user.dogs)
  user: User;

  @Column()
  userId: string;

  @OneToMany(() => Subscription, subscription => subscription.dog)
  subscriptions: Subscription[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}