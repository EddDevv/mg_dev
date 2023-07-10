import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Body,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SubscriptionService } from './subscription.service';
import { SubscriptionResponseDto } from './dto/subscription-response.dto';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { Subscription } from './entities/subscription.entity';

@ApiTags('Subscription')
@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'User subscription successful',
    type: Subscription,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  subscribe(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionService.subscribe(createSubscriptionDto);
  }

  @Get('subscribers/:userId')
  @ApiResponse({
    status: 200,
    description: 'Returns the list of subscribers',
    type: [SubscriptionResponseDto],
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  getSubscribersOf(
    @Param('userId') userId: number,
  ): Promise<SubscriptionResponseDto[]> {
    return this.subscriptionService.findSubscribersOf(userId);
  }

  @Get('subscriptions/:userId')
  @ApiResponse({
    status: 200,
    description: 'Returns the list of subscriptions',
    type: [SubscriptionResponseDto],
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  getSubscriptionsFrom(@Param('userId') userId: number) {
    return this.subscriptionService.findSubscriptionsFrom(userId);
  }

  @Delete(':subscriberId/unsubscribe/:subscribesToId')
  @ApiResponse({
    status: 200,
    description: 'unsubscribes the user',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  unsubscribe(
    @Param('subscriberId') subscriberId: number,
    @Param('subscribesToId') subscribesToId: number,
  ): Promise<void> {
    return this.subscriptionService.unsubscribe(subscriberId, subscribesToId);
  }
}
