import { httpClient } from '@/api/axios';
import { API_END_POINT } from '@/constants/api';
import { IUserAuctionHistoryList, IUserAuctionLostList } from 'AuctionList';

export interface GetProductParams {
  pageNumber: number;
  pageSize: number;
}

export const getMyHistoryAuction = async ({ pageNumber, pageSize }: GetProductParams): Promise<IUserAuctionHistoryList> => {
  const response = await httpClient.get(`${API_END_POINT.BID}?status=proceeding&page=${pageNumber}&size=${pageSize}`);
  return response.data;
};

export const getMyWonAuction = async ({ pageNumber, pageSize }: GetProductParams): Promise<IUserAuctionLostList> => {
  const response = await httpClient.get(`${API_END_POINT.AUCTIONS}/won?page=${pageNumber}&size=${pageSize}`);
  return response.data;
};

export const getMyLostAuction = async ({ pageNumber, pageSize }: GetProductParams): Promise<IUserAuctionLostList> => {
  const response = await httpClient.get(`${API_END_POINT.AUCTIONS}/lost?page=${pageNumber}&size=${pageSize}`);
  return response.data;
};
