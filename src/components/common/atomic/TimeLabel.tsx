import { getTimeColor } from '@/utils/getTimeColor';

const TimeLabel = ({ time }: { time: number }) => {
  const formattedTime = Math.ceil(time / 3600);
  const color = getTimeColor(formattedTime);
  return (
    <div
      aria-label="시간"
      className={`absolute bottom-0 w-full pt-1 text-center bg-white opacity-80 ${color} border-b-2`}
    >
      {formattedTime === 0 ? null :`${formattedTime}시간 남음`}
    </div>
  );
};

export default TimeLabel;
