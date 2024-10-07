/* eslint-disable prettier/prettier */
import React from 'react';
import Button from '@/components/common/Button';
import { AiOutlineHeart } from 'react-icons/ai';
import { useConvertToAuction } from './queries';
import { useNavigate } from 'react-router-dom';

interface SellersFooterProps {
  isSeller: boolean;
  likeCount?: number;
  status?: string;
  auctionId: number;
}

const SellersFooter: React.FC<SellersFooterProps> = ({
  isSeller,
  status,
  likeCount = 0,
  auctionId,
}) => {
  const { mutate: convertToAuction } = useConvertToAuction();
  const navigate = useNavigate();
  const onConvertClickHandler = () => {
    convertToAuction(auctionId);
    navigate('/');
  };

  if (isSeller && status === 'PROCEEDING') {
    return (
      <div className='bg-gray-300 text-gray-600 p-4 rounded-lg text-center border border-dashed border-blue-200'>
        내가 올린 경매
      </div>
    );
  }

  if (isSeller && status === 'PENDING') {
    return (
      <div className='flex items-center flex-1 h-full gap-2'>
        <AiOutlineHeart className='text-xl text-gray-500' />
        <span className='text-gray-600'>{`${likeCount}명`}</span>
        <Button
          type='button'
          className='flex-[2] h-full'
          color='cheeseYellow'
          onClick={onConvertClickHandler}
        >
          경매로 전환하기
        </Button>
      </div>
    );
  }

  return null;
};

export default SellersFooter;
