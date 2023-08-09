import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './security/user.entity';
import GenericModel from '../generics/generic.model';

@Entity()
export class Task extends GenericModel {
  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column()
  objetivo: string;

  @Column()
  calificacion: number;

  @Column()
  descripcion: string;

  @ManyToOne(() => User, (user) => user.tasks, { nullable: false })
  user: User;
};
