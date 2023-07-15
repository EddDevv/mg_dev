import { User } from '../application/dto/users/users.response';

export interface IRequestUser extends Request {
  user: User;
}
