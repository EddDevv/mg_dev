import { ApiProperty } from '@nestjs/swagger';
import { IUser, UserEntity } from '../../../domain/users/user.entity';
import { GenderEnum } from '../../../config/enums/gender.enum';
import { UserRoleEnum } from '../../../config/enums/user-role.enum';
import {
  BasicResponse,
  BasicResponseArray,
} from '../../../config/basic.response';

export class User
  implements Omit<IUser, 'password' | 'subscriptions' | 'subscribers'>
{
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string | null;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  gender: GenderEnum;

  @ApiProperty()
  role: UserRoleEnum;

  @ApiProperty()
  dateOfBirth: Date;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phoneNumber: string | null;

  @ApiProperty()
  websiteLink: string | null;

  @ApiProperty()
  isVerified: boolean;

  @ApiProperty()
  receiveNotifications: boolean;

  @ApiProperty()
  onlineStatus: boolean;

  @ApiProperty()
  lastOnline: Date;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.description = user.description;
    this.gender = user.gender;
    this.role = user.role;
    this.email = user.email;
    this.dateOfBirth = user.dateOfBirth;
    this.phoneNumber = user.phoneNumber;
    this.websiteLink = user.websiteLink;
    this.isVerified = user.isVerified;
    this.receiveNotifications = user.receiveNotifications;
    this.onlineStatus = user.onlineStatus;
    this.lastOnline = user.lastOnline;
  }
}

export class UserResponse extends BasicResponse<User> {
  constructor(user: User) {
    super(user);
  }

  @ApiProperty({ type: User })
  item: User;
}

export class UsersListResponse extends BasicResponseArray<User> {
  constructor(users: User[], count: number) {
    super(users, count);
  }

  @ApiProperty({ type: User, isArray: true })
  items: User[];
}
