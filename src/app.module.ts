import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';
import { EventsModule } from './domain/events/events.module';
import { RecordsModule } from './domain/records/records.module';
import { ServicesModule } from './domain/services/services.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
      typesOutputPath: path.join(__dirname, '/generated/i18n.generated.ts'),
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
    RecordsModule,
  ],
})
export class AppModule {}
