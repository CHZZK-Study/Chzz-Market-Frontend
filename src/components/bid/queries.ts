import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { httpClient } from '@/api/axios';
import { API_END_POINT } from '@/constants/api';
import { IBidPostData } from 'Bid';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const usePostBid = (
  auctionId: number
): {
  mutate: UseMutateFunction<void, Error, IBidPostData, unknown>;
} => {
  const postBid = async (bidData: IBidPostData) => {
    await httpClient.post(API_END_POINT.BID, bidData);
  };

  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: postBid,
    onSuccess: () => {
      toast.success('입찰 성공!');
      navigate(`/auctions/auction/${auctionId}`);
    },
  });

  return { mutate };
};
