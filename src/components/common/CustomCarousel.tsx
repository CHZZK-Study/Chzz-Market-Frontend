import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '../ui/carousel';

import { ReactNode } from 'react';

interface CustomCarouselProps { contentStyle?: string; length: number; children: ReactNode; loop?: boolean }

const CustomCarousel = ({ contentStyle, length, children, loop = false }: CustomCarouselProps) => {
  return (
    <Carousel
      opts={{
        align: 'start',
        dragFree: true,
        watchDrag: false,
        loop
      }}
      className='w-full overflow-scroll'
    >
      <CarouselContent className={`flex items-center h-full ${contentStyle}`}>{children}</CarouselContent>
      {length > 1 && (
        <>
          <CarouselPrevious type='button' className='ml-14' />
          <CarouselNext type='button' className='mr-14' />
        </>
      )}
    </Carousel>
  );
};

export default CustomCarousel;
