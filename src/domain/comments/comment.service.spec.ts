import { UserEntity } from '../users/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommentsService } from './comment.service';
import { CommentEntity } from './comment.entity';
import { CommentsRepository } from 'src/infrastructure/repositories/comments.repository';
import { UsersRepository } from 'src/infrastructure/repositories/users.repository';
import { PostsRepository } from 'src/infrastructure/repositories/posts.repository';
import { LikesRepository } from 'src/infrastructure/repositories/likes.repository';
import {
  CommentsCreateRequest,
  CommentsGetRequest,
  CommentsUpdateRequest,
} from 'src/application/dto/comments/comments.request';
import { CommentResponse } from 'src/application/dto/comments/comments.response';
import { PostEntity } from '../posts/post.entity';
import { LikeCommentRequest } from 'src/application/dto/likes/likes.request';
import { LikesEntity } from '../likes/likes.entity';
import {
  LikeComment,
  LikeListCommentResponse,
} from 'src/application/dto/likes/likes.response';

describe('CommentsService (unit)', () => {
  let commentsService: CommentsService;

  const mockUserEntity: UserEntity = new UserEntity(
    'TestFirstName',
    'TestLastName',
    'test@test.ru',
    '$2a$10$PwBnARXX49Iqg9HZ.ldwpukZcdJGRRrVEjowgSp.iKUeH.aJh8rb6',
  );
  mockUserEntity.id = 1;

  const mockPostEntity: PostEntity = new PostEntity(
    mockUserEntity,
    1,
    'test text',
  );
  mockPostEntity.id = 1;

  const mockCommentEntity: CommentEntity = new CommentEntity(
    mockUserEntity,
    1,
    'test text',
  );
  mockCommentEntity.id = 1;

  const mockLikesEntityPost: LikesEntity = new LikesEntity(
    mockUserEntity,
    1,
    mockPostEntity,
  );
  mockLikesEntityPost.id = 1;

  const mockLikesEntityComment: LikesEntity = new LikesEntity(
    mockUserEntity,
    1,
    undefined,
    mockCommentEntity,
  );
  mockLikesEntityComment.id = 1;

  const mockCommentsDatabase: CommentEntity[] = [mockCommentEntity];

  const mockUserDatabase: UserEntity[] = [mockUserEntity];

  const mockPostDatabase: PostEntity[] = [mockPostEntity];

  const mockLikeDatabase: LikesEntity[] = [
    mockLikesEntityPost,
    mockLikesEntityComment,
  ];

  const mockCommentsRepository = {
    findOne: jest.fn(async (data) => {
      const response = mockCommentsDatabase.map((commet) => {
        if (data.where.id == commet.id) {
          return commet;
        }
      });

      return response[0];
    }),
    save: jest.fn((dto: CommentEntity): CommentEntity => {
      const response = new CommentEntity(dto.user, dto.userId, dto.text);
      return response;
    }),
    softDelete: jest.fn(async () => null),
  };

  const mockUsersRepository = {
    findOne: jest.fn(async (data) => {
      const response = mockUserDatabase.map((user) => {
        if (data.where.id == user.id) {
          return user;
        }
      });

      return response[0];
    }),
  };

  const mockPostsRepository = {
    findOne: jest.fn(async (data) => {
      const response = mockPostDatabase.map((post) => {
        if (data.where.id == post.id) {
          return post;
        }
      });

      return response[0];
    }),
  };

  const mockLikesRepository = {
    save: jest.fn((dto: LikesEntity): LikesEntity => {
      const response = new LikesEntity(
        dto.user,
        dto.userId,
        dto.post,
        dto.comment,
      );
      return response;
    }),
    findOne: jest.fn(async (data) => {
      const response = mockLikeDatabase.map((like) => {
        if (data.where.id == like.id) {
          return like;
        }
      });

      return response[0];
    }),

    findAndCount: jest.fn(async () => {
      const response = [mockLikeDatabase, mockLikeDatabase.length];
      return response;
    }),
  };

  beforeEach(async () => {
    const refModule: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: CommentsRepository,
          useValue: mockCommentsRepository,
        },
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
        {
          provide: PostsRepository,
          useValue: mockPostsRepository,
        },
        {
          provide: LikesRepository,
          useValue: mockLikesRepository,
        },
      ],
    }).compile();

    commentsService = refModule.get<CommentsService>(CommentsService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('create', () => {
    const mockdValidRequest: CommentsCreateRequest = {
      text: 'test comment',
      postId: 1,
      parentCommentId: 1,
    };

    const mockdInvalidRequest: CommentsCreateRequest = {
      text: 'test comment',
      postId: undefined,
      parentCommentId: undefined,
    };

    const mockdInvalidPostIdRequest: CommentsCreateRequest = {
      text: 'test comment',
      postId: 2,
      parentCommentId: undefined,
    };

    const mockdInvalidPerentIdRequest: CommentsCreateRequest = {
      text: 'test comment',
      postId: undefined,
      parentCommentId: 2,
    };

    describe('Correct data', () => {
      it('should be an instanceof CommentResponse', async () => {
        const response = await commentsService.create(
          mockUserEntity,
          mockdValidRequest,
        );
        expect(response instanceof CommentResponse).toBe(true);
      });
    });
    describe('Incorrect data data', () => {
      it('should throw a BadRequestException', async () => {
        await expect(
          commentsService.create(mockUserEntity, mockdInvalidRequest),
        ).rejects.toThrow(
          new BadRequestException('Not data where paste comment'),
        );
      });
      it('should throw a NotFoundException post', async () => {
        await expect(
          commentsService.create(mockUserEntity, mockdInvalidPostIdRequest),
        ).rejects.toThrow(new NotFoundException('Post not found'));
      });
      it('should throw a NotFoundException comment', async () => {
        await expect(
          commentsService.create(mockUserEntity, mockdInvalidPerentIdRequest),
        ).rejects.toThrow(new NotFoundException('Comment not found'));
      });
    });
  });

  describe('findOne', () => {
    const mockValidRequest: CommentsGetRequest = {
      id: 1,
    };

    const mockInvalidRequest: CommentsGetRequest = {
      id: 2,
    };

    describe('Correct data', () => {
      it('should be an instanceof CommentResponse', async () => {
        const response = await commentsService.findOne(mockValidRequest);
        expect(response instanceof CommentResponse).toBe(true);
      });
    });
    describe('Incorrect data data', () => {
      it('should throw a NotFoundException', async () => {
        await expect(
          commentsService.findOne(mockInvalidRequest),
        ).rejects.toThrow(new NotFoundException('Comment not found'));
      });
    });
  });

  describe('update', () => {
    const validId = 1;
    const invalidId = 2;

    const mockRequest: CommentsUpdateRequest = {
      text: 'test comment',
    };

    describe('Correct data', () => {
      it('should be an instanceof CommentResponse', async () => {
        const response = await commentsService.update(validId, mockRequest);
        expect(response instanceof CommentResponse).toBe(true);
      });
    });
    describe('Incorrect data data', () => {
      it('should throw a NotFoundException', async () => {
        await expect(
          commentsService.update(invalidId, mockRequest),
        ).rejects.toThrow(new NotFoundException('Comment not found'));
      });
    });
  });

  describe('delete', () => {
    const validId = 1;
    const invalidId = 2;

    describe('Correct data', () => {
      it('should delete the comment successfully', async () => {
        const response = await commentsService.remove(validId);
        expect(response).toBeUndefined();
      });
    });
    describe('Incorrect data data', () => {
      it('should throw a NotFoundException', async () => {
        await expect(commentsService.remove(invalidId)).rejects.toThrow(
          new NotFoundException('Comment not found'),
        );
      });
    });
  });

  describe('likeComment', () => {
    const mockdValidRequest: LikeCommentRequest = {
      commentId: 1,
    };

    const mockdInvalidRequest: LikeCommentRequest = {
      commentId: 2,
    };

    describe('Correct data', () => {
      it('should be an instanceof LikeComment', async () => {
        const response = await commentsService.likeComment(
          mockUserEntity,
          mockdValidRequest,
        );
        expect(response instanceof LikeComment).toBe(true);
      });
    });
    describe('Incorrect data data', () => {
      it('should throw a NotFoundException', async () => {
        await expect(
          commentsService.likeComment(mockUserEntity, mockdInvalidRequest),
        ).rejects.toThrow(new NotFoundException('Comment not found'));
      });
    });
  });

  describe('getLikes', () => {
    const mockdValidRequest: LikeCommentRequest = {
      commentId: 1,
    };

    const mockdInvalidRequest: LikeCommentRequest = {
      commentId: 2,
    };

    describe('Correct data', () => {
      it('should be an instanceof LikeListCommentResponse', async () => {
        const response = await commentsService.getLikes(mockdValidRequest);
        expect(response instanceof LikeListCommentResponse).toBe(true);
      });
    });
    describe('Incorrect data data', () => {
      it('should throw a NotFoundException', async () => {
        await expect(
          commentsService.getLikes(mockdInvalidRequest),
        ).rejects.toThrow(new NotFoundException('Comment not found'));
      });
    });
  });
});
