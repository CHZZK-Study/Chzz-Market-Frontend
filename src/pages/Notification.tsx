import { useGetNotificationsWithSuspense } from '@/components/notification/queries';

import EmptyBoundary from '@/components/common/boundary/EmptyBoundary';
import NotificationItem from '@/components/notification/NotificationItem';
import type { INotification } from 'Notification';

const Notification = () => {
  const { notifications } = useGetNotificationsWithSuspense();

  return (
    <EmptyBoundary length={notifications.length} name='notification'>
      <div className='mx-[-32px] my-[-16px]'>
        {notifications.map((item: INotification) => (
          <NotificationItem key={item.notificationId} item={item} />
        ))}
      </div>
    </EmptyBoundary>
  );
};

export default Notification;
