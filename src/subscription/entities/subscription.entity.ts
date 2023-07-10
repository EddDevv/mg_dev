import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';

@Table({
  tableName: 'subscription',
  timestamps: false,
})
export class Subscription extends Model<Subscription> {
  @ApiProperty({ example: 1, description: 'The unique identifier of the subscription'})
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true })
  id: number;

  @ApiProperty({ example: 1, description: 'The ID of the user associated subscriber' })
  @ForeignKey(() => User)
  @Column({
    onDelete: 'CASCADE',
    type: DataType.INTEGER,
  })
  subscriberId: number;

  @ApiProperty({ example: 2, description: 'The ID of the user associated subscribesTo' })
  @ForeignKey(() => User)
  @Column({
    onDelete: 'CASCADE',
    type: DataType.INTEGER,
  })
  subscribesToId: number;

}
