import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false }) // No permite valores nulos
  email: string;

  @Column({ nullable: false }) // No permite valores nulos
  password: string;

  // Otras columnas
}
