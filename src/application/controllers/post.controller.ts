import { Body, Controller, Get, Param, Delete, Post } from '@nestjs/common';
import { PostsService } from 'src/domain/posts/post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  async getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    return this.postsService.getPostById(+id);
  }

  @Post()
  async createPost(@Body('text') text: string, @Body('userId') userId: number) {
    return this.postsService.createPost(text, userId);
  }

  // @Patch(':id')
  // async updatePost(
  //   @Param('id') id: string,
  //   @Body('title') title: string,
  //   @Body('content') content: string,
  // ): Promise<PostEntity> {
  //   return this.postsService.up(+id, { title, content });
  // }

  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<void> {
    return this.postsService.deletePost(+id);
  }
}
