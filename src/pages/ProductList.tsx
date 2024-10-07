import type { IAuctionItem, IPreAuctionItem } from 'AuctionItem';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Layout from '@/components/layout/Layout';
import OngoingProduct from '@/components/productList/OngoingProduct';
import PreEnrollProduct from '@/components/productList/PreEnrollProduct';
import ProductButtons from '@/components/productList/ProductButtons';
import ProductListTabs from '@/components/productList/ProductListTabs';
import useProductList from '@/hooks/useProductList';

const ProductList = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [sortType, setSortType] = useState('newest');
  const navigate = useNavigate();
  const loader = useRef(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';

  const { ongoingData, enrollData, fetchNextOngoingPage, fetchNextEnrollPage, hasNextOngoingPage, hasNextEnrollPage, refetchOngoingData, refetchEnrollData } =
    useProductList(activeTab, sortType, category);

  const ongoingItems = ongoingData?.pages[0]?.items || [];
  const enrollItems = enrollData?.pages[0]?.items || [];

  const handleObserver = useCallback(
    (entities: IntersectionObserverEntry[]) => {
      const target = entities[0];
      if (target.isIntersecting) {
        if (hasNextOngoingPage) {
          fetchNextOngoingPage();
        }
        if (hasNextEnrollPage) {
          fetchNextEnrollPage();
        }
      }
    },
    [fetchNextOngoingPage, fetchNextEnrollPage, hasNextOngoingPage, hasNextEnrollPage]
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
  }, [fetchNextOngoingPage, hasNextOngoingPage, handleObserver]);

  useEffect(() => {
    if (activeTab === 'ongoing') {
      refetchOngoingData();
    } else {
      refetchEnrollData();
    }
  }, [activeTab, refetchOngoingData, refetchEnrollData]);

  return (
    <Layout>
      <Layout.Header title='상품 경매 목록' handleBack={() => navigate('/')} />
      <Layout.Main style={{ paddingLeft: 0, paddingRight: 0 }} ref={mainContainerRef}>
        <ProductListTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <ProductButtons setSortType={setSortType} />
        <div className='grid grid-cols-2 grid-rows-3 gap-4 p-4 h-[calc(100vh-100px)] overflow-y-auto'>
          {activeTab === 'ongoing'
            ? ongoingItems?.map((product: IAuctionItem) => <OngoingProduct key={product.auctionId} product={product} />)
            : enrollItems?.map((product: IPreAuctionItem) => <PreEnrollProduct key={product.productId} product={product} />)}
          <div ref={loader} />
        </div>
      </Layout.Main>
    </Layout>
  );
};

export default ProductList;
