import { ApiProperty } from '@nestjs/swagger';
import { BasicEntity } from '../../config/basic.entity';
import { Column, Entity } from 'typeorm';
import { UserEntity } from '../users/user.entity';

export interface IBusinessAccount {
  id: number;
  businessName: string;
  registrationNumber: string;
  userId: number;
}

@Entity('business_account')
export class BusinessAccountEntity
  extends BasicEntity
  implements IBusinessAccount
{
  @ApiProperty({
    example: 'My Business',
    description: 'The name of the business',
  })
  @Column()
  businessName: string;

  @ApiProperty({
    example: '123456789',
    description: 'The registration number of the business',
  })
  @Column()
  registrationNumber: string;

  // @ManyToOne(() => UserEntity, (user) => user.businessAccount)
  // user: UserEntity;

  @Column()
  userId: number;

  constructor(businessName: string) {
    super();
    //this.user = user todo user
    this.businessName = businessName;
  }
}
