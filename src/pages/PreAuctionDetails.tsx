import {
  useDeletePreAuction,
  useGetPreAuctionDetailsWithSuspense
} from '@/components/details/queries';
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import ConfirmModal from '@/components/common/ConfirmModal';
import MinPrice from '@/components/common/atomic/MinPrice';
import LocalAPIAsyncBoundary from '@/components/common/boundary/LocalAPIAsyncBoundary';
import BuyersFooter from '@/components/details/BuyersFooter';
import ImageList from '@/components/details/ImageList';
import SellersFooter from '@/components/details/SellersFooter';
import Layout from '@/components/layout/Layout';
import { useState } from 'react';

const PreAuction = () => {
  const preAuctionId = useLoaderData() as number;
  const { preAuctionDetails } = useGetPreAuctionDetailsWithSuspense(preAuctionId);
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const { mutate: deletePreAuction, isPending } = useDeletePreAuction();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleConfirm = () => setIsDeleteConfirmOpen((prev) => !prev)

  const clickDelete = () => {
    toggleMenu()
    toggleConfirm()
  }
  const clickEdit = () => navigate(`/auctions/pre-auction/edit/${preAuctionDetails.productId}`);

  const confirmDelete = () => deletePreAuction(preAuctionId);

  return (
    <Layout>
      <Layout.Header
        title='제품 상세'
        handleModal={toggleMenu}
        isDisableMenuButton={!preAuctionDetails.isSeller}
      />
      <div className='relative flex flex-col h-screen overflow-hidden'>
        <Layout.Main>
          <div className='relative w-full'>
            <LocalAPIAsyncBoundary height={250}>
              <ImageList
                images={preAuctionDetails.images}
                productName={preAuctionDetails.productName}
                productId={preAuctionDetails.productId}
              />
            </LocalAPIAsyncBoundary>
          </div>
          <div className='px-4 my-4'>
            {preAuctionDetails && (
              <div className='flex flex-col gap-3'>
                <div className='flex items-center gap-2'>
                  <div className='rounded-[50%] w-8 h-8 bg-slate-500' />
                  <p className='text-body2'>
                    {preAuctionDetails.sellerNickname}
                  </p>
                </div>
                <p className='text-heading2'>
                  {preAuctionDetails.productName}
                </p>
                <MinPrice price={preAuctionDetails.minPrice} />
              </div>
            )}
          </div>
          <div className='px-4 mb-4 overflow-y-auto text-body2 text-gray1'>
            <p>{preAuctionDetails?.description}</p>
          </div>
        </Layout.Main>
        {preAuctionDetails.isSeller ? (
          <SellersFooter
            likeCount={preAuctionDetails.likeCount}
            auctionId={preAuctionDetails.productId}
            status='PENDING'
          />
        ) : (
          <BuyersFooter
            likeCount={preAuctionDetails.likeCount}
            auctionId={preAuctionId}
            status='PENDING'
          />
        )}
        {isMenuOpen && (
          <div className='absolute inset-0 bg-black/30' onClick={toggleMenu}>
            <div onClick={(e) => e.stopPropagation()} className='absolute flex flex-col w-1/5 bg-white rounded-lg sm:text-body1 text-body2 top-3 right-3'>
              <button onClick={clickEdit} className='px-2 py-4 transition-colors hover:bg-black/10'>
                수정하기
              </button>
              <button className='px-2 py-4 transition-colors hover:bg-black/10 text-redNotice' onClick={clickDelete}>삭제하기</button>
            </div>
          </div>)}
        {isDeleteConfirmOpen &&
          <ConfirmModal title='사전 경매를 삭제하시겠어요?' description='사전 경매 참여자들에게 경매 취소 알림이 발송됩니다.' close={toggleConfirm} >
            <Button disabled={isPending} loading={isPending} type='button' color='cheeseYellow' className='w-full' onClick={confirmDelete}>
              삭제
            </Button>
          </ConfirmModal>}
      </div >

    </Layout >)

}

export default PreAuction;

export const loader: LoaderFunction<number> = async ({ params }) => {
  const { preAuctionId } = params;

  return preAuctionId;
};
