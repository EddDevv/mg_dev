import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { GenderEnum } from '../../../config/enums/gender.enum';
import { IUser } from '../../../domain/users/user.entity';
import { Pagination } from '../../../config/pagination';

export class UserCreateRequest {
  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Smith', description: 'The first name of the user' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'The email address of the user',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password confirmation',
  })
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}

export class UserGetRequest {
  @ApiProperty()
  id: number;
}

export class UserListRequest extends Pagination {}

export class UserUpdateRequest
  implements
    Omit<
      IUser,
      | 'id'
      | 'isVerified'
      | 'role'
      | 'subscribers'
      | 'subscriptions'
      | 'websiteLink'
      | 'lastOnline'
      | 'password'
      | 'onlineStatus'
      | 'receiveNotifications'
    >
{
  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsString()
  lastName?: string | null;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string | null;

  @ApiProperty({ enum: GenderEnum, nullable: true })
  @IsOptional()
  @IsEnum(GenderEnum)
  gender?: GenderEnum;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsDateString({
    strict: true,
  })
  createdAt: string | null;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(880)
  description?: string | null;
}
