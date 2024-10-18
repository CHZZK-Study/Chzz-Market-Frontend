import { useNavigate } from 'react-router-dom';
import OnGoingIcon from '@/assets/icons/ongoing_auction.svg';
import SuccessIcon from '@/assets/icons/successful_auction.svg';
import FailedIcon from '@/assets/icons/failed_auction.svg';
import AuctionIcon from '@/assets/icons/auction.svg';
import PreAuctionIcon from '@/assets/icons/pre_auction.svg';
import ROUTERS from '@/constants/route';

interface ParticipationCountItmes {
  failedAuctionCount?: number;
  ongoingAuctionCount?: number;
  successfulAuctionCount?: number;
}

interface Props {
  participantCount?: ParticipationCountItmes;
  preRegisterCount?: number;
  registeredAuctionCount?: number;
}

const UserOrder = ({ participantCount, preRegisterCount, registeredAuctionCount}: Props) => {
  const navigate = useNavigate();
  const $participantCount = participantCount || { failedAuctionCount: 0, ongoingAuctionCount: 0, successfulAuctionCount: 0 };
  const $preRegisterCount = preRegisterCount || 0;
  const $registeredAuctionCount = registeredAuctionCount || 0;

  return (
    <div className="pb-10">
      {/* 참여한 정식 경매 내역 */}
      <div>
        <h2 className="mb-4 text-heading1">참여한 정식 경매 내역</h2>
        <div className="flex justify-between gap-3">
          {/* 진행중인 경매 */}
          <div
            className="flex flex-col items-center w-1/3 p-4 border rounded-lg cursor-pointer border-gray2"
            onClick={() =>
              navigate(ROUTERS.PARTICIPATED_LIST, {
                state: { sortType: 'AuctionHistory' },
              })
            }
          >
            <img
              src={OnGoingIcon}
              alt="입찰중인 경매"
              className="w-8 h-8 mb-2"
            />
            <span className="text-sm font-semibold">입찰중인 경매</span>
            <span className="mt-1 text-lg text-orange-500">{$participantCount.ongoingAuctionCount} 건</span>
          </div>

          {/* 성공한 경매 */}
          <div
            className="flex flex-col items-center w-1/3 p-4 border rounded-lg cursor-pointer border-gray2"
            onClick={() =>
              navigate(ROUTERS.PARTICIPATED_LIST, {
                state: { sortType: 'AuctionsWon' },
              })
            }
          >
            <img src={SuccessIcon} alt="성공한 경매" className="w-8 h-8 mb-2" />
            <span className="text-sm font-semibold">성공한 경매</span>
            <span className="mt-1 text-lg text-orange-500">{$participantCount.successfulAuctionCount} 건</span>
          </div>

          {/* 실패한 경매 */}
          <div
            className="flex flex-col items-center w-1/3 p-4 border rounded-lg cursor-pointer border-gray2"
            onClick={() =>
              navigate(ROUTERS.PARTICIPATED_LIST, {
                state: { sortType: 'AuctionsLost' },
              })
            }
          >
            <img src={FailedIcon} alt="실패한 경매" className="w-8 h-8 mb-2" />
            <span className="text-sm font-semibold">실패한 경매</span>
            <span className="mt-1 text-lg text-orange-500">{$participantCount.failedAuctionCount} 건</span>
          </div>
        </div>
      </div>

      {/* 내가 등록한 경매 내역 */}
      <div className="mt-8">
        <h2 className="mb-4 text-heading1">내가 등록한 경매 내역</h2>
        <div className="flex justify-between gap-3">
          {/* 정식 경매 */}
          <div
            className="flex flex-col items-center w-1/2 p-4 border rounded-lg cursor-pointer border-gray2"
            onClick={() =>
              navigate(ROUTERS.REGISTERED_LIST, { state: { sortType: 'ongoing' } })
            }
          >
            <img src={AuctionIcon} alt="정식 경매" className="w-8 h-8 mb-2" />
            <span className="text-sm font-semibold">정식 경매</span>
            <span className="mt-1 text-lg text-orange-500">{$registeredAuctionCount} 건</span>
          </div>

          {/* 사전 경매 */}
          <div
            className="flex flex-col items-center w-1/2 p-4 border rounded-lg cursor-pointer border-gray2"
            onClick={() =>
              navigate(ROUTERS.REGISTERED_LIST, { state: { sortType: 'preEnroll' } })
            }
          >
            <img
              src={PreAuctionIcon}
              alt="사전 경매"
              className="w-8 h-8 mb-2"
            />
            <span className="text-sm font-semibold">사전 경매</span>
            <span className="mt-1 text-lg text-orange-500">{$preRegisterCount} 건</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrder;
