import { MAX_BID_COUNT } from '@/constants/bid';
import Button from '../common/Button';

interface BidFooterProps {
  remain: number;
  check: boolean;
  isSubmitting: boolean;
  handlePost: (e: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
}

const BidFooter = ({ remain, check, isSubmitting, handlePost }: BidFooterProps) => {
  const flag = remain === MAX_BID_COUNT
  return (
    <Button
      type='button'
      color='cheeseYellow'
      className='w-full h-full transition-colors rounded text-button active:bg-black'
      aria-label={flag ? '제안하기' : '수정하기'}
      onClick={handlePost}
      disabled={flag ? (!check || isSubmitting) : remain === 0}
    >
      {flag ? '제안하기' : `금액 수정 ${remain !== 0 ? `(${remain}회 가능)` : '(소진)'}`}
    </Button>
  );
};

export default BidFooter;
