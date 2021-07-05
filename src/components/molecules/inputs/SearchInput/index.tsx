import React from 'react';
import { Input } from 'antd';
import { SearchProps } from 'antd/lib/input';

const { Search } = Input;

const SearchInput = (props: SearchProps & React.RefAttributes<Input>) => {
  return (
    <Search
      type="text"
      placeholder="Buscar produtos, marcas e muito mais"
      // className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
      {...props}
    />
  );
};

export default SearchInput;
