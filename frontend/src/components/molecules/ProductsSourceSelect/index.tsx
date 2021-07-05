import { PRODUCT_SOURCES } from 'config/constants';
import { useSearch } from 'contexts/SearchContext';
import { ProductSource } from 'interfaces/ProductSource.interface';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const ProductsSourceSelect = () => {
  const [sources, setSources] = useState<ProductSource[]>(PRODUCT_SOURCES);
  const { state, setSelectedSource } = useSearch();

  useEffect(() => {
    setSources(oldSources => [...oldSources.map(source => source)]);
  }, [state.selectedSource]);
  return (
    <div
      data-cy="select-sources-div"
      className="flex flex-row max-w-full space-x-4 overflow-x-auto"
    >
      {sources.map(source => {
        const isSelected = source.id === state.selectedSource?.id;
        return (
          <button
            data-cy={`select-${source.id}-button`}
            key={source.id}
            disabled={source.comingSoon}
            onClick={() => {
              setSelectedSource(source);
            }}
            type="button"
            className={`md:w-32 p-2 tracking-wide font-bold rounded border-2 shadow-md inline-flex items-center border-primaryColor-1000 transition duration-500 ${
              isSelected
                ? 'bg-primaryColor-1000 text-white'
                : 'text-primaryColor-1000'
            } ${
              source.comingSoon
                ? 'text-black hover:bg-gray-400 hover:text-black '
                : ' hover:text-white hover:border-primaryColor-1000 hover:bg-primaryColor-1000'
            }`}
          >
            <span className="mx-auto font-medium text-sm">
              {source.name}
              {source.comingSoon ? ' (em breve)' : ''}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ProductsSourceSelect;
