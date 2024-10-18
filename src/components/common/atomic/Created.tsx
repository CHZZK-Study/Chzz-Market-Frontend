import PriceIcon from '@/assets/icons/price.svg';

const CreatedAt = ({ createAt }: { createAt: string }) => {
  const date = new Date(createAt);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const formattedDate = `${year}년 ${month}월 ${day}일`;

  return (
    <div
      aria-label="마감된 날짜"
      className="flex items-center text-xs sm:text-body2 text-gray2"
    >
      <img src={PriceIcon} alt="마감된 날짜" />
      <span className='whitespace-nowrap'>
        {`마감된 날짜 `}
        <span className="text-xs text-black sm:text-body2Bold">{formattedDate}</span>
      </span>
    </div>
  );
};

export default CreatedAt;