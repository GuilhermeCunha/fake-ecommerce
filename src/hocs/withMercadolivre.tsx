import Select from 'components/atoms/inputs/Select';
import ProductsOrganism from 'components/organisms/ProductsOrganism';
import { MERCADO_LIVRE_SOURCE } from 'config/constants';
import { useSearch } from 'contexts/SearchContext';
import { usePersistedState } from 'hooks/usePersistedState';
import { Pagination } from 'interfaces/Pagination.interface';
import { ProductSort } from 'interfaces/ProductSort.interface';
import React, { useCallback, useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { getMercadoLivreProducts } from 'services/MercadoLivre';
import {
  GetMercadoLivreProducts,
  GetMercadoLivreProductsPagination,
  MercadoLivreFilter,
} from 'services/MercadoLivre/interfaces';

export type WithMercadoLivreComponentProps = {
  Component: typeof ProductsOrganism;
};

export type SelectedFilter = {
  [key: string]: {
    filter: MercadoLivreFilter;
    value: string;
  };
};
const WithMercadoLivreComponent = ({
  Component,
}: WithMercadoLivreComponentProps) => {
  const { state, setProducts, setIsLoading, setQuery } = useSearch();
  const [availableSorts, setAvailableSorts, isLoadingAvailableSorts] =
    usePersistedState<ProductSort[]>([], '@MERCADO_LIVRE_AVAILABLE_SORTS');
  const [availableFilters, setAvailableFilters, isLoadingAvailableFilters] =
    usePersistedState<MercadoLivreFilter[]>(
      [],
      '@MERCADO_LIVRE_AVAILABLE_FILTERS',
    );

  const [pagination, setPagination, isLoadingPagination] =
    usePersistedState<Pagination>(
      {
        limit: 50,
        offset: 0,
        total: 0,
      },
      '@MERCADO_LIVRE_PAGINATION',
    );

  const [paginationDTO, setPaginationDTO, isLoadingPaginationDTO] =
    usePersistedState<GetMercadoLivreProductsPagination>(
      {
        limit: '50',
        offset: '0',
      },
      '@MERCADO_LIVRE_PAGINATION_DTO',
    );

  const [filters, setFilters, isLoadingFilters] =
    usePersistedState<SelectedFilter>({}, '@MERCADO_LIVRE_FILTERS');

  const [requestDTO, setRequestDTO, isLoadingRequestDTO] =
    usePersistedState<GetMercadoLivreProducts>(
      {
        limit: String(state.pagination.limit),
        offset: String(state.pagination.offset),
      },
      '@MERCADO_LIVRE_REQUEST_DTO',
    );

  const fetchItems = useCallback((dto: GetMercadoLivreProducts) => {
    const params: GetMercadoLivreProducts = {
      ...dto,
    };

    if (!params.sort) {
      delete params.sort;
    }

    setIsLoading(true);
    getMercadoLivreProducts(params)
      .then(result => {
        console.log({
          result,
          params,
        });
        setAvailableSorts(result.available_sorts);

        if (!!result.available_filters?.length) {
          setAvailableFilters(result.available_filters);
        }

        setPagination({
          limit: result.paging.limit,
          offset: result.paging.offset,
          total: result.paging.total,
        });
        setProducts(
          result.results.map(product => ({
            id: product.id,
            imageUrl: product.thumbnail,
            name: product.title,
            price: product.price,
            shortDescription: '',
            source: MERCADO_LIVRE_SOURCE,
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
    if (!isLoadingRequestDTO) {
      fetchItems(requestDTO);
    }
  }, [requestDTO, state.isLoadingFavoriteProducts, isLoadingRequestDTO]);

  useEffect(() => {
    if (!isLoadingFilters) {
      const filtersDTO = {};
      Object.values(filters).forEach(filter => {
        if (filter.filter) {
          filtersDTO[filter.filter.id] = filter.value;
        }
      });

      setRequestDTO(oldState => ({
        offset: '0',
        limit: oldState?.limit,
        sort: oldState?.sort,
        q: oldState?.q,
        ...filtersDTO,
      }));
    }
  }, [filters]);

  useEffect(() => {
    setRequestDTO(oldState => ({
      ...oldState,
      ...paginationDTO,
    }));
  }, [paginationDTO]);

  return (
    <Component
      query={requestDTO?.q}
      onChangeQuery={text => {
        setRequestDTO(oldState => ({
          ...oldState,
          q: text,
        }));
      }}
      filters={
        !isLoadingAvailableFilters &&
        !!availableFilters?.length && (
          <div className="flex flex-col justify-center items-center">
            {!!Object.keys(filters).length && (
              <button
                type="button"
                onClick={() => {
                  setFilters({});
                }}
                className="flex space-x-2 justify-center items-center"
              >
                <span>Limpar filtros</span>
                <AiFillDelete size={18} />
              </button>
            )}

            {availableFilters
              .filter(o => !!o.values)
              .map(filter => {
                return (
                  <div
                    key={filter.id}
                    className="flex flex-col justify-center items-start w-full"
                  >
                    <span className="text-primaryColor-1000 font-bold">
                      {filter.name}
                    </span>
                    <Select
                      value={filters[filter.id]?.value}
                      allowClear={true}
                      onChange={value => {
                        if (value) {
                          setFilters(oldFilters => {
                            const newFilters = { ...oldFilters };
                            newFilters[filter.id] = {
                              filter,
                              value: String(value),
                            };
                            return newFilters;
                          });
                        } else {
                          setFilters(oldFilters => {
                            const newFilters = { ...oldFilters };
                            delete newFilters[filter.id];
                            return newFilters;
                          });
                        }
                      }}
                      options={filter.values.map(filterValue => {
                        return {
                          name: filterValue.name,
                          value: filterValue.id,
                        };
                      })}
                    />
                  </div>
                );
              })}
          </div>
        )
      }
      sorts={
        !isLoadingAvailableSorts && (
          <Select
            value={requestDTO?.sort}
            onChange={value => {
              setRequestDTO(oldState => ({
                ...oldState,
                offset: '0',
                sort: value ? String(value) : undefined,
              }));
            }}
            options={availableSorts.map(sort => ({
              name: sort.name,
              value: sort.id,
            }))}
          />
        )
      }
      pagination={!isLoadingPagination ? pagination : undefined}
      onChangePagination={
        !isLoadingPagination
          ? (offset, limit) => {
              setPaginationDTO(oldState => ({
                ...oldState,
                limit: String(limit),
                offset: String(offset),
              }));
            }
          : undefined
      }
    />
  );
};

const withMercadoLivre = (Component: typeof ProductsOrganism) => {
  return <WithMercadoLivreComponent Component={Component} />;
};
export default withMercadoLivre;
