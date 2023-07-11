import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum, IsNotEmpty,
  IsOptional,
  IsString, MinLength,
} from 'class-validator';
import { GenderEnum } from '../../../config/enums/gender.enum';
import { PartialType } from '@nestjs/mapped-types';

export class UserCreateRequest {

  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'john@example.com', description: 'The email address of the user' })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'The password of the user' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiProperty({ example: 'password123', description: 'The password confirmation' })
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}

export class UpdateUserDto {
  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    example: 'My account is the best',
    description: 'The description of the user account',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'The date of birth of the user',
  })
  @IsOptional()
  @IsDate()
  dateOfBirth?: Date;

  @ApiProperty({
    enum: GenderEnum,
    default: GenderEnum.NotSpecified,
    description: 'The gender of the user',
  })
  @IsOptional()
  @IsEnum(GenderEnum)
  gender?: GenderEnum;

  @ApiProperty({
    example: 'john@example.com',
    description: 'The email address of the user',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: '123456',
    description: 'The phone number of the user',
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({
    example: 'https://example.com',
    description: 'The website link of the user',
  })
  @IsOptional()
  @IsString()
  websiteLink?: string;

  @ApiProperty({
    example: true,
    description: 'Indicates whether the user is verified',
  })
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @ApiProperty({
    example: true,
    description: 'Whether the user wants to receive notifications',
  })
  @IsOptional()
  @IsBoolean()
  receiveNotifications?: boolean;
}

export class UserUpdateRequest extends PartialType(UpdateUserDto) {}
