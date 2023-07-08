import { ApiProperty } from '@nestjs/swagger'
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from 'src/users/entities/user.entity'

@Table({ tableName: 'business_accounts' })
export class BusinessAccount extends Model<BusinessAccount> {
	
  @ApiProperty({ example: 1, description: 'The ID of the business account' })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

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