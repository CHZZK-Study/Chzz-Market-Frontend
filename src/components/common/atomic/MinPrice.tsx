import PriceIcon from '@/assets/icons/price.svg';
import { formatCurrencyWithWon } from '@/utils/formatCurrencyWithWon';

const MinPrice = ({ price }: { price: number }) => {
  const formatted = formatCurrencyWithWon(price);

  return (
    <div
      aria-label="시작가"
      className="flex items-center text-xs sm:text-body2 text-gray2"
    >
      <img src={PriceIcon} alt="시작가" />
      <span className='overflow-hidden whitespace-nowrap pt-[2px]'>
        시작가 <span className="ml-1 text-xs text-black sm:text-body2Bold">{formatted}</span>
      </span>
    </div>
  );
};

export default MinPrice;
