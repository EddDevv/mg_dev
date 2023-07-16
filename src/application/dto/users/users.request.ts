import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
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
import { PartialType } from '@nestjs/mapped-types';
import { IUser } from '../../../domain/users/user.entity';

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
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string | null;

  @ApiProperty()
  @IsPhoneNumber()
  phoneNumber: string | null;

  @ApiProperty({ enum: GenderEnum })
  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @ApiProperty()
  @IsDate()
  dateOfBirth: Date | null;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(880)
  description: string | null;
}
