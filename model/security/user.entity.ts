import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Tarea } from '../tarea.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP', update: false })
  createdAt: Date;

  @OneToMany(() => Tarea, tarea => tarea.user)
  tareas: Tarea[];
}