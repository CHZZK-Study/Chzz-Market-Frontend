import PriceIcon from '@/assets/icons/price.svg';

const LikeCount = ({ count }: { count: number }) => {
  return (
    <div
      aria-label="좋아요"
      className="flex items-center text-xs sm:text-body2 text-gray2"
    >
      <img src={PriceIcon} alt="좋아요" />
      <span className='overflow-hidden whitespace-nowrap pt-[2px]'>
        좋아요
        <span className="ml-1 text-xs text-black sm:text-body2Bold">{count} 명</span>
      </span>
    </div>
  );
};

export default LikeCount;
