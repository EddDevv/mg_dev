import { ApiProperty } from '@nestjs/swagger';
import { User, UserEntity } from '../../../domain/users/user.entity';
import { GenderEnum } from '../../../config/enums/gender.enum';
import { UserRoleEnum } from '../../../config/enums/user-role.enum';

export class UsersResponse
  implements Omit<User, 'password' | 'subscriptions' | 'subscribers'>
{
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastName: string | null;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  gender: GenderEnum;

  @ApiProperty()
  role: UserRoleEnum;

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
    this.firstname = user.firstname;
    this.lastName = user.lastName;
    this.description = user.description;
    this.gender = user.gender;
    this.role = user.role;
    this.email = user.email;
    this.phoneNumber = user.phoneNumber;
    this.websiteLink = user.websiteLink;
    this.isVerified = user.isVerified;
    this.receiveNotifications = user.receiveNotifications;
    this.onlineStatus = user.onlineStatus;
    this.lastOnline = user.lastOnline;
  }
}

export class UserListResponse {
  @ApiProperty()
  users: UsersResponse[];

  @ApiProperty()
  count: number;

  constructor(users: UserEntity[], count: number) {
    this.users = this.makeUsersResponse(users);
    this.count = count;
  }

  makeUsersResponse(users: UserEntity[]): UsersResponse[] {
    return users.map((user) => {
      return new UsersResponse(user);
    });
  }
}
