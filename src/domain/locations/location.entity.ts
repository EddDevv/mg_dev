import { BasicEntity } from '../../config/basic.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from '../users/user.entity';

@Entity('locations')
export class LocationEntity extends BasicEntity {
  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  metro: string;

  @Column()
  street: string;

  @Column()
  apartment: string;

  @Column()
  entrance: string;

  @Column()
  postalCode: string;

  // @ManyToOne(() => UserEntity, (user) => user.location)
  // user: UserEntity;

  @Column()
  userId: number;
}
