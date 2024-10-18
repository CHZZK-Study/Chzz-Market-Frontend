import { ReactNode } from 'react';
import LikeCount from '../atomic/LikeCount';
import MinPrice from '../atomic/MinPrice';
import ParticipantCount from '../atomic/ParticipantCount';
import TimeLabel from '../atomic/TimeLabel';

interface AuctionItemProps {
  label: string;
  axis: 'row' | 'column';
  children: ReactNode;
}

const AuctionItem = ({ label, axis, children }: AuctionItemProps) => {
  const axisStyle = axis === 'column' && 'flex-col';

  return (
    <figure aria-label={label} className={`flex gap-2 min-w-[12rem] ${axisStyle}`}>
      {children}
    </figure>
  );
};

const Image = ({ src, time = undefined }: { src: string; time?: number }) => {
  return (
    <div className='relative border rounded basis-1/2'>
      <img src={src} alt='이미지' className='object-cover w-full rounded' />
      {time && <TimeLabel time={time} />}
    </div>
  );
};

interface MainProps {
  kind: 'register' | 'pre-register';
  name: string;
  price: number;
  count: number;
}

const Main = ({ kind, name, price, count }: MainProps) => {
  return (
    <figcaption className='flex flex-col gap-2 p-2'>
      <h3 aria-label='이름' className='text-heading3'>
        {name}
      </h3>
      <div>
        <MinPrice price={price} />
        {kind === 'register' ? <ParticipantCount count={count} /> : <LikeCount count={count} />}
      </div>
    </figcaption>
  );
};

const Button = ({ children }: { children: ReactNode }) => {
  return <div onClick={(e) => e.stopPropagation()}>{children}</div>;
};

AuctionItem.Image = Image;
AuctionItem.Main = Main;
AuctionItem.Button = Button;

export default AuctionItem;
