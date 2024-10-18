import type { IUserAuctionLostItem } from 'AuctionItem';
import { LuUsers } from 'react-icons/lu';
import ProductItem from '../common/item/ProductItem';
import { formatCurrencyWithWon } from '@/utils/formatCurrencyWithWon';
import MinPrice from '../common/atomic/MinPrice';
import CreatedAt from '../common/atomic/Created';

const OrderLostProduct = ({ product }: { product: IUserAuctionLostItem }) => {
  const formattedHighPrice = formatCurrencyWithWon(product.highestAmount);
  

  return (
    <ProductItem product={product}>
      <MinPrice price={product.minPrice} />
      <CreatedAt createAt={product.endDateTime} />
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
