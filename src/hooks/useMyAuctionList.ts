import { getAuctionEndRegister, getAuctionOngoingRegister, getAuctionPreEnrollRegister } from '@/components/user/queries';

import { queryKeys } from '@/constants/queryKeys';
import { useInfiniteQuery } from '@tanstack/react-query';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useMyAuctionList = (activeTab: string): any => {
  const {
    data: ongoingData,
    isLoading: _ongoingLoading,
    error: _ongoingError,
    fetchNextPage: fetchNextOngoingPage,
    hasNextPage: hasNextOngoingPage,
    refetch: refetchOngoingData,
  } = useInfiniteQuery({
    queryKey: [queryKeys.USER_AUCTION_REGISTERED],
    queryFn: () => getAuctionOngoingRegister({ pageNumber: 0, pageSize: 10 }),
    getNextPageParam: (lastPage) => {
      if (lastPage.pageNumber + 1 >= lastPage.totalPages) {
        return undefined;
      }
      return lastPage.pageNumber + 1;
    },
    initialPageParam: 0,
    enabled: activeTab === 'ongoing', // 활성화 상태 설정
  });

  const {
    data: endData,
    isLoading: _endLoading,
    error: _endError,
    fetchNextPage: fetchNextEndPage,
    hasNextPage: hasNextEndPage,
    refetch: refetchEndData,
  } = useInfiniteQuery({
    queryKey: [queryKeys.USER_AUCTION_REGISTERED],
    queryFn: () => getAuctionEndRegister({ pageNumber: 0, pageSize: 10 }),
    getNextPageParam: (lastPage) => {
      if (lastPage.pageNumber + 1 >= lastPage.totalPages) {
        return undefined;
      }
      return lastPage.pageNumber + 1;
    },
    initialPageParam: 0,
    enabled: activeTab === 'end', // 활성화 상태 설정
  });

  const {
    data: enrollData,
    isLoading: _enrollLoading,
    error: _enrollError,
    fetchNextPage: fetchNextEnrollPage,
    hasNextPage: hasNextEnrollPage,
    refetch: refetchEnrollData,
  } = useInfiniteQuery({
    queryKey: [queryKeys.USER_PRE_AUCTION_REGISTERED],
    queryFn: () => getAuctionPreEnrollRegister({ pageNumber: 0, pageSize: 10 }),
    getNextPageParam: (lastPage) => {
      if (lastPage.pageNumber + 1 >= lastPage.totalPages) {
        return undefined;
      }
      return lastPage.pageNumber + 1;
    },
    initialPageParam: 0,
    enabled: activeTab === 'preEnroll',
  });

  return {
    ongoingData,
    endData,
    enrollData,
    fetchNextOngoingPage,
    fetchNextEndPage,
    fetchNextEnrollPage,
    hasNextOngoingPage,
    hasNextEndPage,
    hasNextEnrollPage,
    refetchOngoingData,
    refetchEndData,
    refetchEnrollData,
  };
};

export default useMyAuctionList;
