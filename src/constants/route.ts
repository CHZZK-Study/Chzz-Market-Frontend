const ROUTERS = Object.freeze({
  HOME: '/',
  HEART: '/heart',
  NOTIFICATION: '/notification',
  USER: '/user',
  REGISTERED_LIST: '/user/list/registered',
  PARTICIPATED_LIST: '/user/list/participated',

  SIGNUP: '/signup',
  LOGIN: '/login',
  PROFILE_EDIT: 'user/profile/edit',
  PRODUCT_LIST: '/product/list',
  REGISTER: '/auctions/register',
  AUCTION: {
    ITEM: '/auctions/auction',
  },
  PRE_AUCTION: {
    ITEM: '/auctions/pre-auction',
    EDIT: '/auctions/pre-auction/edit',
  },
  ADDRESSBOOK: '/addressbook',
  BID: '/auctions/bid/:auctionId',
  FINAL_BIDDER_LIST: '/auctions/:auctionId/final-bidder-list',
  PAYMENT: '/payment/:auctionId'
});

export default ROUTERS;
