import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Dog } from '../../dogs/entities/dog.entity';
import { Subscription } from '../../subscriptions/entities/subscription.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  address: string;

  @OneToMany(() => Dog, dog => dog.user)
  dogs: Dog[];

  @OneToMany(() => Subscription, subscription => subscription.user)
  subscriptions: Subscription[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}