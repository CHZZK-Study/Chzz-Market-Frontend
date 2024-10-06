import { FaHeart } from 'react-icons/fa';
import type { IPreAuctionRegisteredItem } from 'AuctionItem';
import { IoPricetagsOutline } from 'react-icons/io5';
import ProductItem from '../common/item/ProductItem';

const PreEnrollMyRegister = ({ product }: { product: IPreAuctionRegisteredItem }) => {
  return (
    <ProductItem product={product}>
      <div className='flex'>
        <div className='flex gap-2'>
          <IoPricetagsOutline className='text-gray-500' />
          <p className='text-sm text-gray-500'>시작가</p>
        </div>
        <p className='ml-4 font-semibold'>{`${product.minPrice.toLocaleString()}원`}</p>
      </div>
      <div className='flex'>
        <div className='flex gap-2'>
          <FaHeart className='text-gray-500' />
          <p className='text-sm text-gray-500'>좋아요</p>
        </div>
        <p className='ml-4 font-semibold'>{`${product.likeCount}`}</p>
      </div>
    </ProductItem>
  );
};

export default PreEnrollMyRegister;
