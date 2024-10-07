import Button from '../common/Button';
import type { IAuctionItem } from 'AuctionItem';
import { IoPricetagsOutline } from 'react-icons/io5';
import { LuUsers } from 'react-icons/lu';
import ProductItem from '../common/item/ProductItem';
import { useNavigate } from 'react-router-dom';
import { formatCurrencyWithWon } from '@/utils/formatCurrencyWithWon';

const OngoingProduct = ({ product }: { product: IAuctionItem }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/auctions/bid/${product.auctionId}`);
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
      <Button
        color={product.isParticipated ? 'black' : 'white'}
        type='button'
        size='small'
        className={`${product.isParticipated ? '' : ''} w-full h-[33px] rounded-sm`}
        onClick={handleClick}
      >
        경매 참여하기
      </Button>
    </ProductItem>
  );
};

export default OngoingProduct;
