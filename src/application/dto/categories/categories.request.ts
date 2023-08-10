import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ICategory } from 'src/domain/categories/categories.entity';

export class CategoriesCreateRequest
  implements Omit<ICategory, 'services' | 'portfolios'>
{
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

export class CategoriesUpdateRequest
  implements Omit<ICategory, 'services' | 'portfolios'>
{
  @ApiProperty({
    example: 'Nails',
    description: 'The name of category',
  })
  @IsString()
  title: string;
}
