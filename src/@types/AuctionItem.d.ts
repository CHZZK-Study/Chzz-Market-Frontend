declare module 'AuctionItem' {
  interface IAuctionItemBase {
    productName: string;
    minPrice: number;
    imageUrl: string;
  }

  export interface IAuctionItem extends IAuctionItemBase {
    auctionId: number;
    participantCount: number;
    timeRemaining: number;
    isParticipated: boolean;
  }
  export interface IAuctionRegisteredItem extends IAuctionItemBase {
    status: string;
    createdAt: string;
    participantCount: number;
    timeRemaining: number;
  }

  export interface IPreAuctionItem extends IAuctionItemBase {
    productId: number;
    likeCount: number;
    isLiked: boolean;
  }
  export interface IPreAuctionRegisteredItem extends IPreAuctionItem {
    createdAt: string;
  }

  export interface IUserAuctionWonItem extends IAuctionItemBase {
    endDateTime: string;
    winningAmount: number;
    auctionId: number;
  }
  export interface IUserAuctionLostItem extends IAuctionItemBase {
    endDateTime: string;
    highestAmount: number;
    auctionId: number;
  }
  export interface IUserAuctionHistoryItem extends Omit<IAuctionItem, 'isParticipated'> {}
}
