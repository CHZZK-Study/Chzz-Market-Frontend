import { IAuctionEndRegisteredList, IAuctionOngoingRegisteredList, IPreAuctionRegisteredList } from 'AuctionList';

import { httpClient } from '@/api/axios';
import { API_END_POINT } from '@/constants/api';

export interface GetAuctionProps {
  pageNumber: number;
  pageSize: number;
  sortType?: string;
}

export const getAuctionOngoingRegister = async ({ pageNumber, pageSize, sortType = 'newest' }: GetAuctionProps): Promise<IAuctionOngoingRegisteredList> => {
  const response = await httpClient.get(`${API_END_POINT.USER_ONGOING_AUCTION_REGISTERED}?sort=${sortType}&page=${pageNumber}&size=${pageSize}`);
  return response.data;
};

export const getAuctionEndRegister = async ({ pageNumber, pageSize, sortType = 'newest' }: GetAuctionProps): Promise<IAuctionEndRegisteredList> => {
  const response = await httpClient.get(`${API_END_POINT.USER_END_AUCTION_REGISTERD}?sort=${sortType}&page=${pageNumber}&size=${pageSize}`);
  return response.data;
};

export const getAuctionPreEnrollRegister = async ({
  pageNumber,
  pageSize,
  sortType = 'product-newest',
}: GetAuctionProps): Promise<IPreAuctionRegisteredList> => {
  const response = await httpClient.get(`${API_END_POINT.USER_PRE_AUCTION_REGISTERED}?sort=${sortType}&page=${pageNumber}&size=${pageSize}`);
  return response.data;
};
