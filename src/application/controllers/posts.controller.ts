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
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CustomExceptions } from 'src/config/messages/custom.exceptions';
import { AuthGuard } from '../guards/auth.guard';
import { ResponseMessages } from '../../config/messages/response.messages';
import { IRequestUser } from '../../config/user-request.interface';
import { LikePostRequest } from '../dto/likes/likes.request';
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
  @Get(':id')
  getPost(@Param() param: PostsGetRequest): Promise<PostResponse> {
    return this.postsService.getPost(param);
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
  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  create(@Body() body: PostsCreateRequest): Promise<PostResponse> {
    return this.postsService.create(body);
  }

  @ApiOkResponse({
    type: PostResponse,
    description: ResponseMessages.posts.update,
  })
  @ApiNotFoundResponse({ description: CustomExceptions.posts.NotFound })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() body: PostsUpdateRequest,
  ): Promise<PostResponse> {
    return this.postsService.update(id, body);
  }

  @ApiOkResponse({ description: ResponseMessages.posts.addView })
  @ApiUnauthorizedResponse({ description: CustomExceptions.auth.Unauthorized })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('/view')
  addView(@Body() body: PostsAddViewRequest) {
    return this.postsService.addView(body);
  }

  @ApiOkResponse({ description: ResponseMessages.posts.remove })
  @ApiNotFoundResponse({ description: CustomExceptions.posts.NotFound })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  deletePost(@Param('id') id: number): Promise<void> {
    return this.postsService.deletePost(id);
  }

  @ApiOkResponse({ type: LikePost, description: ResponseMessages.posts.like })
  @ApiUnauthorizedResponse({ description: CustomExceptions.auth.Unauthorized })
  @ApiNotFoundResponse({ description: CustomExceptions.posts.NotFound })
  @UseGuards(JwtGuard)
  @Post('/like')
  likePost(
    @Req() { user }: IRequestUser,
    @Body() body: LikePostRequest,
  ): Promise<LikePost> {
    return this.postsService.like(user, body);
  }

  @ApiOkResponse({
    type: LikeListPostResponse,
    description: ResponseMessages.posts.getLikes,
  })
  @ApiNotFoundResponse({ description: CustomExceptions.comments.NotFound })
  @Get('/likes')
  getLikes(@Param() params: LikePostRequest): Promise<LikeListPostResponse> {
    return this.postsService.getLikes(params);
  }
}
