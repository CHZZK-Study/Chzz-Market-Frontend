import TimeLabel from '../atomic/TimeLabel';
import { ReactNode } from 'react';

export interface ProductProps {
  auctionId?: number;
  productName: string;
  minPrice: number;
  imageUrl?: string;
  timeRemaining?: number;
  participantCount?: number;
  isParticipating?: boolean;
  likeCount?: number;
  isLiked?: boolean;
  status?: string;
  createdAt?: string;
}

const ProductItem = ({ product, children }: { product: ProductProps; children: ReactNode }) => {
  return (
    <div key={product.auctionId} className='mb-4'>
      <div className='flex flex-col'>
        <div className='w-full h-auto mb-4'>
          <div className='relative'>
            <img className='object-cover w-full h-[15rem] rounded-t' src={product.imageUrl} alt='제품 사진' />
            {product.timeRemaining && <TimeLabel time={product.timeRemaining} />}
          </div>
        </div>

        <div className='flex flex-col gap-[8px]'>
          <div>
            <p className='text-sm font-semibold'>{product.productName}</p>
          </div>
          <div className='flex flex-col'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
