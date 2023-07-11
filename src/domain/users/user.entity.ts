import { GenderEnum } from '../../config/enums/gender.enum';
import { UserRoleEnum } from '../../config/enums/user-role.enum';
import { Column, Entity } from 'typeorm';
import { BasicEntity } from '../../config/basic.entity';

export interface User {
  id: number;
  firstname: string;
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
}

@Entity('users')
export class UserEntity extends BasicEntity implements User {
  @Column()
  firstname: string;

  @Column({ nullable: true })
  lastName: string | null;

  @Column({ nullable: true })
  description: string | null;

  @Column({ nullable: true })
  dateOfBirth: Date | null;

  @Column({ enum: GenderEnum, default: GenderEnum.NotSpecified })
  gender: GenderEnum;

  @Column({ enum: UserRoleEnum })
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

  @Column()
  receiveNotifications: boolean;

  @Column()
  onlineStatus: boolean;

  @Column()
  lastOnline: Date;

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
    this.firstname = firstname;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}
