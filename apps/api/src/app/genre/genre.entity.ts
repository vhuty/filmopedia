import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Relations } from '@constants/relations';

@Entity({
  name: Relations.GENRES,
})
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  name: string;
}
