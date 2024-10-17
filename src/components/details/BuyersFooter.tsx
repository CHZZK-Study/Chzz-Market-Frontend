import HeartOffIcon from '@/assets/icons/heart_off.svg';
import HeartOnIcon from '@/assets/icons/heart_on.svg';
import Button from "@/components/common/Button";
import { useCancelBid, useLikeAuctionItem } from "@/components/details/queries";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";

interface BuyersFooterProps {
  auctionId: number;
  bidId?: number;
  status: string;
  likeCount?: number;
  isParticipated?: boolean;
  remainingBidCount?: number;
}

const BuyersFooter = ({
  auctionId,
  bidId = 0,
  status,
  likeCount,
  isParticipated,
  remainingBidCount,
}: BuyersFooterProps) => {
  const navigate = useNavigate();
  const { mutate: likeAuctionItem } = useLikeAuctionItem();
  const { mutate: cancelBid } = useCancelBid();

  const onMoveToBidHandler = () => navigate(`/auctions/bid/${auctionId}`)

  const onToggleNotificationHandler = () => likeAuctionItem(auctionId)

  const onCancelBidHandler = () => cancelBid(bidId)

  const HeartIcon = likeCount ? HeartOnIcon : HeartOffIcon;
  const heartColor = likeCount ? "text-redNotice" : "text-gray2";


  if (status === "PENDING") {
    return (
      <Layout.Footer type="double">
        <div className="flex items-center h-full gap-2 basis-1/3">
          <img src={HeartIcon} className={`${heartColor} size-6`} alt='하트 아이콘' />
          <span className="pt-1 text-gray1 text-heading3">{`${likeCount}명`}</span>
        </div>
        <Button
          type="button"
          className="h-full basis-4/5"
          color={likeCount ? 'white' : "cheeseYellow"}
          onClick={onToggleNotificationHandler}
        >
          {likeCount ? "좋아요 취소" : "좋아요"}
        </Button>
      </Layout.Footer>
    );
  }

  if (status === "PROCEEDING" && !isParticipated) {
    return (
      <Layout.Footer type="single">
        <Button
          type="button"
          className="w-full h-full"
          color="cheeseYellow"
          onClick={onMoveToBidHandler}
        >
          경매 참여하기
        </Button>
      </Layout.Footer>
    );
  }

  if (
    status === "PROCEEDING" &&
    isParticipated &&
    remainingBidCount &&
    remainingBidCount > 0
  ) {
    return (
      <Layout.Footer type="double">
        <Button
          type="button"
          color="white"
          className="flex-1 h-full transition-colors rounded text-button active:bg-black"
          onClick={onCancelBidHandler}
        >
          참여 취소
        </Button>
        <Button
          type="button"
          className="flex-[2] h-full"
          color="cheeseYellow"
          onClick={onMoveToBidHandler}
        >
          금액 수정({remainingBidCount}회 가능)
        </Button>
      </Layout.Footer>
    );
  }

  if (status === "PROCEEDING" && isParticipated && remainingBidCount === 0) {
    return (
      <Layout.Footer type="double">
        <Button
          type="button"
          color="white"
          className="flex-1 h-full transition-colors rounded text-button active:bg-black"
          onClick={onCancelBidHandler}
        >
          참여 취소
        </Button>
        <Button type="button" className="px-4 py-2 text-gray-600 disabled:">
          금액 수정(소진)
        </Button>
      </Layout.Footer>
    );
  }

  if (status === "ENDED") {
    return (
      <Layout.Footer type="single">
        <Button type='button' disabled className='w-full h-full'>
          종료된 경매
        </Button>
      </Layout.Footer>
    );
  }

  return null;
};

export default BuyersFooter;
