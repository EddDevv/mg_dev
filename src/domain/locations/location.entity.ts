import { ApiProperty } from '@nestjs/swagger'
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from 'src/domain/users/user.entity'
import {BasicEntity} from "../../config/basic.entity";

@Table({ 
	tableName: 'location',
	timestamps: true
})

export class Location extends BasicEntity {
  @ApiProperty({ example: 1, description: 'The ID of the user associated' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
  
	@ApiProperty({ example: 'USA', description: 'The country of the user' })
  @Column({ type: DataType.STRING })
  country: string;

  @ApiProperty({ example: 'New York', description: 'The city of the user' })
  @Column({ type: DataType.STRING })
  city: string;

  @ApiProperty({ example: 'Central Station', description: 'The metro station of the user' })
  @Column({ type: DataType.STRING })
  metro: string;

  @ApiProperty({ example: 'Main Street', description: 'The street address of the user' })
  @Column({ type: DataType.STRING })
  street: string;

  @ApiProperty({ example: 'Apt 123', description: 'The apartment number of the user' })
  @Column({ type: DataType.STRING })
  apartment: string;

  @ApiProperty({ example: 'Entrance A', description: 'The entrance of the user' })
  @Column({ type: DataType.STRING })
  entrance: string;

  @ApiProperty({ example: '12345', description: 'The postal code of the user' })
  @Column({ type: DataType.STRING })
  postalCode: string;

	@BelongsTo(() => User)
  user: User;
}
