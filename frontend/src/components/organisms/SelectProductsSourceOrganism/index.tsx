import ProductsSourceSelect from 'components/molecules/ProductsSourceSelect';
import SearchLayout from 'layout/SearchLayout';
import React from 'react';

const SelectProductsSourceOrganism = () => {
  return (
    <SearchLayout>
      <div
        data-cy="select-sources-component"
        className="flex flex-row w-full h-full justify-center items-center"
      >
        <div className="flex flex-col w-full px-6 lg:w-1/2 bg-center bg-cover bg-no-repeat bg-gray-100">
          <h1 className="text-4xl font-bold uppercase text-indigo-600 transition duration-500">
            Selecione um Marketplace
          </h1>
          <h2 className="text-xl text-gray-700 transition duration-500">
            Basta selecionar o martkeplace que você preferir para começar a
            buscar produtos incríveis!
          </h2>
          <ProductsSourceSelect />
        </div>
      </div>
    </SearchLayout>
  );
};

export default SelectProductsSourceOrganism;
