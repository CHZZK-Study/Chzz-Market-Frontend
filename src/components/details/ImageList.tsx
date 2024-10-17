import useImageUrls from '@/hooks/useImageUrls';
import CustomCarousel from '../common/CustomCarousel';
import ImageItem from './ImageItem';

interface ImageListProps {
  images: string[] | { imageId?: number; imageUrl: string }[];
  productName: string;
  productId: number;
}

const ImageList = ({ images, productName, productId }: ImageListProps) => {
  const imageUrls = useImageUrls(images);
  const { length } = imageUrls;

  return (
    <CustomCarousel length={length} loop>
      {imageUrls.map((img) => (
        <ImageItem
          key={`productId${productId}_${img.key}`}
          url={img.imageUrl}
          productName={productName}
        />
      ))}
    </CustomCarousel>
  );
};

export default ImageList;
