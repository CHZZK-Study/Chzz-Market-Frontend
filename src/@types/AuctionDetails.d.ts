declare module 'AuctionDetails' {
  interface IAuctionDetailsBase {
    productId: number;
    sellerNickname: string;
    productName: string;
    description: string;
    minPrice: number;
    isSeller: boolean;
    category: string;
    sellerProfileImageUrl: string;
  }

  export interface IAuctionDetails extends IAuctionDetailsBase {
    timeRemaining: number;
    status: string;
    participantCount: number;
    isParticipated: boolean;
    bidId: number | null;
    bidAmount: number;
    remainingBidCount: number;
    imageUrls: string[];
  }

  export interface IPreAuctionDetails extends IAuctionDetailsBase {
    updatedAt: string;
    likeCount: number;
    isLiked: boolean;
    images: {
      imageId: number;
      imageUrl: string;
    }[];
  }
}
