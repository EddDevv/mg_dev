import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { CreateUserDto } from 'src/users/dto/create-user.dto'

@Injectable()
export class PasswordMatchPipe implements PipeTransform {
  transform(value: CreateUserDto) {
    if (value.password !== value.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    return value;
  }
}
