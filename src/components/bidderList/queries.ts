import { API_END_POINT } from '@/constants/api';
import { httpClient } from '@/api/axios';
import { queryKeys } from '@/constants/queryKeys';
import { useSuspenseQuery } from '@tanstack/react-query';
import { IBidder } from 'Bid';

export const useGetBidderList = (auctionId: number, sort: 'desc' | 'asc') => {
  const getBidderList = async (): Promise<IBidder[]> => {
    const response = await httpClient.get(`${API_END_POINT.AUCTIONS}/${auctionId}/bids?sort=bid-amount,${sort}`);

    return response.data.items;
  };

  const { data: bidderList } = useSuspenseQuery({
    queryKey: [queryKeys.BIDDER_LIST, auctionId, sort],
    queryFn: getBidderList,
  });

  return { bidderList };
};
