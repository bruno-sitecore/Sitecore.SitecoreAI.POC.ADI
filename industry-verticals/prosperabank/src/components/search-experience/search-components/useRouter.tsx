'use client';
import { useCallback } from 'react';
import { useRouter as useNextRouter } from 'next/router';
import { useDebouncedCallback } from './useDebounce';

export const useRouter = () => {
  const router = useNextRouter();
  const setRouterQuery = useCallback(
    (value: string) => {
      const pathOnly = router.asPath.split('?')[0];
      const queryString = value ? `?q=${encodeURIComponent(value)}` : '';
      router.replace(pathOnly + queryString, undefined, { shallow: true });
    },
    [router]
  );

  const debouncedSetRouterQuery = useDebouncedCallback(setRouterQuery);

  const setQuery = useCallback(
    (value: string, debounced: boolean = true) => {
      if (debounced) {
        debouncedSetRouterQuery(value);
      } else {
        setRouterQuery(value);
      }
    },
    [debouncedSetRouterQuery, setRouterQuery]
  );

  return { setRouterQuery: setQuery };
};
