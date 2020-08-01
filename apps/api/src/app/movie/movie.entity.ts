import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column()
  description: string;

  @Column()
  rating: number;

  @Column()
  budget: string;

  @Column()
  thumbnail: string;

  @Column()
  duration: number;

  @Column()
  company: string;

  @Column()
  writer: string;
}
