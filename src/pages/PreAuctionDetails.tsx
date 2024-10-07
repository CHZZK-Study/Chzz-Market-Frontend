/* eslint-disable prettier/prettier */
import { useState } from 'react';

import Layout from '@/components/layout/Layout';
import { useNavigate, LoaderFunction, useLoaderData } from 'react-router-dom';
import Price from '@/assets/icons/price.svg';
import axios from 'axios';

// 필요한 컴포넌트 임포트
import SellersFooter from '@/components/details/SellersFooter';
import BuyersFooter from '@/components/details/BuyersFooter';
import ConfirmationModal from '@/components/details/ConfirmationModal';
import SuccessModal from '@/components/details/SuccessModal';
import { useGetPreAuctionDetails } from '@/components/details/queries';

const PreAuction = () => {
  const preAuctionId = useLoaderData() as number;
  const { preAuctionDetails } = useGetPreAuctionDetails(preAuctionId);
  if (!preAuctionDetails) return;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeleteSuccessOpen, setIsDeleteSuccessOpen] = useState(false);

  const navigate = useNavigate();

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

  // 삭제 버튼 클릭 핸들러
  const onDeleteButtonClickHandler = () => {
    setIsDeleteConfirmOpen(true);
    closeMenu();
  };

  const onEditButtonClickHandler = () => {
    navigate(`/auctions/pre-auction/edit/${preAuctionDetails.productId}`);
  };

  // 삭제 확인 다이얼로그에서 '삭제' 버튼 클릭 핸들러
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/products/${preAuctionId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      setIsDeleteConfirmOpen(false);
      setIsDeleteSuccessOpen(true);
    } catch (error) {
      alert('삭제하는 중 오류가 발생했습니다.');
    }
  };

  // 삭제 성공 메시지에서 '닫기' 버튼 클릭 핸들러
  const handleCloseSuccessModal = () => {
    setIsDeleteSuccessOpen(false);
    navigate('/');
  };

  return (
    <Layout>
      <Layout.Header
        title='제품 상세'
        handleModal={toggleMenu}
        isDisableMenuButton={!preAuctionDetails.isSeller}
      />
      {/* 메인 컨텐츠가 스크롤 가능하도록 수정 */}
      <div className='relative flex flex-col h-screen overflow-hidden'>
        <Layout.Main>
          {/* 상품 이미지 영역 */}
          <div className='relative w-full bg-yellow-300'>
            <div className='w-full mb-2'>
              <img
                src={preAuctionDetails?.imageUrls[0]}
                alt={preAuctionDetails?.productName}
                className='object-cover w-full h-auto'
              />
            </div>
          </div>

          {/* 경매 정보 영역 */}
          <div className='px-4 my-4'>
            {/* 경매 아이템 제목 & 시작가 */}
            {preAuctionDetails && (
              <div className='mb-4'>
                <p className='mb-1 text-lg font-bold'>
                  {preAuctionDetails.productName ||
                    '[ERROR] 이름이 등록되지 않았어요!'}
                </p>
                <p className='text-sm text-gray-500'>
                  <span className='inline-flex items-center'>
                    <span className='mr-1'>
                      <img src={Price} alt='Price' />
                    </span>
                    시작가
                    <span className='font-bold p'>
                      {numberWithCommas(preAuctionDetails.minPrice)}원
                    </span>
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* 상품 설명 */}
          <div className='px-4 mb-4 overflow-y-auto text-sm text-gray-700'>
            <p>{preAuctionDetails?.description}</p>
          </div>
        </Layout.Main>
        {/* 화면 하단에 고정된 Footer */}
        <Layout.Footer type='double'>
          {preAuctionDetails && preAuctionDetails.isSeller ? (
            <SellersFooter
              likeCount={preAuctionDetails.likeCount}
              isSeller={preAuctionDetails.isSeller}
              auctionId={preAuctionDetails.productId}
              status='PENDING'
            />
          ) : (
            <BuyersFooter
              isSeller={preAuctionDetails?.isSeller}
              likeCount={preAuctionDetails.likeCount}
              auctionId={preAuctionId}
              status='PENDING'
              isParticipated={preAuctionDetails?.isLiked}
            />
          )}
        </Layout.Footer>
        {/* 백드롭 */}
        {isMenuOpen && (
          <>
            <div
              className='absolute inset-0 z-40 bg-black bg-opacity-50'
              onClick={closeMenu}
            />
            {/* 메뉴 (아코디언) */}
            <div className='absolute top-[10px] right-2 bg-white shadow-lg rounded-md z-50'>
              <button
                className='flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200'
                onClick={onEditButtonClickHandler}
              >
                수정하기
              </button>
              <button
                className='flex items-center w-full px-4 py-2 text-left text-red-600 hover:bg-red-100'
                onClick={onDeleteButtonClickHandler}
              >
                삭제하기
              </button>
            </div>
          </>
        )}
      </div>
      {/* 삭제 확인 다이얼로그 */}
      {isDeleteConfirmOpen && (
        <ConfirmationModal
          message='정말 삭제하시겠습니까?'
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDeleteConfirmOpen(false)}
        />
      )}
      {/* 삭제 성공 메시지 */}
      {isDeleteSuccessOpen && (
        <SuccessModal
          message='아이템이 삭제되었습니다.'
          onClose={handleCloseSuccessModal}
        />
      )}
    </Layout>
  );
};

export default PreAuction;

export const loader: LoaderFunction<number> = async ({ params }) => {
  const { preAuctionId } = params;

  return preAuctionId;
};
