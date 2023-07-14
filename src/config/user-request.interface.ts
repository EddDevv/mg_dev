import { UserEntity } from '../domain/users/user.entity';

export interface IRequestUser extends Request {
  user: UserEntity;
}
