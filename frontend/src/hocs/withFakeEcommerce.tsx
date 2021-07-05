import Select from 'components/atoms/inputs/Select';
import ProductsOrganism from 'components/organisms/ProductsOrganism';
import { FAKE_ECOMMERCE_SOURCE, FAKE_STORE_SOURCE } from 'config/constants';
import { useSearch } from 'contexts/SearchContext';
import { usePersistedState } from 'hooks/usePersistedState';
import React, { useCallback, useEffect } from 'react';
import { getFakeEcommerceProducts } from 'services/FakeEcommerce';
import {
  FakeEcommerceProductPaging,
  GetFakeEcommerceProducts,
  GetFakeEcommerceProductsSorts,
} from 'services/FakeEcommerce/interfaces';

export type WithFakeEcommerceComponentProps = {
  Component: typeof ProductsOrganism;
};
const WithFakeEcommerceComponent = ({
  Component,
}: WithFakeEcommerceComponentProps) => {
  const { state, setProducts, setIsLoading } = useSearch();

  const [requestDTO, setRequestDTO, isLoadingRequestDTO] =
    usePersistedState<GetFakeEcommerceProducts>(
      {
        pagination: {
          limit: state.pagination?.limit,
          skip: state.pagination?.offset,
        },
      },
      '@FAKE_STORE_REQUEST_DTO',
    );

  const [pagination, setPagination, isLoadingPagination] =
    usePersistedState<FakeEcommerceProductPaging>(
      {
        limit: 50,
        skip: 0,
        total: 0,
      },
      '@FAKE_STORE_PAGINATION',
    );

  const fetchItems = useCallback((dto: GetFakeEcommerceProducts) => {
    setIsLoading(true);
    getFakeEcommerceProducts(dto)
      .then(result => {
        setProducts(
          result.results.map(product => ({
            id: product._id,
            imageUrl: product.imageUrl,
            name: product.name,
            price: product.price,
            shortDescription: product.shortDescription,
            source: FAKE_ECOMMERCE_SOURCE,
            isFavorite: false,
          })),
        );

        setPagination(result.pagination);
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
            value={requestDTO?.sorts?.['sort-createdAt']}
            onChange={value => {
              setRequestDTO(oldState => ({
                ...oldState,
                sorts: {
                  'sort-createdAt': value as any,
                },
              }));
            }}
            options={[
              {
                name: 'Novos primeiro',
                value: '-1',
              },
              {
                name: 'Antigos primeiro',
                value: '1',
              },
            ]}
          />
        )
      }
      pagination={
        !isLoadingPagination
          ? {
              limit: pagination.limit,
              offset: pagination.skip,
              total: pagination.total,
            }
          : undefined
      }
      onChangePagination={
        !isLoadingPagination
          ? (offset, limit) => {
              setRequestDTO(oldState => ({
                ...oldState,
                pagination: {
                  limit,
                  skip: offset,
                },
              }));
            }
          : undefined
      }
      query={requestDTO?.filters?.name}
      onChangeQuery={text => {
        setRequestDTO(oldState => ({
          ...oldState,
          filters: {
            ...oldState.filters,
            name: text,
          },
        }));
      }}
    />
  );
};

const withFakeEcommerce = (Component: typeof ProductsOrganism) => {
  return <WithFakeEcommerceComponent Component={Component} />;
};
export default withFakeEcommerce;
