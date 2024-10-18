import ProductItem from '../common/item/ProductItem';
import type { IAuctionEndRegisteredItem } from 'AuctionItem';
import { useNavigate } from 'react-router-dom';
import MinPrice from '../common/atomic/MinPrice';
import ParticipantCount from '../common/atomic/ParticipantCount';
import { formatCurrencyWithWon } from '@/utils/formatCurrencyWithWon';
import CreatedAt from '../common/atomic/Created';

const EndMyRegister = ({ product }: { product: IAuctionEndRegisteredItem }) => {
  const navigate = useNavigate();
  const winningBidAmount = product.winningBidAmount ?? 0;
  const formattedWinningBid = formatCurrencyWithWon(winningBidAmount);

  return (
    <ProductItem product={product} onClick={() => navigate(`/auctions/bid/${product.auctionId}`)}>
      <MinPrice price={product.minPrice} />
      <ParticipantCount count={product.participantCount} />
      <div
        aria-label="낙찰 금액"
        className="flex items-center text-xs sm:text-body2 text-gray2"
      >
        <img alt="참여자" />
        <span className='whitespace-nowrap'>
          낙찰 금액 <span className="text-xs text-black sm:text-body2Bold">{formattedWinningBid}</span>
        </span>
      </div>
      <div
        aria-label="참여자"
        className="flex items-center text-xs sm:text-body2 text-gray2"
      >
        <img alt="참여자" />
        <span className='whitespace-nowrap'>
          낙찰 여부 <span className="text-xs text-black sm:text-body2Bold">{product.isWon ? '낙찰' : '유찰'}</span>
        </span>
      </div>
      <div
        aria-label="참여자"
        className="flex items-center text-xs sm:text-body2 text-gray2"
      >
        <img alt="참여자" />
        <span className='whitespace-nowrap'>
          결제 여부 <span className="text-xs text-black sm:text-body2Bold">{product.isPaid ? '결제 완료' : '미결제'}</span>
        </span>
      </div>
      <CreatedAt createAt={product.createAt} />
    </ProductItem>
  );
};

export default EndMyRegister;