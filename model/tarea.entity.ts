import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './security/user.entity';

@Entity()
export class Tarea {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column()
  objetivo: string;

  @Column()
  calificacion: number;

  @Column()
  descripcion: string;

  @ManyToOne(() => User, (user) => user.tareas, { nullable: false })
  user: User;
}