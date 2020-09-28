import React, { createContext } from 'react';

//the trick here is to split up count and setCount
//so create two context

const CountStateContext = createContext<number | null>(null);
const CountUpdaterContext = createContext<React.Dispatch<any> | null>(null);

interface Props {
  children: React.ReactNode;
}

export function CountProvider({ children }: Props): JSX.Element {
  const [count, setCount] = React.useState(0);
  //the trick here is to split up count and setCount
  return (
    <CountStateContext.Provider value={count}>
      <CountUpdaterContext.Provider value={setCount}>
        {children}
      </CountUpdaterContext.Provider>
    </CountStateContext.Provider>
  );
}

export function useCountState() {
  const countState = React.useContext(CountStateContext);
  if (typeof countState === 'undefined') {
    throw new Error('useCountState must be used within a CountProvider');
  }
  return countState;
}

export function useCountUpdater() {
  const setCount = React.useContext(CountUpdaterContext);
  if (typeof setCount === 'undefined') {
    throw new Error('useCountUpdater must be used within a CountProvider');
  }
  const increment = React.useCallback(() => setCount?.((c: number) => c + 1), [
    setCount,
  ]);
  return increment;
}

//alternative to these two functions is to two use one functio

export function useCount(): [ReturnType< typeof useCountState>, ReturnType< typeof useCountUpdater>  ] {
  return [useCountState(), useCountUpdater()];
}
