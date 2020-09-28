import React from 'react';
import { useCountState, CountProvider } from './CountContext';
import { useCount } from './CountContext'; 

function useRenderCounter() {
  const ref = React.useRef<number>(0);
  React.useEffect(() => {
    ref.current = Number(ref.current || 0) + 1;
  });
  return (
    <span>
      {ref.current}
    </span>
  );
}

const CountDisplay = React.memo(function CountDisplay() {
  const count = useCountState();
  const renderCount = useRenderCounter();
  return (
    <div style={{ border: '1px solid black', padding: 10 }}>
      {renderCount}
      {`The current count is ${count}. `}
    </div>
  );
});

const Counter = function Counter() {

  const [countState, increment] = useCount();
  
  return (
    <div style={{ border: '1px solid black', padding: 10 }}>
      <button onClick={increment}>Increment count</button>
    </div>
  );
};

export const Usage = () => {
  const [, forceUpdate] = React.useState({});
  return (
    <div style={{ border: '1px solid black', padding: 10 }}>
      <button onClick={() => forceUpdate({})}>force render</button>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  );
};
