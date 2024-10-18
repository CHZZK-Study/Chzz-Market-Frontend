import useImageUrls from '@/hooks/useImageUrls';
import CustomCarousel from '../common/CustomCarousel';
import { CarouselItem } from '../ui/carousel';

interface ImageListProps {
  images: string[] | { imageId?: number; imageUrl: string }[];
  productName: string;
  productId: number;
}

const ImageList = ({ images, productName, productId }: ImageListProps) => {
  const imageUrls = useImageUrls(images);

  return (
    <CustomCarousel length={imageUrls.length} loop>
      {imageUrls.map((img) => (
        <CarouselItem key={`productId_${productId}`}>
          <img src={img.imageUrl} alt={productName} />
        </CarouselItem>

      ))}
    </CustomCarousel>
  );
};

export default ImageList;
