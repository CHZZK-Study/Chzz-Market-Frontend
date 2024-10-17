import { useEffect, useState } from 'react';

import { API_END_POINT } from '@/constants/api';
import { useSSE } from '@/hooks/useSSE';
import type { IRealTimeNotification } from 'Notification';
import { Outlet } from 'react-router-dom';
import Popup from '../common/Popup';
import RealTimeNotification from './RealTimeNotification';

const GlobalLayout = () => {
  const { state: notifications, setState: setNotifications } = useSSE<IRealTimeNotification>(`${API_END_POINT.REALTIME_NOTIFICATIONS}`);
  const [currentNotification, setCurrentNotification] = useState<IRealTimeNotification | null>(null);

  const closePopup = () => setCurrentNotification(null)

  useEffect(() => {
    const showNextNotification = () => {
      setCurrentNotification(notifications[0]);
      setNotifications((prev) => prev.slice(1));
    };
    if (currentNotification === null && notifications.length > 0) {
      showNextNotification();
    }
  }, [currentNotification, notifications, setNotifications]);

  return (
    <div className='flex justify-center w-full h-screen'>
      <div className='relative w-[46rem] min-w-[23rem] h-full'>
        <Outlet />
        {currentNotification && (
          <Popup onClose={closePopup}>
            <RealTimeNotification onClose={closePopup} notification={currentNotification} />
          </Popup>
        )}
      </div>
    </div>
  );
};

export default GlobalLayout;
