import { useEffect, useState } from 'react';
import Button from '@/components/common/Button';
import classNames from 'classnames';

interface ProductButtonsProps {
  setOngoingSortType: (sortType: string) => void;
  setPreAuctionSortType: (sortType: string) => void;
}

const ProductButtons = ({ setOngoingSortType, setPreAuctionSortType }: ProductButtonsProps) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [activeFilter, setActiveFilter] = useState('newest');

  useEffect(() => {
    const resize = () => setWindowSize(window.innerWidth);

    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const buttonSize = windowSize >= 500 ? 'small' : 'xsmall';

  return (
    <div className="flex h-22px space-x-3 p-4">
      <Button
        size={buttonSize}
        color={classNames(activeFilter === 'newest' ? 'black' : 'white')}
        hoverColor="black"
        type="button"
        className="rounded-full"
        onClick={() => {
          setOngoingSortType('newest');
          setPreAuctionSortType('product-newest');
          setActiveFilter('newest');
        }}
      >
        최신순
      </Button>
      <Button
        size={buttonSize}
        color={classNames(activeFilter === 'popularity' ? 'black' : 'white')}
        hoverColor="black"
        type="button"
        className="rounded-full"
        onClick={() => {
          setOngoingSortType('popularity');
          setPreAuctionSortType('most-liked');
          setActiveFilter('popularity');
        }}
      >
        인기
      </Button>
      <Button
        size={buttonSize}
        color={classNames(activeFilter === 'expensive' ? 'black' : 'white')}
        hoverColor="black"
        type="button"
        className="rounded-full"
        onClick={() => {
          setOngoingSortType('expensive');
          setPreAuctionSortType('expensive');
          setActiveFilter('expensive');
        }}
      >
        높은 가격순
      </Button>
      <Button
        size={buttonSize}
        color={classNames(activeFilter === 'cheap' ? 'black' : 'white')}
        hoverColor="black"
        type="button"
        className="rounded-full"
        onClick={() => {
          setOngoingSortType('cheap');
          setPreAuctionSortType('cheap');
          setActiveFilter('cheap');
        }}
      >
        낮은 가격순
      </Button>
    </div>
  );
};

export default ProductButtons;
