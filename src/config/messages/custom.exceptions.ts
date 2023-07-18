export const CustomExceptions = {
  auth: {
    AlreadyRegistered: 'User with this email already exists',
    NotTheSamePasswords: 'Not the same passwords',
    InvalidCred: 'Invalid credentials',
    InvalidRefresh: 'Invalid refresh token',
    Unauthorized: 'Unauthorized',
  },
  businessAccount: {
    AlreadyHave: 'You already have a business account',
  },
  locations: {},
  user: {
    NotFound: 'User not found',
    NotSelfUpdate: 'Only update yourself',
  },
  posts: {
    NotFound: `Post not found`,
  },
  comments: {
    NotPasteData: 'Not data where paste comment',
    NotFound: `Comment not found`,
  },
};
