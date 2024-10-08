import type { IAuctionItem, IPreAuctionItem } from 'AuctionItem';

import CategoryList from '@/components/home/CategoryList';
import EmptyBoundary from '@/components/common/EmptyBoundary';
import HomeAuctionItem from '@/components/home/HomeAuctionItem';
import HomeItemList from '@/components/home/HomeItemList';
import HomeRegisterBtn from '@/components/home/HomeRegisterBtn';
import { useGetHomeAuctions } from '@/components/home/queries';
import { useScrollDetection } from '@/hooks/useScrollDetection';
import CustomCarousel from '@/components/common/CustomCarousel';

const Home = () => {
  const { isScrolled, elementRef } = useScrollDetection(0);
  const { bestAuctions, imminentAuctions, preAuctions } = useGetHomeAuctions();

  return (
    <div ref={elementRef} role='main' aria-label='main_area' className='relative flex flex-col justify-between w-full h-full gap-6 overflow-y-scroll'>
      <div className='flex flex-col gap-10'>
        <HomeItemList name='베스트 경매'>
          <EmptyBoundary dataLength={bestAuctions.length} type='best'>
            <CustomCarousel length={bestAuctions.length}>
              {bestAuctions.map((auction: IAuctionItem) => (
                <HomeAuctionItem key={auction.auctionId} kind='auction' auction={auction} />
              ))}
            </CustomCarousel>
          </EmptyBoundary>
        </HomeItemList>
        <HomeItemList name='종료 임박 경매'>
          <EmptyBoundary dataLength={imminentAuctions.length} type='imminent'>
            <CustomCarousel length={imminentAuctions.length}>
              {imminentAuctions.map((auction: IAuctionItem) => (
                <HomeAuctionItem key={auction.auctionId} kind='auction' auction={auction} />
              ))}
            </CustomCarousel>
          </EmptyBoundary>
        </HomeItemList>
        <HomeItemList name='카테고리'>
          <CategoryList />
        </HomeItemList>
        <HomeItemList name='사전 등록 경매'>
          <EmptyBoundary dataLength={preAuctions.length} type='preAuction'>
            <CustomCarousel length={preAuctions.length}>
              {preAuctions.map((auction: IPreAuctionItem) => (
                <HomeAuctionItem key={auction.productId} kind='preAuction' auction={auction} />
              ))}
            </CustomCarousel>
          </EmptyBoundary>
        </HomeItemList>
      </div>
      <HomeRegisterBtn isScrolled={isScrolled} />
    </div>
  );
};

export default Home;
