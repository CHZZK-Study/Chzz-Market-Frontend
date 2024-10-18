import DeleteIcon from '@/assets/icons/modal_cancel.svg';
import EditIcon from '@/assets/icons/modal_edit.svg';
import ProfileDefaultImage from '@/assets/icons/profile.svg';
import {
  useDeletePreAuction,
  useGetPreAuctionDetailsWithSuspense
} from '@/components/details/queries';
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import ConfirmModal from '@/components/common/ConfirmModal';
import MinPrice from '@/components/common/atomic/MinPrice';
import BuyersFooter from '@/components/details/BuyersFooter';
import ImageList from '@/components/details/ImageList';
import SellersFooter from '@/components/details/SellersFooter';
import Layout from '@/components/layout/Layout';
import { CATEGORIES } from '@/constants/categories';
import { useState } from 'react';

const PreAuctionDetails = () => {
  const preAuctionId = useLoaderData() as number;
  const { preAuctionDetails } = useGetPreAuctionDetailsWithSuspense(preAuctionId);
  const { images, productName, productId, likeCount, sellerNickname, minPrice, isSeller, description, category, sellerProfileImageUrl } = preAuctionDetails

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
  const clickEdit = () => navigate(`/auctions/pre-auction/edit/${productId}`);

  const confirmDelete = () => deletePreAuction(preAuctionId);

  return (
    <Layout>
      <Layout.Header
        title='제품 상세'
        handleModal={toggleMenu}
        isDisableMenuButton={!isSeller}
      />
      <Layout.Main>
        <div className='flex flex-col gap-5'>
          <ImageList
            images={images}
            productName={productName}
            productId={productId}
          />
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <img src={sellerProfileImageUrl ?? ProfileDefaultImage} alt="판매자 프로필" className='border rounded-full size-10' />
              <p className='text-body2'>
                {sellerNickname}
              </p>
            </div>
            <p className='text-heading2'>
              {productName}
            </p>
            <span className='inline underline cursor-pointer text-gray2 text-body2'>{CATEGORIES[category].value}</span>
            <MinPrice price={minPrice} />
          </div>
          <div className='overflow-y-auto text-body2 text-gray1'>
            <p>{description || ''}</p>
          </div>
        </div>
      </Layout.Main>
      {
        isSeller ? (
          <SellersFooter
            likeCount={likeCount}
            auctionId={productId}
            status='PENDING'
          />
        ) : (
          <BuyersFooter
            likeCount={likeCount}
            auctionId={preAuctionId}
            status='PENDING'
          />
        )
      }
      {
        isMenuOpen && (
          <div className='absolute inset-0 bg-black/30' onClick={toggleMenu}>
            <div onClick={(e) => e.stopPropagation()} className='absolute flex flex-col w-1/5 bg-white rounded-lg sm:text-body1 text-body2 top-3 right-3'>
              <button onClick={clickEdit} className='flex items-center justify-center gap-3 px-2 py-4 transition-colors hover:bg-black/10'>
                <span>수정하기</span>
                <img src={EditIcon} alt="수정 아이콘" className='size-5 mb-[2px]' />
              </button>
              <button className='flex items-center justify-center gap-3 px-2 py-4 transition-colors hover:bg-black/10 text-redNotice' onClick={clickDelete}>
                <span>삭제하기</span>
                <img src={DeleteIcon} alt="삭제 아이콘" className='size-5 mb-[2px]' />
              </button>
            </div>
          </div>)
      }
      {
        isDeleteConfirmOpen &&
        <ConfirmModal title='사전 경매를 삭제하시겠어요?' description='사전 경매 참여자들에게 경매 취소 알림이 발송됩니다.' close={toggleConfirm} >
          <Button disabled={isPending} loading={isPending} type='button' color='cheeseYellow' className='w-full' onClick={confirmDelete}>
            삭제
          </Button>
        </ConfirmModal>
      }

    </Layout >)

}

export default PreAuctionDetails;

export const loader: LoaderFunction<number> = async ({ params }) => {
  const { preAuctionId } = params;

  return preAuctionId;
};
