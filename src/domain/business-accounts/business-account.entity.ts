import { ApiProperty } from '@nestjs/swagger';
import { BasicEntity } from '../../config/basic.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from '../users/user.entity';

export interface BusinessAccount {
  id: number;
  businessName: string;
  registrationNumber: string;
  userId: number;
}

@Entity('business_account')
export class BusinessAccountEntity
  extends BasicEntity
  implements BusinessAccount
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

  @OneToOne(() => UserEntity, (user) => user.business)
  @JoinColumn()
  user: UserEntity;

  @Column()
  userId: number;

  constructor(businessName: string) {
    super();
    //this.user = user todo user
    this.businessName = businessName;
  }
}
