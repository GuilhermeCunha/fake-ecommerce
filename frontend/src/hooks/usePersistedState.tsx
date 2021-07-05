import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export function usePersistedState<T>(
  defaultValue: T,
  key?: string,
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState<T>();

  useEffect(() => {
    if (key) {
      setState(JSON.parse(localStorage.getItem(key)) || defaultValue);
      setIsLoading(false);
    }
  }, [key]);

  useEffect(() => {
    if (key) {
      if (!isLoading) localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state, isLoading]);

  return [state, setState, isLoading];
}
