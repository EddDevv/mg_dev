import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PostsService } from './post.service';
import { UsersRepository } from 'src/infrastructure/repositories/users.repository';
import { LikesRepository } from 'src/infrastructure/repositories/likes.repository';
import { PostsRepository } from 'src/infrastructure/repositories/posts.repository';
import { UserEntity } from '../users/user.entity';
import { PostEntity } from './post.entity';
import { LikesEntity } from '../likes/likes.entity';
import {
  PostsAddViewRequest,
  PostsCreateRequest,
  PostsGetListRequest,
  PostsGetRequest,
  PostsUpdateRequest,
} from 'src/application/dto/posts/posts.request';
import {
  PostListResponse,
  PostResponse,
} from 'src/application/dto/posts/posts.response';
import { LikePostRequest } from 'src/application/dto/likes/likes.request';
import {
  LikeListPostResponse,
  LikePost,
} from 'src/application/dto/likes/likes.response';

describe('CommentsService (unit)', () => {
  let postsService: PostsService;

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

  const mockLikesEntity: LikesEntity = new LikesEntity(
    mockUserEntity,
    1,
    mockPostEntity,
  );
  mockLikesEntity.id = 1;

  const mockUserDatabase: UserEntity[] = [mockUserEntity];

  const mockPostDatabase: PostEntity[] = [mockPostEntity];

  const mockLikeDatabase: LikesEntity[] = [mockLikesEntity];

  const mockUsersRepository = {
    findOne: jest.fn(async (data) => {
      for (let index = 0; index < mockUserDatabase.length; index++) {
        const user = mockUserDatabase[index];
        if (data.where.id == user.id) {
          return user;
        }
      }
      return undefined;
    }),
  };

  const mockPostsRepository = {
    save: jest.fn((dto: PostEntity): PostEntity => {
      return new PostEntity(dto.user, dto.userId, dto.text);
    }),

    findOne: jest.fn(async (data) => {
      for (let index = 0; index < mockPostDatabase.length; index++) {
        const post = mockPostDatabase[index];
        if (data.where.id == post.id) {
          return post;
        }
      }
      return undefined;
    }),

    findAndCount: jest.fn(async () => {
      return [mockPostDatabase, mockPostDatabase.length];
    }),

    softDelete: jest.fn(async () => null),
  };

  const mockLikesRepository = {
    save: jest.fn((dto: LikesEntity): LikesEntity => {
      return new LikesEntity(dto.user, dto.userId, dto.post, dto.comment);
    }),
    findOne: jest.fn(async (data) => {
      for (let index = 0; index < mockLikeDatabase.length; index++) {
        const like = mockLikeDatabase[index];
        if (data.where.id == like.id) {
          return like;
        }
      }
      return undefined;
    }),

    findAndCount: jest.fn(async () => {
      return [mockLikeDatabase, mockLikeDatabase.length];
    }),
  };

  beforeEach(async () => {
    const refModule: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: PostsRepository,
          useValue: mockPostsRepository,
        },
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
        {
          provide: LikesRepository,
          useValue: mockLikesRepository,
        },
      ],
    }).compile();

    postsService = refModule.get<PostsService>(PostsService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('create', () => {
    const mockdValidRequest: PostsCreateRequest = {
      text: 'test text',
      userId: 1,
    };

    const mockdInvalidRequest: PostsCreateRequest = {
      text: 'test text',
      userId: 2,
    };

    describe('Correct data', () => {
      it('should be an instanceof PostResponse', async () => {
        const response = await postsService.create(mockdValidRequest);
        expect(response instanceof PostResponse).toBe(true);
      });
    });
    describe('Incorrect data data', () => {
      it('should throw a NotFoundException', async () => {
        await expect(postsService.create(mockdInvalidRequest)).rejects.toThrow(
          new NotFoundException('User not found'),
        );
      });
    });
  });

  describe('getAllPosts', () => {
    const mockRequest: PostsGetListRequest = {
      userId: 1,
    };

    it('should be an instanceof PostListResponse', async () => {
      const response = await postsService.getAllPosts(mockRequest);
      expect(response instanceof PostListResponse).toBe(true);
    });
  });

  describe('findOne', () => {
    const mockValidRequest: PostsGetRequest = {
      id: 1,
    };

    const mockInvalidRequest: PostsGetRequest = {
      id: 2,
    };

    describe('Correct data', () => {
      it('should be an instanceof PortfolioResponse', async () => {
        const response = await postsService.getPost(mockValidRequest);
        expect(response instanceof PostResponse).toBe(true);
      });
    });
    describe('Incorrect data data', () => {
      it('should throw a NotFoundException', async () => {
        await expect(postsService.getPost(mockInvalidRequest)).rejects.toThrow(
          new NotFoundException('Post not found'),
        );
      });
    });
  });

  describe('addView', () => {
    const mockValidRequest: PostsAddViewRequest = {
      id: 1,
    };

    const mockInvalidRequest: PostsAddViewRequest = {
      id: 2,
    };

    describe('Correct data', () => {
      it('should addView the post successfully', async () => {
        const response = await postsService.addView(mockValidRequest);
        expect(response).toBeUndefined();
      });
    });
    describe('Incorrect data data', () => {
      it('should throw a NotFoundException', async () => {
        await expect(postsService.addView(mockInvalidRequest)).rejects.toThrow(
          new NotFoundException('Post not found'),
        );
      });
    });
  });

  describe('update', () => {
    const validId = 1;
    const invalidId = 2;

    const mockRequest: PostsUpdateRequest = {
      text: 'test text',
    };

    describe('Correct data', () => {
      it('should be an instanceof PostResponse', async () => {
        const response = await postsService.update(validId, mockRequest);
        expect(response instanceof PostResponse).toBe(true);
      });
    });
    describe('Incorrect data data', () => {
      it('should throw a NotFoundException', async () => {
        await expect(
          postsService.update(invalidId, mockRequest),
        ).rejects.toThrow(new NotFoundException('Post not found'));
      });
    });
  });

  describe('deletePost', () => {
    const validId = 1;
    const invalidId = 2;

    describe('Correct data', () => {
      it('should delete the post successfully', async () => {
        const response = await postsService.deletePost(validId);
        expect(response).toBeUndefined();
      });
    });
    describe('Incorrect data data', () => {
      it('should throw a NotFoundException', async () => {
        await expect(postsService.deletePost(invalidId)).rejects.toThrow(
          new NotFoundException('Post not found'),
        );
      });
    });
  });

  describe('getAllPosts', () => {
    const mockRequest: PostsGetListRequest = {
      userId: 1,
    };

    it('should be an instanceof PostListResponse', async () => {
      const response = await postsService.getAllPosts(mockRequest);
      expect(response instanceof PostListResponse).toBe(true);
    });
  });

  describe('like', () => {
    const mockValidRequest: LikePostRequest = {
      postId: 1,
    };

    const mockInvalidRequest: LikePostRequest = {
      postId: 2,
    };

    describe('Correct data', () => {
      it('should be an instanceof LikePost', async () => {
        const response = await postsService.like(
          mockUserEntity,
          mockValidRequest,
        );
        expect(response instanceof LikePost).toBe(true);
      });
    });
    describe('Incorrect data data', () => {
      it('should throw a NotFoundException', async () => {
        await expect(
          postsService.like(mockUserEntity, mockInvalidRequest),
        ).rejects.toThrow(new NotFoundException('Post not found'));
      });
    });
  });

  describe('getLikes', () => {
    const mockValidRequest: LikePostRequest = {
      postId: 1,
    };

    const mockInvalidRequest: LikePostRequest = {
      postId: 2,
    };

    describe('Correct data', () => {
      it('should be an instanceof LikeListPostResponse', async () => {
        const response = await postsService.getLikes(mockValidRequest);
        expect(response instanceof LikeListPostResponse).toBe(true);
      });
    });
    describe('Incorrect data data', () => {
      it('should throw a NotFoundException', async () => {
        await expect(postsService.getLikes(mockInvalidRequest)).rejects.toThrow(
          new NotFoundException('Post not found'),
        );
      });
    });
  });
});
