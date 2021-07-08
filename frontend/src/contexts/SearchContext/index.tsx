import { useAuth } from 'contexts/AuthenticationContext';
import { usePersistedState } from 'hooks/usePersistedState';
import { Pagination } from 'interfaces/Pagination.interface';
import { Product } from 'interfaces/Product.interface';
import { ProductSource } from 'interfaces/ProductSource.interface';
import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
} from 'react';

interface SearchContextData {
  state: SearchContextState;
  setProducts: (products: Product[]) => void;
  setFavoriteProducts: (products: Product[]) => void;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (product: Product) => void;
  isFavorite: (product: Product) => boolean;
  setSelectedSource: (source?: ProductSource) => void;
  setIsLoading: (isLoading: boolean) => void;
  setQuery: (query: string) => void;
  setPagination: (pagination: Pagination) => void;
  clearState: () => void;
}

export interface SearchContextState {
  selectedSource?: ProductSource;
  products: Product[];
  favoriteProducts: Product[];
  isLoading?: boolean;
  pagination: Pagination;
  isLoadingState?: boolean;
  isLoadingFavoriteProducts?: boolean;
}

const SearchContext = createContext<SearchContextData>({} as SearchContextData);

const defaultSearchContextState: SearchContextState = {
  products: [],
  favoriteProducts: [],
  isLoading: false,
  pagination: {
    limit: 50,
    offset: 0,
    total: 0,
  },
};
const SearchProvider: React.FC = ({ children }) => {
  const { state: authState } = useAuth();

  const [favoriteProducts, setFavoriteProducts, isLoadingFavoriteProducts] =
    usePersistedState<Product[]>(
      [],
      !!authState?.firebaseUser?.uid
        ? `@_${authState?.firebaseUser?.uid}_FAVORITE_PRODUCTS`
        : undefined,
    );
  const [selectedSource, setSelectedSourceState] =
    usePersistedState<ProductSource>(null, '@PRODUCTS_SOURCE');

  const [state, setState, isLoadingState] =
    usePersistedState<SearchContextState>(
      defaultSearchContextState,
      '@SEACH_PRODUCTS_STATE',
    );

  useEffect(() => {
    setState(oldState => ({
      ...oldState,
      favoriteProducts,
    }));
  }, [favoriteProducts, selectedSource]);

  const setIsLoading = useCallback((isLoading?: boolean) => {
    setState(oldState => ({
      ...oldState,
      isLoading,
    }));
  }, []);

  const setQuery = useCallback((query: string) => {
    setState(oldState => ({
      ...oldState,
      query,
    }));
  }, []);

  const setPagination = useCallback((pagination?: Pagination) => {
    setState(oldState => ({
      ...oldState,
      pagination,
    }));
  }, []);

  const setProducts = useCallback((products: Product[]) => {
    setState(oldState => ({
      ...oldState,
      products: products.map(product => {
        return {
          ...product,
          isFavorite: isFavorite(product, oldState.favoriteProducts),
        };
      }),
    }));
  }, []);

  const setSelectedSource = useCallback((source: ProductSource) => {
    setSelectedSourceState(source);
    clearState();
  }, []);

  const addToFavorites = useCallback(
    (product: Product) => {
      if (isLoadingFavoriteProducts) return;
      const newFavorites = [...favoriteProducts];
      if (
        newFavorites.findIndex(
          o => o.id === product.id && o.source?.id === product.source?.id,
        ) === -1
      ) {
        newFavorites.push(product);
      }

      setFavoriteProducts(newFavorites);

      setState(oldState => {
        const newProducts = [...oldState.products];
        const productIndex = newProducts.findIndex(
          o => o.id === product.id && o.source?.id === product.source?.id,
        );

        if (productIndex !== -1) {
          newProducts[productIndex].isFavorite = true;
        }

        return {
          ...oldState,
          products: newProducts,
        };
      });
    },
    [favoriteProducts, isLoadingFavoriteProducts],
  );

  const removeFromFavorites = useCallback(
    (product: Product) => {
      if (isLoadingFavoriteProducts) return;
      const newFavorites = favoriteProducts.filter(
        o => !(o.id === product.id && o.source?.id === product.source?.id),
      );
      setFavoriteProducts(newFavorites);

      setState(oldState => {
        const newProducts = [...oldState.products];
        const productIndex = newProducts.findIndex(
          o => o.id === product.id && o.source?.id === product.source?.id,
        );

        if (productIndex !== -1) {
          newProducts[productIndex].isFavorite = false;
        }

        return {
          ...oldState,
          products: newProducts,
        };
      });
    },
    [favoriteProducts, isLoadingFavoriteProducts],
  );

  const isFavorite = useCallback(
    (product: Product, favoriteProducts: Product[] = []) => {
      const favoriteIndex = favoriteProducts.findIndex(
        o => o.id === product.id && o.source?.id === product.source?.id,
      );
      return favoriteIndex !== -1;
    },
    [],
  );

  const clearState = useCallback(() => {
    setState(() => {
      return {
        ...defaultSearchContextState,
        favoriteProducts,
      };
    });
  }, [favoriteProducts]);

  return (
    <SearchContext.Provider
      value={
        {
          state: {
            ...state,
            selectedSource,
            isLoadingState,
            isLoadingFavoriteProducts,
          },
          setProducts,
          setFavoriteProducts,
          addToFavorites,
          clearState,
          removeFromFavorites,
          isFavorite,
          setSelectedSource,
          setIsLoading,
          setQuery,
          setPagination,
        } as SearchContextData
      }
    >
      {children}
    </SearchContext.Provider>
  );
};

function useSearch(): SearchContextData {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }

  return context;
}

export { SearchProvider, useSearch };
