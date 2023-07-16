import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Post, PostEntity } from 'src/domain/posts/post.entity';
import { IsOptional } from 'class-validator';
import { UserRoleEnum } from 'src/config/enums/user-role.enum';
import { UserEntity } from 'src/domain/users/user.entity';
import { Comment, CommentEntity } from 'src/domain/comments/comment.entity';

export class CommentsResponse implements Comment {
  @ApiProperty()
  id: number;

  @ApiProperty()
  text: string;

  @ApiProperty({ nullable: true })
  firstName?: string;

  @ApiProperty({ nullable: true })
  lastName?: string | null;

  @ApiProperty({ nullable: true })
  businessName?: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  postId?: number;

  @ApiProperty()
  parentCommentId?: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ type: CommentsResponse, isArray: true })
  replies: CommentsResponse[];

  constructor(commetn: CommentEntity) {
    this.id = commetn.id;
    this.text = commetn.text;
    const { firstName, lastName, businessName } = this.getUserInfo(
      commetn.user,
    );
    this.firstName = firstName;
    this.lastName = lastName;
    this.businessName = businessName;
    this.userId = commetn.userId;
    this.postId = commetn.postId;
    this.parentCommentId = commetn.parentCommentId;
    this.createdAt = commetn.createdAt;
    this.replies = this.makeRepliesResponse(commetn.replies);
  }

  private getUserInfo(user: UserEntity | null): {
    firstName?: string;
    lastName?: string | null;
    businessName?: string;
  } {
    if (!user) {
      return {
        firstName: 'Unknown',
        lastName: undefined,
        businessName: undefined,
      };
    } else {
      switch (user.role) {
        case UserRoleEnum.Business:
          return {
            firstName: undefined,
            lastName: undefined,
            businessName: user.business.businessName,
          };
        case UserRoleEnum.Client:
          return {
            firstName: user.firstname,
            lastName: user.lastName,
            businessName: undefined,
          };
        default:
          return {
            firstName: undefined,
            lastName: undefined,
            businessName: undefined,
          };
      }
    }
  }

  makeRepliesResponse(replies: CommentEntity[]): CommentsResponse[] {
    if (!replies) {
      return [];
    }
    return replies.map((replie) => {
      return new CommentsResponse(replie);
    });
  }
}
