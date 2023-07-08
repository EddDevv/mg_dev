import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class AuthUserDto {
	@ApiProperty({ example: 'john@example.com', description: 'The email address of the user' })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'The password of the user' })
  @IsNotEmpty()
  @IsString()
  password: string;
}