import { ApiProperty } from '@nestjs/swagger'
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from 'src/domain/users/user.entity'
import {BasicEntity} from "../../config/basic.entity";

@Table({ tableName: 'business_accounts' })
export class BusinessAccount extends BasicEntity {
  @ApiProperty({ example: 'My Business', description: 'The name of the business' })
  @Column({ type: DataType.STRING })
  businessName: string;

  @ApiProperty({ example: '123456789', description: 'The registration number of the business' })
  @Column({ type: DataType.STRING })
  registrationNumber: string;

  @ApiProperty({ example: 1, description: 'The ID of the user associated with the business account' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;
  
}