import { GenderEnum } from '../../config/enums/gender.enum';
import { UserRoleEnum } from '../../config/enums/user-role.enum';
import { Column, Entity, OneToMany } from 'typeorm';
import { BasicEntity } from '../../config/basic.entity';
import { SubscriptionsEntity } from '../subscriptions/subscriptions.entity';

export interface User {
  id: number;
  firstName: string;
  lastName: string | null;
  description: string | null;
  gender: GenderEnum;
  role: UserRoleEnum;
  email: string;
  phoneNumber: string | null;
  password: string;
  websiteLink: string | null;
  isVerified: boolean;
  receiveNotifications: boolean;
  onlineStatus: boolean;
  lastOnline: Date;
  subscribers: UserEntity[];
  subscriptions: UserEntity[];
}

@Entity('users')
export class UserEntity extends BasicEntity implements User {
  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string | null;

  @Column({ nullable: true })
  description: string | null;

  @Column({ nullable: true })
  dateOfBirth: Date | null;

  @Column({ enum: GenderEnum, default: GenderEnum.NotSpecified })
  gender: GenderEnum;

  @Column({ enum: UserRoleEnum, default: UserRoleEnum.Client })
  role: UserRoleEnum;

  @Column()
  email: string;

  @Column({ nullable: true })
  phoneNumber: string | null;

  @Column()
  password: string;

  @Column({ nullable: true })
  websiteLink: string | null;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  receiveNotifications: boolean;

  @Column({ default: false })
  onlineStatus: boolean;

  @Column({ default: new Date() })
  lastOnline: Date;

  @OneToMany(() => SubscriptionsEntity, (subs) => subs.user)
  subscribers: UserEntity[];

  @OneToMany(() => SubscriptionsEntity, (subs) => subs.subscriber)
  subscriptions: UserEntity[];

  // @HasOne(() => BusinessAccount)
  // businessAccount: BusinessAccount;

  // @HasOne(() => Location)
  // location: Location;

  // @Column()
  // locationId: number | null;

  constructor(
    firstname: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    super();
    this.firstName = firstname;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}
