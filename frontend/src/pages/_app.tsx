import { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import 'antd/dist/antd.css';
import '../styles/global.css';

import React from 'react';
import { SearchProvider } from 'contexts/SearchContext';
import { AuthProvider } from 'contexts/AuthenticationContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SearchProvider>
        <Component {...pageProps} />
      </SearchProvider>
    </AuthProvider>
  );
}

export default MyApp;
