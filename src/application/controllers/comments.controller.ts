import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  Req,
  Query,
  Headers,
} from '@nestjs/common';
import { CommentsService } from 'src/domain/comments/comment.service';
import {
  CommentsCreateRequest,
  CommentsGetRequest,
  CommentsUpdateRequest,
} from '../dto/comments/comments.request';
import { JwtGuard } from '../guards/jwt.guard';
import { IRequestUser } from '../../config/user-request.interface';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CommentResponse } from '../dto/comments/comments.response';
import { CustomExceptions } from '../../config/messages/custom.exceptions';
import { ResponseMessages } from '../../config/messages/response.messages';
import { LikeCommentRequest } from '../dto/likes/likes.request';
import { LikeComment, LikeListResponse } from '../dto/likes/likes.response';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOkResponse({
    type: CommentResponse,
    description: ResponseMessages.comments.create,
  })
  @ApiUnauthorizedResponse({ description: CustomExceptions.auth.Unauthorized })
  @ApiNotFoundResponse({ description: CustomExceptions.posts.NotFound })
  @UseGuards(JwtGuard)
  @Post()
  create(
    @Headers('accept-language') lang: string,
    @Req() { user }: IRequestUser,
    @Body() body: CommentsCreateRequest,
  ): Promise<CommentResponse> {
    return this.commentsService.create(user, body, lang);
  }

  @ApiOkResponse({
    type: CommentResponse,
    description: ResponseMessages.comments.findOne,
  })
  @ApiNotFoundResponse({ description: CustomExceptions.comments.NotFound })
  @Get()
  findOne(
    @Headers('accept-language') lang: string,
    @Query() query: CommentsGetRequest,
  ): Promise<CommentResponse> {
    return this.commentsService.findOne(query, lang);
  }

  @ApiOkResponse({
    type: CommentResponse,
    description: ResponseMessages.comments.update,
  })
  @ApiUnauthorizedResponse({ description: CustomExceptions.auth.Unauthorized })
  @ApiNotFoundResponse({ description: CustomExceptions.comments.NotFound })
  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Headers('accept-language') lang: string,
    @Param('id') id: string,
    @Body() updateCommentDto: CommentsUpdateRequest,
  ): Promise<CommentResponse> {
    return this.commentsService.update(+id, updateCommentDto, lang);
  }

  @ApiOkResponse({ description: ResponseMessages.comments.remove })
  @ApiUnauthorizedResponse({ description: CustomExceptions.auth.Unauthorized })
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(
    @Headers('accept-language') lang: string,
    @Param('id') id: string,
  ): Promise<void> {
    return this.commentsService.remove(+id, lang);
  }

  @ApiOkResponse({
    type: LikeComment,
    description: ResponseMessages.comments.like,
  })
  @ApiUnauthorizedResponse({ description: CustomExceptions.auth.Unauthorized })
  @ApiNotFoundResponse({ description: CustomExceptions.comments.NotFound })
  @UseGuards(JwtGuard)
  @Post('/like')
  likeComment(
    @Headers('accept-language') lang: string,
    @Req() { user }: IRequestUser,
    @Body() body: LikeCommentRequest,
  ): Promise<LikeComment> {
    return this.commentsService.likeComment(user, body, lang);
  }

  @ApiOkResponse({
    type: LikeListResponse,
    description: ResponseMessages.comments.getLikes,
  })
  @ApiNotFoundResponse({ description: CustomExceptions.comments.NotFound })
  @Get('/likes')
  getLikes(
    @Headers('accept-language') lang: string,
    @Query() query: LikeCommentRequest,
  ): Promise<LikeListResponse> {
    return this.commentsService.getLikes(query, lang);
  }
}
