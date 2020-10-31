import React from 'react';

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
  
  interface MakeCounterState {
    value: number;
  }
  
  export const makeCounter = <P extends InjectedCounterProps>(
    Component: React.ComponentType<P>
  ) =>
    class MakeCounter extends React.Component<
      Subtract<P, InjectedCounterProps> & MakeCounterProps,
      MakeCounterState
    > {
      state: MakeCounterState = {
        value: 0,
      };
  
      increment = () => {
        this.setState(prevState => ({
          value:
            prevState.value === this.props.maxValue
              ? prevState.value
              : prevState.value + 1,
        }));
      };
  
      decrement = () => {
        this.setState(prevState => ({
          value:
            prevState.value === this.props.minValue
              ? prevState.value
              : prevState.value - 1,
        }));
      };
  
      render() {
        const { minValue, maxValue, ...props } = this.props;
        return (
          <Component
            {...props as P}
            value={this.state.value}
            onIncrement={this.increment}
            onDecrement={this.decrement}
          />
        );
      }
    };