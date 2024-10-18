import DeleteIcon from '@/assets/icons/delete.svg';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { useImageUploader } from '@/hooks/useImageUploader';
import CustomCarousel from '../common/CustomCarousel';
import { CarouselItem } from '../ui/carousel';
import { Input } from '../ui/input';
import AddImageButton from './AddImageButton';

interface ImageUploaderProps {
  images: string[];
  setImages: (value: string[]) => void;
}

const ImageUploader = ({ images, setImages }: ImageUploaderProps) => {
  const { handleDragStart, handleDragLeave, handleDragOver, handleDrop, hoveredIndex } = useDragAndDrop(images, setImages);
  const { fileInputRef, deleteImage, handleImage, handleBoxClick } = useImageUploader(images, setImages);

  return (
    <div className='flex flex-col items-center w-full h-full gap-5 sm:h-32 sm:flex-row'>
      <AddImageButton handleBoxClick={handleBoxClick} length={images.length} />
      <CustomCarousel contentStyle='py-3' length={images.length}>
        {images.map((image: string, index: number) => (
          <CarouselItem className='basis-1/2 md:basis-1/3' key={image}>
            <div
              className={`relative h-32 transition-transform duration-400 mx-3 ${index === hoveredIndex ? 'transform scale-105' : ''}`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => {
                e.preventDefault();
                handleDragOver(e, index);
              }}
              onDragLeave={handleDragLeave}
              onDrop={() => handleDrop(index)}
            >
              <img src={image} alt={`상품 사진 ${index}`} className='object-cover w-full h-full border-2 rounded' />
              {index === 0 && (
                <p className='absolute text-[8px] sm:text-xs rounded py-1 px-2 text-white bg-[#454545]/90 top-2 left-1/2 transform -translate-x-1/2'>
                  대표 사진
                </p>
              )}
              <button
                className='absolute top-[-5%] right-[-5%] cursor-pointer text-black size-6'
                onClick={() => deleteImage(index)}
                aria-label={`사진 삭제 ${index}`}
              >
                <img src={DeleteIcon} alt='사진 삭제 버튼' />
              </button>
            </div>
          </CarouselItem>
        ))}
      </CustomCarousel>
      <Input
        ref={fileInputRef}
        type='file'
        id='사진'
        className='hidden'
        accept='image/*'
        multiple
        onChange={handleImage}
        aria-label='사진 업로드 인풋'
        role='button'
      />
    </div>
  );
};

export default ImageUploader;
