import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './domain/auth/auth.module';
import { BusinessAccountModule } from './domain/business-accounts/business-accounts.module';
import { LocationsModule } from './domain/locations/locations.module';
import { UserModule } from './domain/users/user.module';
import { databaseProviders } from './infrastructure/dataSourceOptions';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(databaseProviders),
    AuthModule,
    UserModule,
    BusinessAccountModule,
    LocationsModule,
  ],
})
export class AppModule {}
