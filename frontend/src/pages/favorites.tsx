import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import SearchLayout from 'layout/SearchLayout';
import { useSearch } from 'contexts/SearchContext';
import Link from 'next/link';
import ProductsList from 'components/molecules/ProductsList';
import { useAuth } from 'contexts/AuthenticationContext';

const FavoritesPage = () => {
  const { state: authState } = useAuth();
  const { state, removeFromFavorites, addToFavorites } = useSearch();

  return (
    <SearchLayout>
      <div className="flex flex-col w-full h-full overflow-x-hidden overflow-y-hidden">
        <div className="flex flex-row w-full px-6 mt-4 items-center">
          <Link href="/">
            <a className="flex flex-row items-center">
              <AiOutlineArrowLeft size={28} />
              <span className="font-bold ml-2">Voltar</span>
            </a>
          </Link>
        </div>

        <div className="flex flex-col w-full h-full p-4 overflow-y-auto">
          <ProductsList
            products={state.favoriteProducts}
            onFavoriteClick={
              !!authState?.firebaseUser
                ? product => {
                    if (product.isFavorite) {
                      removeFromFavorites(product);
                    } else {
                      addToFavorites(product);
                    }
                  }
                : undefined
            }
          />
        </div>
      </div>
    </SearchLayout>
  );
};

export default FavoritesPage;
