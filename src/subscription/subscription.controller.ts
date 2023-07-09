import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SubscriptionService } from './subscription.service';
import { SubscriptionDto } from './dto/subscription.dto';

@ApiTags('Subscription')
@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  subscribe(@Body() subscriptionDto: SubscriptionDto) {
    return this.subscriptionService.subscribe(subscriptionDto);
  }

  @Get('subscribers/:userId')
  getSubscribersOf(@Param('userId') userId: number) {
    return this.subscriptionService.findSubscribersOf(userId);
  }

  @Get('subscriptions/:userId')
  getSubscriptionsFrom(@Param('userId') userId: number) {
    return this.subscriptionService.findSubscriptionsFrom(userId);
  }

  @Delete(':subscriberId/unsubscribe/:publisherId')
  unsubscribe(
    @Param('subscriberId') subscriberId: number,
    @Param('publisherId') publisherId: number,
  ): Promise<void> {
    return this.subscriptionService.unsubscribe(subscriberId, publisherId);
  }
}
