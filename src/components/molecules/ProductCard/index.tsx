import React from 'react';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';

export type ProductCardProps = {
  name: string;
  price: number;
  shortDescription: string;
  imageUrl: string;
  ref?: React.LegacyRef<HTMLDivElement>;
  isFavorite?: boolean;
  onFavoriteClick: () => void;
};
const ProductCard = ({
  name,
  price,
  shortDescription,
  imageUrl,
  ref,
  isFavorite,
  onFavoriteClick,
}: ProductCardProps) => {
  return (
    <div
      ref={ref}
      className="flex relative flex-col bg-white rounded-lg space-y-0 max-h-64"
      draggable={false}
    >
      <div className="flex w-full h-2/4 justify-center">
        <img src={imageUrl} className="" draggable={false} alt={name} />
      </div>
      <div className="flex flex-col justify-center w-full h-2/4 p-4">
        <span className="font-semibold text-base">
          {price.toLocaleString('default', {
            minimumFractionDigits: 0,
            style: 'currency',
            currency: 'BRL',
          })}
        </span>
        <span className="font-bold text-lg">{name}</span>
        <span className="font-light text-sm truncate">{shortDescription}</span>
      </div>
      {isFavorite !== undefined && (
        <div className="absolute top-2 right-2">
          {isFavorite ? (
            <AiFillLike
              size={28}
              onClick={() => {
                if (onFavoriteClick) onFavoriteClick();
              }}
              className={`text-primaryColor-1000 ${
                onFavoriteClick ? 'cursor-pointer' : ''
              }`}
            />
          ) : (
            <AiOutlineLike
              size={28}
              onClick={() => {
                if (onFavoriteClick) onFavoriteClick();
              }}
              className={`text-primaryColor-1000 ${
                onFavoriteClick ? 'cursor-pointer' : ''
              }`}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
