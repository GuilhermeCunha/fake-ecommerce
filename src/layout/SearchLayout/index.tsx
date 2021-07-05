import Topbar from 'components/molecules/Topbar';
import React from 'react';

const SearchLayout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col w-screen h-screen max-h-screen overflow-x-hidden overflow-y-auto bg-gray-100">
      <Topbar />
      {children}
    </div>
  );
};

export default SearchLayout;
