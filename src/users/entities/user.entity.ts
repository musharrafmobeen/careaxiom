import { Entity } from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';

@Entity()
export class Users {
  @PrimaryGeneratedColumn({ type: 'int8' })
  id: number;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int2' })
  age: number;
}
