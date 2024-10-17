/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';

const totalTime = 24 * 60 ** 2

const ProgressBar = ({
  initialTimeRemaining,
}: { initialTimeRemaining: number }) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(initialTimeRemaining);

  useEffect(() => {
    setTimeRemaining(initialTimeRemaining);

    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [initialTimeRemaining]);

  const progressBarWidth = (timeRemaining / totalTime) * 100

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const progressBarColor = hours < 1 ? 'bg-timeColor1' : (hours <= 16 ? 'bg-timeColor2' : 'bg-timeColor3')
  const textColor = hours < 1 ? 'text-timeColor1' : (hours <= 16 ? 'text-timeColor2' : 'text-timeColor3')


  return (
    <div className='flex flex-col gap-1'>
      <div
        className={`text-center text-lg font-bold ${textColor}`}
      >
        {timeRemaining !== 0 ? formattedTime : '경매 종료'}
      </div>
      <div className='w-full h-2 bg-gray-200'>
        <div
          className={`h-full ${progressBarColor}`}
          style={{ width: `${progressBarWidth}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
