import { UseMutateFunction, useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { httpClient } from '@/api/axios';
import { API_END_POINT } from '@/constants/api';
import { queryKeys } from '@/constants/queryKeys';
import { IPreAuctionItem } from 'AuctionItem';
import { toast } from 'sonner';

export const useGetPreAuctionHeartList = () => {
  const getPreAuctionHeartList = async (): Promise<IPreAuctionItem[]> => {
    const response = await httpClient.get(`${API_END_POINT.PRE_AUCTION}/history`);

    return response.data.items;
  };

  const { data: preAuctionHeartList } = useSuspenseQuery({
    queryKey: [queryKeys.PRE_AUCTION_HEART_LIST],
    queryFn: getPreAuctionHeartList,
  });

  return { preAuctionHeartList };
};

export const useDeletePreAuctionHeart = (): {
  mutate: UseMutateFunction<void, Error, number, unknown>;
} => {
  const queryClient = useQueryClient();
  const deletePreAuctionHeart = async (productId: number) => {
    await httpClient.post(`${API_END_POINT.PRE_AUCTION}/${productId}/likes`);
  };

  const { mutate } = useMutation({
    mutationFn: deletePreAuctionHeart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.PRE_AUCTION_HEART_LIST],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.PRE_AUCTION_DETAILS],
      });
      toast.success('좋아요 취소되었습니다.');
    },
  });

  return { mutate };
};
