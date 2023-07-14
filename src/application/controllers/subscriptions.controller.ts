import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SubscriptionsService } from '../../domain/subscriptions/subscriptions.service';
import {
  SubscriptionsSubscribeRequest,
  SubscriptionsUnsubscribeRequest,
} from '../dto/subscriptions/subscriptions.request';
import {
  SubscriptionsGetResponse,
  SubscriptionsGetSubscribersResponse,
  SubscriptionsResponse,
} from '../dto/subscriptions/subscriptions.response';
import { CustomExceptions } from '../../config/messages/custom.exceptions';
import { IRequestUser } from '../../config/user-request.interface';
import { AuthGuard } from '../guards/jwt.guard';

@ApiTags('Subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionService: SubscriptionsService) {}

  @ApiOkResponse({ type: SubscriptionsResponse })
  @ApiNotFoundResponse({ description: CustomExceptions.user.NotFound })
  @ApiForbiddenResponse({ description: 'You already have a subscription' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('/subscribe')
  subscribe(
    @Body() body: SubscriptionsSubscribeRequest,
  ): Promise<SubscriptionsResponse> {
    return this.subscriptionService.subscribe(body);
  }

  @ApiOkResponse()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('/unsubscribe')
  unsubscribe(
    @Req() { user }: IRequestUser,
    @Body() body: SubscriptionsUnsubscribeRequest,
  ): Promise<void> {
    return this.subscriptionService.unsubscribe(user, body);
  }

  @ApiOkResponse({ type: SubscriptionsGetSubscribersResponse })
  @Get('/subscribers/:userId')
  getSubscribers(
    @Param('userId') userId: number,
  ): Promise<SubscriptionsGetSubscribersResponse> {
    return this.subscriptionService.getSubscribers(userId);
  }

  @ApiOkResponse({ type: SubscriptionsGetResponse })
  @Get('/:userId')
  getSubscriptions(
    @Param('userId') userId: number,
  ): Promise<SubscriptionsGetResponse> {
    return this.subscriptionService.getSubscriptions(userId);
  }
}
