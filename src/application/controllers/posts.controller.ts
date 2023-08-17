import {
  Body,
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Patch,
  UseGuards,
  Req,
  Query,
  Headers,
} from '@nestjs/common';
import { PostsService } from 'src/domain/posts/post.service';
import {
  PostsAddViewRequest,
  PostsCreateRequest,
  PostsGetListRequest,
  PostsGetRequest,
  PostsUpdateRequest,
} from '../dto/posts/posts.request';
import { PostListResponse, PostResponse } from '../dto/posts/posts.response';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CustomExceptions } from 'src/config/messages/custom.exceptions';
import { AuthGuard } from '../guards/auth.guard';
import { ResponseMessages } from '../../config/messages/response.messages';
import { IRequestUser } from '../../config/user-request.interface';
import {
  LikePostListRequest,
  LikePostRequest,
} from '../dto/likes/likes.request';
import { JwtGuard } from '../guards/jwt.guard';
import { LikePost, LikeListPostResponse } from '../dto/likes/likes.response';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOkResponse({
    type: PostResponse,
    description: ResponseMessages.posts.findOne,
  })
  @ApiNotFoundResponse({ description: CustomExceptions.posts.NotFound })
  @Get()
  getPost(
    @Headers('accept-language') lang: string,
    @Query() query: PostsGetRequest,
  ): Promise<PostResponse> {
    return this.postsService.getPost(query, lang);
  }

  @ApiOkResponse({
    type: PostListResponse,
    description: ResponseMessages.posts.findAll,
  })
  @Get('/list')
  getAllPosts(@Query() query: PostsGetListRequest): Promise<PostListResponse> {
    return this.postsService.getAllPosts(query);
  }

  @ApiCreatedResponse({
    type: PostResponse,
    description: ResponseMessages.posts.create,
  })
  @ApiNotFoundResponse({ description: CustomExceptions.posts.NotFound })
  @Post('/create')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  create(
    @Req() { user }: IRequestUser,
    @Headers('accept-language') lang: string,
    @Body() body: PostsCreateRequest,
  ): Promise<PostResponse> {
    return this.postsService.create(user, body, lang);
  }

  @ApiOkResponse({
    type: PostResponse,
    description: ResponseMessages.posts.update,
  })
  @ApiNotFoundResponse({ description: CustomExceptions.posts.NotFound })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch('/update/:id')
  update(
    @Headers('accept-language') lang: string,
    @Param('id') id: number,
    @Body() body: PostsUpdateRequest,
  ): Promise<PostResponse> {
    return this.postsService.update(id, body, lang);
  }

  @ApiOkResponse({ description: ResponseMessages.posts.addView })
  @ApiUnauthorizedResponse({ description: CustomExceptions.auth.Unauthorized })
  @ApiForbiddenResponse({ description: CustomExceptions.posts.ViewYourOwn })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('/view')
  addView(
    @Req() { user }: IRequestUser,
    @Headers('accept-language') lang: string,
    @Body() body: PostsAddViewRequest,
  ) {
    return this.postsService.addView(user, body, lang);
  }

  @ApiOkResponse({ description: ResponseMessages.posts.remove })
  @ApiNotFoundResponse({ description: CustomExceptions.posts.NotFound })
  @ApiForbiddenResponse({ description: CustomExceptions.posts.DeleteOnlyOwn })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete(':id')
  deletePost(
    @Req() { user }: IRequestUser,
    @Headers('accept-language') lang: string,
    @Param('id') id: number,
  ): Promise<void> {
    return this.postsService.deletePost(user, id, lang);
  }

  @ApiOkResponse({ type: LikePost, description: ResponseMessages.posts.like })
  @ApiUnauthorizedResponse({ description: CustomExceptions.auth.Unauthorized })
  @ApiNotFoundResponse({ description: CustomExceptions.posts.NotFound })
  @ApiForbiddenResponse({ description: CustomExceptions.posts.AlreadyHaveLike })
  @UseGuards(JwtGuard)
  @Post('/like')
  likePost(
    @Headers('accept-language') lang: string,
    @Req() { user }: IRequestUser,
    @Body() body: LikePostRequest,
  ): Promise<LikePost> {
    return this.postsService.like(user, body, lang);
  }

  @ApiOkResponse({
    type: LikeListPostResponse,
    description: ResponseMessages.posts.getLikes,
  })
  @ApiNotFoundResponse({ description: CustomExceptions.comments.NotFound })
  @Get('/likes')
  getLikes(
    @Headers('accept-language') lang: string,
    @Query() query: LikePostRequest,
  ): Promise<LikeListPostResponse> {
    return this.postsService.getLikes(query, lang);
  }
}
