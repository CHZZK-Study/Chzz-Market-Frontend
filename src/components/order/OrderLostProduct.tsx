import type { IUserAuctionLostItem } from 'AuctionItem';
import { IoPricetagsOutline } from 'react-icons/io5';
import { LuUsers } from 'react-icons/lu';
import ProductItem from '../common/item/ProductItem';
import { formatCurrencyWithWon } from '@/utils/formatCurrencyWithWon';

const OrderLostProduct = ({ product }: { product: IUserAuctionLostItem }) => {
  const date = new Date(product.endDateTime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const formattedDate = `${year}년 ${month}월 ${day}일`;
  const formattedMinPrice = formatCurrencyWithWon(product.minPrice);
  const formattedHighPrice = formatCurrencyWithWon(product.highestAmount);
  

  return (
    <ProductItem product={product}>
      <div className='flex'>
        <div className='flex gap-2'>
          <IoPricetagsOutline className='text-gray-500' />
          <p className='text-sm text-gray-500'>시작가</p>
        </div>
        <p className='ml-4 font-semibold'>{formattedMinPrice}</p>
      </div>
      <div className='flex'>
        <div className='flex gap-2'>
          <LuUsers className='text-gray-500' />
          <p className='text-sm text-gray-500'>마감된 날짜</p>
        </div>
        <p className='ml-4 font-semibold'>{formattedDate}</p>
      </div>
      <div className='flex'>
        <div className='flex gap-2'>
          <LuUsers className='text-gray-500' />
          <p className='text-sm text-gray-500'>가장 높은 금액</p>
        </div>
        <p className='ml-4 font-semibold'>{formattedHighPrice}</p>
      </div>
    </ProductItem>
  );
};

export default OrderLostProduct;
