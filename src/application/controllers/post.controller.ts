import {
  Body,
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Patch,
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
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResponseMessages } from 'src/config/messages/response.messages';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOkResponse({
    type: PostRoleListResponse,
    description: ResponseMessages.posts.findAll,
  })
  @Get()
  async getAllPosts(): Promise<PostRoleListResponse> {
    return this.postsService.getAllPosts();
  }

  @ApiOkResponse({
    type: PostsRoleResponse,
    description: ResponseMessages.user.findOne,
  })
  @Get(':id')
  async getPost(@Param('id') id: string): Promise<PostsRoleResponse> {
    return this.postsService.getPostById(+id);
  }

  @ApiCreatedResponse({
    type: PostsRoleResponse,
    description: ResponseMessages.posts.create,
  })
  @Post()
  async createPost(
    @Body() body: PostsCreateRequest,
  ): Promise<PostsRoleResponse> {
    return this.postsService.createPost(body);
  }

  @ApiOkResponse({
    type: PostsRoleResponse,
    description: ResponseMessages.user.update,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: PostsUpdateRequest,
  ): Promise<PostsResponse> {
    return this.postsService.update(+id, updatePostDto);
  }

  @ApiOkResponse({ description: ResponseMessages.posts.remove })
  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<void> {
    return this.postsService.deletePost(+id);
  }
}
