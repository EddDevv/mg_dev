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
import {
  PostRoleListResponse,
  PostsResponse,
  PostsRoleResponse,
} from '../dto/posts/posts.response';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseMessages } from 'src/config/messages/response.messages';
import { AuthGuard } from '../guards/jwt.guard';
import { CustomExceptions } from 'src/config/messages/custom.exceptions';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOkResponse({
    type: PostRoleListResponse,
    description: ResponseMessages.posts.findAll,
  })
  @Get()
  getAllPosts(): Promise<PostRoleListResponse> {
    return this.postsService.getAllPosts();
  }

  @ApiOkResponse({
    type: PostsRoleResponse,
    description: ResponseMessages.user.findOne,
  })
  @ApiNotFoundResponse({ description: CustomExceptions.posts.NotFound })
  @Get(':id')
  getPost(@Param('id') id: string): Promise<PostsRoleResponse> {
    return this.postsService.getPostById(+id);
  }

  @ApiCreatedResponse({
    type: PostsRoleResponse,
    description: ResponseMessages.posts.create,
  })
  @ApiNotFoundResponse({ description: CustomExceptions.posts.NotFound })
  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  createPost(@Body() body: PostsCreateRequest): Promise<PostsResponse> {
    return this.postsService.createPost(body);
  }

  @ApiOkResponse({
    type: PostsRoleResponse,
    description: ResponseMessages.user.update,
  })
  @ApiNotFoundResponse({ description: CustomExceptions.posts.NotFound })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: PostsUpdateRequest,
  ): Promise<PostsResponse> {
    return this.postsService.update(+id, updatePostDto);
  }

  @ApiOkResponse({ description: ResponseMessages.posts.remove })
  @ApiNotFoundResponse({ description: CustomExceptions.posts.NotFound })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  deletePost(@Param('id') id: string): Promise<void> {
    return this.postsService.deletePost(+id);
  }
}
