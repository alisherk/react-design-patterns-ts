import React from 'react';
import { InjectedCounterProps } from './MakeCounter';

interface CounterProps extends InjectedCounterProps {
  style?: React.CSSProperties;
}

export const Counter = (props: CounterProps) => (
  <div style={props.style}>
    <button onClick={props.onDecrement}> - </button>
    {props.value}
    <button onClick={props.onIncrement}> + </button>
  </div>
);
