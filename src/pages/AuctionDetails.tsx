/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';

import BuyersFooter from '@/components/details/BuyersFooter';
import { CiCoins1 } from 'react-icons/ci';
import Layout from '@/components/layout/Layout';
import Participants from '@/assets/icons/participants.svg';
import Price from '@/assets/icons/price.svg';
import ProgressBar from '@/components/details/ProgressBar';
import SellersFooter from '@/components/details/SellersFooter';
import { useGetAuctionDetails } from '@/components/details/queries';

const AuctionDetails = () => {
  const auctionId = useLoaderData() as number;
  const { auctionDetails } = useGetAuctionDetails(auctionId);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTimerFixed, _setIsTimerFixed] = useState(false);
  const [isPreAuction, _setIsPreAuction] = useState(false);
  const [_interestCount, _setInterestCount] = useState(1);

  const totalTime = 24 * 60 * 60;

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // 세자리 단위로 콤마를 찍어주는 함수
  const numberWithCommas = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <Layout>
      <Layout.Header
        title='제품 상세'
        handleBack={handleBackClick}
        handleModal={toggleMenu}
        isDisableMenuButton={!auctionDetails.isSeller}
      />
      {/* 메인 컨텐츠가 스크롤 가능하도록 수정 */}
      <div className='relative flex flex-col h-screen overflow-hidden'>
        <Layout.Main>
          {/* 상품 이미지 영역 */}
          <div className='relative w-full'>
            <div className='w-full mb-2'>
              <img
                src={`${auctionDetails.imageUrls[0]}`}
                alt={auctionDetails.productName}
                className='object-cover w-full h-auto'
              />
            </div>
            {/* 타이머 및 프로그레스 바 */}
            {auctionDetails && (
              <div
                id='timer-section'
                className={`bg-white z-10 py-1 ${isTimerFixed ? 'fixed top-0 left-0 right-0' : ''}`}
              >
                <ProgressBar
                  initialTimeRemaining={auctionDetails.timeRemaining}
                  totalTime={totalTime} // Should be 86400
                />
              </div>
            )}
          </div>

          {/* 경매 정보 영역 */}
          <div className='px-4 my-4'>
            {/* 경매 아이템 제목 & 시작가 */}
            {auctionDetails && (
              <div className='mb-4'>
                <div className='mt-2 mb-2 flex flex-row items-center'>
                  <div className='rounded-[50%] w-8 h-8 bg-slate-500' />
                  <p className='ml-3 text-black'>
                    {auctionDetails.sellerNickname}
                  </p>
                </div>
                <p className='mt-2 mb-2 text-2xl font-bold'>
                  {auctionDetails.productName ||
                    '[ERROR] 이름이 등록되지 않았어요!'}
                </p>
                <p className='mt-2 mb-2 text-sm text-gray-500'>
                  <span className='inline-flex items-center'>
                    <span className='mr-1'>
                      <img src={Price} alt='Price' />
                    </span>
                    시작가
                    <span className='font-bold p'>
                      {numberWithCommas(Number(auctionDetails.minPrice))}원
                    </span>
                  </span>
                </p>
              </div>
            )}
            {/* 나의 참여 금액 & 경매 참여인원 */}
            <div className='w-full mb-4 border border-gray-300 rounded-lg'>
              <div className='flex items-center justify-between'>
                <div className='flex flex-col items-center flex-1 py-4 text-center'>
                  <div className='flex items-center mb-1 text-sm text-gray-400'>
                    <CiCoins1 className='mx-1 text-xl' />
                    <span className='ml-1'>나의 참여 금액</span>
                  </div>
                  <p className='text-xl font-bold text-gray-800'>
                    {auctionDetails.isParticipated
                      ? `${numberWithCommas(Number(auctionDetails.bidAmount))}원`
                      : '참여 전'}
                  </p>
                </div>
                <div className='h-full border-l border-gray-300' />
                <div className='flex flex-col items-center flex-1 py-4 text-center'>
                  <div className='flex items-center mb-1 text-sm text-gray-400'>
                    <img
                      src={Participants}
                      alt='Participants'
                      className='w-4 h-4 mx-2 mb-1'
                    />
                    <p className='mb-1 text-sm text-gray-500'>참여 인원</p>
                  </div>
                  <p className='text-lg font-bold'>
                    {auctionDetails.participantCount
                      ? `${auctionDetails.participantCount}명`
                      : '0명'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 상품 설명 */}
          <div className='px-4 mb-4 overflow-y-auto text-sm text-gray-700'>
            <p>{auctionDetails.description}</p>
          </div>
        </Layout.Main>
        {/* 화면 하단에 고정된 Footer */}
        <Layout.Footer type={isPreAuction ? 'double' : 'single'}>
          {auctionDetails && auctionDetails.isSeller ? (
            <SellersFooter
              auctionId={auctionId}
              isSeller={auctionDetails.isSeller}
              status={auctionDetails.status}
            />
          ) : (
            <BuyersFooter
              auctionId={auctionId}
              isSeller={auctionDetails.isSeller ?? false}
              status={auctionDetails.status ?? ''}
              isParticipated={auctionDetails.isParticipated ?? false}
              remainingBidCount={auctionDetails.remainingBidCount ?? 0}
            />
          )}
        </Layout.Footer>
        {/* 백드롭 */}
        {isMenuOpen && (
          <>
            <div
              className='absolute inset-0 z-40 bg-black bg-opacity-50'
              onClick={closeMenu}
              style={{ top: 0, bottom: 0 }}
            />
            {/* 메뉴 (아코디언) */}
            <div className='absolute top-[10px] right-2 bg-white shadow-lg rounded-md z-50'>
              <button className='flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200'>
                수정하기
              </button>
              <button className='flex items-center w-full px-4 py-2 text-left text-red-600 hover:bg-red-100'>
                삭제하기
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default AuctionDetails;

export const loader: LoaderFunction<number> = async ({ params }) => {
  const { auctionId } = params;

  return auctionId;
};
