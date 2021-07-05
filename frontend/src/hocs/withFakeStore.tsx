import Select from 'components/atoms/inputs/Select';
import ProductsOrganism from 'components/organisms/ProductsOrganism';
import { FAKE_STORE_SOURCE } from 'config/constants';
import { useSearch } from 'contexts/SearchContext';
import { usePersistedState } from 'hooks/usePersistedState';
import React, { useCallback, useEffect } from 'react';
import { getFakeStoreProducts } from 'services/Fakestore';
import {
  GetFakeStoreProducts,
  GetFakeStoreProductsSort,
} from 'services/Fakestore/interfaces';

export type WithFakeStoreComponentProps = {
  Component: typeof ProductsOrganism;
};
const WithFakeStoreComponent = ({ Component }: WithFakeStoreComponentProps) => {
  const { state, setProducts, setIsLoading } = useSearch();

  const [requestDTO, setRequestDTO, isLoadingRequestDTO] =
    usePersistedState<GetFakeStoreProducts>(
      {
        limit: String(state.pagination.limit),
      },
      '@FAKE_STORE_REQUEST_DTO',
    );

  const fetchItems = useCallback((dto: GetFakeStoreProducts) => {
    setIsLoading(true);
    getFakeStoreProducts(dto)
      .then(results => {
        setProducts(
          results.map(product => ({
            id: product.id,
            imageUrl: product.image,
            name: product.title,
            price: product.price,
            shortDescription: '',
            source: FAKE_STORE_SOURCE,
            isFavorite: false,
          })),
        );
      })
      .catch(() => {
        //
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!isLoadingRequestDTO && !state.isLoadingState) {
      fetchItems(requestDTO);
    }
  }, [
    requestDTO,
    state.isLoadingState,
    state.isLoadingFavoriteProducts,
    isLoadingRequestDTO,
    fetchItems,
  ]);

  return (
    <Component
      // data-cy="mercadoli"
      sorts={
        !isLoadingRequestDTO && (
          <Select
            value={requestDTO?.sort}
            onChange={value => {
              setRequestDTO(oldState => ({
                ...oldState,
                sort: value as GetFakeStoreProductsSort,
              }));
            }}
            options={[
              {
                name: 'Novos primeiro',
                value: 'asc',
              },
              {
                name: 'Antigos primeiro',
                value: 'desc',
              },
            ]}
          />
        )
      }
      onChangePagination={(offset, limit) => {
        setRequestDTO(oldState => ({
          ...oldState,
          limit: String(limit),
          offset: String(offset),
        }));
      }}
    />
  );
};

const withFakeStore = (Component: typeof ProductsOrganism) => {
  return <WithFakeStoreComponent Component={Component} />;
};
export default withFakeStore;
