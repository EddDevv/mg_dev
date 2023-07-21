import { ApiProperty } from '@nestjs/swagger';
import { BasicEntity } from '../../config/basic.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { PortfolioEntity } from '../portfolio/portfolio.entity';

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
  @Column({ nullable: true })
  registrationNumber: string | null;

  @OneToOne(() => UserEntity, (user) => user.business)
  @JoinColumn()
  user: UserEntity;

  @Column()
  userId: number;

  @OneToMany(() => PortfolioEntity, (portfolio) => portfolio.business)
  portfolios: PortfolioEntity[];

  constructor(userId: number, businessName: string) {
    super();
    //this.user = user todo user
    this.businessName = businessName;
    this.userId = userId;
  }
}
