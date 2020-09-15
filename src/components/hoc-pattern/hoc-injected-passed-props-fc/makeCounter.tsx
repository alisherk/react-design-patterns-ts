import React, { useState } from 'react';

type Subtract<T, V> = Pick<T, Exclude<keyof T, keyof V>>;

export interface InjectedCounterProps {
  value: number;
  onIncrement(): void;
  onDecrement(): void;
}

interface MakeCounterProps {
  minValue?: number;
  maxValue?: number;
}

export const makeCounter = <P extends InjectedCounterProps>(
  Component: React.ComponentType<P>
): React.FC<Subtract<P, InjectedCounterProps> & MakeCounterProps> => (
  props
) => {

  const [value, setValue] = useState<number>(0);

  const increment = () => {
    setValue((prevVal) => prevVal === props.maxValue ? prevVal : ++prevVal);
  };

  const decrement = () => {
    setValue((prevVal) => prevVal === props.minValue ? prevVal : --prevVal);
  };

  return (
    <Component
      {...(props as P)}
      value={value}
      onIncrement={increment}
      onDecrement={decrement}
    />
  );
};
