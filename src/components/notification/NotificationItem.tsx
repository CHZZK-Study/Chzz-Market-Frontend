import XButtonIcon from '@/assets/icons/x_button.svg';
import { NOTIFICATION_CONTENTS } from '@/constants/notification';
import { getTimeAgo } from '@/utils/getTimeAgo';
import type { INotification } from 'Notification';
import { useNavigate } from 'react-router-dom';
import { useDeleteNotification, useReadNotification } from './queries';

const NotificationItem = ({ item }: { item: INotification }) => {
  const navigate = useNavigate();
  const { notificationId, isRead, imageUrl, message, createdAt, type, auctionId } = item;
  const { mutate: deleteNotification } = useDeleteNotification();
  const { mutate: readNotification } = useReadNotification();
  const time = getTimeAgo(createdAt);

  const handleClick = () => {
    readNotification(notificationId)
    if (NOTIFICATION_CONTENTS[type]?.link && auctionId) navigate(NOTIFICATION_CONTENTS[type].link!(auctionId))
  };

  return (
    <div className={`p-5 flex justify-between items-start gap-3 ${!isRead && 'bg-notificationBgColor'} `} aria-label={`알림 배경_${notificationId}`}>
      <figure onClick={handleClick} className={`flex w-full ${auctionId ? 'cursor-pointer' : (isRead) ? '' : 'cursor-pointer'}`} aria-label={`알림_${notificationId}`}>
        <figcaption className='flex flex-col flex-1 justify-between min-h-[6rem] p-3'>
          <h4 className='text-body1' aria-label={`알림 제목${notificationId}`}>
            {message}
          </h4>
          <div aria-label={`알림 시간_${notificationId}`} className='text-gray2 text-body2'>
            {time}
          </div>
        </figcaption>
        <img className='object-cover rounded size-24' src={imageUrl} alt={`알림 이미지_${item.notificationId}`} />
      </figure>
      <button aria-label={`알림 삭제 버튼_${item.notificationId}`} onClick={() => deleteNotification(notificationId)}>
        <img className='p-2 rounded size-8 hover:bg-black/30 active:bg-black/60' src={XButtonIcon} alt='알림 삭제 아이콘' />
      </button>
    </div>
  );
};

export default NotificationItem;
