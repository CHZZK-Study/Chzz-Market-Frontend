import type { IUserAuctionHistoryItem } from 'AuctionItem';
import { IoPricetagsOutline } from 'react-icons/io5';
import { LuUsers } from 'react-icons/lu';
import ProductItem from '../common/item/ProductItem';
import { formatCurrencyWithWon } from '@/utils/formatCurrencyWithWon';
import { useNavigate } from 'react-router-dom';

const OrderHistoryProduct = ({ product }: { product: IUserAuctionHistoryItem }) => {
  const navigate = useNavigate();
  const formattedPrice = formatCurrencyWithWon(product.minPrice);
  
  return (
    <ProductItem product={product} onClick={() => navigate(`/auctions/bid/${product.auctionId}`)}>
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

export default OrderHistoryProduct;
