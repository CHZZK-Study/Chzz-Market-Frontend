import UserIcon from '@/assets/icons/user.svg';

const ParticipantCount = ({ count }: { count: number }) => {
  return (
    <div
      aria-label="참여자"
      className="flex items-center text-xs sm:text-body2 text-gray2"
    >
      <img src={UserIcon} alt="참여자" />
      <span className='overflow-hidden whitespace-nowrap pt-[2px]'>
        참여자 <span className="ml-1 text-xs text-black sm:text-body2Bold">{count} 명</span>
      </span>
    </div>
  );
};

export default ParticipantCount;
