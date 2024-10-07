import { LuUsers } from 'react-icons/lu';
import { IoPricetagsOutline } from 'react-icons/io5';
import ProductItem from '../common/item/ProductItem';
import type { IAuctionRegisteredItem } from 'AuctionItem';
import { formatCurrencyWithWon } from '@/utils/formatCurrencyWithWon';

const OngoingMyRegister = ({ product }: { product: IAuctionRegisteredItem }) => {
  const formattedPrice = formatCurrencyWithWon(product.minPrice);

  return (
    <ProductItem product={product}>
      <div className='flex'>
        <div className='flex gap-2'>
          <IoPricetagsOutline className='text-gray-500' />
          <p className='text-sm text-gray-500'>시작가</p>
        </div>
        <p className='ml-4 font-semibold'>{formattedPrice}</p>
      </div>
      <div className='flex'>
        <div className='flex gap-2'>
          <LuUsers className='text-gray-500' />
          <p className='text-sm text-gray-500'>참여자</p>
        </div>
        <p className='ml-4 font-semibold'>{`${product.participantCount}명`}</p>
      </div>
    </ProductItem>
  );
};

export default OngoingMyRegister;
