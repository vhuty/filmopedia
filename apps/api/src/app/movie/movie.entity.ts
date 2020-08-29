import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Relations } from 'src/constants/relations';

@Entity({
  name: Relations.MOVIES,
})
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
