import { GenderEnum } from '../../config/enums/gender.enum';
import { UserRoleEnum } from '../../config/enums/user-role.enum';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { BasicEntity } from '../../config/basic.entity';
import { PostEntity } from '../posts/post.entity';
import { BusinessAccountEntity } from '../business-accounts/business-account.entity';
import { SubscriptionsEntity } from '../subscriptions/subscriptions.entity';
import { CommentEntity } from '../comments/comment.entity';

export interface IUser {
  id: number;
  firstName?: string;
  lastName?: string | null;
  description?: string | null;
  dateOfBirth?: Date | null;
  gender?: GenderEnum;
  role: UserRoleEnum;
  email?: string;
  phoneNumber?: string | null;
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
export class UserEntity extends BasicEntity implements IUser {
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

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @OneToOne(() => BusinessAccountEntity, (business) => business.user, {
    cascade: ['insert', 'update', 'remove', 'soft-remove'],
  })
  business: BusinessAccountEntity;

  @OneToMany(() => SubscriptionsEntity, (subs) => subs.user)
  subscribers: UserEntity[];

  @OneToMany(() => CommentEntity, (comments) => comments.user)
  comments: CommentEntity[];

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
