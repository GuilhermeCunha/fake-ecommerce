import Badge from 'components/atoms/Badge';
import { useAuth } from 'contexts/AuthenticationContext';
import { useSearch } from 'contexts/SearchContext';
import Link from 'next/link';
import React from 'react';
import { BiLike } from 'react-icons/bi';

// import { Container } from './styles';

const GoToFavoritesLink: React.FC = () => {
  const { state: authState, signInWithOAuth, signOut } = useAuth();
  const { state, setQuery } = useSearch();
  return (
    <div className="flex justify-center items-center">
      <span className="font-semibold text-primaryColor-1000 mr-2">
        Favoritos{' '}
      </span>
      <Badge text={(state.favoriteProducts?.length || 0).toString()}>
        <Link href="/favorites">
          <a>
            <BiLike
              size={28}
              className="cursor-pointer text-primaryColor-1000"
            />
          </a>
        </Link>
      </Badge>
    </div>
  );
};

export default GoToFavoritesLink;
