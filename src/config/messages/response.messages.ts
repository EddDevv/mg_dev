import { Subscription } from '../../application/dto/subscriptions/subscriptions.response';

export const ResponseMessages = {
  auth: {
    register: 'User success registration',
    login: 'Success login',
    refreshToken: 'Receive refreshToken',
  },
  businessAccount: {
    create: 'Success creation of business account',
    findAll: 'Get list of business accounts',
    findOne: 'Get business account',
    update: 'Success update business account',
  },
  locations: {},
  user: {
    findAll: 'Get list of users',
    findOne: 'Get user data',
    update: 'Success update',
    remove: 'Success remove',
  },
  posts: {
    create: 'Success creation of post',
    findAll: 'Get list of posts',
    findOne: 'Get post data',
    update: 'Success update',
    remove: 'Success remove',
    subscriptions: {
      subscribe: 'Success subscribe',
      unsubscribe: 'Success unsubscribe',
      getSubscribers: 'Get list of subscribers',
      getSubscriptions: 'Get list of subscriptions',
    },
  },
};
