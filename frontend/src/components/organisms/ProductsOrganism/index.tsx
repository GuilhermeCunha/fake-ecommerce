import React from 'react';
import { Pagination } from 'antd';
import { AiOutlineClose, AiOutlineFilter } from 'react-icons/ai';
import SearchLayout from 'layout/SearchLayout';
import { useState } from 'react';
import SearchInput from 'components/molecules/inputs/SearchInput';
import { useSearch } from 'contexts/SearchContext';

import ProductsList from 'components/molecules/ProductsList';
import ProductsSourceSelect from 'components/molecules/ProductsSourceSelect';
import useResponsiveState from 'hooks/useResponsiveState';
import { useCallback } from 'react';
import { useAuth } from 'contexts/AuthenticationContext';
import GoToFavoritesLink from 'components/molecules/GoToFavoritesLink';
import BeatLoader from 'components/atoms/Loaders/BeatLoader';
import { useEffect } from 'react';

import { Pagination as PaginationType } from 'interfaces/Pagination.interface';

export type ProductsOrganismProps = {
  filters?: React.ReactNode;
  sorts?: React.ReactNode;

  onChangeQuery?: (query?: string) => void;
  query?: string;
  pagination?: PaginationType;
  onChangePagination?: (offset: number, limit?: number) => void;
};
const ProductsOrganism = ({
  filters,
  sorts,
  onChangePagination,
  onChangeQuery,
  query,
  pagination,
}: ProductsOrganismProps) => {
  const { state: authState } = useAuth();
  const { isTabletOrMobile } = useResponsiveState();
  const [isLeftSideCollapsed, setIsLeftSideCollapsed] = useState(true);
  const { state, removeFromFavorites, addToFavorites } = useSearch();
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  const getLeftSideSizeClassNames = useCallback(() => {
    if (!isTabletOrMobile) return 'w-4/12';

    if (isLeftSideCollapsed) {
      return 'hidden';
    } else {
      return 'flex fixed w-screen h-screen z-50';
    }
  }, [isTabletOrMobile, isLeftSideCollapsed]);

  return (
    <SearchLayout>
      <div className="flex flex-row w-full h-full justify-center">
        <div
          className={`flex flex-col h-full  overflow-y-auto overflow-x-hidden space-y-4 duration-150 ease-in-out transition-all delay-150 p-4 ${getLeftSideSizeClassNames()} bg-gray-200`}
        >
          {isTabletOrMobile && (
            <div className="flex w-full justify-center items-center">
              {!isLeftSideCollapsed && (
                <AiOutlineClose
                  size={28}
                  onClick={() => {
                    setIsLeftSideCollapsed(true);
                  }}
                  className="cursor-pointer"
                />
              )}
            </div>
          )}
          {(!isTabletOrMobile || !isLeftSideCollapsed) && (
            <>
              {sorts && (
                <div className="flex flex-col p-1">
                  <span className="text-primaryColor-1000 font-bold text-xl mb-2">
                    Ordenação
                  </span>
                  {sorts}
                </div>
              )}
              {filters && (
                <div className="flex flex-col p-1">
                  <span className="text-primaryColor-1000 font-bold text-xl mb-2">
                    Filtros
                  </span>
                  {filters}
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex flex-col h-full w-full">
          <div className="flex flex-row p-4 space-x-2 items-center">
            <span>Buscando no(a)</span>
            <ProductsSourceSelect />
          </div>
          <div className="flex flex-col w-full px-4">
            {onChangeQuery && !state.isLoadingState && (
              <SearchInput
                enterButton={
                  <button
                    type="button"
                    className="flex justify-center items-center p-1 ml-1 tracking-wide font-bold rounded border-2 shadow-md text-primaryColor-1000 border-primaryColor-1000 hover:text-white hover:border-primaryColor-1000 hover:bg-primaryColor-1000 transition duration-500"
                  >
                    Search
                  </button>
                }
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                }}
                onBlur={() => {
                  if (onChangeQuery) onChangeQuery(searchQuery);
                }}
                onSubmit={() => {
                  if (onChangeQuery) onChangeQuery(searchQuery);
                }}
                onSearch={() => {
                  if (onChangeQuery) onChangeQuery(searchQuery);
                }}
              />
            )}

            <div className="flex flex-row w-full justify-end px-6 py-4">
              {isTabletOrMobile && filters && (
                <div className="flex w-full justify-center items-center">
                  <div className="flex flex-row w-full items-center">
                    <AiOutlineFilter
                      onClick={() => {
                        setIsLeftSideCollapsed(false);
                      }}
                      className="cursor-pointer text-primaryColor-1000"
                      size={28}
                    />
                    <span className="font-semibold text-primaryColor-1000 ml-2">
                      Filtrar{' '}
                    </span>
                  </div>
                </div>
              )}

              {!!authState?.firebaseUser && <GoToFavoritesLink />}
            </div>
          </div>

          {state.isLoading ? (
            <div className="flex w-full h-full justify-center items-center">
              <BeatLoader />
            </div>
          ) : (
            <ProductsList
              products={state.products}
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
          )}

          {!!pagination && onChangePagination && (
            <div className="flex w-full justify-center items-center mt-4">
              <Pagination
                total={pagination.total}
                pageSize={pagination.limit}
                current={
                  (pagination.offset + pagination.limit) / pagination.limit
                }
                pageSizeOptions={['20', '50']}
                onChange={(page, pageSize) => {
                  onChangePagination((page - 1) * pagination.limit, pageSize);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </SearchLayout>
  );
};

export default ProductsOrganism;
