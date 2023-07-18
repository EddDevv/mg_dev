import {
  Body,
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from 'src/domain/posts/post.service';
import {
  PostsCreateRequest,
  PostsUpdateRequest,
} from '../dto/posts/posts.request';
import { PostListResponse, PostResponse } from '../dto/posts/posts.response';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CustomExceptions } from 'src/config/messages/custom.exceptions';
import { AuthGuard } from '../guards/auth.guard';
import { ResponseMessages } from '../../config/messages/response.messages';

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
  getPost(@Param('id') id: number): Promise<PostResponse> {
    return this.postsService.getPost(id);
  }

  @ApiOkResponse({
    type: PostListResponse,
    description: ResponseMessages.posts.findAll,
  })
  @Get()
  getAllPosts(@Param('userId') userId: number): Promise<PostListResponse> {
    return this.postsService.getAllPosts(userId);
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

  @ApiOkResponse({ description: ResponseMessages.posts.remove })
  @ApiNotFoundResponse({ description: CustomExceptions.posts.NotFound })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  deletePost(@Param('id') id: number): Promise<void> {
    return this.postsService.deletePost(id);
  }
}
