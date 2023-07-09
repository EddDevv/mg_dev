import { ApiProperty } from '@nestjs/swagger'
import { Column, DataType, HasOne, Model, Table, HasMany } from 'sequelize-typescript'
import { BusinessAccount } from 'src/business-accounts/entities/business-account.entity'
import { Location } from 'src/locations/entities/location.entity'
import { GenderEnum } from '../enums/gender.enum'
import { UserRoleEnum } from '../enums/user-role.enum'
import { Subscription } from 'src/subscription/entities/subscription.entity'
import { Op } from 'sequelize'

@Table({ 
	tableName: 'users',
	timestamps: true
})

export class User extends Model<User> {

  @ApiProperty({ example: 1, description: 'The unique identifier of the user' })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true })
  id: number;

  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  @Column({ type: DataType.STRING })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  @Column({ type: DataType.STRING, allowNull: true })
  lastName: string | null;

  @ApiProperty({ example: 'My account is the best', description: 'The description of the user account' })
  @Column({ type: DataType.STRING, allowNull: true })
  description: string | null;

  @ApiProperty({ example: '1990-01-01', description: 'The date of birth of the user' })
  @Column({ type: DataType.DATEONLY, allowNull: true })
  dateOfBirth: Date | null;

  @ApiProperty({ enum: GenderEnum, default: GenderEnum.NotSpecified, description: 'The gender of the user' })
  @Column({ type: DataType.ENUM(...Object.values(GenderEnum)), defaultValue: GenderEnum.NotSpecified })
  gender: GenderEnum;

  @ApiProperty({ enum: UserRoleEnum, default: UserRoleEnum.Client, description: 'The role of the user' })
  @Column({ type: DataType.ENUM(...Object.values(UserRoleEnum)), defaultValue: UserRoleEnum.Client })
  role: UserRoleEnum;

  @ApiProperty({ example: 'john@example.com', description: 'The email address of the user' })
  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @ApiProperty({ example: '123456', description: 'The phone number of the user' })
  @Column({ type: DataType.STRING, allowNull: true })
  phoneNumber: string | null;

  @ApiProperty({ example: 'password123', description: 'The password of the user' })
  @Column({ type: DataType.STRING })
  password: string;

  @ApiProperty({ example: 'https://example.com', description: 'The website link of the user' })
  @Column({ type: DataType.STRING, allowNull: true })
  websiteLink: string | null;

  @ApiProperty({ example: true, description: 'Indicates whether the user is verified' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isVerified: boolean;

  @ApiProperty({ example: true, description: 'Whether the user wants to receive notifications' })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  receiveNotifications: boolean;

  @ApiProperty({ example: true, description: 'Whether the user is currently online' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  onlineStatus: boolean;

  @ApiProperty({ example: '2023-07-07 10:30:00', description: 'The timestamp when the user was last online' })
  @Column({ type: DataType.DATE })
  lastOnline: Date;

  @ApiProperty({ example: 1, description: 'The ID of the user location' })
  @Column({ type: DataType.INTEGER, allowNull: true })
  locationId: number | null;

  @ApiProperty({ example: 2, description: 'The number of users subscribed to by this user' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  countSubscribers: number;

  @ApiProperty({ example: 2, description: 'The number of users who are subscribed to this user' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  countSubscriptions: number;

  @HasOne(() => BusinessAccount)
  businessAccount: BusinessAccount;

  @HasOne(() => Location)
  location: Location;

  @HasMany(() => Subscription, {
    foreignKey: 'subscriberId',
  })
  subscriptions: Subscription[];

  @HasMany(() => Subscription, {
    foreignKey: 'subscribesToId',
  })
  subscribers: Subscription[];

  async deleteCascade() {
    await Subscription.destroy({
      where: {
        [Op.or]: [{ subscriberId: this.id }, { subscribesToId: this.id }],
      },
    });
    return this.destroy();
  }
}
