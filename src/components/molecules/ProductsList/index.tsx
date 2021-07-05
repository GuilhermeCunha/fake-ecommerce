import { Product } from 'interfaces/Product.interface';
import React from 'react';
import ProductCard from '../ProductCard';
import WithoutResults from '../WithoutResults';

export type ProductsList = {
  products: Product[];
  onFavoriteClick?: (product: Product) => void;
};
const ProductsList = ({ products, onFavoriteClick }: ProductsList) => {
  return products?.length ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-full overflow-y-auto p-4">
      {products.map((product, index) => {
        return (
          <ProductCard
            key={`Product_${product.id}_${index}`}
            imageUrl={product.imageUrl}
            name={product.name}
            shortDescription={product.shortDescription}
            price={product.price}
            isFavorite={product.isFavorite}
            onFavoriteClick={
              onFavoriteClick
                ? () => {
                    onFavoriteClick(product);
                  }
                : undefined
            }
          />
        );
      })}
    </div>
  ) : (
    <WithoutResults />
  );
};

export default ProductsList;
