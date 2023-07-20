import { UserEntity } from '../domain/users/user.entity';
import { LocationEntity } from '../domain/locations/location.entity';
import { BusinessAccountEntity } from '../domain/business-accounts/business-account.entity';
import { SocialLinksEntity } from '../domain/social/social-links.entity';
import { PostEntity } from 'src/domain/posts/post.entity';
import { SubscriptionsEntity } from '../domain/subscriptions/subscriptions.entity';
import { CommentEntity } from 'src/domain/comments/comment.entity';
import { PortfolioEntity } from 'src/domain/portfolio/portfolio.entity';

export const EntitiesArray = [
  UserEntity,
  LocationEntity,
  BusinessAccountEntity,
  SocialLinksEntity,
  PostEntity,
  SubscriptionsEntity,
  CommentEntity,
  PortfolioEntity,
];
