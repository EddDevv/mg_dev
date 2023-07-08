import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from './auth/auth.module'
import { BusinessAccountModule } from './business-accounts/business-accounts.module'
import { BusinessAccount } from './business-accounts/entities/business-account.entity'
import { Location } from './locations/entities/location.entity'
import { LocationsModule } from './locations/locations.module'
import { User } from './users/entities/user.entity'
import { UserModule } from './users/user.module'


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