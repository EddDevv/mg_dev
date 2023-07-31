import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './domain/auth/auth.module';
import { BusinessAccountModule } from './domain/business-accounts/business-accounts.module';
import { LocationsModule } from './domain/locations/locations.module';
import { UserModule } from './domain/users/user.module';
import { databaseProviders } from './infrastructure/dataSourceOptions';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './domain/posts/post.module';
import { SubscriptionsModule } from './domain/subscriptions/subscriptions.module';
import { CommentModule } from './domain/comments/comment.module';
import { PortfolioModule } from './domain/portfolio/portfolio.module';
import { CategoriesModule } from './domain/categories/categories.module';
import { ServicesModule } from './domain/services/services.module';
import { EventsModule } from './domain/events/events.module';

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
    PostModule,
    SubscriptionsModule,
    CommentModule,
    PortfolioModule,
    CategoriesModule,
    ServicesModule,
    EventsModule,
  ],
})
export class AppModule {}
