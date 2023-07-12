import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { UserCreateRequest } from '../dto/users/users.request';

@Injectable()
export class PasswordMatchPipe implements PipeTransform {
  transform(value: UserCreateRequest) {
    if (value.password !== value.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    return value;
  }
}
