import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from './domain/auth/auth.module'
import { BusinessAccountModule } from './domain/business-accounts/business-accounts.module'
import { BusinessAccount } from './domain/business-accounts/business-account.entity'
import { Location } from './domain/locations/location.entity'
import { LocationsModule } from './domain/locations/locations.module'
import { User } from './domain/users/user.entity'
import { UserModule } from './domain/users/user.module'


@Module({
	controllers: [],
	providers: [],
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`
		}),
		SequelizeModule.forRoot({
      dialect: 'postgres',
			host: process.env.DB_HOST,
			username: process.env.DB_USERNAME,
			port: Number(process.env.DB_PORT),
			password:process.env.DB_PASSWORD,
			database: process.env.DB_DATABASENAME,
			models: [
				User, 
				BusinessAccount, 
				Location
			],
      autoLoadModels: true,
      synchronize: true,
    }),
		AuthModule,
		UserModule,
		BusinessAccountModule,
		LocationsModule,
	]
})

export class AppModule {}