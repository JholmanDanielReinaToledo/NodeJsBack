import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Task } from '../task.entity';
import GenericModel from '../../generics/generic.model';

@Entity()
export class User extends GenericModel{
  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  saltPassword: string;

  @Column({ nullable: true })
  avatar: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP', update: false })
  createdAt: Date;

  @OneToMany(() => Task, task => task.user)
  tasks: Task[];
};
