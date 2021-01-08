import { useEffect, useReducer, useRef } from 'react';

type FetchConfig = {
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  mode?: 'cors' | 'no-cors' | 'same-origin';
  credentials?: 'same-origin' | 'include' | 'omit';
  cache?: 'no-cache' | 'reload' | 'force-cache' | 'only-if-cached';
  headers: { [key: string]: any };
};

type State<T> = {
  status: 'init' | 'fetching' | 'error' | 'fetched';
  data?: T | null;
  error?: string | null;
};

enum ActionType {
  REQUEST = 'REQUEST',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

type Action<T> =
  | { type: ActionType.REQUEST }
  | { type: ActionType.SUCCESS; payload: T }
  | { type: ActionType.FAILURE; payload: string };

function reducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case ActionType.REQUEST:
      return { ...state, status: 'fetching' };
    case ActionType.SUCCESS:
      return { ...state, status: 'fetched', data: action.payload };
    case ActionType.FAILURE:
      return { ...state, status: 'error', error: action.payload };
    default:
      return state;
  }
}

type Cache<T> = {
  [url: string]: T;
};

export const useFetch = <T = unknown>(
  url: string,
  options?: FetchConfig
): State<T> => {
  const cache = useRef<Cache<T>>({});

  const initialState: State<T> = {
    status: 'init',
    error: null,
    data: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  let cancelRequest = false;

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: ActionType.REQUEST });
      if (cache.current[url]) {
        dispatch({ type: ActionType.SUCCESS, payload: cache.current[url] });
      } else {
        try {
          const response = await fetch(url, options);
          const data = await response.json();
          cache.current[url] = data;
          if (cancelRequest) return;
          dispatch({ type: ActionType.SUCCESS, payload: data });
        } catch (error) {
          if (cancelRequest) return;
          dispatch({ type: ActionType.FAILURE, payload: error.message });
        }
      }
    };
    fetchData();
    return () => {
      cancelRequest = true;
    };
  }, [url]);

  return state as any;
};
