import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo
} from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';

@Table({
  tableName: 'subscription',
  timestamps: false,
})
export class Subscription extends Model<Subscription> {

  @ApiProperty({ example: 1, description: 'The ID of the user associated subscription' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  subscriberId: number;

  @ApiProperty({ example: 1, description: 'The ID of the user associated publisher' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  subscribesToId: number;

  @BelongsTo(() => User, 'subscriberId')
  subscriber: User;

  @BelongsTo(() => User, 'subscribesToId')
  subscribesTo: User;

}
