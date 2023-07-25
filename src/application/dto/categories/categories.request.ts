import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IPost } from '../../../domain/posts/post.entity';
import { UserEntity } from '../../../domain/users/user.entity';
import { ICategory } from 'src/domain/categories/categories.entity';

export class CategoriesCreateRequest implements ICategory {
  @ApiProperty({
    example: 'Nails',
    description: 'The name of category',
  })
  @IsNotEmpty()
  @IsString()
  title: string;
}

export class CategoriesGetRequest {
  @ApiProperty()
  id: number;
}

export class CategoriesUpdateRequest implements ICategory {
  @ApiProperty({
    example: 'Nails',
    description: 'The name of category',
  })
  @IsString()
  title: string;
}
