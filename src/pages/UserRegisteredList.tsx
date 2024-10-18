import { IAuctionEndRegisteredItem, IAuctionOngoingRegisteredItem, IPreAuctionRegisteredItem } from 'AuctionItem';
import { useCallback, useEffect, useRef, useState } from 'react';

import EmptyBoundary from '@/components/common/boundary/EmptyBoundary';
import OngoingMyRegister from '@/components/user/OngoingMyRegister';
import PreEnrollMyRegister from '@/components/user/PreEnrollMyRegister';
import UserOrderTab from '@/components/user/UserOrderTab';
import useMyAuctionList from '@/hooks/useMyAuctionList';
import { useLocation } from 'react-router-dom';
import EndMyRegister from '@/components/user/EndMyRegister';

const UserRegisteredList = () => {
  const location = useLocation();
  const sortType = location.state?.sortType;
  const [activeTab, setActiveTab] = useState(sortType);
  const loader = useRef(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  const { ongoingData, endData, enrollData, fetchNextOngoingPage, fetchNextEndPage, fetchNextEnrollPage, hasNextOngoingPage, hasNextEndPage, hasNextEnrollPage, refetchOngoingData, refetchEndData, refetchEnrollData } =
    useMyAuctionList(activeTab);

  const ongoingItems = ongoingData?.pages[0]?.items || [];
  const endItems = endData?.pages[0]?.items || [];
  const enrollItems = enrollData?.pages[0]?.items || [];

  const handleObserver = useCallback(
    (entities: IntersectionObserverEntry[]) => {
      const target = entities[0];
      if (target.isIntersecting) {
        if (hasNextOngoingPage) {
          fetchNextOngoingPage();
        }
        if (hasNextEndPage) {
          fetchNextEndPage();
        }
        if (hasNextEnrollPage) {
          fetchNextEnrollPage();
        }
      }
    },
    [fetchNextOngoingPage, fetchNextEndPage, fetchNextEnrollPage, hasNextOngoingPage, hasNextEndPage, hasNextEnrollPage]
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
  }, [fetchNextOngoingPage, fetchNextEndPage, fetchNextEnrollPage, hasNextOngoingPage, hasNextEndPage, hasNextEnrollPage, handleObserver]);

  useEffect(() => {
    if (activeTab === 'ongoing') {
      refetchOngoingData();
    } else if (activeTab === 'end') {
      refetchEndData();
    } else {
      refetchEnrollData();
    }
  }, [activeTab, refetchOngoingData, refetchEndData, refetchEnrollData]);

  return (
    <div className='mx-[-32px] my-[-4px] h-full'>
      <UserOrderTab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'ongoing' && 
        <EmptyBoundary length={ongoingItems.length} name='userAuction'>
          <div className={`grid grid-cols-2 grid-rows-3 gap-4 p-4 h-[calc(100vh-100px)] overflow-y-auto`}>
            {ongoingItems.map((product: IAuctionOngoingRegisteredItem) => (
              <OngoingMyRegister product={product} key={product.auctionId} />
            ))}
          </div>
        </EmptyBoundary>
      }
      {activeTab === 'end' &&
        <EmptyBoundary length={ongoingItems.length} name='userAuction'>
          <div className={`grid grid-cols-2 grid-rows-3 gap-4 p-4 h-[calc(100vh-100px)] overflow-y-auto`}>
            {endItems.map((product: IAuctionEndRegisteredItem) => (
              <EndMyRegister product={product} key={product.auctionId} />
            ))}
          </div>
        </EmptyBoundary>
      }
      {activeTab === 'preEnroll' &&
        <EmptyBoundary length={enrollItems.length} name='userPreAuction'>
          <div className={`grid grid-cols-2 grid-rows-3 gap-4 p-4 h-[calc(100vh-100px)] overflow-y-auto`}>
            {enrollItems.map((product: IPreAuctionRegisteredItem) => (
              <PreEnrollMyRegister product={product} key={product.productId} />
            ))}
          </div>
        </EmptyBoundary>
      }
    </div>
  );
};

export default UserRegisteredList;
