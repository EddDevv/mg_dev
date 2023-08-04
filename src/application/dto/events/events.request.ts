import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IPost } from '../../../domain/posts/post.entity';
import { UserEntity } from '../../../domain/users/user.entity';

