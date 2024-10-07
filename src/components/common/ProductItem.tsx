import TimeLabel from './atomic/TimeLabel';

export interface ProductProps {
  id: number;
  name: string;
  minPrice: number;
  timeRemaining?: number;
  participantCount?: number;
  isParticipating?: boolean;
  likeCount?: number;
  isLiked?: boolean;
  status?: string;
  createdAt?: string;
  imageUrl?: string;
}

const ProductItem = ({
  product,
  children,
}: {
  product: ProductProps;
  children: React.ReactNode;
}) => {

  return (
    <div key={product.id} className="mb-4">
      <div className="flex flex-col">
        <div className="w-full h-auto mb-4">
          <div className="relative">
            <img
              className="object-cover w-full h-[15rem] rounded-t"
              src={product.imageUrl}
              alt="Jordan Black Shoes"
            />
            {product.timeRemaining && <TimeLabel time={product.timeRemaining} />}
          </div>
        </div>

        <div className="flex flex-col gap-[8px]">
          <div>
            <p className="text-sm font-semibold">{product.name}</p>
          </div>
          <div className="flex flex-col">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
