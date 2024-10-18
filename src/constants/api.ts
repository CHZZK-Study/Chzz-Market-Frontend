export const API_END_POINT = {
  // AUTH
  LOGIN: {
    KAKAO: '/auth/kakao',
    NAVER: '/auth/naver',
  },
  LOGOUT: '/api/v1/users/logout',
  NICKNAME_CHECK: 'api/v1/users/check/nickname',
  REFRESH_TOKEN: '/api/v1/users/tokens/reissue',
  SIGNUP: '/api/v1/users',
  PROFILE: '/api/v1/users/profile',
  ORDER_LIST: '/order/list',
  MY_ACUTION_PRE_REGISTER: '/product/list/api/v1/users/me/auctions',

  BEST: '/api/v1/auctions/best',
  IMMINENT: '/api/v1/auctions/imminent',
  PRE_AUCTION: '/api/v1/products',
  AUCTIONS: '/api/v1/auctions',
  NOTIFICATIONS: '/api/v1/notifications',
  REALTIME_NOTIFICATIONS: '/api/v1/notifications/subscribe',

  USER_ONGOING_AUCTION_REGISTERED: '/api/v1/auctions/users/proceeding',
  USER_END_AUCTION_REGISTERD: '/api/v1/auctions/users/ended',
  USER_PRE_AUCTION_REGISTERED: '/api/v1/products/users',

  AUCTION_ITEM: '/api/v1/auctions/auction/:auctionId',
  PRE_AUCTION_ITEM: '/api/v1/pre-auction/:auctionId',

  BID: '/api/v1/bids',
  PAYMENT: '/api/v1/payments/approval',
  CREATE_ORDERID: '/api/v1/payments/order-id',
};
