import React from 'react';

export interface InjectedCounterProps {
  value: number;
  onIncrement(): void;
  onDecrement(): void;
}

interface MakeCounterState {
  value: number;
}

type Subtract<T, V> = Pick<T, Exclude<keyof T, keyof V>>;

export const makeCounter = <P extends InjectedCounterProps>(Component: React.ComponentType<P>) =>
  
class MakeCounter extends React.Component<Subtract<P, InjectedCounterProps>, MakeCounterState> {
    
    state: MakeCounterState = {
      value: 0,
    };

    increment = () => {
      this.setState(prevState => ({
        value: prevState.value + 1,
      }));
    };

    decrement = () => {
      this.setState(prevState => ({
        value: prevState.value - 1,
      }));
    };

    render() {
      return (
        <Component
          {...this.props as P}
          value={this.state.value}
          onIncrement={this.increment}
          onDecrement={this.decrement}
        />
      );
    }
  };


  
