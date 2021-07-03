import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function usePersistedState<T>(
  key: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState<T>();

  useEffect(() => {
    setState(JSON.parse(localStorage.getItem(key)) || defaultValue);
    setIsLoading(false);
  }, [key]);

  useEffect(() => {
    if (!isLoading) localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState, isLoading];
}
