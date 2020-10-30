import React, { useState } from 'react';

/* 
A hydra is a mythical creature with multiple heads. 
A package that follows the Hydra pattern contains all of the logic and state, 
and exports both a custom hook as well as a component that accepts a render prop. 
It too has multiple heads. 
*/

type useCounterHookReturn = {
  count: number;
  incCount: () => void;
  decCount: () => void;
};

const useCounter = (initialCount: number): useCounterHookReturn => {
  const [count, setCount] = useState<number>(initialCount);
  const deltaCount = (delta: number) => setCount((count) => count + delta);

  return {
    count,
    incCount: () => deltaCount(1),
    decCount: () => deltaCount(-1),
  };
};

interface Props {
  initialCount: number;
  children: React.ReactNode;
  render: (
    childer: React.ReactNode,
    customHook: ReturnType<typeof useCounter>
  ) => React.ReactElement;
}

const Counter: React.FC<Props> = ({ initialCount, children, render }) =>
  render(children, useCounter(initialCount));

export default Counter;
export { useCounter };
