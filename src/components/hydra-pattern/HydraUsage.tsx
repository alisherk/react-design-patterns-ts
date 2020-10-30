import React from 'react';
import Hydra from './HydraFCPattern';

export const HydraUsage: React.FC = () => {
  return (
    <Hydra
      children={<p> Hydra Counter</p>}
      initialCount={1}
      render={(children, { count, incCount, decCount }) => (
        <div>
          <button onClick={incCount}> Increase </button>
          <button onClick={decCount}> Decrease </button>
          <p>
            {children} {count}
          </p>
        </div>
      )}
    />
  );
};
