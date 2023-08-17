import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SubscriptionsService } from '../../domain/subscriptions/subscriptions.service';
import {
  SubscriptionsGetRequest,
  SubscriptionsSubscribeRequest,
  SubscriptionsUnsubscribeRequest,
} from '../dto/subscriptions/subscriptions.request';
import {
  SubscriptionsGetResponse,
  SubscriptionsGetSubscribersResponse,
  Subscription,
} from '../dto/subscriptions/subscriptions.response';
import { CustomExceptions } from '../../config/messages/custom.exceptions';
import { IRequestUser } from '../../config/user-request.interface';
import { AuthGuard } from '../guards/auth.guard';
import { ResponseMessages } from '../../config/messages/response.messages';
import { JwtGuard } from '../guards/jwt.guard';

@ApiTags('Subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionService: SubscriptionsService) {}

  @ApiOkResponse({
    type: Subscription,
    description: ResponseMessages.subscriptions.subscribe,
  })
  @ApiNotFoundResponse({ description: CustomExceptions.user.NotFound })
  @ApiForbiddenResponse({ description: 'You already have a subscription' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('/subscribe')
  subscribe(
    @Req() { user }: IRequestUser,
    @Body() body: SubscriptionsSubscribeRequest,
  ): Promise<Subscription> {
    return this.subscriptionService.subscribe(user, body);
  }

  @ApiOkResponse({ description: ResponseMessages.subscriptions.unsubscribe })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('/unsubscribe')
  unsubscribe(
    @Req() { user }: IRequestUser,
    @Body() body: SubscriptionsUnsubscribeRequest,
  ): Promise<void> {
    return this.subscriptionService.unsubscribe(user, body);
  }

  @ApiOkResponse({
    type: SubscriptionsGetSubscribersResponse,
    description: ResponseMessages.subscriptions.getSubscribers,
  })
  @Get('/subscribers')
  getSubscribers(
    @Query() query: SubscriptionsGetRequest,
  ): Promise<SubscriptionsGetSubscribersResponse> {
    return this.subscriptionService.getSubscribers(query);
  }

  @ApiOkResponse({
    type: SubscriptionsGetResponse,
    description: ResponseMessages.subscriptions.getSubscriptions,
  })
  @Get()
  getSubscriptions(
    @Query() query: SubscriptionsGetRequest,
  ): Promise<SubscriptionsGetResponse> {
    return this.subscriptionService.getSubscriptions(query);
  }
}
