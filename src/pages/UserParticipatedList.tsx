import type { IUserAuctionHistoryItem, IUserAuctionLostItem, IUserAuctionWonItem } from 'AuctionItem';
import { useCallback, useEffect, useRef, useState } from 'react';

import OrderHistoryProduct from '@/components/order/OrderHistoryProduct';
import OrderListTab from '@/components/order/OrderListTab';
import OrderLostProduct from '@/components/order/OrderLostProduct';
import OrderWonProduct from '@/components/order/OrderWonProduct';
import useHistory from '@/hooks/useHistory';
import { useLocation } from 'react-router-dom';

const UserParticipatedList = () => {
  const location = useLocation();
  const sortType = location.state?.sortType;
  const [activeTab, setActiveTab] = useState(sortType || 'AuctionHistory');
  const loader = useRef(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const {
    historyData,
    wonData,
    lostData,
    fetchNextHistoryPage,
    fetchNextWonPage,
    fetchNextLostPage,
    hasNextHistoryPage,
    hasNextWonPage,
    hasNextLostPage,
    refetchHistoryData,
    refetchWonData,
    refetchLostData,
  } = useHistory(activeTab);
  const historyItems = historyData?.pages[0]?.items || [];
  const wonItems = wonData?.pages[0]?.items || [];
  const lostItems = lostData?.pages[0]?.items || [];

  const handleObserver = useCallback(
    (entities: IntersectionObserverEntry[]) => {
      const target = entities[0];
      if (target.isIntersecting) {
        if (hasNextHistoryPage) {
          fetchNextHistoryPage();
        }
        if (hasNextWonPage) {
          fetchNextWonPage();
        }
        if (hasNextLostPage) {
          fetchNextLostPage();
        }
      }
    },
    [hasNextHistoryPage, fetchNextHistoryPage, hasNextWonPage, fetchNextWonPage, hasNextLostPage, fetchNextLostPage]
  );

  useEffect(() => {
    const options = {
      root: mainContainerRef.current,
      rootMargin: '0px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);

    const currentLoader = loader.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [hasNextHistoryPage, hasNextWonPage, hasNextLostPage, handleObserver]);

  useEffect(() => {
    if (activeTab === 'AuctionHistory') {
      refetchHistoryData();
    } else if (activeTab === 'AuctionsWon') {
      refetchWonData();
    } else if (activeTab === 'AuctionsLost') {
      refetchLostData();
    }
  }, [activeTab, refetchHistoryData, refetchWonData, refetchLostData]);

  return (
    <div className='mx-[-32px] my-[-4px]'>
      <OrderListTab activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="grid grid-cols-2 grid-rows-3 gap-4 p-4 h-[calc(100vh-100px)] overflow-y-auto">
        {activeTab === 'AuctionHistory' &&
          historyItems.map((product: IUserAuctionHistoryItem) => <OrderHistoryProduct key={product.auctionId} product={product} />)}
        {activeTab === 'AuctionsWon' && wonItems.map((product: IUserAuctionWonItem) => <OrderWonProduct key={product.auctionId} product={product} />)}
        {activeTab === 'AuctionsLost' && lostItems.map((product: IUserAuctionLostItem) => <OrderLostProduct key={product.auctionId} product={product} />)}
      </div>
    </div>
  );
};

export default UserParticipatedList;
